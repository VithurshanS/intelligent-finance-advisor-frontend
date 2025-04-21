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

// Routes that regular users can access
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const userRoutes = [
    "/dashboard",
    "/profile",
    "/settings",
    // Add more user-accessible routes
];

// Routes that only admins can access
const adminOnlyRoutes = [
    "/users",
    "/admin-settings",
    "/analytics",
    // Add more admin-only routes
];

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;

    // Check if the current path is public
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
        // Check if the user is trying to access an admin-only route
        if (adminOnlyRoutes.includes(path) && session?.role !== Role.ADMIN) {
            console.log(`Access denied: User role ${session?.role} tried to access admin-only route ${path}`);
            return NextResponse.redirect(new URL("/unauthorized", req.nextUrl));
        }

        // Check if an admin is trying to access a user-only route
        // This is commented out since we've decided admins can access user routes
        // If you want to restrict admins from certain user routes, uncomment this
        /*
        if (userOnlyRoutes.includes(path) && session?.role !== Role.USER) {
            console.log(`Access denied: Admin role ${session?.role} tried to access user-only route ${path}`);
            return NextResponse.redirect(new URL("/unauthorized", req.nextUrl));
        }
        */
    }

    return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
    matcher: ["/((?!api|_next/static|_next/image|.*\\.png$|.*\\.jpg$|favicon.ico).*)"],
};