import { axiosBackendInstance } from "@/config/axiosBackendServer";
import { sessionOptions } from "@/config/session";
import { handleTryCatchError } from "@/shared/utils/clientHelpers";
import type { LoginResponse } from "@/modules/auth/types/auth.types";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
    try {
        const cookieStore = await cookies();
        const session = await getIronSession<SessionData>(cookieStore, sessionOptions);

        if (!session?.accessToken) {
            return NextResponse.json({ message: "No active session" }, { status: 401 });
        }
        if (!session?.refreshToken) {
            return NextResponse.json({ message: "Refresh token not found" }, { status: 401 });
        }

        const res = await axiosBackendInstance.post<LoginResponse>(
            "/Auth/refresh-token",
            { refreshToken: session.refreshToken },
        );

        const { token, refreshToken } = res.data;

        session.accessToken = token;
        session.refreshToken = refreshToken;
        await session.save();

        return NextResponse.json({ success: true });
    } catch (error: unknown) {
        return handleTryCatchError(error);
    }
}
