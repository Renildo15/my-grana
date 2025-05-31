import { fetcherSimple } from "@/api/api";
import { uri } from "@/api/uri";
import { FinancialSummary, Transaction } from "@/types";
import useSWR from "swr";


export interface ITransactionsResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Omit<Transaction, "category_id">[]
}

export interface IParams {
    search?: string;
    transaction_type?: string;
    location?: string;
    date?: string;
    category?: string;
}

export function useTransactionsBalance(token:string) {
    const url = `${uri}/transactions/info/`;
    const { data, error, isLoading, isValidating, mutate } = useSWR<FinancialSummary>([url], () => fetcherSimple(url, token))

    return {
        data,
        error,
        isLoading,
        isValidating,
        mutate
    }
}

export function useTransactions(token:string, params?: IParams) {

    const query = new URLSearchParams();

    if (params) {
        Object.entries(params).forEach(([key, value]) => {
            if(value !== undefined && value !== null && value !== '') {
                query.append(key, String(value));
            }
        })
    }

    const url = `${uri}/transactions/list/${query.toString() ? `?${query.toString()}` : ''}`;

    const { data, error, isLoading, isValidating, mutate } = useSWR<ITransactionsResponse>([url], () => fetcherSimple(url, token))

    return {
        data,
        error,
        isLoading,
        isValidating,
        mutate
    }
}