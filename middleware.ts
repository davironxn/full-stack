import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;

    // 🚫 Never protect these routes
    if (
      pathname.startsWith("/auth") ||
      pathname.startsWith("/api/auth") ||
      pathname.startsWith("/public") ||
      pathname === "/"
    ) {
      return NextResponse.next();
    }

    // 🔒 Restrict admin routes
    if (pathname.startsWith("/admin") && !token?.isAdmin) {
      return NextResponse.redirect(new URL("/home", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/home", "/user/:path*", "/admin/:path*"],
};
