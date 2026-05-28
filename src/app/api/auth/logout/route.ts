import { axiosBackendInstance } from "@/config/axiosBackendServer";
import { sessionOptions } from "@/config/session";
import { handleTryCatchError } from "@/shared/utils/clientHelpers";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
    try {
        const cookieStore = await cookies();
        const session = await getIronSession<SessionData>(cookieStore, sessionOptions);

        // Best-effort call to backend logout (invalidates refresh token server-side)
        if (session?.accessToken) {
            try {
                await axiosBackendInstance.post("/Auth/logout");
            } catch {
                // Continue regardless — we still clear the session
            }
        }

        session.destroy();
        return NextResponse.json({ success: true });
    } catch (error: unknown) {
        return handleTryCatchError(error);
    }
}
