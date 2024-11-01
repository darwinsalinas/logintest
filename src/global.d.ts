import { NextRequest as OriginalNextRequest } from 'next/server'
import { LoginResponse } from './app/lib/auth'

declare global {
    declare interface NextRequest extends OriginalNextRequest {
        user: LoginResponse
    }
}