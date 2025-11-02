"use client";

import Cookies from "js-cookie";

export interface WalletStatusUpdate {
  type: "wallet_status_update";
  transaction: any;
  wallet: any;
}

export interface NotificationUpdate {
  type: "notification";
  notification: any;
}

class WebSocketClient {
  private ws: WebSocket | null = null;
  private wsBaseUrl: string;
  private reconnectAttempts: number = 0;
  private maxReconnectAttempts: number = 5;
  private reconnectTimeout: NodeJS.Timeout | null = null;
  private listeners: Map<string, Set<(data: any) => void>> = new Map();

  constructor() {
    // Lấy WebSocket URL từ env hoặc default
    // Nếu có NEXT_PUBLIC_WS_URL thì dùng, không thì convert từ API URL
    const wsUrl = process.env.NEXT_PUBLIC_WS_URL;
    if (wsUrl) {
      this.wsBaseUrl = wsUrl;
    } else {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      // Convert HTTP URL to WebSocket URL
      this.wsBaseUrl = apiUrl.replace(/^http/, "ws");
      console.log("wsBaseUrl",this.wsBaseUrl)
      
    }
  }

  // Get auth token from cookies
  private getAuthToken(): string | null {
    return Cookies.get("access_token") || null;
  }

  // Connect to WebSocket server
  public connect(endpoint: string = "wallet"): boolean {
    // Nếu đã connected hoặc đang connecting thì không connect lại
    if (this.ws && (this.ws.readyState === WebSocket.OPEN || this.ws.readyState === WebSocket.CONNECTING)) {
      console.log("WebSocket already connected or connecting, skipping...");
      return true;
    }

    // Disconnect existing connection if any
    if (this.ws) {
      this.disconnect();
    }

    const token = this.getAuthToken();

    if (!token) {
      console.log("No auth token found, skipping WebSocket connection");
      return false;
    }

    try {
      // Tạo WebSocket URL với token
      // Format: ws://host:port/ws/{endpoint}/{token}
      // Example: ws://172.25.67.101:8000/ws/wallet/{token}
      const wsUrl = `${this.wsBaseUrl}/ws/${endpoint}/${token}`;
      console.log("Connecting to WebSocket:", wsUrl.replace(token, "***")); // Hide token in log

      this.ws = new WebSocket(wsUrl);

      // Connection opened
      this.ws.onopen = () => {
        console.log("WebSocket connected");
        this.reconnectAttempts = 0;
        this.emit("connected", null);
      };

      // Message received
      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log("WebSocket message received:", data);
          console.log("Message type:", data.type);
          console.log("Message keys:", Object.keys(data));

          // Emit to specific type listeners
          if (data.type) {
            console.log(`Emitting event: "${data.type}"`);
            this.emit(data.type, data);
          }

          // Also emit generic message event
          this.emit("message", data);
          
          // If no type, try to detect notification-like structure
          if (!data.type && (data.id || data.notification)) {
            console.log("No type found, but looks like notification, emitting 'notification' event");
            this.emit("notification", data);
          }
        } catch (error) {
          console.error("Error parsing WebSocket message:", error);
        }
      };

      // Connection closed
      this.ws.onclose = (event) => {
        console.log("WebSocket disconnected:", event.code, event.reason);
        this.emit("disconnected", { code: event.code, reason: event.reason });
        
        // Chỉ reconnect nếu không phải manual disconnect (code 1000) và chưa vượt quá max attempts
        if (event.code !== 1000 && this.reconnectAttempts < this.maxReconnectAttempts) {
          this.reconnectAttempts++;
          const delay = Math.min(1000 * this.reconnectAttempts, 5000); // Max 5 seconds delay
          console.log(`Reconnecting in ${delay}ms (attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts})`);

          this.reconnectTimeout = setTimeout(() => {
            this.connect(endpoint);
          }, delay);
        } else if (this.reconnectAttempts >= this.maxReconnectAttempts) {
          console.log("Max reconnection attempts reached, stopping reconnect");
        }
      };

      // Connection error
      this.ws.onerror = (error) => {
        console.log("WebSocket error:", error);
        this.emit("error", error);
      };

      return true;
    } catch (error) {
      console.error("Error creating WebSocket connection:", error);
      return false;
    }
  }

  // Disconnect from WebSocket server
  public disconnect(): void {
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }

    if (this.ws) {
      this.ws.close(1000, "Manual disconnect");
      this.ws = null;
      this.reconnectAttempts = 0;
      console.log("WebSocket disconnected");
    }
  }

  // Send message to server
  public send(data: any): boolean {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      try {
        const message = typeof data === "string" ? data : JSON.stringify(data);
        this.ws.send(message);
        return true;
      } catch (error) {
        console.error("Error sending WebSocket message:", error);
        return false;
      }
    } else {
      console.warn("WebSocket not connected, cannot send message");
      return false;
    }
  }

  // Listen to event
  public on(event: string, callback: (data: any) => void): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(callback);
  }

  // Remove event listener
  public off(event: string, callback?: (data: any) => void): void {
    if (!this.listeners.has(event)) {
      return;
    }

    if (callback) {
      this.listeners.get(event)!.delete(callback);
    } else {
      this.listeners.delete(event);
    }
  }

  // Emit event to listeners
  private emit(event: string, data: any): void {
    if (this.listeners.has(event)) {
      this.listeners.get(event)!.forEach((callback) => {
        try {
          callback(data);
        } catch (error) {
          console.error(`Error in event listener for ${event}:`, error);
        }
      });
    }
  }

  // Check if WebSocket is connected
  public isConnected(): boolean {
    return this.ws?.readyState === WebSocket.OPEN;
  }

  // Get ready state
  public getReadyState(): number {
    return this.ws?.readyState ?? WebSocket.CLOSED;
  }
}

// Create singleton instance
let wsClientInstance: WebSocketClient | null = null;

export const getWebSocketClient = (): WebSocketClient => {
  if (!wsClientInstance) {
    wsClientInstance = new WebSocketClient();
  }
  return wsClientInstance;
};

export default WebSocketClient;
