import React from "react";
import { Truck, Search, Plus, MapPin } from "lucide-react";
import { Badge } from "@/common/shared/badge";
import { Button } from "@/common/buttons/button";
import { Input } from "@/common/forms/input";

const MOCK_SHIPMENTS = [
  { id: "s1", carrier: "Aramex", tracking: "ARM-987251-SA", customer: "John Doe", destination: "Riyadh, KSA", status: "In Transit" },
  { id: "s2", carrier: "DHL Express", tracking: "DHL-209871-US", customer: "Sarah Smith", destination: "London, UK", status: "Delivered" },
  { id: "s3", carrier: "FedEx International", tracking: "FDX-776212-AE", customer: "Amine Al-Masri", destination: "Dubai, UAE", status: "Delivered" },
  { id: "s4", carrier: "SMSA Express", tracking: "SMSA-110982-SA", customer: "Yasser Al-Otaibi", destination: "Jeddah, KSA", status: "Pending Pickup" },
];

export default function ShippingPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Shipping & Fulfilment</h1>
          <p className="text-muted-foreground">
            Manage shipping couriers, print labels, and track active parcel deliveries
          </p>
        </div>
        <Button className="flex items-center gap-2 self-start md:self-auto">
          <Plus className="h-4 w-4" /> Ship Package
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="border bg-card rounded-lg p-4 flex items-center gap-3">
          <div className="p-2 bg-indigo-500/10 rounded-md text-indigo-500">
            <Truck className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground font-semibold">Active Parcels</p>
            <p className="text-lg font-bold">4 Shipments</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2 max-w-sm">
          <Search className="h-4 w-4 text-muted-foreground absolute ml-3" />
          <Input placeholder="Search active tracking numbers..." className="pl-9" />
        </div>

        <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/40 border-b border-border">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold text-muted-foreground">Carrier</th>
                  <th className="px-6 py-3 text-left font-semibold text-muted-foreground">Tracking Number</th>
                  <th className="px-6 py-3 text-left font-semibold text-muted-foreground">Recipient</th>
                  <th className="px-6 py-3 text-left font-semibold text-muted-foreground">Destination</th>
                  <th className="px-6 py-3 text-left font-semibold text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {MOCK_SHIPMENTS.map((s) => (
                  <tr key={s.id} className="hover:bg-muted/10 transition-colors">
                    <td className="px-6 py-4 font-semibold text-foreground">{s.carrier}</td>
                    <td className="px-6 py-4 font-mono text-xs">{s.tracking}</td>
                    <td className="px-6 py-4 text-muted-foreground">{s.customer}</td>
                    <td className="px-6 py-4 text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-indigo-500" />
                      {s.destination}
                    </td>
                    <td className="px-6 py-4">
                      <Badge
                        variant={
                          s.status === "Delivered"
                            ? "default"
                            : s.status === "In Transit"
                            ? "outline"
                            : "secondary"
                        }
                      >
                        {s.status}
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
