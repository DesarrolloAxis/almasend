import { NextRequest, NextResponse } from "next/server";

import { ADMIN_SESSION_COOKIE, isValidSessionToken } from "@/lib/admin-auth";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/api") || pathname.startsWith("/_next")) {
    return NextResponse.next();
  }

  const hostname = request.headers.get("host") ?? "";
  const isAdminHost = hostname.startsWith("admin.");

  const targetPathname =
    isAdminHost && !pathname.startsWith("/admin")
      ? `/admin${pathname === "/" ? "" : pathname}`
      : pathname;

  const isLoginRoute = targetPathname === "/admin/login";

  if (targetPathname.startsWith("/admin") && !isLoginRoute) {
    const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
    const valid = await isValidSessionToken(token);
    if (!valid) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/login";
      return NextResponse.redirect(url);
    }
  }

  if (targetPathname !== pathname) {
    const url = request.nextUrl.clone();
    url.pathname = targetPathname;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icon.png).*)"],
};
