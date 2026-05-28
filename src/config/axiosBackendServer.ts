"use server";
import axios from "axios";
import { unsealData } from "iron-session";
import { cookies } from "next/headers";
import { sessionOptions } from "./session";
import { getLocale } from "next-intl/server";

export const axiosBackendInstance = axios.create({
    baseURL: process.env.BACKEND_API_URL,
});

axiosBackendInstance.interceptors.request.use(
    async (config) => {
        const cookiesStore = await cookies();
        const cookie = cookiesStore.get("session")?.value;
        const locale = await getLocale();

        if (cookie) {
            const session = await unsealData<SessionData>(cookie, {
                password: sessionOptions.password,
            });

            if (session?.accessToken) {
                config.headers.Authorization = `Bearer ${session.accessToken}`;
            }
        }

        const lang = cookiesStore.get("NEXT_LOCALE")?.value || locale;
        config.headers["lang"] = lang;

        return config;
    },
    (error) => Promise.reject(error),
);
