'use server';

// lib/fetcher.ts
import {cookies} from 'next/headers';

const BASE_URL = process.env.BACKEND_BASE_URL!;

export async function serverFetcher<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const token = (await cookies()).get('token')?.value;

    const res = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers: {
            Authorization: token ? `Bearer ${token}` : '',
            'Content-Type': 'application/json',
            ...(options.headers || {}),
        },
        cache: 'no-store',
    });

    if (!res.ok) {
        const errorBody = await res.text();
        throw new Error(`Fetch failed: ${res.status} - ${errorBody}`);
    }

    return await res.json() as Promise<T>;
}
