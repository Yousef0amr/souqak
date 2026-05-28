import { NextRequest, NextResponse } from "next/server";
import { axiosBackendInstance } from "@/config/axiosBackendServer";
import { AxiosError, Method } from "axios";

// This dynamic route catches all requests to /api/proxy/*
// It uses axiosBackendInstance (which automatically attaches the iron-session token)
// to forward the request to the backend and return the response.
async function handleProxy(
    request: NextRequest,
    context: { params: Promise<{ path: string[] }> }
) {
    const { path } = await context.params;
    const endpointPath = path.join("/");
    
    const searchParams = request.nextUrl.searchParams.toString();
    const url = searchParams ? `/${endpointPath}?${searchParams}` : `/${endpointPath}`;

    try {
        const method = request.method as Method;
        let requestBody = undefined;

        // Parse JSON body for methods that support it
        if (["POST", "PUT", "PATCH", "DELETE"].includes(method)) {
            try {
                const text = await request.text();
                if (text) {
                    requestBody = JSON.parse(text);
                }
            } catch (e) {
                // If it fails to parse, we leave requestBody undefined
            }
        }

        const response = await axiosBackendInstance.request({
            url,
            method,
            data: requestBody,
            // Pass through the original request headers if needed, though axiosBackendInstance handles Auth
        });

        return NextResponse.json(response.data);
    } catch (error: any) {
        if (error instanceof AxiosError) {
            return NextResponse.json(
                error.response?.data || { message: error.message },
                { status: error.response?.status || 500 }
            );
        }
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}

export const GET = handleProxy;
export const POST = handleProxy;
export const PUT = handleProxy;
export const DELETE = handleProxy;
export const PATCH = handleProxy;
