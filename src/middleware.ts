import { NextRequest, NextResponse } from 'next/server';
import { decrypt } from './app/lib/session';

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  const session = req.cookies.get('session')?.value;
  req.user = await decrypt(session);

  if (!token && !req.url.includes('/login')) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (token && req.url.includes('/login')) {
    return NextResponse.redirect(new URL('/admin', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/login/:path*'
  ],
}