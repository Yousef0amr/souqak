"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/common/buttons/button";
import { Input } from "@/common/forms/input";
import { useModalStore } from "@/shared/stores/DynamicModalStore";
import { useCreateExpenseCategory, useUpdateExpenseCategory } from "../hooks/useExpenseCategories";
import type { ExpenseCategory } from "../services/expenseCategoriesService";
import { FormFieldWrapper } from "@/common/forms/fields/FormFieldWrapper";
import { Form } from "@/common/forms/form";
import { Loader2 } from "lucide-react";

const schema = z.object({
  nameEn: z.string().min(2, "Name is required"),
  nameAr: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function ExpenseCategoryForm({ category }: { category?: ExpenseCategory }) {
  const { closeModal } = useModalStore();
  const createMutation = useCreateExpenseCategory();
  const updateMutation = useUpdateExpenseCategory();

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { nameEn: "", nameAr: "" },
  });

  const { control, handleSubmit, reset, setValue, formState: { isSubmitting } } = form;

  useEffect(() => {
    if (category) {
      setValue("nameEn", category.nameEn);
      setValue("nameAr", category.nameAr || "");
    }
  }, [category, setValue]);

  const onSubmit = async (data: FormData) => {
    try {
      const payload = { ...data, nameAr: data.nameAr || "" };
      if (category) {
        await updateMutation.mutateAsync({ id: category.id, payload });
      } else {
        await createMutation.mutateAsync(payload);
      }
      reset();
      closeModal();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 py-1">
        {/* EN + AR side by side */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormFieldWrapper control={control} name="nameEn" label="Category Name (English)">
            {(field) => <Input placeholder="e.g. Utilities" {...field} />}
          </FormFieldWrapper>
          <FormFieldWrapper control={control} name="nameAr" label="Category Name (Arabic)" optional>
            {(field) => <Input placeholder="مرافق" dir="rtl" {...field} />}
          </FormFieldWrapper>
        </div>

        <div className="flex justify-end gap-2 pt-2 border-t border-border/40">
          <Button type="button" variant="outline" onClick={closeModal}>Cancel</Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Saving…</>
              : category ? "Update Category" : "Create Category"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
