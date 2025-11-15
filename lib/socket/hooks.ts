"use client";

import { useEffect, useRef, useCallback } from "react";
import { getWebSocketClient } from "./client";
import { WalletStatusUpdate, NotificationUpdate } from "./client";

interface UseWebSocketOptions {
  endpoint?: string;
  onConnect?: () => void;
  onDisconnect?: () => void;
  onError?: (error: Event) => void;
  onWalletStatusUpdate?: (data: WalletStatusUpdate) => void;
  onNotificationUpdate?: (data: NotificationUpdate) => void;
  onMessage?: (data: any) => void;
  autoConnect?: boolean;
}

export const useWebSocket = (options: UseWebSocketOptions = {}) => {
  const {
    endpoint = "wallet",
    onConnect,
    onDisconnect,
    onError,
    onWalletStatusUpdate,
    onNotificationUpdate,
    onMessage,
    autoConnect = true,
  } = options;

  const wsClientRef = useRef(getWebSocketClient());
  const handlersRef = useRef<Map<string, (data: any) => void>>(new Map());
  const isConnectingRef = useRef(false);
  
  // Lưu latest callbacks vào ref để tránh re-render
  const callbacksRef = useRef({ onConnect, onDisconnect, onError, onWalletStatusUpdate, onNotificationUpdate, onMessage });
  useEffect(() => {
    callbacksRef.current = { onConnect, onDisconnect, onError, onWalletStatusUpdate, onNotificationUpdate, onMessage };
  }, [onConnect, onDisconnect, onError, onWalletStatusUpdate, onNotificationUpdate, onMessage]);

  // Connect to WebSocket - chỉ connect một lần
  const connect = useCallback(() => {
    const wsClient = wsClientRef.current;

    // Nếu đã connected hoặc đang connecting thì chỉ setup lại listeners
    if (wsClient.isConnected() || isConnectingRef.current) {
      // Update listeners với latest callbacks
      const callbacks = callbacksRef.current;
      
      // Remove old handlers và add new ones
      handlersRef.current.forEach((_, event) => {
        wsClient.off(event);
      });
      handlersRef.current.clear();
      
      // Set up event handlers với latest callbacks
      if (callbacks.onConnect) {
        const handler = () => callbacks.onConnect?.();
        wsClient.on("connected", handler);
        handlersRef.current.set("connected", handler);
      }
      if (callbacks.onDisconnect) {
        const handler = () => callbacks.onDisconnect?.();
        wsClient.on("disconnected", handler);
        handlersRef.current.set("disconnected", handler);
      }
      if (callbacks.onError) {
        const handler = (error: Event) => callbacks.onError?.(error);
        wsClient.on("error", handler);
        handlersRef.current.set("error", handler);
      }
      if (callbacks.onWalletStatusUpdate) {
        const handler = (data: WalletStatusUpdate) => {
          if (data.type === "wallet_status_update") {
            callbacks.onWalletStatusUpdate?.(data);
          }
        };
        wsClient.on("wallet_status_update", handler);
        handlersRef.current.set("wallet_status_update", handler);
      }
      if (callbacks.onNotificationUpdate) {
        const handler = (data: any) => {
          console.log("Hook received notification event (already connected):", data);
          // Accept any data structure and pass to callback
          callbacks.onNotificationUpdate?.(data as NotificationUpdate);
        };
        wsClient.on("notification", handler);
        handlersRef.current.set("notification", handler);
      }
      if (callbacks.onMessage) {
        const handler = (data: any) => callbacks.onMessage?.(data);
        wsClient.on("message", handler);
        handlersRef.current.set("message", handler);
      }
      return;
    }

    isConnectingRef.current = true;
    const callbacks = callbacksRef.current;

    // Set up event handlers
    if (callbacks.onConnect) {
      const handler = () => {
        isConnectingRef.current = false;
        callbacks.onConnect?.();
      };
      wsClient.on("connected", handler);
      handlersRef.current.set("connected", handler);
    }

    if (callbacks.onDisconnect) {
      const handler = () => {
        isConnectingRef.current = false;
        callbacks.onDisconnect?.();
      };
      wsClient.on("disconnected", handler);
      handlersRef.current.set("disconnected", handler);
    }

    if (callbacks.onError) {
      const handler = (error: Event) => {
        isConnectingRef.current = false;
        callbacks.onError?.(error);
      };
      wsClient.on("error", handler);
      handlersRef.current.set("error", handler);
    }

    // Listen for wallet status updates
    if (callbacks.onWalletStatusUpdate) {
      const handler = (data: WalletStatusUpdate) => {
        if (data.type === "wallet_status_update") {
          callbacks.onWalletStatusUpdate?.(data);
        }
      };
      wsClient.on("wallet_status_update", handler);
      handlersRef.current.set("wallet_status_update", handler);
    }

    // Listen for notification updates
    if (callbacks.onNotificationUpdate) {
      const handler = (data: any) => {
        console.log("Hook received notification event (initial connect):", data);
        // Accept any data structure and pass to callback
        callbacks.onNotificationUpdate?.(data as NotificationUpdate);
        
      };
      wsClient.on("notification", handler);
      handlersRef.current.set("notification", handler);
    }

    // Listen for all messages
    if (callbacks.onMessage) {
      const handler = (data: any) => {
        callbacks.onMessage?.(data);
      };
      wsClient.on("message", handler);
      handlersRef.current.set("message", handler);
    }

    // Connect - chỉ connect nếu chưa connected
    if (!wsClient.isConnected()) {
      wsClient.connect(endpoint);
    } else {
      isConnectingRef.current = false;
    }
  }, [endpoint]);

  // Disconnect from WebSocket - chỉ remove listeners, không disconnect connection
  const disconnect = useCallback(() => {
    const wsClient = wsClientRef.current;

    // Remove all event handlers
    handlersRef.current.forEach((handler, event) => {
      wsClient.off(event, handler);
    });
    handlersRef.current.clear();

    // KHÔNG disconnect WebSocket connection vì có thể component khác đang dùng
    // Chỉ remove listeners thôi
  }, []);

  // Send message
  const send = useCallback((data: any) => {
    return wsClientRef.current.send(data);
  }, []);

  // Listen to event
  const on = useCallback((event: string, callback: (data: any) => void) => {
    wsClientRef.current.on(event, callback);
  }, []);

  // Remove event listener
  const off = useCallback((event: string, callback?: (data: any) => void) => {
    wsClientRef.current.off(event, callback);
  }, []);

  // Check connection status
  const isConnected = useCallback(() => {
    return wsClientRef.current.isConnected();
  }, []);

  // Auto connect on mount - chỉ connect một lần
  useEffect(() => {
    if (autoConnect && !wsClientRef.current.isConnected()) {
      connect();
    }

    // Cleanup on unmount - chỉ remove listeners
    return () => {
      disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty deps - chỉ chạy một lần khi mount

  return {
    connect,
    disconnect,
    send,
    on,
    off,
    isConnected,
  };
};

// Hook specifically for wallet WebSocket
export const useWalletWebSocket = (
  onWalletStatusUpdate?: (data: WalletStatusUpdate) => void
) => {
  return useWebSocket({
    endpoint: "wallet",
    onWalletStatusUpdate,
    autoConnect: true,
  });
};

// Hook specifically for notification WebSocket
export const useNotificationWebSocket = (
  onNotificationUpdate?: (data: NotificationUpdate) => void
) => {
  return useWebSocket({
    endpoint: "notifications",
    onNotificationUpdate,
    autoConnect: true,
  });
};
