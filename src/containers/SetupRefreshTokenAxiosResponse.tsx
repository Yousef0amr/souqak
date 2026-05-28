"use client";

import { setupAxiosInterceptors } from "@/config/axiosInstance";
import { AuthService } from "@/modules/auth";
import { useEffect } from "react";

let isAxiosSetup = false;

const SetupRefreshTokenAxiosResponse = () => {
  useEffect(() => {
    if (!isAxiosSetup) {
      setupAxiosInterceptors(async () => {
        // Calls /api/auth/refresh (BFF) → reads session → refreshes tokens → saves to session
        await AuthService.refreshTokenViaApi();
      });
      isAxiosSetup = true;
    }
  }, []);

  return <></>;
};

export default SetupRefreshTokenAxiosResponse;
