"use client";

import { useForm } from "react-hook-form";
import { Form } from "@/common/forms/form";
import ProductInfoSection from "./ProductInfoSection";
import VariantInfoSection from "./VariantInfoSection";
import ButtonWithIconLabel from "@/common/buttons/button-icon-label";
import { Plus, Trash2 } from "lucide-react";
import { useAddProductStore } from "../../stores/useAddProductStore";
import { Button } from "@/common/buttons/button";

export default function ProductForm() {
  const form = useForm({
    defaultValues: {
      name: "",
      category: "",
      sku: "",
      description: "",
      department: "",
      brand: "",
      subcategory: "",
      variant_sku: "",
      color: "",
      size: "",
      barcode: "",
      costPrice: "",
      retailPrice: "",
    },
  });

  const { reset, getValues, handleSubmit, control } = form;

  const { addProduct, products } = useAddProductStore();

  const onSubmit = (values: any) => {
    const productData = {
      brand: values.brand.value as string,
      category: values.category.value as string,
      department: values.department.value as string,
      subcategory: values.subcategory.value as string,
      name: values.name as string,
      sku: values.sku as string,
      description: values.description as string,
      variant: {
        id: values.id as string,
        variant_sku: values.variant_sku as string,
        color: values.color as string,
        size: values.size as string,
        barcode: values.barcode as string,
        costPrice: values.costPrice as number,
        retailPrice: values.retailPrice as number,
      },
    };

    console.log("Form Submitted", { ...values });

    addProduct(productData);

    reset();
  };

  const clearAll = () => reset();

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        {/* Product Section */}
        <ProductInfoSection control={control} />
        {/* Variant Section */}
        <VariantInfoSection control={control} />

        <div className="flex flex-wrap gap-2 justify-between items-center rounded-md px-3 py-2 bg-secondary">
          <ButtonWithIconLabel
            icon={<Trash2 />}
            label="Reset Product"
            onClick={clearAll}
            btnclassName="flex-1  rounded-md h-10 text-red-600"
          />
          <Button
            type="submit"
            className="flex-1 rounded-md h-10 bg-primary text-primary-foreground"
          >
            <Plus />
            Add Product
          </Button>
        </div>
      </form>
    </Form>
  );
}
