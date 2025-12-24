import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const isAuthPage = pathname === "/sign-in" || pathname === "/sign-up";

  const isLandingPage = pathname === "/";

  const isDashboardRoute =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/habits") ||
    pathname.startsWith("/check-in") ||
    pathname.startsWith("/analytics") ||
    pathname.startsWith("/reflect");

  if (!session && isDashboardRoute) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (session && (isLandingPage || isAuthPage)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  runtime: "nodejs",
  matcher: [
    "/",
    "/sign-in",
    "/sign-up",
    "/dashboard/:path*",
    "/habits/:path*",
    "/check-in/:path*",
    "/analytics/:path*",
    "/reflect/:path*",
  ],
};
