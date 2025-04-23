import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const User = request.cookies.get("user");

  if (!User && request.nextUrl.pathname.startsWith("/checkout")) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("message", "login-required");
    return NextResponse.redirect(loginUrl);
  }
  if (pathname === "/product") {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/checkout", "/product"],
};
