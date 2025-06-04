import { fetcherSimple } from "@/api/api";
import { uri } from "@/api/uri";
import { Category, CreateCategory } from "@/types";
import axios from "axios";
import useSWR from "swr";

export function useCategories(token:string) {
    const url = `${uri}/categories/list/`;
    const { data, error, isLoading, isValidating, mutate } = useSWR<Category[]>([url], () => fetcherSimple(url, token))

     return {
        data,
        error,
        isLoading,
        isValidating,
        mutate
    }
}

export function useCategory(token:string, categoryUUID:string) {
    const url = `${uri}/categories/${categoryUUID}/detail/`;
    const { data, error, isLoading, isValidating, mutate } = useSWR<Category>([url], () => fetcherSimple(url, token))

     return {
        data,
        error,
        isLoading,
        isValidating,
        mutate
    }
}

export async function createCategory(token: string, data:CreateCategory) {
    const url = `${uri}/categories/create/`;

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

export async function updateCategory(token: string, categoryUUID:string, data:CreateCategory) {
    const url = `${uri}/categories/${categoryUUID}/update/`;

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

export async function deleteDelete(token:string, categoryUUID:string) {
    const url = `${uri}/categories/${categoryUUID}/delete/`;

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