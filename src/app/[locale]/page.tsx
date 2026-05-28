"use client";

import { useEffect } from "react";
import { useRouter } from "@/config/i18n/navigation";
import { useUserStore } from "@/modules/auth/stores/useUserStore";

const Page = () => {
  const router = useRouter();
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    } else {
      router.replace("/dashboard");
    }
  }, [router, user]);

  return null;
};

export default Page;
