import {NextRequest, NextResponse} from "next/server";
import {cookies} from "next/headers";
import {decodeJwt} from "jose";
import {Role, TokenPayload} from "@/lib/types/user";

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
    "/dashboard",
    // Add more admin-only routes
];

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;

    // Check which category the current path belongs to
    const isPublicRoute = publicRoutes.includes(path);

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

    // Redirect authenticated users away from login page
    if (session?.sub && path === "/auth/login") {
        return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
    }

    // Authentication check: Redirect to login if accessing protected route without a session
    if (!isPublicRoute && !session?.sub) {
        return NextResponse.redirect(new URL("/auth/login", req.nextUrl));
    }

    // Authorization checks based on path and user role
    if (session?.sub) {
        if (adminRoutes.includes(path) && session?.role !== Role.ADMIN) {
            console.log(`Access denied: User role ${session?.role} tried to access admin route ${path}`);
            return NextResponse.redirect(new URL("/unauthorized", req.nextUrl));
        }

        if (userRoutes.includes(path) && !adminRoutes.includes(path) && session?.role !== Role.USER) {
            console.log(`Access denied: Admin role ${session?.role} tried to access user-only route ${path}`);
            return NextResponse.redirect(new URL("/unauthorized", req.nextUrl));
        }
    }

    return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
    matcher: ["/((?!api|_next/static|_next/image|.*\\.png$|.*\\.jpg$|favicon.ico).*)"],
};