'use server';

import {redirect} from "next/navigation";
import {cookies} from 'next/headers';
import AxiosInstance from "@/lib/axiosInstance";
import axios from "axios";
import {HTTPValidationError, LoginResponse} from "@/lib/types";

async function createSession(loginResponse: LoginResponse) {
	const {token, username, role} = loginResponse;

	// Set secure HTTP-only cookies instead of localStorage
	const cookieStore = await cookies();

	cookieStore.set('token', token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		maxAge: 60 * 60 * 24, // 1 day
		path: '/',
		sameSite: 'strict'
	});

	cookieStore.set('user', JSON.stringify({
		username: username,
		role: role,
		name: 'John Doe', // Placeholder, replace with actual name if available
		email: 'testmail@example.com',
	}), {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		maxAge: 60 * 60 * 24, // 1 day
		path: '/',
		sameSite: 'strict'
	});
}

async function deleteSession() {
	const cookieStore = await cookies();

	// Clear all auth cookies
	cookieStore.delete('token');
	cookieStore.delete('user');
}


export async function login(_previousState: string, formData: FormData): Promise<string> {
	const username = formData.get("username") as string;
	const password = formData.get("password") as string;

	// Validate form input
	if (!username || !password) {
		return "Please fill in all fields";
	}

	try {
		// Create a server-side axios instance to call the backend
		const response = await AxiosInstance.post<LoginResponse>('/auth/test-login', {
			username,
			password
		});
		await createSession(response.data);


		// Redirect to dashboard after successful login
		redirect('/dashboard');
	} catch (error) {
		// Type narrowing for the axios error
		if (axios.isAxiosError(error)) {
			const errorData = error.response?.data as HTTPValidationError | undefined;

			if (errorData?.detail && errorData.detail.length > 0) {
				return errorData.detail[0].msg;
			} else if (error.response?.status === 404) {
				return "Invalid credentials";
			} else {
				console.error('Login API error:', error.response?.data);
				return "Failed to login. Please try again.";
			}
		}
		throw error;
	}
}

export async function logout(): Promise<void> {
	await deleteSession();
	redirect('/login');
}