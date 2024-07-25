export type Transaction = {
  amount: number;
  balance?: number;
  cashbackAmount?: number;
  commissionRate?: number;
  currencyCode?: number;
  description: string;
  hold?: boolean;
  id: string;
  mcc?: number;
  operationAmount?: number;
  originalMcc?: number;
  receiptId?: string;
  time: number;
};
