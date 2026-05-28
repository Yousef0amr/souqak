"use client";

import { useCustomer, useCustomerInvoices } from "../hooks/useCustomers";
import { Card, CardContent, CardHeader, CardTitle } from "@/common/shared/card";
import { Badge } from "@/common/shared/badge";
import { Mail, Phone, ShieldAlert, ArrowLeft, FileText } from "lucide-react";
import { Button } from "@/common/buttons/button";
import { useRouter } from "@/config/i18n/navigation";

export function CustomerDetails({ id }: { id: string }) {
  const { data: customer, isLoading } = useCustomer(id);
  const { data: invoices, isLoading: invoicesLoading } = useCustomerInvoices(id);
  const router = useRouter();

  if (isLoading) return <div className="text-muted-foreground">Loading customer...</div>;
  if (!customer) return <div className="text-muted-foreground">Customer not found</div>;

  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={() => router.push("/dashboard/customers")}>
        <ArrowLeft className="h-4 w-4 mr-2" /> Back to Customers
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold">{customer.name}</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span>{customer.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span>{customer.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Credit Limit:</span>
            <span className="font-semibold">${customer.creditLimit.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldAlert className="h-4 w-4 text-red-500" />
            <span className="text-muted-foreground">Outstanding:</span>
            <span className="font-semibold text-red-500">${customer.outstandingDebt.toLocaleString()}</span>
          </div>
          <div>
            <Badge variant={customer.status === "Active" ? "default" : "secondary"}>
              {customer.status}
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Invoices
          </CardTitle>
        </CardHeader>
        <CardContent>
          {invoicesLoading && <div className="text-muted-foreground">Loading invoices...</div>}
          {!invoicesLoading && (!invoices || invoices.length === 0) && (
            <div className="text-muted-foreground">No invoices for this customer</div>
          )}
          {invoices && invoices.length > 0 && (
            <div className="space-y-2">
              {invoices.map((inv: any) => (
                <div key={inv.id} className="flex justify-between items-center p-3 rounded-lg border">
                  <div>
                    <p className="font-medium">{inv.invoiceNumber}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(inv.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${inv.total.toFixed(2)}</p>
                    <Badge variant={inv.status === "Paid" ? "default" : "secondary"}>
                      {inv.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
