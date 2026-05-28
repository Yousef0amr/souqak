"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/common/buttons/button";
import { Input } from "@/common/forms/input";
import { useModalStore } from "@/shared/stores/DynamicModalStore";
import { useAddCategory, useUpdateCategory } from "../hooks/useSettings";
import type { Category } from "../services/settingsService";
import { FormFieldWrapper } from "@/common/forms/fields/FormFieldWrapper";
import { Form } from "@/common/forms/form";
import { Loader2 } from "lucide-react";

const schema = z.object({
  nameEn: z.string().min(1, "Name (English) is required"),
  nameAr: z.string().optional(),
  code: z.string().min(1, "Code is required"),
});
type FormData = z.infer<typeof schema>;

export default function CategoryForm({ category }: { category?: Category }) {
  const { closeModal } = useModalStore();
  const createMutation = useAddCategory();
  const updateMutation = useUpdateCategory();

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { nameEn: "", nameAr: "", code: "" },
  });

  const { control, handleSubmit, setValue, formState: { isSubmitting } } = form;

  useEffect(() => {
    if (category) {
      setValue("nameEn", category.nameEn);
      setValue("nameAr", category.nameAr || "");
      setValue("code", category.code);
    }
  }, [category, setValue]);

  const onSubmit = async (data: FormData) => {
    try {
      const payload = { ...data, nameAr: data.nameAr || "" };
      if (category) {
        await updateMutation.mutateAsync({ id: category.id, category: payload });
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
        {/* Name row — EN + AR side by side */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormFieldWrapper control={control} name="nameEn" label="Name (English)">
            {(field) => <Input placeholder="e.g. Home Kitchen" {...field} />}
          </FormFieldWrapper>
          <FormFieldWrapper control={control} name="nameAr" label="Name (Arabic)" optional>
            {(field) => <Input placeholder="أدوات المطبخ" dir="rtl" {...field} />}
          </FormFieldWrapper>
        </div>

        {/* Code — short field, left-aligned */}
        <div className="max-w-[180px]">
          <FormFieldWrapper control={control} name="code" label="Category Code">
            {(field) => <Input placeholder="KIT" className="uppercase tracking-widest" {...field} />}
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
