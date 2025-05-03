'use server';

import {cookies} from "next/headers";
import {LoginResponse} from "@/lib/types/login";

// Production

// export async function createSession(loginResponse: LoginResponse) {
//     const {token} = loginResponse;
//
//     // Set secure HTTP-only cookies instead of localStorage
//     const cookieStore = await cookies();
//
//     cookieStore.set('token', token, {
//         httpOnly: true,
//         secure: true,
//         maxAge: 60 * 60 * 24, // 1 day
//         path: '/',
//         sameSite: 'strict',
//         domain: "shancloudservice.com"
//     });
//
//     cookieStore.set('user', JSON.stringify(loginResponse), {
//         httpOnly: true,
//         secure: true,
//         maxAge: 60 * 60 * 24, // 1 day
//         path: '/',
//         sameSite: 'strict',
//         domain: "shancloudservice.com"
//     });
// }

export async function createSession(loginResponse: LoginResponse) {
    const {token} = loginResponse;

    // Set secure HTTP-only cookies instead of localStorage
    const cookieStore = await cookies();

    cookieStore.set('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24, // 1 day
        path: '/',
        sameSite: 'strict',
    });

    cookieStore.set('user', JSON.stringify(loginResponse), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24, // 1 day
        path: '/',
        sameSite: 'strict',
    });
}

export async function deleteSession() {
    const cookieStore = await cookies();

    // Clear all auth cookies
    cookieStore.delete('token');
    cookieStore.delete('user');
}