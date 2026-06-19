"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/common/buttons/button";
import { Input } from "@/common/forms/input";
import { useModalStore } from "@/shared/stores/DynamicModalStore";
import { useCreateBrand, useUpdateBrand } from "../../brands/hooks/useBrands";
import type { BrandDto } from "../../brands/types/brand";
import { FormFieldWrapper } from "@/common/forms/fields/FormFieldWrapper";
import { Form } from "@/common/forms/form";
import { Loader2 } from "lucide-react";
import { SingleImageUpload } from "@/shared/components/SingleImageUpload";

const schema = z.object({
  nameEn: z.string().min(1, "Name (English) is required"),
  nameAr: z.string().optional(),
  description: z.string().optional(),
  image: z.any().optional(), // File | string | null
});
type FormData = z.infer<typeof schema>;

export default function BrandForm({ brand }: { brand?: BrandDto }) {
  const { closeModal } = useModalStore();
  const createMutation = useCreateBrand();
  const updateMutation = useUpdateBrand();

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { nameEn: "", nameAr: "", description: "", image: null },
  });

  const { control, handleSubmit, setValue, formState: { isSubmitting }, watch } = form;

  useEffect(() => {
    if (brand) {
      setValue("nameEn", brand.nameEn || "");
      setValue("nameAr", brand.nameAr || "");
      setValue("description", brand.descriptionEn || "");
      setValue("image", brand.logoUrl || null);
    }
  }, [brand, setValue]);

  const onSubmit = async (data: FormData) => {
    try {
      const payload = {
        request: {
          nameEn: data.nameEn,
          nameAr: data.nameAr || "",
          descriptionEn: data.description || "",
          active: true,
          image: data.image,
        }
      };
      if (brand && brand.id) {
        await updateMutation.mutateAsync({ id: brand.id, command: payload });
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
          label="Brand Logo"
          description="Upload brand logo (JPEG, PNG)."
        />

        {/* Brand names — EN + AR side by side */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormFieldWrapper control={control} name="nameEn" label="Brand Name (English)">
            {(field) => <Input placeholder="e.g. Nike, Apple" {...field} />}
          </FormFieldWrapper>
          <FormFieldWrapper control={control} name="nameAr" label="Brand Name (Arabic)" optional>
            {(field) => <Input placeholder="نايكي، أبل" dir="rtl" {...field} />}
          </FormFieldWrapper>
        </div>

        {/* Description — full width */}
        <FormFieldWrapper control={control} name="description" label="Description" optional>
          {(field) => <Input placeholder="Short description of the brand…" {...field} />}
        </FormFieldWrapper>

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
