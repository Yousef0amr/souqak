"use client";

import React, { useState } from "react";
import { useProductsList } from "@/modules/products";
import { useCreateOrder, type Order } from "@/modules/orders";
import { Button } from "@/common/buttons/button";
import { Input } from "@/common/forms/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/common/shared/card";
import { useRouter } from "@/config/i18n/navigation";
import { Search, Plus, Minus, ShoppingCart, Trash2, ArrowLeft } from "lucide-react";

interface CartItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
}

export function CreateOrderForm() {
  const { data: products = [] } = useProductsList();
  const { mutate: createOrder, isPending } = useCreateOrder();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<"Cash" | "Card">("Cash");

  const filteredProducts = products.filter(
    (p: any) =>
      p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sku?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (product: any) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.productId === product.id);
      if (existing) {
        return prev.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prev,
        {
          productId: product.id,
          name: product.nameEn || product.name || "",
          quantity: 1,
          price: product.sellPrice ?? 0,
        },
      ];
    });
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.productId === productId
            ? { ...item, quantity: Math.max(1, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.productId !== productId));
  };

  const total = cart.reduce((sum, item) => sum + item.quantity * item.price, 0);
  const itemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    createOrder(
      {
        customerName: "Walk-in Customer",
        total,
        itemsCount,
        paymentMethod,
        items: cart.map((item) => ({
          productId: item.productId,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
      } as any,
      { onSuccess: () => { setCart([]); router.push("/dashboard/orders"); } }
    );
  };

  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={() => router.push("/dashboard/orders")}>
        <ArrowLeft className="h-4 w-4 mr-2" /> Back to Orders
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Product Search
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative mb-4">
                <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                <Input
                  placeholder="Search products by name or SKU..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[400px] overflow-y-auto">
                {filteredProducts.slice(0, 20).map((product: any) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between p-3 rounded-lg border cursor-pointer hover:bg-accent transition-colors"
                    onClick={() => addToCart(product)}
                  >
                    <div>
                      <p className="font-medium text-sm">{product.nameEn || product.name}</p>
                      <p className="text-xs text-muted-foreground">
                        ${product.sellPrice?.toFixed(2)} | Stock: {product.stockQty ?? 0}
                      </p>
                    </div>
                    <Button size="icon" variant="ghost" className="h-8 w-8">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Cart ({itemsCount} items)
              </CardTitle>
            </CardHeader>
            <CardContent>
              {cart.length === 0 && (
                <p className="text-sm text-muted-foreground">Cart is empty. Select products above.</p>
              )}
              {cart.length > 0 && (
                <div className="space-y-3 max-h-[300px] overflow-y-auto">
                  {cart.map((item) => (
                    <div key={item.productId} className="flex items-center justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{item.name}</p>
                        <p className="text-xs text-muted-foreground">${item.price.toFixed(2)} each</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button size="icon" variant="outline" className="h-7 w-7" onClick={() => updateQuantity(item.productId, -1)}>
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                        <Button size="icon" variant="outline" className="h-7 w-7" onClick={() => updateQuantity(item.productId, 1)}>
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <p className="text-sm font-semibold w-16 text-right">
                        ${(item.quantity * item.price).toFixed(2)}
                      </p>
                      <Button size="icon" variant="ghost" className="h-7 w-7 text-destructive" onClick={() => removeFromCart(item.productId)}>
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-muted-foreground">Payment Method</label>
                <div className="flex gap-2">
                  <Button
                    variant={paymentMethod === "Cash" ? "default" : "outline"}
                    className="flex-1"
                    onClick={() => setPaymentMethod("Cash")}
                  >
                    Cash
                  </Button>
                  <Button
                    variant={paymentMethod === "Card" ? "default" : "outline"}
                    className="flex-1"
                    onClick={() => setPaymentMethod("Card")}
                  >
                    Card
                  </Button>
                </div>
              </div>
              <Button
                className="w-full"
                size="lg"
                disabled={cart.length === 0 || isPending}
                onClick={handleCheckout}
              >
                {isPending ? "Processing..." : `Complete Sale - $${total.toFixed(2)}`}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
