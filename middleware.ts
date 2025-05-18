import { NextResponse, NextRequest } from 'next/server';
import { auth } from './lib/auth';

export async function middleware(req: NextRequest) {
  let session;
  
  try {
    session = await auth.api.getSession(req);
    console.log('Session:', session);
  } catch (error) {
    console.error('Error retrieving session:', error);
    // Optionally redirect to an error page or handle as needed
    return NextResponse.redirect(new URL('/', req.url));
  }

  // Define the protected paths
  const protectedPaths = ['/dashboard', '/another-protected'];

  // Check if the request is for a protected path
  if (protectedPaths.some((path) => req.nextUrl.pathname.startsWith(path))) {
    if (!session) {
      // If not authenticated, redirect to login
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  console.log("pathname", req.nextUrl.pathname);
  
  if (session && req.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }
  if (session && req.nextUrl.pathname === "/login") {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/login', '/dashboard/:path*', '/another-protected/:path*'],
};