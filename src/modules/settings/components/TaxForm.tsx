"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/common/buttons/button";
import { Input } from "@/common/forms/input";
import { useModalStore } from "@/shared/stores/DynamicModalStore";
import { useAddTax, useUpdateTax } from "../hooks/useSettings";
import type { Tax } from "../services/settingsService";
import { FormFieldWrapper } from "@/common/forms/fields/FormFieldWrapper";
import { Form } from "@/common/forms/form";
import { Loader2, Percent } from "lucide-react";

const schema = z.object({
  name: z.string().min(1, "Tax Name is required"),
  rate: z.number().min(0, "Rate must be positive").max(100, "Rate cannot exceed 100"),
});
type FormData = z.infer<typeof schema>;

export default function TaxForm({ tax }: { tax?: Tax }) {
  const { closeModal } = useModalStore();
  const createMutation = useAddTax();
  const updateMutation = useUpdateTax();

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", rate: 0 },
  });

  const { control, handleSubmit, setValue, formState: { isSubmitting } } = form;

  useEffect(() => {
    if (tax) {
      setValue("name", tax.name);
      setValue("rate", tax.rate);
    }
  }, [tax, setValue]);

  const onSubmit = async (data: FormData) => {
    try {
      if (tax) {
        await updateMutation.mutateAsync({ id: tax.id, tax: data });
      } else {
        await createMutation.mutateAsync(data);
      }
      closeModal();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 py-1">
        {/* Tax name + rate side by side — rate gets a constrained width */}
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_140px] gap-4">
          <FormFieldWrapper control={control} name="name" label="Tax Name">
            {(field) => <Input placeholder="e.g. VAT, GST" {...field} />}
          </FormFieldWrapper>

          <FormFieldWrapper control={control} name="rate" label="Rate">
            {(field) => (
              <div className="relative">
                <Input
                  type="number"
                  step="0.01"
                  min={0}
                  max={100}
                  placeholder="15"
                  {...field}
                  onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                  className="pr-9"
                />
                <Percent className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              </div>
            )}
          </FormFieldWrapper>
        </div>

        <div className="flex justify-end gap-2 pt-2 border-t border-border/40">
          <Button type="button" variant="outline" onClick={closeModal}>Cancel</Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Saving…</> : "Save Changes"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
