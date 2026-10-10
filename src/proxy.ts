import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_SESSION_COOKIE, verifySessionToken } from "@/lib/admin-auth";

const ADMIN_SUBDOMAIN = "modifications";

export async function proxy(request: NextRequest) {
  const url = request.nextUrl;
  const hostname = request.headers.get("host") || "";
  const isAdminHost = hostname.split(".")[0] === ADMIN_SUBDOMAIN;

  // On the admin subdomain, transparently serve the /admin tree for every path.
  if (isAdminHost && !url.pathname.startsWith("/admin") && !url.pathname.startsWith("/api/admin")) {
    const rewrittenPathname = `/admin${url.pathname === "/" ? "" : url.pathname}`;
    const rewrittenUrl = new URL(`${rewrittenPathname}${url.search}`, request.url);
    return handleAdminAuth(request, NextResponse.rewrite(rewrittenUrl), rewrittenPathname);
  }

  if (url.pathname.startsWith("/admin") || url.pathname.startsWith("/api/admin")) {
    return handleAdminAuth(request, NextResponse.next(), url.pathname);
  }

  return NextResponse.next();
}

async function handleAdminAuth(request: NextRequest, response: NextResponse, pathname: string) {
  const isPublicAdminRoute =
    pathname === "/admin/login" || pathname === "/api/admin/login";

  if (isPublicAdminRoute) return response;

  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  const valid = await verifySessionToken(token);

  if (!valid) {
    if (pathname.startsWith("/api/admin")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/admin/login";
    loginUrl.search = "";
    return NextResponse.redirect(loginUrl);
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|icon|apple-icon|opengraph-image|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|pdf)$).*)",
  ],
};
