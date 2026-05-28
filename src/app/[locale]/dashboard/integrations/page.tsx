import React from "react";
import { Plug, Zap, ExternalLink, Info } from "lucide-react";
import { Badge } from "@/common/shared/badge";
import { Button } from "@/common/buttons/button";

const INTEGRATIONS = [
  { id: "i1", name: "WhatsApp receipts dispatcher", description: "Sends interactive PDF invoice templates directly to customer chat threads upon POS checkout confirmation.", status: "Connected", icon: "💬" },
  { id: "i2", name: "Stripe Card Terminals", description: "Bridges physical card reader terminals directly to the active POS checkout payment gateway.", status: "Connected", icon: "💳" },
  { id: "i3", name: "QuickBooks Cloud ledger sync", description: "Automates continuous ledger posting synchronization of billing invoices, payouts, and logged expenses.", status: "Inactive", icon: "📊" },
];

export default function IntegrationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">API Integrations</h1>
          <p className="text-muted-foreground">
            Synchronize customer pipelines and payment gateways with third-party webhooks
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {INTEGRATIONS.map((app) => (
          <div key={app.id} className="border bg-card rounded-lg p-5 flex flex-col justify-between h-[210px]">
            <div>
              <div className="flex justify-between items-start mb-3">
                <div className="text-3xl">{app.icon}</div>
                <Badge
                  variant={app.status === "Connected" ? "default" : "secondary"}
                  className={
                    app.status === "Connected"
                      ? "bg-green-100 text-green-800 dark:bg-green-950/30 dark:text-green-400"
                      : "bg-muted text-muted-foreground"
                  }
                >
                  {app.status}
                </Badge>
              </div>
              <h3 className="font-semibold text-sm text-foreground mb-1">{app.name}</h3>
              <p className="text-muted-foreground text-xs line-clamp-3 leading-relaxed">{app.description}</p>
            </div>

            <Button variant="outline" size="sm" className="w-full flex items-center justify-center gap-1.5 text-xs">
              {app.status === "Connected" ? "Configure Settings" : "Connect Module"}
              <ExternalLink className="h-3.5 w-3.5" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
