"use client";

import { useState } from "react";

import type { ForgotPasswordDto } from "../types/auth.types";
import { AuthService } from "../services/AuthService";

const useRequestPasswordReset = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const requestReset = async (dto: ForgotPasswordDto) => {
    setIsLoading(true);
    setError(null);
    try {
      await AuthService.forgotPassword(dto);
      setIsSuccess(true);
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { title?: string } } })?.response?.data?.title ||
        "Something went wrong. Please try again.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return { requestReset, isLoading, error, isSuccess };
};

export default useRequestPasswordReset;
