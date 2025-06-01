import { fetcherSimple } from "@/api/api";
import { uri } from "@/api/uri";
import { CreateTransaction, FinancialSummary, Transaction } from "@/types";
import axios from "axios";
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

    const { data, error, isLoading, isValidating, mutate } = useSWR<FinancialSummary>([url], () => fetcherSimple(url, token))

    return {
        data,
        error,
        isLoading,
        isValidating,
        mutate
    }
}

export function useTransaction(token:string, transactionUUID:string) {
  const url = `${uri}/transactions/${transactionUUID}/detail/`;
  const { data, error, isLoading, isValidating, mutate } = useSWR<Transaction>([url], () => fetcherSimple(url, token))

  return {
      data,
      error,
      isLoading,
      isValidating,
      mutate
  }
}

export async function createTransaction(token:string, data:CreateTransaction) {
    const url = `${uri}/transactions/create/`;

    interface IResponse {
        message: string;
    }

     try {
    const res = await axios.post<IResponse>(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.debug('Axios error message:', error.message);
      if (error.response) {
        console.debug('Response data:', error.response.data);
        console.debug('Response status:', error.response.status);
        console.debug('Response headers:', error.response.headers);
      } else if (error.request) {
        console.error('Request data:', error.request);
      } else {
        console.error('Error setting up request:', error.message);
      }
    } else {
      console.error('Unexpected error:', error);
    }
    throw error;
  }
}

export async function updateTransaction(token:string, transactionUUID:string, data:CreateTransaction) {
    const url = `${uri}/transactions/${transactionUUID}/update/`;

    interface IResponse {
        message: string;
    }

     try {
    const res = await axios.post<IResponse>(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.debug('Axios error message:', error.message);
      if (error.response) {
        console.debug('Response data:', error.response.data);
        console.debug('Response status:', error.response.status);
        console.debug('Response headers:', error.response.headers);
      } else if (error.request) {
        console.error('Request data:', error.request);
      } else {
        console.error('Error setting up request:', error.message);
      }
    } else {
      console.error('Unexpected error:', error);
    }
    throw error;
  }
}

export async function deleteTransaction(token:string, transactionUUID:string) {
    const url = `${uri}/transactions/${transactionUUID}/delete/`;

    interface IResponse {
        message: string;
    }

     try {
    const res = await axios.post<IResponse>(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.debug('Axios error message:', error.message);
      if (error.response) {
        console.debug('Response data:', error.response.data);
        console.debug('Response status:', error.response.status);
        console.debug('Response headers:', error.response.headers);
      } else if (error.request) {
        console.error('Request data:', error.request);
      } else {
        console.error('Error setting up request:', error.message);
      }
    } else {
      console.error('Unexpected error:', error);
    }
    throw error;
  }
}