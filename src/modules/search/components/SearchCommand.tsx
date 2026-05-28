"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "@/config/i18n/navigation";
import { useQuery } from "@tanstack/react-query";
import { productsService } from "@/modules/products/services/productsService";
import { ordersService } from "@/modules/orders/services/ordersService";
import { customersService } from "@/modules/customers/services/customersService";
import { useSearchStore } from "@/modules/search/stores/useSearchStore";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/common/shared/command";
import { Package, ShoppingCart, Users } from "lucide-react";

export function SearchCommand() {
  const router = useRouter();
  const open = useSearchStore((s) => s.open);
  const setOpen = useSearchStore((s) => s.setOpen);
  const toggle = useSearchStore((s) => s.toggle);
  const [query, setQuery] = useState("");

  const { data: products } = useQuery({
    queryKey: ["products", "search-all"],
    queryFn: () => productsService.getAll({ limit: 100 }),
    enabled: open,
  });

  const { data: orders } = useQuery({
    queryKey: ["orders", "search-all"],
    queryFn: () => ordersService.getAll(),
    enabled: open,
  });

  const { data: customers } = useQuery({
    queryKey: ["customers", "search-all"],
    queryFn: () => customersService.getAll(),
    enabled: open,
  });

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggle();
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [toggle]);

  const runSearch = useCallback(
    (path: string) => {
      setOpen(false);
      setQuery("");
      router.push(path);
    },
    [router, setOpen]
  );

  const q = query.toLowerCase();
  const matchedProducts = (products ?? []).filter(
    (p: any) =>
      p.name?.toLowerCase().includes(q) ||
      p.sku?.toLowerCase().includes(q) ||
      p.brand?.toLowerCase().includes(q)
  );
  const matchedOrders = (orders ?? []).filter(
    (o: any) =>
      o.orderNumber?.toLowerCase().includes(q) ||
      o.customerName?.toLowerCase().includes(q)
  );
  const matchedCustomers = (customers ?? []).filter(
    (c: any) =>
      c.name?.toLowerCase().includes(q) ||
      c.email?.toLowerCase().includes(q) ||
      c.phone?.toLowerCase().includes(q)
  );

  const hasResults =
    matchedProducts.length > 0 ||
    matchedOrders.length > 0 ||
    matchedCustomers.length > 0;

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput
        placeholder="Search products, orders, customers..."
        value={query}
        onValueChange={setQuery}
      />
      <CommandList>
        <CommandEmpty>
          {query.length > 0 ? "No results found." : "Start typing to search..."}
        </CommandEmpty>

        {matchedProducts.length > 0 && (
          <CommandGroup heading="Products">
            {matchedProducts.slice(0, 6).map((p: any) => (
              <CommandItem
                key={`product-${p.id}`}
                value={`product-${p.name}-${p.sku}`}
                onSelect={() => runSearch(`/dashboard/products?edit=${p.id}`)}
              >
                <Package className="h-4 w-4" />
                <span>{p.name}</span>
                <span className="text-xs text-muted-foreground ml-2">{p.sku}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        {matchedOrders.length > 0 && (
          <CommandGroup heading="Orders">
            {matchedOrders.slice(0, 6).map((o: any) => (
              <CommandItem
                key={`order-${o.id}`}
                value={`order-${o.orderNumber}-${o.customerName}`}
                onSelect={() => runSearch(`/dashboard/orders/${o.id}`)}
              >
                <ShoppingCart className="h-4 w-4" />
                <span>{o.orderNumber}</span>
                <span className="text-xs text-muted-foreground ml-2">{o.customerName}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        {matchedCustomers.length > 0 && (
          <CommandGroup heading="Customers">
            {matchedCustomers.slice(0, 6).map((c: any) => (
              <CommandItem
                key={`customer-${c.id}`}
                value={`customer-${c.name}-${c.email}`}
                onSelect={() => runSearch(`/dashboard/customers/${c.id}`)}
              >
                <Users className="h-4 w-4" />
                <span>{c.name}</span>
                <span className="text-xs text-muted-foreground ml-2">{c.email}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        {query.length > 0 && !hasResults && (
          <CommandGroup heading="Quick Actions">
            <CommandItem
              value={`create-product`}
              onSelect={() => runSearch("/dashboard/products")}
            >
              <Package className="h-4 w-4" />
              <span>Add new product...</span>
            </CommandItem>
            <CommandItem
              value={`create-customer`}
              onSelect={() => runSearch("/dashboard/customers")}
            >
              <Users className="h-4 w-4" />
              <span>Add new customer...</span>
            </CommandItem>
          </CommandGroup>
        )}
      </CommandList>
    </CommandDialog>
  );
}
