import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const privatePaths = ['/home']
const authPaths = ['/sign-in', '/sign-up']


// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const sessionToken = request.cookies.get('sessionToken')?.value
  // console.log('sessionToken', sessionToken)
  // Chưa đăng nhập thì không cho vào private paths
  if (privatePaths.some((path) => pathname.startsWith(path)) && !sessionToken) {
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }
  //Đăng nhập rồi thì không cho vào sign-in/sign-up nữa
  if (authPaths.some((path) => pathname.startsWith(path)) && sessionToken) {
    return NextResponse.redirect(new URL('/home', request.url))
  }
  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/sign-in', '/sign-up', '/home', 
  // Exclude files with a "." followed by an extension, which are typically static files.
  // Exclude files in the _next directory, which are Next.js internals.

  "/((?!.+\\.[\\w]+$|_next).*)",
  // Re-include any files in the api or trpc folders that might have an extension
  "/(api|trpc)(.*)",]
}
