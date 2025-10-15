import { defineRouting } from "next-intl/routing";

export const localeLangs: ("en" | "ar")[] = ["en", "ar"];
export const defaultLocale = "en" as const;

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: [...localeLangs],

  // Used when no locale matches
  defaultLocale: defaultLocale,
});
