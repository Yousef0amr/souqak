"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/common/buttons/button";
import { Input } from "@/common/forms/input";
import { useModalStore } from "@/shared/stores/DynamicModalStore";
import { useCreateUnitConversion, useUpdateUnitConversion } from "../hooks/useUnitConversions";
import type { UnitConversion } from "../services/unitConversionsService";
import { FormFieldWrapper } from "@/common/forms/fields/FormFieldWrapper";
import { Form } from "@/common/forms/form";

const schema = z.object({
  fromUnitId: z.string().min(1, "Required"),
  toUnitId: z.string().min(1, "Required"),
  factor: z.number().positive("Must be positive"),
});
type FormData = z.infer<typeof schema>;

export default function UnitConversionForm({ conversion }: { conversion?: UnitConversion }) {
  const { closeModal } = useModalStore();
  const createMutation = useCreateUnitConversion();
  const updateMutation = useUpdateUnitConversion();

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { fromUnitId: "", toUnitId: "", factor: 1 }
  });

  const { control, handleSubmit, reset, setValue, formState: { isSubmitting } } = form;

  useEffect(() => {
    if (conversion) {
      setValue("fromUnitId", conversion.fromUnitId);
      setValue("toUnitId", conversion.toUnitId);
      setValue("factor", conversion.factor);
    }
  }, [conversion, setValue]);

  const onSubmit = async (data: FormData) => {
    try {
      if (conversion) {
        await updateMutation.mutateAsync({ id: conversion.id, payload: data });
      } else {
        await createMutation.mutateAsync(data);
      }
      reset();
      closeModal();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-2">
        <div className="grid grid-cols-2 gap-4">
          <FormFieldWrapper control={control} name="fromUnitId" label="From Unit ID">
            {(field) => <Input placeholder="kg" {...field} />}
          </FormFieldWrapper>
          <FormFieldWrapper control={control} name="toUnitId" label="To Unit ID">
            {(field) => <Input placeholder="lb" {...field} />}
          </FormFieldWrapper>
        </div>
        
        <FormFieldWrapper control={control} name="factor" label="Conversion Factor">
          {(field) => (
            <Input 
              type="number" 
              step="0.0001" 
              placeholder="2.20462" 
              {...field} 
              onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)} 
            />
          )}
        </FormFieldWrapper>
        
        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="outline" onClick={closeModal}>Cancel</Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : conversion ? "Update" : "Create Conversion"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
