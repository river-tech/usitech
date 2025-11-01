import { Deposit } from "../models/Wallet";
import AuthApi from "./Auth";
const WalletApi = () => {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
  const authApi = AuthApi();
  const getWalletStats = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/wallet`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authApi.getAuthToken()}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        return { success: true, data: data };
      } else {
        return { success: false, error: data.detail || data.message || data.error || "Error getting wallet balance" };
      }
    } catch (error) {
      console.log("Error getting wallet balance:", error);
      throw error;
    }
  };

  const getLastBankTransfer = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/wallet/last-bank-info`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authApi.getAuthToken()}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        return { success: true, data: data };
      } else {
        return { success: false, error: data.detail || data.message || data.error || "Error getting last bank transfer" };
      }
    } catch (error) {
      console.log("Error getting last bank transfer:", error);
      throw error;
    }
  };

 

  const createDeposit = async (deposit: Deposit) => {   
    try {
      const response = await fetch(`${API_BASE_URL}/api/wallet/deposit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authApi.getAuthToken()}`,
        },
        body: JSON.stringify(deposit),
      });
      const data = await response.json();
      if (response.ok) {
        return { success: true, data: data };
      } else {
        return { success: false, error: data.detail || data.message || data.error || "Error creating deposit" };
      }
    } catch (error) {
      console.log("Error creating deposit:", error);
      throw error;
    }
  };

  const getTransactions = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/wallet/transactions`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authApi.getAuthToken()}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        return { success: true, data: data };
      } else {
        return { success: false, error: data.detail || data.message || data.error || "Error getting transactions" };
      }
    } catch (error) {
      console.log("Error getting transactions:", error);
      throw error;
    }
  };    
  return {
    getWalletStats,
    getLastBankTransfer,
    createDeposit,
    getTransactions,
  };
};

export default WalletApi;

