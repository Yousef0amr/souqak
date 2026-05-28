"use client";

import { useState } from "react";

import type { ResetPasswordDto } from "../types/auth.types";
import { AuthService } from "../services/AuthService";

const useResetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const resetPassword = async (dto: ResetPasswordDto) => {
    setIsLoading(true);
    setError(null);
    try {
      await AuthService.resetPassword(dto);
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

  return { resetPassword, isLoading, error, isSuccess };
};

export default useResetPassword;
