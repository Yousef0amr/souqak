"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/common/buttons/button";
import { Input } from "@/common/forms/input";
import { useModalStore } from "@/shared/stores/DynamicModalStore";
import { useAddCategory, useUpdateCategory } from "../index";
import type { Category } from "../types/category";
import { FormFieldWrapper } from "@/common/forms/fields/FormFieldWrapper";
import { Form } from "@/common/forms/form";
import { Loader2 } from "lucide-react";
import { SingleImageUpload } from "@/shared/components/SingleImageUpload";

const schema = z.object({
  nameEn: z.string().min(1, "Name (English) is required"),
  nameAr: z.string().optional(),
  code: z.string().min(1, "Code is required"),
  iconName: z.string().optional(),
  color: z.string().optional(),
  image: z.any().optional(),
});
type FormData = z.infer<typeof schema>;

export default function CategoryForm({ category }: { category?: Category }) {
  const { closeModal } = useModalStore();
  const createMutation = useAddCategory();
  const updateMutation = useUpdateCategory();

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { nameEn: "", nameAr: "", code: "", iconName: "", color: "#000000", image: null },
  });

  const { control, handleSubmit, setValue, watch, formState: { isSubmitting } } = form;

  useEffect(() => {
    if (category) {
      setValue("nameEn", category.nameEn);
      setValue("nameAr", category.nameAr || "");
      setValue("code", category.code);
      setValue("iconName", category.iconName || "");
      setValue("color", category.color || "#000000");
      setValue("image", category.imageUrl || null);
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
        <SingleImageUpload
          value={watch("image")}
          onChange={(val) => setValue("image", val, { shouldValidate: true, shouldDirty: true })}
          label="Category Image"
          description="Upload category image (JPEG, PNG)."
        />

        {/* Name row — EN + AR side by side */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormFieldWrapper control={control} name="nameEn" label="Name (English)">
            {(field) => <Input placeholder="e.g. Home Kitchen" {...field} />}
          </FormFieldWrapper>
          <FormFieldWrapper control={control} name="nameAr" label="Name (Arabic)" optional>
            {(field) => <Input placeholder="أدوات المطبخ" dir="rtl" {...field} />}
          </FormFieldWrapper>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <FormFieldWrapper control={control} name="code" label="Category Code">
            {(field) => <Input placeholder="KIT" className="uppercase tracking-widest" {...field} />}
          </FormFieldWrapper>
          <FormFieldWrapper control={control} name="iconName" label="Icon Name" optional>
            {(field) => <Input placeholder="e.g. box, star" {...field} />}
          </FormFieldWrapper>
          <FormFieldWrapper control={control} name="color" label="Color" optional>
            {(field) => (
              <div className="flex items-center gap-2">
                <Input type="color" className="w-12 h-10 p-1 cursor-pointer" {...field} />
                <Input placeholder="#000000" className="flex-1" {...field} />
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
