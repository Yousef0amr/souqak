import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultLocale, localeLangs } from "./config/i18n/routing";
import { unsealData } from "iron-session";
import { sessionOptions } from "./config/session";

// Define your routes
const fullPublicRoutes = [
    "/privacy-policy",
    "/terms-and-conditions",
    "/payment-error",
    "/payment-success",
];
const authRoutes = [
    "/",
    "/login",
    "/sign-up",
    "/password-recovery",
    "/reset-password",
    "/verify",
    "/invalid-verification",
];

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // ─────────────────────────────────────────────────────────────
    // Page routes: locale redirect + auth guards
    // ─────────────────────────────────────────────────────────────
    const hasLocale = localeLangs.some((locale) => pathname.startsWith(`/${locale}`));

    if (!hasLocale) {
        const url = request.nextUrl.clone();
        url.pathname = `/${defaultLocale}${pathname}`;
        return NextResponse.redirect(url);
    }

    const currentLang = pathname.split("/")[1];
    const routePath = pathname.replace(`/${currentLang}`, "") || "/";

    // 2️⃣ Check auth status via iron-session
    const cookie = request.cookies.get("session")?.value;
    let session: SessionData | null = null;

    if (cookie) {
        try {
            session = await unsealData<SessionData>(cookie, {
                password: sessionOptions.password,
            });
        } catch {
            session = null;
        }
    }

    const isLoggedIn = !!session?.accessToken;

    // 3️⃣ Route guards

    // Logged-in users are bounced away from auth pages → dashboard
    if (isLoggedIn) {
        if (authRoutes.includes(routePath)) {
            const url = request.nextUrl.clone();
            url.pathname = `/${currentLang}/dashboard`;
            return NextResponse.redirect(url);
        }
        return NextResponse.next();
    }

    // Not logged in: allow auth pages and public pages
    if (authRoutes.includes(routePath) || fullPublicRoutes.includes(routePath)) {
        return NextResponse.next();
    }

    // Everything else → redirect to login
    const url = request.nextUrl.clone();
    url.pathname = `/${currentLang}/`;
    return NextResponse.redirect(url);
}

// Apply middleware only to these paths
export const config = { matcher: ["/((?!_next|api|.*\\..*).*)"] };
