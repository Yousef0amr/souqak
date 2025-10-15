"use client"

import { Plus, Trash2, Upload } from "lucide-react"
import { Button } from "@/common/buttons/button"
import { Input } from "@/common/forms/input"
import { FormFieldWrapper } from "@/common/forms/fields/FormFieldWrapper"
import ButtonWithIconLabel from "@/common/buttons/button-icon-label"

export default function VariantInfoSection({ control }: { control: any }) {
    return (
        <div className="flex flex-col gap-2 ">
            {/* Variant Controls */}
            <div className="flex justify-between flex-wrap gap-2 mb-1  border-b-1 p-1">
                <h2 className="text-lg font-semibold ">Variant Information</h2>
                <ButtonWithIconLabel
                    icon={<Plus />}
                    btnclassName="min-w-10 rounded-md bg-secondary border-none"
                />
            </div>
            {/* Variant Details */}
            <div className="flex flex-col sm:flex-row gap-2">
                <FormFieldWrapper name="variant_sku" label="Variant SKU" control={control}>
                    {(field) => <Input placeholder="Variant SKU" {...field} />}
                </FormFieldWrapper>
                <FormFieldWrapper name="color" label="Color" control={control}>
                    {(field) => <Input placeholder="Color" {...field} />}
                </FormFieldWrapper>
            </div>

            {/* Pricing */}
            <div className="flex flex-col sm:flex-row gap-2">
                <FormFieldWrapper name="costPrice" label="Cost Price" control={control}>
                    {(field) => <Input type="number" placeholder="0.00" {...field} />}
                </FormFieldWrapper>

                <FormFieldWrapper name="retailPrice" label="Retail Price" control={control}>
                    {(field) => <Input type="number" placeholder="0.00" {...field} />}
                </FormFieldWrapper>
            </div>

            {/* Other Info */}
            <div className="flex flex-col sm:flex-row gap-2">
                <FormFieldWrapper name="size" label="Size" control={control}>
                    {(field) => <Input placeholder="Size" {...field} />}
                </FormFieldWrapper>
                <FormFieldWrapper name="barcode" label="Barcode" control={control}>
                    {(field) => <Input placeholder="Barcode" {...field} />}
                </FormFieldWrapper>
            </div>

            <div className="flex gap-1  border-2 bg-secondary border-dashed rounded-lg p-4 items-center justify-center">
                <p className="text-xs text-muted-foreground">Upload Images</p>
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => alert("Open file picker")}
                >
                    <Upload className="h-8 w-8 text-muted-foreground" />
                </Button>
            </div>
        </div>
    )
}
