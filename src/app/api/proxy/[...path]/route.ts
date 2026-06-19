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
    
    // The swagger client includes '/api' in the generated paths, but our BACKEND_API_URL 
    // already includes '/api'. To avoid '/api/api', we remove the leading 'api' segment.
    const cleanPath = path[0] === 'api' ? path.slice(1) : path;
    const endpointPath = cleanPath.join("/");
    
    const searchParams = request.nextUrl.searchParams.toString();
    const url = searchParams ? `/${endpointPath}?${searchParams}` : `/${endpointPath}`;

    try {
        const method = request.method as Method;
        let requestBody = undefined;

        // Parse request body for methods that support it
        if (["POST", "PUT", "PATCH", "DELETE"].includes(method)) {
            const contentType = request.headers.get("content-type") || "";
            if (contentType.includes("multipart/form-data")) {
                requestBody = await request.formData();
            } else {
                try {
                    const text = await request.text();
                    if (text) {
                        requestBody = JSON.parse(text);
                    }
                } catch (e) {
                    // If it fails to parse, we leave requestBody undefined
                }
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
