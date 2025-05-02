// app/api/proxy/risk-analysis/[ticker]/stream/route.ts
import {NextRequest, NextResponse} from 'next/server';
import {cookies} from 'next/headers';

export const dynamic = 'force-dynamic';

export async function GET(
    request: NextRequest,
    {params}: { params: Promise<{ ticker: string }> }
) {
    try {
        // Get the auth token from cookies
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;

        if (!token) {
            return new NextResponse(JSON.stringify({error: 'Not authenticated'}), {
                status: 401,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        // Create URL to your backend
        const backendUrl = `${process.env.BACKEND_BASE_URL}/risk-analysis/${(await params).ticker}/stream`;

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
            return new NextResponse(JSON.stringify({error: 'Backend error'}), {
                status: response.status,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        // Create a ReadableStream to proxy the data
        const reader = response.body?.getReader();
        new TextEncoder();
        // Return a streaming response
        return new NextResponse(
            new ReadableStream({
                async start(controller) {
                    if (!reader) {
                        controller.close();
                        return;
                    }

                    try {
                        while (true) {
                            const {done, value} = await reader.read();

                            if (done) {
                                controller.close();
                                break;
                            }

                            // Forward the data as is (already in SSE format)
                            controller.enqueue(value);
                        }
                    } catch (error) {
                        controller.error(error);
                    }
                },
            }),
            {
                headers: {
                    'Content-Type': 'text/event-stream',
                    'Cache-Control': 'no-cache',
                    'Connection': 'keep-alive',
                },
            }
        );
    } catch (error) {
        console.error('Proxy error:', error);
        return new NextResponse(JSON.stringify({error: 'Internal server error'}), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}