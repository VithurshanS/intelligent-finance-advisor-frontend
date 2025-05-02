// app/api/proxy/risk-analysis/[ticker]/stream/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

// The correct type definition for Next.js App Router
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ ticker: string }> }
) {
    try {
        // Get the auth token from cookies - no need for await with cookies()
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;

        if (!token) {
            return new NextResponse(JSON.stringify({ error: 'Not authenticated' }), {
                status: 401,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        // Create URL to your backend
        const backendUrl = `${process.env.BACKEND_BASE_URL}/risk-analysis/${(await params).ticker}/stream`;
        console.log(`Proxying request to: ${backendUrl}`);

        // Make the request to your backend with proper auth
        const response = await fetch(backendUrl, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
            },
        });

        // If backend response is not ok, return error
        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Backend error (${response.status}): ${errorText}`);
            return new NextResponse(JSON.stringify({ error: 'Backend error', details: errorText }), {
                status: response.status,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        // Return a streaming response by directly forwarding the response
        return new Response(response.body, {
            headers: {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
            },
        });
    } catch (error) {
        console.error('Proxy error:', error);
        return new NextResponse(JSON.stringify({ error: 'Internal server error' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}