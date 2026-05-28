"use client";

import { useForm } from "react-hook-form";
import { useUpdateProduct } from "../../hooks/useProducts";
import { useModalStore } from "@/shared/stores/DynamicModalStore";
import { Input } from "@/common/forms/input";
import { Textarea } from "@/common/shared/textarea";
import { Button } from "@/common/buttons/button";
import { Save } from "lucide-react";

interface EditProductFormProps {
  productId?: string;
  initialData?: any;
}

export default function EditProductForm({ productId, initialData }: EditProductFormProps) {
  const { mutate: updateProduct, isPending } = useUpdateProduct();
  const closeModal = useModalStore((state) => state.closeModal);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      nameEn: initialData?.nameEn || initialData?.name || "",
      nameAr: initialData?.nameAr || "",
      sku: initialData?.sku || "",
      barcode: initialData?.barcode || "",
      descriptionEn: initialData?.descriptionEn || initialData?.description || "",
      descriptionAr: initialData?.descriptionAr || "",
      costPrice: initialData?.costPrice ?? initialData?.variant?.costPrice ?? 0,
      sellPrice: initialData?.sellPrice ?? initialData?.variant?.retailPrice ?? 0,
      stockQty: initialData?.stockQty ?? initialData?.variant?.stock ?? 0,
    },
  });

  const onSubmit = (values: any) => {
    updateProduct(
      {
        id: productId || initialData?.id,
        input: {
          nameEn: values.nameEn,
          nameAr: values.nameAr,
          sku: values.sku,
          barcode: values.barcode,
          descriptionEn: values.descriptionEn,
          descriptionAr: values.descriptionAr,
          costPrice: Number(values.costPrice),
          sellPrice: Number(values.sellPrice),
          stockQty: Number(values.stockQty),
        },
      },
      { onSuccess: () => closeModal() }
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-semibold text-muted-foreground">Name (EN)</label>
          <Input {...register("nameEn")} placeholder="English name" />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-semibold text-muted-foreground">Name (AR)</label>
          <Input {...register("nameAr")} placeholder="Arabic name" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-semibold text-muted-foreground">SKU</label>
          <Input {...register("sku")} placeholder="SKU" />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-semibold text-muted-foreground">Barcode</label>
          <Input {...register("barcode")} placeholder="Barcode" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-semibold text-muted-foreground">Description (EN)</label>
          <Textarea {...register("descriptionEn")} placeholder="English description" />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-semibold text-muted-foreground">Description (AR)</label>
          <Textarea {...register("descriptionAr")} placeholder="Arabic description" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-semibold text-muted-foreground">Cost Price</label>
          <Input type="number" step="0.01" {...register("costPrice", { valueAsNumber: true })} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-semibold text-muted-foreground">Sell Price</label>
          <Input type="number" step="0.01" {...register("sellPrice", { valueAsNumber: true })} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-semibold text-muted-foreground">Stock</label>
          <Input type="number" {...register("stockQty", { valueAsNumber: true })} />
        </div>
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="outline" onClick={closeModal}>Cancel</Button>
        <Button type="submit" disabled={isPending}>
          <Save className="h-4 w-4 mr-2" />
          {isPending ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}
