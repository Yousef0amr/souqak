"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "@/common/forms/form";
import { Input } from "@/common/forms/input";
import { FormFieldWrapper } from "@/common/forms/fields/FormFieldWrapper";
import DefaultButton from "@/common/buttons/DefaultButton";
import { LoaderCircle, AlertCircle } from "lucide-react";
import Link from "next/link";
import PasswordField from "./shared/PasswordField";
import AuthFormBox from "./shared/AuthFormBox";
import useLogin from "../hooks/useLogin";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const { login, isLoading, error } = useLogin();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  return (
    <AuthFormBox>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(login)} className="space-y-5" noValidate>
          <FormFieldWrapper control={form.control} name="email" label="Email address">
            {(field) => (
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                {...field}
              />
            )}
          </FormFieldWrapper>

          <div className="space-y-1.5">
            <PasswordField control={form.control} name="password" label="Password" />
            <div className="flex justify-end">
              <Link
                href="/password-recovery"
                className="text-xs font-medium text-primary hover:text-primary/80 transition-colors"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          {/* Global error */}
          {error && (
            <div className="flex items-center gap-2.5 rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2.5 text-sm text-destructive">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <DefaultButton
            type="submit"
            loading={isLoading}
            loader={() => <LoaderCircle className="animate-spin h-4 w-4" />}
            className="w-full"
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </DefaultButton>
        </form>
      </Form>
    </AuthFormBox>
  );
};

export default LoginForm;
