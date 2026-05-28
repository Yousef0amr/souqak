"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/common/buttons/button";
import { Input } from "@/common/forms/input";
import { useModalStore } from "@/shared/stores/DynamicModalStore";
import { useCreateCustomer, useUpdateCustomer } from "../hooks/useCustomers";
import type { Customer } from "../services/customersService";
import { FormFieldWrapper } from "@/common/forms/fields/FormFieldWrapper";
import { Form } from "@/common/forms/form";
import { Mail, Phone, MapPin, Hash, Loader2, User } from "lucide-react";

const customerSchema = z.object({
  nameEn: z.string().min(2, "Name must be at least 2 characters"),
  nameAr: z.string().optional(),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  phone: z.string().min(5, "Invalid phone number").optional().or(z.literal("")),
  address: z.string().optional(),
  taxNumber: z.string().optional(),
});

export type CustomerFormData = z.infer<typeof customerSchema>;

export default function CustomerForm({ customer }: { customer?: Customer }) {
  const { closeModal } = useModalStore();
  const { mutateAsync: createCustomer } = useCreateCustomer();
  const { mutateAsync: updateCustomer } = useUpdateCustomer();

  const form = useForm<CustomerFormData>({
    resolver: zodResolver(customerSchema),
    defaultValues: { nameEn: "", nameAr: "", email: "", phone: "", address: "", taxNumber: "" },
  });

  const { control, handleSubmit, reset, setValue, formState: { isSubmitting } } = form;

  useEffect(() => {
    if (customer) {
      setValue("nameEn", customer.nameEn);
      setValue("nameAr", customer.nameAr || "");
      setValue("email", customer.email || "");
      setValue("phone", customer.phone || "");
      setValue("address", customer.address || "");
      setValue("taxNumber", customer.taxNumber || "");
    }
  }, [customer, setValue]);

  const onSubmit = async (data: CustomerFormData) => {
    try {
      if (customer) {
        await updateCustomer({ id: customer.id, data });
      } else {
        await createCustomer(data);
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

        {/* ── Identity ─────────────────────────────────── */}
        <fieldset className="space-y-4">
          <legend className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-2">
            <User className="h-3.5 w-3.5" /> Identity
          </legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormFieldWrapper control={control} name="nameEn" label="Full Name (English)">
              {(field) => <Input placeholder="e.g. John Smith" {...field} />}
            </FormFieldWrapper>
            <FormFieldWrapper control={control} name="nameAr" label="Full Name (Arabic)" optional>
              {(field) => <Input placeholder="جون سميث" dir="rtl" {...field} />}
            </FormFieldWrapper>
          </div>
        </fieldset>

        {/* ── Contact ─────────────────────────────────── */}
        <fieldset className="space-y-4 pt-3 border-t border-border/40">
          <legend className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-2">
            <Mail className="h-3.5 w-3.5" /> Contact
          </legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormFieldWrapper control={control} name="email" label="Email Address" optional>
              {(field) => (
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                  <Input type="email" placeholder="john@example.com" className="pl-9" {...field} />
                </div>
              )}
            </FormFieldWrapper>
            <FormFieldWrapper control={control} name="phone" label="Phone Number" optional>
              {(field) => (
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                  <Input placeholder="+1 555 000 0000" className="pl-9" {...field} />
                </div>
              )}
            </FormFieldWrapper>
          </div>
        </fieldset>

        {/* ── Additional ──────────────────────────────── */}
        <fieldset className="space-y-4 pt-3 border-t border-border/40">
          <legend className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-2">
            <Hash className="h-3.5 w-3.5" /> Additional
          </legend>
          <FormFieldWrapper control={control} name="address" label="Address" optional>
            {(field) => (
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                <Input placeholder="123 Main St, City…" className="pl-9" {...field} />
              </div>
            )}
          </FormFieldWrapper>
          <div className="max-w-[220px]">
            <FormFieldWrapper control={control} name="taxNumber" label="Tax Number" optional>
              {(field) => (
                <div className="relative">
                  <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                  <Input placeholder="TX-123456" className="pl-9 uppercase" {...field} />
                </div>
              )}
            </FormFieldWrapper>
          </div>
        </fieldset>

        <div className="flex justify-end gap-2 pt-2 border-t border-border/40">
          <Button type="button" variant="outline" onClick={closeModal}>Cancel</Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Saving…</>
              : customer ? "Update Account" : "Save Account"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
