"use client"

import { useState } from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/common/shared/card"
import { Upload } from "lucide-react"
import { Input } from "@/common/forms/input"
import { Label } from "@/common/shared/label"
import { Textarea } from "@/common/shared/textarea"
import { Button } from "@/common/buttons/button"
import CustomSelect from "@/common/forms/CustomSelect"
import { Switch } from "@/common/forms/switch"
import VariantsSection from "./VariantsSection"

export default function ProductForm() {
  const [inStock, setInStock] = useState(true)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
      {/* Left column */}
      <div className="lg:col-span-2 space-y-6">

        {/* Product Details */}
        <Card>
          <CardHeader>
            <CardTitle>Product Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Enter product name" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="sku">SKU</Label>
                <Input id="sku" placeholder="Enter SKU" />
              </div>
              <div>
                <Label htmlFor="barcode">Barcode</Label>
                <Input id="barcode" placeholder="Enter barcode" />
              </div>
            </div>
            <div>
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea id="description" placeholder="Set a description to the product for better visibility." />
            </div>
          </CardContent>
        </Card>

        {/* Product Images */}
        <Card>
          <CardHeader>
            <CardTitle>Product Images</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-2 m-4">
            <Upload className="h-10 w-10 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">Drop your images here</p>
            <p className="text-xs text-muted-foreground mb-3">PNG or JPG (max. 5MB)</p>
            <Button variant="outline">Select images</Button>
          </CardContent>
        </Card>

        <VariantsSection />

      </div>

      {/* Right column */}
      <div className="space-y-6">

        {/* Pricing */}
        <Card>
          <CardHeader>
            <CardTitle>Pricing</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="basePrice">Base Price</Label>
              <Input id="basePrice" placeholder="0.00" type="number" />
            </div>
            <div>
              <Label htmlFor="discountPrice">Discounted Price</Label>
              <Input id="discountPrice" placeholder="0.00" type="number" />
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="tax" />
              <Label htmlFor="tax">Charge tax on this product</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch checked={inStock} onCheckedChange={setInStock} />
              <Label>In stock</Label>
            </div>
          </CardContent>
        </Card>

        {/* Status */}
        <Card>
          <CardHeader>
            <CardTitle>Status</CardTitle>
          </CardHeader>
          <CardContent>
            <CustomSelect options={[{ label: 'Active', value: 'active' }, { label: 'Draft', value: 'draft' }]} />
          </CardContent>
        </Card>

        {/* Categories */}
        <Card>
          <CardHeader>
            <CardTitle>Categories</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <CustomSelect options={[{ label: 'Mobiles', value: 'mobiles' }, { label: 'Laptops', value: 'laptops' }]} />
            <CustomSelect options={[{ label: 'Mobiles', value: 'mobiles' }, { label: 'Laptops', value: 'laptops' }]} />
          </CardContent>
        </Card>

      </div>
    </div>
  )
}
