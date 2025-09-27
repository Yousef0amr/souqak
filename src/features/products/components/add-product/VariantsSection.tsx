"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/common/shared/card"
import { Input } from "@/common/forms/input"
import { Button } from "@/common/buttons/button"
import CustomSelect from "@/common/forms/CustomSelect"
import { X, Plus } from "lucide-react"

export default function VariantsSection() {
    const [variants, setVariants] = useState([
        { option: "", value: "", price: "" },
    ])

    const addVariant = () => {
        setVariants([...variants, { option: "", value: "", price: "" }])
    }

    const removeVariant = (index: number) => {
        setVariants(variants.filter((_, i) => i !== index))
    }

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Variants</CardTitle>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={addVariant}
                    className="flex items-center gap-1"
                >
                    <Plus className="h-4 w-4" />
                    Add Variant
                </Button>
            </CardHeader>

            <CardContent className="space-y-3">
                {variants.map((variant, index) => (
                    <div
                        key={index}
                        className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-center border rounded-md p-3"
                    >
                        {/* Option Select */}
                        <CustomSelect
                            placeholder="Select an option"
                            options={[
                                { label: "Size", value: "size" },
                                { label: "Color", value: "color" },
                            ]}
                        />

                        {/* Value Input */}
                        <Input
                            placeholder="Value"
                            value={variant.value}
                            onChange={(e) => {
                                const newVariants = [...variants]
                                newVariants[index].value = e.target.value
                                setVariants(newVariants)
                            }}
                        />

                        {/* Price Input */}
                        <Input
                            placeholder="Price"
                            type="number"
                            value={variant.price}
                            onChange={(e) => {
                                const newVariants = [...variants]
                                newVariants[index].price = e.target.value
                                setVariants(newVariants)
                            }}
                        />

                        {/* Delete Button */}
                        {variants.length > 1 && (
                            <>
                                {/* Full-width button (mobile) */}
                                <Button
                                    variant="destructive"
                                    onClick={() => removeVariant(index)}
                                    className="sm:hidden w-full flex items-center justify-center gap-1"
                                >
                                    <X className="h-4 w-4" /> Remove
                                </Button>

                                {/* Icon-only button (desktop) */}
                                <Button
                                    variant="destructive"
                                    size="icon"
                                    onClick={() => removeVariant(index)}
                                    className="hidden sm:flex"
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </>
                        )}
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}
