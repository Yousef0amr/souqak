"use client";

import { useCustomer, useCustomerInvoices } from "../hooks/useCustomers";
import { Card, CardContent, CardHeader, CardTitle } from "@/common/shared/card";
import { Badge } from "@/common/shared/badge";
import { Mail, Phone, ArrowLeft, FileText, Wallet } from "lucide-react";
import { Button } from "@/common/buttons/button";
import { useRouter } from "@/config/i18n/navigation";

export function CustomerDetails({ id }: { id: string }) {
  const { data: customer, isLoading } = useCustomer(id);
  const { data: invoices, isLoading: invoicesLoading } =
    useCustomerInvoices(id);

  const router = useRouter();

  if (isLoading) {
    return (
      <div className="text-muted-foreground">
        Loading customer...
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="text-muted-foreground">
        Customer not found
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Button
        variant="ghost"
        onClick={() => router.push("/dashboard/customers")}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Customers
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold">
            {customer.nameEn}
          </CardTitle>

          {customer.nameAr && (
            <p className="text-sm text-muted-foreground">
              {customer.nameAr}
            </p>
          )}
        </CardHeader>

        <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {customer.email && (
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>{customer.email}</span>
            </div>
          )}

          {customer.phone && (
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{customer.phone}</span>
            </div>
          )}

          <div className="flex items-center gap-2">
            <Wallet className="h-4 w-4 text-muted-foreground" />

            <span className="text-muted-foreground">
              Balance:
            </span>

            <span className="font-semibold">
              ${customer.balance.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">
              Total Invoices:
            </span>

            <Badge variant="secondary">
              {customer.totalInvoices}
            </Badge>
          </div>

          {customer.address && (
            <div className="md:col-span-2">
              <p className="text-sm text-muted-foreground">
                Address
              </p>

              <p>{customer.address}</p>
            </div>
          )}

          {customer.taxNumber && (
            <div>
              <p className="text-sm text-muted-foreground">
                Tax Number
              </p>

              <p>{customer.taxNumber}</p>
            </div>
          )}

          <div>
            <p className="text-sm text-muted-foreground">
              Created At
            </p>

            <p>
              {new Date(customer.createdAt).toLocaleDateString()}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg font-semibold">
            <FileText className="h-5 w-5" />
            Invoices
          </CardTitle>
        </CardHeader>

        <CardContent>
          {invoicesLoading && (
            <div className="text-muted-foreground">
              Loading invoices...
            </div>
          )}

          {!invoicesLoading &&
            (!invoices || invoices.length === 0) && (
              <div className="text-muted-foreground">
                No invoices for this customer
              </div>
            )}

          {invoices && invoices.length > 0 && (
            <div className="space-y-2">
              {invoices.map((inv: any) => (
                <div
                  key={inv.id}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div>
                    <p className="font-medium">
                      {inv.invoiceNumber}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      {new Date(
                        inv.createdAt
                      ).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold">
                      ${inv.total.toFixed(2)}
                    </p>

                    <Badge
                      variant={
                        inv.status === "Paid"
                          ? "default"
                          : "secondary"
                      }
                    >
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