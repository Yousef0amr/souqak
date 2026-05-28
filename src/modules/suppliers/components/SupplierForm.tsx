"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/common/buttons/button";
import { Input } from "@/common/forms/input";
import { useModalStore } from "@/shared/stores/DynamicModalStore";
import { useCreateSupplier, useUpdateSupplier } from "../hooks/useSuppliers";
import type { Supplier } from "../services/suppliersService";
import { FormFieldWrapper } from "@/common/forms/fields/FormFieldWrapper";
import { Form } from "@/common/forms/form";
import { Globe, MapPin, Mail, Phone, Building2, Hash, User, Loader2 } from "lucide-react";

const supplierSchema = z.object({
  nameEn: z.string().min(2, "Name (English) must be at least 2 characters"),
  nameAr: z.string().optional(),
  email: z.string().email("Invalid email address").or(z.literal("")),
  phone: z.string().min(5, "Invalid phone number").or(z.literal("")),
  address: z.string().optional(),
  taxNumber: z.string().optional(),
  contactPerson: z.string().optional(),
  website: z.string().optional(),
});

export type SupplierFormData = z.infer<typeof supplierSchema>;

export default function SupplierForm({ supplier }: { supplier?: Supplier }) {
  const { closeModal } = useModalStore();
  const { mutateAsync: createSupplier } = useCreateSupplier();
  const { mutateAsync: updateSupplier } = useUpdateSupplier();

  const form = useForm<SupplierFormData>({
    resolver: zodResolver(supplierSchema),
    defaultValues: {
      nameEn: "", nameAr: "", email: "", phone: "",
      address: "", taxNumber: "", contactPerson: "", website: "",
    },
  });

  const { control, handleSubmit, reset, setValue, formState: { isSubmitting } } = form;

  useEffect(() => {
    if (supplier) {
      setValue("nameEn", supplier.nameEn);
      setValue("nameAr", supplier.nameAr || "");
      setValue("email", supplier.email || "");
      setValue("phone", supplier.phone || "");
      setValue("address", supplier.address || "");
      setValue("taxNumber", supplier.taxNumber || "");
      setValue("contactPerson", supplier.contactPerson || "");
      setValue("website", supplier.website || "");
    }
  }, [supplier, setValue]);

  const onSubmit = async (data: SupplierFormData) => {
    try {
      const payload = {
        ...data,
        nameAr: data.nameAr || "", email: data.email || "",
        phone: data.phone || "", address: data.address || "",
        taxNumber: data.taxNumber || "", contactPerson: data.contactPerson || "",
        website: data.website || "",
      };
      if (supplier) {
        await updateSupplier({ id: supplier.id, payload });
      } else {
        await createSupplier(payload);
      }
      reset();
      closeModal();
    } catch (err) {
      console.error("Failed to save supplier:", err);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 py-1">

        {/* ── Company Identity ─────────────────────── */}
        <fieldset className="space-y-4">
          <legend className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-2">
            <Building2 className="h-3.5 w-3.5" /> Company
          </legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormFieldWrapper control={control} name="nameEn" label="Supplier Name (English)">
              {(field) => <Input placeholder="Acme Corp" {...field} />}
            </FormFieldWrapper>
            <FormFieldWrapper control={control} name="nameAr" label="Supplier Name (Arabic)" optional>
              {(field) => <Input placeholder="شركة أكمي" dir="rtl" {...field} />}
            </FormFieldWrapper>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormFieldWrapper control={control} name="taxNumber" label="Tax Registration No." optional>
              {(field) => (
                <div className="relative">
                  <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                  <Input placeholder="TAX-12345" className="pl-9 uppercase" {...field} />
                </div>
              )}
            </FormFieldWrapper>
            <FormFieldWrapper control={control} name="contactPerson" label="Contact Person" optional>
              {(field) => (
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                  <Input placeholder="John Doe" className="pl-9" {...field} />
                </div>
              )}
            </FormFieldWrapper>
          </div>
        </fieldset>

        {/* ── Contact Details ──────────────────────── */}
        <fieldset className="space-y-4 pt-3 border-t border-border/40">
          <legend className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-2">
            <Mail className="h-3.5 w-3.5" /> Contact
          </legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormFieldWrapper control={control} name="email" label="Email Address">
              {(field) => (
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                  <Input type="email" placeholder="example@mail.com" className="pl-9" {...field} />
                </div>
              )}
            </FormFieldWrapper>
            <FormFieldWrapper control={control} name="phone" label="Phone Number">
              {(field) => (
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                  <Input placeholder="+1 555 000 0000" className="pl-9" {...field} />
                </div>
              )}
            </FormFieldWrapper>
          </div>
          <FormFieldWrapper control={control} name="website" label="Website URL" optional>
            {(field) => (
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                <Input placeholder="https://example.com" className="pl-9" {...field} />
              </div>
            )}
          </FormFieldWrapper>
          <FormFieldWrapper control={control} name="address" label="Business Address" optional>
            {(field) => (
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                <Input placeholder="123 Warehouses St, Suite 4B…" className="pl-9" {...field} />
              </div>
            )}
          </FormFieldWrapper>
        </fieldset>

        <div className="flex justify-end gap-2 pt-2 border-t border-border/40">
          <Button type="button" variant="outline" onClick={closeModal}>Cancel</Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Saving…</>
              : supplier ? "Update Supplier" : "Register Supplier"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
