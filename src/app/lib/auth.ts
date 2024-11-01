'use server';
import { encrypt } from '@/app/lib/session';
import { cookies } from 'next/headers';

export interface LoginResponse {
    accessToken: string;
    id: string;
    email: string;
    name: string;
    roles: Array<{
        id: number;
        role: string;
    }>
    permissions: Array<{
        id: number;
        permission: string;
    }>
}

async function loginToAPI(email: string, password: string) {
    try {
        const response = await fetch('http://localhost:3000/api/v1/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }

        const data: LoginResponse = await response.json();

        return data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
}

export async function login(email: string, password: string) {
    const { accessToken, ...data } = await loginToAPI(email, password);

    if (accessToken) {
        const cookieStore = await cookies()

        const encryptedData = await encrypt(data);

        cookieStore.set('token', accessToken, { maxAge: 86400 });
        cookieStore.set('session', encryptedData, { maxAge: 86400, });
    }

    return accessToken;
}