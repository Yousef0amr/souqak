"use client"

import { FormFieldWrapper } from "@/common/forms/fields/FormFieldWrapper"
import { Input } from "@/common/forms/input"
import { Textarea } from "@/common/shared/textarea"
import CustomSelect from "@/common/forms/CustomSelect"
import ButtonWithIconLabel from "@/common/buttons/button-icon-label"
import { Plus, Trash2 } from "lucide-react"

export default function ProductInfoSection({ control }: { control: any }) {
    return (
        <div className="flex flex-col gap-2">
            {/* Product Controls */}
            <div className="flex justify-between flex-wrap gap-2 mb-1  border-b-1 p-1">
                <h2 className="text-lg font-semibold ">Product Information</h2>
                <ButtonWithIconLabel
                    icon={<Plus />}
                    btnclassName="min-w-10 rounded-md bg-secondary border-none"
                />
            </div>
            {/* Row 1 */}
            <div className="flex flex-col sm:flex-row gap-2">
                <FormFieldWrapper name="name" label="Name" control={control}>
                    {(field) => <Input placeholder="Product Name" {...field} />}
                </FormFieldWrapper>

                <FormFieldWrapper name="department" label="Department" control={control}>
                    {(field) => (
                        <CustomSelect
                            options={[
                                { value: "shoes", label: "Shoes" },
                                { value: "apparel", label: "Apparel" },
                                { value: "accessories", label: "Accessories" },
                            ]}
                            {...field}
                        />
                    )}
                </FormFieldWrapper>
            </div>

            {/* Row 2 */}
            <div className="flex flex-col sm:flex-row gap-2">
                <FormFieldWrapper name="sku" label="SKU" control={control}>
                    {(field) => <Input placeholder="Enter SKU" {...field} />}
                </FormFieldWrapper>

                <FormFieldWrapper name="brand" label="Brand" control={control}>
                    {(field) => (
                        <CustomSelect
                            options={[
                                { value: "nike", label: "Nike" },
                                { value: "adidas", label: "Adidas" },
                                { value: "puma", label: "Puma" },
                            ]}
                            {...field}
                        />
                    )}
                </FormFieldWrapper>
            </div>

            {/* Row 3 */}
            <div className="flex flex-col sm:flex-row gap-2">
                <FormFieldWrapper name="category" label="Category" control={control}>
                    {(field) => (
                        <CustomSelect
                            options={[
                                { value: "shoes", label: "Shoes" },
                                { value: "apparel", label: "Apparel" },
                                { value: "accessories", label: "Accessories" },
                            ]}
                            {...field}
                        />
                    )}
                </FormFieldWrapper>

                <FormFieldWrapper name="subcategory" label="Subcategory" control={control}>
                    {(field) => (
                        <CustomSelect
                            options={[
                                { value: "men", label: "Men" },
                                { value: "women", label: "Women" },
                                { value: "kids", label: "Kids" },
                            ]}
                            {...field}
                        />
                    )}
                </FormFieldWrapper>
            </div>

            {/* Description */}
            <FormFieldWrapper name="description" label="Description" control={control}>
                {(field) => (
                    <Textarea
                        placeholder="Product Description"
                        className="w-full resize-none overflow-x-hidden break-words whitespace-pre-wrap"
                        {...field}
                    />
                )}
            </FormFieldWrapper>


        </div>
    )
}
