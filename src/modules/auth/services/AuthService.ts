import { axiosInstance } from "@/config/axiosInstance";
import type {
  LoginDto,
  SignupDto,
  ResetPasswordDto,
  ForgotPasswordDto,
  LoginResponse,
  ApiResult,
  UserDto,
} from "../types/auth.types";

export class AuthService {
  static ENDPOINT = {
    login: "/Auth/login",
    signup: "/Auth/signup",
    refresh: "/Auth/refresh-token",
    logout: "/Auth/logout",
    profile: "/Auth/profile",
    forgotPassword: "/Auth/forgot-password",
    resetPassword: "/Auth/reset-password",
  };

  // ──────────────────────────────────────────────
  // BFF routes (called from the browser → Next.js API routes)
  // ──────────────────────────────────────────────

  /** Login via the Next.js BFF — stores tokens in iron-session server-side */
  static async loginViaApi(dto: LoginDto): Promise<LoginResponse> {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dto),
    });
    const data = await res.json();
    if (!res.ok) throw data;
    return data as LoginResponse;
  }

  /** Refresh tokens via the Next.js BFF — reads + updates iron-session server-side */
  static async refreshTokenViaApi(): Promise<void> {
    const res = await fetch("/api/auth/refresh", { method: "POST" });
    if (!res.ok) {
      const data = await res.json();
      throw data;
    }
  }

  /** Logout via the Next.js BFF — destroys the iron-session cookie */
  static async logoutViaApi(): Promise<void> {
    await fetch("/api/auth/logout", { method: "POST" });
  }

  // ──────────────────────────────────────────────
  // Direct backend calls (used in server actions / API routes via axiosBackendInstance)
  // ──────────────────────────────────────────────

  static async signup(dto: SignupDto): Promise<ApiResult<string>> {
    const { data } = await axiosInstance.post<ApiResult<string>>(this.ENDPOINT.signup, dto);
    return data;
  }

  static async getProfile(): Promise<ApiResult<UserDto>> {
    const { data } = await axiosInstance.get<ApiResult<UserDto>>(this.ENDPOINT.profile);
    return data;
  }

  static async forgotPassword(dto: ForgotPasswordDto): Promise<ApiResult<string>> {
    const { data } = await axiosInstance.post<ApiResult<string>>(this.ENDPOINT.forgotPassword, dto);
    return data;
  }

  static async resetPassword(dto: ResetPasswordDto): Promise<ApiResult<string>> {
    const { data } = await axiosInstance.post<ApiResult<string>>(this.ENDPOINT.resetPassword, dto);
    return data;
  }
}
