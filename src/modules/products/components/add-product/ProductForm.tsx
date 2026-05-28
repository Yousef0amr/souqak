"use client";

import { useForm } from "react-hook-form";
import { Form } from "@/common/forms/form";
import ProductInfoSection from "./ProductInfoSection";
import { Button } from "@/common/buttons/button";
import { Loader2, Save } from "lucide-react";
import { useCreateProduct } from "../../hooks/useProducts";
import { useModalStore } from "@/shared/stores/DynamicModalStore";
import type { CreateProductInput } from "../../services/productsService";

export default function ProductForm() {
  const form = useForm<CreateProductInput>({
    defaultValues: {
      nameEn: "",
      nameAr: "",
      descriptionEn: "",
      descriptionAr: "",
      sku: "",
      barcode: "",
      categoryId: "",
      brandId: null,
      baseUnitId: "",
      purchaseUnitId: null,
      conversionFactor: 1,
      taxId: "",
      costPrice: 0,
      sellPrice: 0,
      stockQty: 0,
      reorderLevel: 10,
      active: true,
      imageUrl: "",
    },
  });

  const { handleSubmit } = form;
  const { mutateAsync: createProduct, isPending } = useCreateProduct();
  const closeModal = useModalStore((state) => state.closeModal);

  const onSubmit = async (values: CreateProductInput) => {
    await createProduct(values);
    closeModal();
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <ProductInfoSection form={form} />

        <div className="flex justify-end gap-2 pt-2 border-t">
          <Button type="button" variant="outline" onClick={() => closeModal()}>
            Cancel
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
            {isPending ? "Saving..." : "Save Product"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
