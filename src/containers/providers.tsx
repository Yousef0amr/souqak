"use client";

import React, { useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient as defaultQueryClient } from "@/lib/api/queryClient";
import { Toaster } from "sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => defaultQueryClient);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster richColors position="top-right" />
    </QueryClientProvider>
  );
}
