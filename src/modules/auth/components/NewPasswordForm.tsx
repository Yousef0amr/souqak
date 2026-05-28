"use client";

import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "@/common/forms/form";
import DefaultButton from "@/common/buttons/DefaultButton";
import { LoaderCircle, AlertCircle, CheckCircle2 } from "lucide-react";
import AuthFormBox from "./shared/AuthFormBox";
import PasswordField from "./shared/PasswordField";
import useResetPassword from "../hooks/useResetPassword";

const schema = z
  .object({
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((v) => v.newPassword === v.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof schema>;

const NewPasswordForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const { resetPassword, isLoading, error, isSuccess } = useResetPassword();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { newPassword: "", confirmPassword: "" },
  });

  if (isSuccess) {
    return (
      <AuthFormBox>
        <div className="flex flex-col items-center gap-4 py-4 text-center">
          <div className="rounded-full bg-green-100 dark:bg-green-950 p-3">
            <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          <div className="space-y-1">
            <p className="font-semibold text-foreground">Password updated!</p>
            <p className="text-sm text-muted-foreground">
              Your password has been changed. You can now sign in with your new password.
            </p>
          </div>
        </div>
      </AuthFormBox>
    );
  }

  return (
    <AuthFormBox>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((v) => resetPassword({ token, newPassword: v.newPassword }))}
          className="space-y-5"
          noValidate
        >
          <PasswordField control={form.control} name="newPassword" label="New password" />
          <PasswordField
            control={form.control}
            name="confirmPassword"
            label="Confirm password"
            placeholder="Repeat your new password"
          />

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
            {isLoading ? "Saving..." : "Set new password"}
          </DefaultButton>
        </form>
      </Form>
    </AuthFormBox>
  );
};

export default NewPasswordForm;
