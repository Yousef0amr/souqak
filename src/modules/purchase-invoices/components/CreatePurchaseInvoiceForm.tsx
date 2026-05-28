"use client";

import React, { useState } from "react";
import { useProductsList } from "@/modules/products/hooks/useProducts";
import { useSuppliers } from "@/modules/suppliers/hooks/useSuppliers";
import { useCreatePurchaseInvoice } from "../hooks/usePurchaseInvoices";
import { Button } from "@/common/buttons/button";
import { Input } from "@/common/forms/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/common/shared/card";
import { Search, Plus, Trash2, Calendar, ShoppingBag, DollarSign } from "lucide-react";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/common/forms/select";

interface CartItem {
  id: string; // productId
  name: string;
  quantity: number;
  unitCost: number;
}

interface CreatePurchaseInvoiceFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export function CreatePurchaseInvoiceForm({ onSuccess, onCancel }: CreatePurchaseInvoiceFormProps) {
  const { data: suppliers = [] } = useSuppliers();
  const { data: products = [] } = useProductsList();
  const createMutation = useCreatePurchaseInvoice();

  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().split("T")[0]);
  const [dueDate, setDueDate] = useState(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]);
  const [taxRate, setTaxRate] = useState<number>(15);
  const [shippingCost, setShippingCost] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [notes, setNotes] = useState("");
  const [updateStockOnApproval, setUpdateStockOnApproval] = useState(true);

  const [cart, setCart] = useState<CartItem[]>([]);
  const [productSearch, setProductSearch] = useState("");

  const filteredProducts = products.filter((p: any) => {
    const search = productSearch.toLowerCase();
    const nameMatch = p.name ? p.name.toLowerCase().includes(search) : false;
    const skuMatch = p.sku ? p.sku.toLowerCase().includes(search) : false;
    return nameMatch || skuMatch;
  });

  const addToCart = (product: any) => {
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart([
        ...cart,
        {
          id: product.id,
          name: product.name,
          quantity: 1,
          unitCost: product.price ? product.price * 0.7 : 10, // heuristic default wholesale cost
        },
      ]);
    }
    toast.success(`${product.name} added to purchase order`);
  };

  const updateCartQty = (id: string, qty: number) => {
    if (qty <= 0) return;
    setCart(cart.map((item) => (item.id === id ? { ...item, quantity: qty } : item)));
  };

  const updateCartCost = (id: string, cost: number) => {
    if (cost < 0) return;
    setCart(cart.map((item) => (item.id === id ? { ...item, unitCost: cost } : item)));
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const subtotal = cart.reduce((sum, item) => sum + item.quantity * item.unitCost, 0);
  const taxAmount = (subtotal * taxRate) / 100;
  const total = subtotal + taxAmount + shippingCost;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSupplier) {
      toast.error("Please select a supplier");
      return;
    }
    if (cart.length === 0) {
      toast.error("Please add at least one product to the purchase invoice");
      return;
    }

    createMutation.mutate(
      {
        supplierId: selectedSupplier,
        supplierInvoiceNumber: invoiceNumber,
        invoiceDate: new Date(invoiceDate).toISOString(),
        dueDate: new Date(dueDate).toISOString(),
        taxRate,
        shippingCost,
        paymentMethod,
        notes,
        updateStockOnApproval,
        items: cart.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
          unitCost: item.unitCost,
        })),
      },
      {
        onSuccess: () => {
          onSuccess();
        },
      }
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-indigo-500" />
              1. Add Products to Purchase Order
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Search className="h-4 w-4 text-muted-foreground absolute left-3 top-3" />
              <Input
                placeholder="Search catalog by name or SKU..."
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                className="pl-9"
              />
            </div>

            {productSearch && (
              <div className="border rounded-md divide-y max-h-40 overflow-y-auto bg-background shadow-inner">
                {filteredProducts.map((p: any) => (
                  <div
                    key={p.id}
                    className="flex justify-between items-center p-2.5 hover:bg-muted cursor-pointer transition-colors"
                    onClick={() => {
                      addToCart(p);
                      setProductSearch("");
                    }}
                  >
                    <div>
                      <p className="text-xs font-semibold">{p.name}</p>
                      <p className="text-[10px] text-muted-foreground">SKU: {p.sku}</p>
                    </div>
                    <Button size="sm" variant="ghost" className="h-7 text-xs font-bold text-indigo-500">
                      + Add
                    </Button>
                  </div>
                ))}
              </div>
            )}

            {cart.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground border-2 border-dashed rounded-lg">
                <ShoppingBag className="h-10 w-10 mx-auto opacity-30 mb-2" />
                <p className="text-sm">No products in cart</p>
                <p className="text-xs opacity-70">Search and add items to purchase from supplier</p>
              </div>
            ) : (
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-muted text-[11px] font-bold text-muted-foreground border-b uppercase">
                      <th className="p-3">Item Details</th>
                      <th className="p-3 w-24">Qty</th>
                      <th className="p-3 w-32">Unit Cost ($)</th>
                      <th className="p-3 w-28 text-right">Total ($)</th>
                      <th className="p-3 w-12 text-center"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {cart.map((item) => (
                      <tr key={item.id} className="text-xs">
                        <td className="p-3 font-medium">{item.name}</td>
                        <td className="p-3">
                          <Input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => updateCartQty(item.id, parseInt(e.target.value) || 1)}
                            className="h-8 w-16 text-center text-xs p-1"
                          />
                        </td>
                        <td className="p-3">
                          <Input
                            type="number"
                            step="0.01"
                            value={item.unitCost}
                            onChange={(e) => updateCartCost(item.id, parseFloat(e.target.value) || 0)}
                            className="h-8 w-24 text-xs p-1"
                          />
                        </td>
                        <td className="p-3 text-right font-semibold">
                          ${(item.quantity * item.unitCost).toFixed(2)}
                        </td>
                        <td className="p-3 text-center">
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-7 w-7 text-red-500 hover:bg-red-50"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div>
        <Card className="sticky top-6">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Calendar className="h-5 w-5 text-indigo-500" />
              2. Invoice & Supplier details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <span className="text-xs font-semibold text-muted-foreground">Select Supplier</span>
                <Select value={selectedSupplier} onValueChange={setSelectedSupplier}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="-- Choose Supplier --" />
                  </SelectTrigger>
                  <SelectContent>
                    {suppliers.map((s) => (
                      <SelectItem key={s.id} value={s.id}>
                        {s.nameEn}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-semibold text-muted-foreground">Supplier Invoice No.</span>
                <Input
                  placeholder="e.g. INV-90210"
                  value={invoiceNumber}
                  onChange={(e) => setInvoiceNumber(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-muted-foreground">Invoice Date</span>
                  <Input type="date" value={invoiceDate} onChange={(e) => setInvoiceDate(e.target.value)} />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-muted-foreground">Due Date</span>
                  <Input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-muted-foreground">Tax Rate (%)</span>
                  <Input
                    type="number"
                    value={taxRate}
                    onChange={(e) => setTaxRate(parseInt(e.target.value) || 0)}
                  />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-muted-foreground">Shipping ($)</span>
                  <Input
                    type="number"
                    value={shippingCost}
                    onChange={(e) => setShippingCost(parseFloat(e.target.value) || 0)}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-semibold text-muted-foreground">Payment Method</span>
                <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Payment Method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Cash">Cash</SelectItem>
                    <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                    <SelectItem value="Check">Check</SelectItem>
                    <SelectItem value="Credit Card">Credit Card</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-semibold text-muted-foreground">Internal Notes</span>
                <textarea
                  rows={2}
                  placeholder="Write details, e.g., parts batch A3"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>

              <div className="flex items-center gap-2 py-1">
                <input
                  type="checkbox"
                  id="updateStockCheckbox"
                  checked={updateStockOnApproval}
                  onChange={(e) => setUpdateStockOnApproval(e.target.checked)}
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor="updateStockCheckbox" className="text-xs font-medium text-muted-foreground cursor-pointer">
                  Auto Update stock on Approval
                </label>
              </div>

              <div className="border-t pt-4 space-y-2 text-xs">
                <div className="flex justify-between font-medium">
                  <span className="text-muted-foreground">Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span className="text-muted-foreground">VAT ({taxRate}%):</span>
                  <span>${taxAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span className="text-muted-foreground">Shipping:</span>
                  <span>${shippingCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-sm border-t pt-2">
                  <span>Grand Total:</span>
                  <span className="text-indigo-600">${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="button" variant="outline" className="flex-1" onClick={onCancel}>
                  Cancel
                </Button>
                <Button type="submit" className="flex-1" disabled={createMutation.isPending}>
                  {createMutation.isPending ? "Submitting..." : "Save Purchase Invoice"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
