"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "@/common/forms/form";
import { Input } from "@/common/forms/input";
import { FormFieldWrapper } from "@/common/forms/fields/FormFieldWrapper";
import DefaultButton from "@/common/buttons/DefaultButton";
import { LoaderCircle, AlertCircle, CheckCircle2, Mail } from "lucide-react";
import AuthFormBox from "./shared/AuthFormBox";
import useRequestPasswordReset from "../hooks/useRequestPasswordReset";

const schema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type FormValues = z.infer<typeof schema>;

const PasswordRecoveryForm = () => {
  const { requestReset, isLoading, error, isSuccess } = useRequestPasswordReset();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "" },
  });

  if (isSuccess) {
    return (
      <AuthFormBox>
        <div className="flex flex-col items-center gap-4 py-4 text-center">
          <div className="rounded-full bg-green-100 dark:bg-green-950 p-3">
            <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          <div className="space-y-1">
            <p className="font-semibold text-foreground">Check your email</p>
            <p className="text-sm text-muted-foreground">
              We&apos;ve sent a password reset link to your email address.
            </p>
          </div>
        </div>
      </AuthFormBox>
    );
  }

  return (
    <AuthFormBox>
      <Form {...form}>
        <form onSubmit={form.handleSubmit((v) => requestReset(v))} className="space-y-5" noValidate>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <Mail className="h-5 w-5 text-primary" />
          </div>

          <FormFieldWrapper control={form.control} name="email" label="Email address">
            {(field) => (
              <Input
                id="recovery-email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                {...field}
              />
            )}
          </FormFieldWrapper>

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
            {isLoading ? "Sending..." : "Send reset link"}
          </DefaultButton>
        </form>
      </Form>
    </AuthFormBox>
  );
};

export default PasswordRecoveryForm;
