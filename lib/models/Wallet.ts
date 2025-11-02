import { PurchaseStatus, TransactionType } from "./enums";
import { DepositStatus } from "./enums";

export interface IWalletStats{
    balance?: number;
    total_deposited?: number;
    total_spent?: number;
}

export interface WalletTransaction{
    id: string;
    transaction_type: TransactionType;
    amount: number;
    status: DepositStatus;
    bank_name: string;
    bank_account: string;
    transfer_code: string;
    note: string;
    created_at: string;
}

export interface LastBankTransfer{
    bank_name: string;
    bank_account: string;
}

export interface Deposit{
    bank_name: string;
    bank_account: string;
    transfer_code: string;
    amount: number;
}