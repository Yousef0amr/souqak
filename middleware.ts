import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { defaultLocale, localeLangs, routing } from "@/config/i18n/routing";

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    const hasLocale = localeLangs.some((locale) => pathname.startsWith(`/${locale}`));
    if (!hasLocale) {
        const url = request.nextUrl.clone();
        url.pathname = `/${defaultLocale}${pathname}`;
        return NextResponse.redirect(url);
    }

    // Internationalization logic
    const intlMiddleware = createMiddleware(routing);
    return intlMiddleware(request);
}

export const config = {
    matcher: ["/", "/(en|ar)/:path*"],
};
