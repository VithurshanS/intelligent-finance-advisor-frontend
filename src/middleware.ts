import {NextRequest, NextResponse} from "next/server";
import {cookies} from "next/headers";
import {decodeJwt} from "jose";
import {TokenPayload, Role} from "@/lib/types/user";

// Route configurations based on access level
const publicRoutes = [
    "/",
    "/auth/login",
    "/auth/forgot-password",
    "/auth/reset-password",
    "/auth/register",
    "/unauthorized"
];

const userRoutes = [
    "/dashboard",
    // Add more user-accessible routes
];

const adminRoutes = [
    "/users",
    // Add more admin-only routes
];

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;

    // Check which category the current path belongs to
    const isPublicRoute = publicRoutes.includes(path);
    const isUserRoute = userRoutes.includes(path);
    const isAdminRoute = adminRoutes.includes(path);

    // Get token from cookies
    const cookie = (await cookies()).get("token")?.value;

    let session: TokenPayload | null = null;

    if (cookie) {
        try {
            session = decodeJwt(cookie) as TokenPayload;

            // Check if token is expired
            if (session.exp && session.exp * 1000 < Date.now()) {
                session = null;
            }
        } catch (err) {
            console.error("JWT Decode Failed:", err);
            session = null;
        }
    }

    // Authentication check: Redirect to login if accessing protected route without a session
    if (!isPublicRoute && !session?.sub) {
        return NextResponse.redirect(new URL("/auth/login", req.nextUrl));
    }

    // Authorization checks based on user role
    if (session?.sub) {
        // Admin routes check
        if (isAdminRoute && session?.role !== Role.ADMIN) {
            return NextResponse.redirect(new URL("/unauthorized", req.nextUrl));
        }

        // User routes check
        if (isUserRoute && ![Role.USER, Role.ADMIN].includes(session?.role)) {
            return NextResponse.redirect(new URL("/unauthorized", req.nextUrl));
        }

        // Redirect authenticated users away from login page
        if (path === "/auth/login") {
            return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
        }
    }

    return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
    matcher: ["/((?!api|_next/static|_next/image|.*\\.png$|.*\\.jpg$|favicon.ico).*)"],
};