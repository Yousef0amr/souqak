import React from "react";
import { cn } from "@/config/shadcnUtils"; // Optional: for conditional class names

const DotsLoading = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex space-x-1 justify-center items-center", className)}>
      <span className="sr-only">Loading...</span>
      <div className="size-0.5 bg-primary/50 rounded-full animate-[var(--animate-dot-bounce)] [animation-delay:-0.2s]" />
      <div className="size-0.5 bg-primary/50  rounded-full animate-[var(--animate-dot-bounce)] [animation-delay:-0.1s]" />
      <div className="size-0.5 bg-primary/50 rounded-full animate-[var(--animate-dot-bounce)]" />
    </div>
  );
};

export default DotsLoading;
