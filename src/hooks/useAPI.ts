// hooks/useAPI.ts
import useSWR from 'swr';
import {clientFetch as fetcher_function} from '@/lib/client-fetcher';

export function useAPI<T = unknown>(
    endpoint: string,
    options?: RequestInit,
) {
    const fetcher = async (url: string) => {
        return await fetcher_function<T>(url, options);
    };

    const {data, error, isLoading, mutate} = useSWR<T>(endpoint, fetcher);

    return {
        data,
        error,
        isLoading,
        mutate, // use this to revalidate/refetch manually
    };
}
