import { axiosBackendInstance } from "@/config/axiosBackendServer";
import { sessionOptions } from "@/config/session";
import { loginSchema } from "@/modules/auth/schemas/authSchemas";
import { handleTryCatchError, validateRequest } from "@/shared/utils/clientHelpers";
import type { LoginDto, LoginResponse } from "@/modules/auth/types/auth.types";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body: LoginDto = await request.json();

        const validation = validateRequest(loginSchema, body);
        if (!validation.ok) return validation.response;

        const cookieStore = await cookies();
        const res = await axiosBackendInstance.post<LoginResponse>("/Auth/login", body);
        const { token, refreshToken, user } = res.data;

        const session = await getIronSession<SessionData>(cookieStore, sessionOptions);
        session.accessToken = token;
        session.refreshToken = refreshToken;
        session.userId = user.id;
        await session.save();

        return NextResponse.json(res.data);
    } catch (error: unknown) {
        return handleTryCatchError(error);
    }
}
