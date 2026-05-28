"use client";

// This file is kept for backwards compatibility.
// The new auth hooks are: useLogin, useLogout (with destructuring)
// Import directly from @/modules/auth instead.

export { default as useLogin } from "./useLogin";
export { default as useLogout } from "./useLogout";
export { default as useRequestPasswordReset } from "./useRequestPasswordReset";
export { default as useResetPassword } from "./useResetPassword";
