'use server';

import {cookies} from "next/headers";
import {LoginResponse} from "@/lib/types/login";

export async function createSession(loginResponse: LoginResponse) {
    const {token} = loginResponse;

    // Set secure HTTP-only cookies instead of localStorage
    const cookieStore = await cookies();

    cookieStore.set('token', token, {
        httpOnly: true,
        secure: process.env.ENV === 'production',
        maxAge: 60 * 60 * 24, // 1 day
        path: '/',
        sameSite: 'strict',
        domain: process.env.ENV === 'production' ? "shancloudservice.com" : undefined,
    });

    cookieStore.set('user', JSON.stringify(loginResponse), {
        httpOnly: true,
        secure: process.env.ENV === 'production',
        maxAge: 60 * 60 * 24, // 1 day
        path: '/',
        sameSite: 'strict',
        domain: process.env.ENV === 'production' ? "shancloudservice.com" : undefined,
    });
}

export async function deleteSession() {
    const cookieStore = await cookies();
    // Clear all auth cookies with the same options used when setting them
    cookieStore.delete({
        name: 'token',
        path: '/',
        domain: process.env.ENV === 'production' ? "shancloudservice.com" : undefined,
    });

    cookieStore.delete({
        name: 'user',
        path: '/',
        domain: process.env.ENV === 'production' ? "shancloudservice.com" : undefined,
    });
}