"use client";

import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/common/forms/form";
import { Input } from "@/common/forms/input";
import { Button } from "@/common/buttons/button";
import { Switch } from "@/common/forms/switch";
import { useModalStore } from "@/shared/stores/DynamicModalStore";
import { useCreateStore, useUpdateStore } from "../hooks/useStores";
import type { CreateStoreInput } from "../services/storesService";
import { Loader2 } from "lucide-react";
import { SingleImageUpload } from "@/shared/components/SingleImageUpload";

interface StoreFormProps {
  store?: any;
}

export default function StoreForm({ store }: StoreFormProps) {
  const isEditing = !!store;
  const closeModal = useModalStore((state) => state.closeModal);
  const { mutateAsync: createStore, isPending: isCreating } = useCreateStore();
  const { mutateAsync: updateStore, isPending: isUpdating } = useUpdateStore();

  const isPending = isCreating || isUpdating;

  const form = useForm<CreateStoreInput>({
    defaultValues: {
      name: store?.name || "",
      nameAr: store?.nameAr || "",
      address: store?.address || "",
      phone: store?.phone || "",
      email: store?.email || "",
      active: store?.active ?? true,
      taxNumber: store?.taxNumber || "",
      logoUrl: store?.logoUrl || "",
      currency: store?.currency || "",
    },
  });

  const onSubmit = async (values: CreateStoreInput) => {
    if (isEditing) {
      await updateStore({ id: store.id, input: values });
    } else {
      await createStore(values);
    }
    closeModal();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <SingleImageUpload
          value={form.watch("logoUrl") || null}
          onChange={(val) => form.setValue("logoUrl", val, { shouldValidate: true, shouldDirty: true })}
          label="Store Logo"
          description="Upload store logo (JPEG, PNG)."
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name (English)</FormLabel>
                <FormControl><Input placeholder="Main Store" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="nameAr"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name (Arabic)</FormLabel>
                <FormControl><Input placeholder="المتجر الرئيسي" {...field} className="text-right" /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl><Input placeholder="+1234567890" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl><Input placeholder="store@example.com" type="email" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl><Input placeholder="123 Commerce St" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="active"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel>Active Status</FormLabel>
                <p className="text-[10px] text-muted-foreground">Is this store currently operational?</p>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2 pt-4 border-t border-border mt-4">
          <Button type="button" variant="outline" onClick={() => closeModal()} disabled={isPending}>
            Cancel
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            {isEditing ? "Update Store" : "Create Store"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
