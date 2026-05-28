import "./../globals.css";
import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { ThemeProvider } from "@/containers/ThemeProvider";
import ModalManagerProvider from "@/common/models/ModalManagerProvider";
import { Providers } from "../../containers/providers";
import AuthTabsSyncProvider from "@/containers/AuthTabsSyncProvider";
import SetupRefreshTokenAxiosResponse from "@/containers/SetupRefreshTokenAxiosResponse";
import { Suspense } from "react";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Souqak – Business Management Dashboard",
    template: "%s | Souqak",
  },
  description:
    "Souqak is a modern all-in-one business management platform for tracking inventory, orders, payments, analytics and more.",
  keywords: ["business", "inventory", "orders", "dashboard", "POS", "management"],
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  setRequestLocale(locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${inter.variable} ${geistMono.variable} font-sans antialiased overflow-x-hidden`}
      >
        <NextIntlClientProvider>
          <Providers>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              themes={["light", "dark", "primary", "vip"]}
              enableSystem
              disableTransitionOnChange
            >
              {children}
              <ModalManagerProvider />
            </ThemeProvider>

            {/* Global async containers */}
            <SetupRefreshTokenAxiosResponse />
            <Suspense fallback={null}>
              <AuthTabsSyncProvider />
            </Suspense>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
