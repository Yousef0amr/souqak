"use client";

import { useState } from "react";

import { useUserStore } from "../stores/useUserStore";
import { useQueryClient } from "@tanstack/react-query";
import { AuthService } from "../services/AuthService";

const useLogout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const resetUser = useUserStore((state) => state.resetUser);
  const queryClient = useQueryClient();

  const clearAuthSharedData = () => {
    resetUser();
    queryClient.clear();
    const channel = new BroadcastChannel("auth");
    channel.postMessage("logout");
    channel.close();
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      // Calls /api/auth/logout (BFF) → destroys iron-session cookie
      await AuthService.logoutViaApi();
    } catch {
      // Continue logout regardless of API error
    } finally {
      clearAuthSharedData();
      setIsLoading(false);
    }
  };

  return { logout, isLoading };
};

export default useLogout;
