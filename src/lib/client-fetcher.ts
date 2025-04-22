// lib/client-fetcher.ts

const BASE_URL = "http://localhost:8000";

export async function clientFetch<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            ...(options.headers || {}),
        },
    });

    if (!res.ok) {
        const errorBody = await res.text(); // more helpful error message
        throw new Error(`Client fetch failed: ${res.status} - ${errorBody}`);
    }

    return await res.json() as Promise<T>;
}
