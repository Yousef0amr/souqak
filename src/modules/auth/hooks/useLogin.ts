"use client";

import { useState } from "react";
import { useRouter } from "@/config/i18n/navigation";

import { useUserStore } from "../stores/useUserStore";
import type { LoginDto } from "../types/auth.types";
import { AuthService } from "../services/AuthService";

const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const setUser = useUserStore((state) => state.setUser);
  const router = useRouter();

  const login = async (dto: LoginDto) => {
    setIsLoading(true);
    setError(null);
    try {
      // Goes to /api/auth/login (BFF) → saves tokens in iron-session
      const res = await AuthService.loginViaApi(dto);

      if (res.user) {
        setUser(res.user);
        const channel = new BroadcastChannel("auth");
        channel.postMessage("login");
        channel.close();
        router.replace("/dashboard");
      }
    } catch (err: unknown) {
      const message =
        (err as { errors?: { general?: string[] } })?.errors?.general?.[0] ||
        (err as { message?: string })?.message ||
        "Invalid email or password. Please try again.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};

export default useLogin;
