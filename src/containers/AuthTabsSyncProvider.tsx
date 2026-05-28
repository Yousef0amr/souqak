"use client";

import { useRouter } from "@/config/i18n/navigation";
import { useUserStore } from "@/modules/auth/stores/useUserStore";
import { useEffect } from "react";

const AuthTabsSyncProvider = () => {
  const router = useRouter();
  const resetUser = useUserStore((state) => state.resetUser);

  useEffect(() => {
    const channel = new BroadcastChannel("auth");

    channel.onmessage = (event: MessageEvent) => {
      if (event.data === "logout") {
        resetUser();
        router.replace("/login");
      }
      if (event.data === "login") {
        router.replace("/dashboard");
      }
    };

    return () => channel.close();
  }, [resetUser, router]);

  return <></>;
};

export default AuthTabsSyncProvider;
