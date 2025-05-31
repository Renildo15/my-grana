import { Category } from "./category";

export type Transaction = {
    id: string;
    name: string;
    value: string;
    transaction_type: "expense" | "income";
    location: "cash" | "bank" | "lent";
    date: string;
    category: Category
    category_id?: string
}

export type CreateTransaction = Omit<Transaction, "id" | "category">


export type TransactionResult = {
    count: number;
    next: string;
    previous: string;
    results: Transaction[]
}

export type FinancialSummary = {
    incomes: number;
    expenses: number;
    balance: number;
    location: {
      bank: number;
      cash: number;
      lent: number;
    };
  };