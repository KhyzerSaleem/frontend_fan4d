import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { LOCALES, routing } from "./i18n/routing";
import { getToken } from "next-auth/jwt";

const protectedPages = [
  "/settings/profile-my-info",
  "/settings/profile-locations",
  "/settings/my-orders",
  "/settings/my-designs",
  "/settings/payment",
  "/get-quote"
];

const guestOnlyPages = [
  "/auth/login",
  "/auth/register",
  "/auth/forget-password",
  "/auth/set-password"
];

const handleI18nRouting = createMiddleware(routing);

export default async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const { pathname } = req.nextUrl;

  // Extract locale prefix if present
  const localePattern = `^/(${LOCALES.join("|")})(?=/|$)`;
  const match = pathname.match(new RegExp(localePattern));
  const localePrefix = match?.[0] || "";
  const pathWithoutLocale = pathname.replace(localePrefix, "") || "/";

  const matches = (routes: string[]) =>
    routes.some((route) =>
      pathWithoutLocale === route || pathWithoutLocale.startsWith(`${route}/`)
    );

  if (matches(protectedPages) && !token) {
    return NextResponse.redirect(
      new URL(`${localePrefix}/auth/login`, req.nextUrl.origin)
    );
  }

  if (matches(guestOnlyPages) && token) {
    return NextResponse.redirect(
      new URL(`${localePrefix}/`, req.nextUrl.origin)
    );
  }

  return handleI18nRouting(req);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"], // Matches all pages except API & static
};
