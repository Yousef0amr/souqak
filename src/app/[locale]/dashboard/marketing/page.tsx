import React from "react";
import { Megaphone, Search, Plus, Ticket } from "lucide-react";
import { Badge } from "@/common/shared/badge";
import { Button } from "@/common/buttons/button";
import { Input } from "@/common/forms/input";

const MOCK_PROMOS = [
  { id: "p1", code: "EID2026", discount: "15% OFF", type: "Percentage", used: 120, limit: 500, status: "Active" },
  { id: "p2", code: "SUMMER50", discount: "$50 OFF", type: "Fixed Amount", used: 84, limit: 100, status: "Active" },
  { id: "p3", code: "WELCOME10", discount: "10% OFF", type: "Percentage", used: 412, limit: 9999, status: "Active" },
  { id: "p4", code: "BLACKFRIDAY", discount: "30% OFF", type: "Percentage", used: 350, limit: 350, status: "Expired" },
];

export default function MarketingPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Marketing Campaigns</h1>
          <p className="text-muted-foreground">
            Create store coupons, track active discount codes, and optimize POS checkout conversions
          </p>
        </div>
        <Button className="flex items-center gap-2 self-start md:self-auto">
          <Plus className="h-4 w-4" /> Create Coupon
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="border bg-card rounded-lg p-4 flex items-center gap-3">
          <div className="p-2 bg-indigo-500/10 rounded-md text-indigo-500">
            <Ticket className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground font-semibold">Active Coupons</p>
            <p className="text-lg font-bold">3 Coupons Live</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2 max-w-sm">
          <Search className="h-4 w-4 text-muted-foreground absolute ml-3" />
          <Input placeholder="Search coupons..." className="pl-9" />
        </div>

        <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/40 border-b border-border">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold text-muted-foreground">Coupon Code</th>
                  <th className="px-6 py-3 text-left font-semibold text-muted-foreground">Discount Value</th>
                  <th className="px-6 py-3 text-left font-semibold text-muted-foreground">Coupon Type</th>
                  <th className="px-6 py-3 text-left font-semibold text-muted-foreground">Redemptions</th>
                  <th className="px-6 py-3 text-left font-semibold text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {MOCK_PROMOS.map((p) => (
                  <tr key={p.id} className="hover:bg-muted/10 transition-colors">
                    <td className="px-6 py-4 font-mono font-semibold text-foreground">{p.code}</td>
                    <td className="px-6 py-4 font-bold text-emerald-600 dark:text-emerald-400">{p.discount}</td>
                    <td className="px-6 py-4 text-muted-foreground">{p.type}</td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {p.used} / {p.limit === 9999 ? "∞" : p.limit} used
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={p.status === "Active" ? "default" : "secondary"}>
                        {p.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
