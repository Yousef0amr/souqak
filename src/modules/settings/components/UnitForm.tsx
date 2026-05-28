"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/common/buttons/button";
import { Input } from "@/common/forms/input";
import { useModalStore } from "@/shared/stores/DynamicModalStore";
import { useAddUnit, useUpdateUnit } from "../hooks/useSettings";
import type { Unit } from "../services/settingsService";
import { FormFieldWrapper } from "@/common/forms/fields/FormFieldWrapper";
import { Form } from "@/common/forms/form";
import { Loader2 } from "lucide-react";

const schema = z.object({
  nameEn: z.string().min(1, "Name (English) is required"),
  nameAr: z.string().optional(),
  abbreviation: z.string().min(1, "Abbreviation is required"),
});
type FormData = z.infer<typeof schema>;

export default function UnitForm({ unit }: { unit?: Unit }) {
  const { closeModal } = useModalStore();
  const createMutation = useAddUnit();
  const updateMutation = useUpdateUnit();

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { nameEn: "", nameAr: "", abbreviation: "" },
  });

  const { control, handleSubmit, setValue, formState: { isSubmitting } } = form;

  useEffect(() => {
    if (unit) {
      setValue("nameEn", unit.nameEn);
      setValue("nameAr", unit.nameAr || "");
      setValue("abbreviation", unit.abbreviation);
    }
  }, [unit, setValue]);

  const onSubmit = async (data: FormData) => {
    try {
      const payload = { ...data, nameAr: data.nameAr || "" };
      if (unit) {
        await updateMutation.mutateAsync({ id: unit.id, unit: payload });
      } else {
        await createMutation.mutateAsync(payload);
      }
      closeModal();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 py-1">
        {/* Names side by side */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormFieldWrapper control={control} name="nameEn" label="Unit Name (English)">
            {(field) => <Input placeholder="e.g. Liter" {...field} />}
          </FormFieldWrapper>
          <FormFieldWrapper control={control} name="nameAr" label="Unit Name (Arabic)" optional>
            {(field) => <Input placeholder="لتر" dir="rtl" {...field} />}
          </FormFieldWrapper>
        </div>

        {/* Abbreviation — short field */}
        <div className="max-w-[180px]">
          <FormFieldWrapper control={control} name="abbreviation" label="Abbreviation">
            {(field) => <Input placeholder="L" className="uppercase tracking-widest" {...field} />}
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
