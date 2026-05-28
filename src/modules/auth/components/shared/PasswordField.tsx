"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/common/forms/input";
import { FormFieldWrapper } from "@/common/forms/fields/FormFieldWrapper";
import type { Control, FieldPath, FieldValues } from "react-hook-form";

interface PasswordFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label?: string;
  placeholder?: string;
}

const PasswordField = <T extends FieldValues>({
  control,
  name,
  label = "Password",
  placeholder = "Enter your password",
}: PasswordFieldProps<T>) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormFieldWrapper control={control} name={name} label={label}>
      {(field) => (
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder={placeholder}
            className="pr-10"
            {...field}
          />
          <button
            type="button"
            tabIndex={-1}
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
      )}
    </FormFieldWrapper>
  );
};

export default PasswordField;
