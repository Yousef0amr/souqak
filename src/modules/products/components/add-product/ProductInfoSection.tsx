"use client";

import { Controller, UseFormReturn } from "react-hook-form";
import { FormFieldWrapper } from "@/common/forms/fields/FormFieldWrapper";
import { Input } from "@/common/forms/input";
import { Textarea } from "@/common/shared/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/common/forms/select";
import { FormLabel } from "@/common/forms/form";
import { useCategories, useUnits, useTaxes } from "@/modules/settings";
import { useBrandsList } from "@/modules/brands/hooks/useBrands";
import type { CreateProductInput } from "../../services/productsService";
import { Tag, Package, BarChart3, DollarSign, Layers } from "lucide-react";

// ─── Section heading ──────────────────────────────────────────────────────────
function SectionHeading({ icon: Icon, title }: { icon: React.ComponentType<{ className?: string }>; title: string }) {
  return (
    <div className="flex items-center gap-2 pb-2 border-b border-border/40">
      <Icon className="h-4 w-4 text-primary" />
      <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">{title}</span>
    </div>
  );
}

// ─── Select field helper ──────────────────────────────────────────────────────
function SelectField({
  control,
  name,
  label,
  placeholder,
  options,
}: {
  control: any;
  name: string;
  label: string;
  placeholder: string;
  options: { id: string; label: string }[];
}) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className="space-y-1.5 w-full">
          <FormLabel>{label}</FormLabel>
          <Select onValueChange={field.onChange} value={field.value || undefined}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options.length === 0 && (
                <SelectItem value="__none" disabled>No options available</SelectItem>
              )}
              {options.map((opt) => (
                <SelectItem key={opt.id} value={opt.id}>{opt.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    />
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ProductInfoSection({ form }: { form: UseFormReturn<CreateProductInput> }) {
  const { control } = form;
  const { data: categories = [] } = useCategories();
  const { data: brands = [] } = useBrandsList();
  const { data: units = [] } = useUnits();
  const { data: taxes = [] } = useTaxes();

  return (
    <div className="flex flex-col gap-6">

      {/* ── 1. Basic Info ────────────────────────────── */}
      <section className="space-y-4">
        <SectionHeading icon={Package} title="Basic Info" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormFieldWrapper name="nameEn" label="Name (English)" control={control}>
            {(field) => <Input placeholder="Product name in English" {...field} />}
          </FormFieldWrapper>
          <FormFieldWrapper name="nameAr" label="Name (Arabic)" control={control}>
            {(field) => <Input placeholder="اسم المنتج" dir="rtl" {...field} />}
          </FormFieldWrapper>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormFieldWrapper name="descriptionEn" label="Description (English)" control={control}>
            {(field) => <Textarea placeholder="English description…" rows={3} {...field} />}
          </FormFieldWrapper>
          <FormFieldWrapper name="descriptionAr" label="Description (Arabic)" control={control}>
            {(field) => <Textarea placeholder="الوصف بالعربي…" dir="rtl" rows={3} {...field} />}
          </FormFieldWrapper>
        </div>
      </section>

      {/* ── 2. Identification ────────────────────────── */}
      <section className="space-y-4">
        <SectionHeading icon={Tag} title="Identification" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <FormFieldWrapper name="sku" label="SKU" control={control}>
            {(field) => <Input placeholder="PROD-001" className="uppercase tracking-widest" {...field} />}
          </FormFieldWrapper>
          <FormFieldWrapper name="barcode" label="Barcode" control={control}>
            {(field) => <Input placeholder="1234567890" {...field} />}
          </FormFieldWrapper>
          <SelectField
            control={control} name="taxId" label="Tax"
            placeholder="Select tax"
            options={taxes.map((t) => ({ id: t.id, label: `${t.name} (${t.rate}%)` }))}
          />
        </div>
      </section>

      {/* ── 3. Classification ────────────────────────── */}
      <section className="space-y-4">
        <SectionHeading icon={Layers} title="Classification" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <SelectField
            control={control} name="categoryId" label="Category"
            placeholder="Select category"
            options={categories.map((c) => ({ id: c.id, label: c.nameEn || c.nameAr }))}
          />
          <SelectField
            control={control} name="brandId" label="Brand"
            placeholder="Select brand (optional)"
            options={brands.map((b) => ({ id: b.id || "", label: b.nameEn || b.nameAr || "Unnamed Brand" }))}
          />
        </div>
      </section>

      {/* ── 4. Units & Conversion ────────────────────── */}
      <section className="space-y-4">
        <SectionHeading icon={BarChart3} title="Units & Conversion" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <SelectField
            control={control} name="baseUnitId" label="Base Unit"
            placeholder="Select base unit"
            options={units.map((u) => ({ id: u.id, label: u.nameEn || u.nameAr }))}
          />
          <SelectField
            control={control} name="purchaseUnitId" label="Purchase Unit"
            placeholder="Same as base"
            options={units.map((u) => ({ id: u.id, label: u.nameEn || u.nameAr }))}
          />
          <FormFieldWrapper name="conversionFactor" label="Conversion Factor" control={control}>
            {(field) => <Input type="number" step="0.01" min="0" placeholder="1" {...field} />}
          </FormFieldWrapper>
        </div>
      </section>

      {/* ── 5. Pricing & Inventory ───────────────────── */}
      <section className="space-y-4">
        <SectionHeading icon={DollarSign} title="Pricing & Inventory" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormFieldWrapper name="costPrice" label="Cost Price" control={control}>
            {(field) => (
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground pointer-events-none">$</span>
                <Input type="number" step="0.01" min="0" placeholder="0.00" className="pl-7" {...field} />
              </div>
            )}
          </FormFieldWrapper>
          <FormFieldWrapper name="sellPrice" label="Sell Price" control={control}>
            {(field) => (
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground pointer-events-none">$</span>
                <Input type="number" step="0.01" min="0" placeholder="0.00" className="pl-7" {...field} />
              </div>
            )}
          </FormFieldWrapper>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormFieldWrapper name="stockQty" label="Initial Stock Qty" control={control}>
            {(field) => <Input type="number" min="0" placeholder="0" {...field} />}
          </FormFieldWrapper>
          <FormFieldWrapper name="reorderLevel" label="Reorder Level" control={control}>
            {(field) => <Input type="number" min="0" placeholder="10" {...field} />}
          </FormFieldWrapper>
        </div>
      </section>
    </div>
  );
}
