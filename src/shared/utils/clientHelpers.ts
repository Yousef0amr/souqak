import { NextResponse } from "next/server";
import { AxiosError } from "axios";
import z from "zod";

export const getPasswordRules = [
    {
        label: "At least 8 characters",
        test: (pw: string) => pw.length >= 8,
    },
    {
        label: "Includes one lowercase letter",
        test: (pw: string) => /[a-z]/.test(pw),
    },
    {
        label: "Includes one uppercase letter",
        test: (pw: string) => /[A-Z]/.test(pw),
    },
    {
        label: "Includes one number",
        test: (pw: string) => /\d/.test(pw),
    },
    {
        label: "Includes one special character",
        test: (pw: string) => /[!@#$%^&*(),.?":{}|<>]/.test(pw),
    },
];

export const reFormateServerErrorValidation = ({
    validationRef,
}: {
    validationRef: { error: { format: () => Record<string, { _errors: string[] }> } };
}) => {
    if (validationRef?.error) {
        const formattedErrors = validationRef?.error?.format();
        const errorResponse = Object?.keys(formattedErrors)?.reduce(
            (acc: Record<string, string[]>, key) => {
                acc[key] = formattedErrors[key]?._errors;
                return acc;
            },
            {},
        );

        return errorResponse;
    }
};

export function validateRequest(schema: z.ZodSchema, data: unknown) {
    const result = schema.safeParse(data);

    if (!result.success) {
        const errorResponse = reFormateServerErrorValidation({ validationRef: result });

        return {
            ok: false as const,
            response: NextResponse.json(
                {
                    status: 422,
                    success: false,
                    errors: errorResponse,
                },
                { status: 422 },
            ),
        };
    }

    return { ok: true as const };
}

export function transformToSelectOptions<T extends Record<string, unknown> | string>(
    data: T[],
    config?: UseSelectOptionsConfig<T>,
): SelectOption[] {
    return data?.map((item) => {
        return {
            label: config ? String(item[config?.labelKey]) : String(item),
            value: config ? String(item[config?.valueKey]) : String(item),
        };
    });
}

export function handleTryCatchError(error: unknown) {
    if (error instanceof AxiosError) {
        if (!error.response) {
            if (error.code === "ECONNABORTED") {
                return NextResponse.json(
                    {
                        success: false,
                        status: 504,
                        message: "Request timeout. Please try again.",
                    },
                    { status: 504 },
                );
            }

            if (error.code === "ERR_CANCELED") {
                return NextResponse.json(
                    {
                        success: false,
                        status: 499,
                        message: "Request was cancelled",
                    },
                    { status: 499 },
                );
            }

            return NextResponse.json(
                {
                    success: false,
                    status: 503,
                    message: "Service unavailable. Please try again later.",
                },
                { status: 503 },
            );
        }

        const {
            status,
            success,
            errors,
            ...rest
        }: ApiFailedResponseDto<{ [key: string]: string[] }> = error?.response.data;
        return NextResponse.json(
            {
                success,
                status,
                errors,
                ...rest,
            },
            { status },
        );
    }

    if (error instanceof Error) {
        return NextResponse.json(
            {
                success: false,
                status: 500,
                errors: [error.message],
            },
            { status: 500 },
        );
    }

    return NextResponse.json(
        {
            success: false,
            status: 500,
            message: "Unexpected server error",
        },
        { status: 500 },
    );
}

export function isApiSuccess<T, E>(res: ApiResult<T, E>): res is ApiSuccessResponseDto<T> {
    return (res as ApiSuccessResponseDto<T>).success;
}

export function extractCookieValue(cookie: string) {
    return cookie.split(";")[0].split("=")[1];
}

export const formatDate = (date?: string | null): string | null => {
    if (!date) return null;

    try {
        return new Date(date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        });
    } catch {
        return null;
    }
};

export function shortTimeAgo(dateString: string) {
    const now = Date.now();
    const past = new Date(dateString).getTime();
    const diff = Math.floor((now - past) / 1000); // seconds

    if (diff < 60) return `${diff}s ago`;

    const minutes = Math.floor(diff / 60);
    if (minutes < 60) return `${minutes}m ago`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;

    const days = Math.floor(hours / 24);
    if (days < 30) return `${days}d ago`;

    const months = Math.floor(days / 30);
    if (months < 12) return `${months}mo ago`;

    const years = Math.floor(months / 12);
    return `${years}y ago`;
}
