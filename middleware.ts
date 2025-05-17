
import { NextResponse, NextRequest } from 'next/server';
import { auth } from './lib/auth';

export async function middleware(req: NextRequest) {
  const session = await auth.api.getSession(req);
 console.log('Session:', session);
  // Define the protected paths
  const protectedPaths = ['/dashboard', '/another-protected'];

  // Check if the request is for a protected path
  if (protectedPaths.some((path) => req.nextUrl.pathname.startsWith(path))) {
    if (!session) {
      // If not authenticated, redirect to login
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }
  console.log("pathname",req.nextUrl.pathname)
  if(session && req.nextUrl.pathname =="/"){
          return NextResponse.redirect(new URL('/dashboard', req.url));

  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/','/dashboard/:path*', '/another-protected/:path*'],
};