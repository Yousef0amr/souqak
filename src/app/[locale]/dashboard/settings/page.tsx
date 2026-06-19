"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/common/shared/card";
import { Label } from "@/common/shared/label";
import { Input } from "@/common/forms/input";
import { Button } from "@/common/buttons/button";
import { Badge } from "@/common/shared/badge";
import { Building2, Globe, Bell, Receipt, Package, Save } from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");

  const tabs = [
    { id: "general", label: "General", icon: Building2 },
    { id: "localization", label: "Localization", icon: Globe },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "invoicing", label: "Invoicing", icon: Receipt },
    { id: "inventory", label: "Inventory", icon: Package },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">System Settings</h1>
        <p className="text-muted-foreground">
          Manage your ERP's global configuration and default preferences.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Settings Navigation */}
        <aside className="w-full md:w-64 shrink-0">
          <nav className="flex flex-row md:flex-col gap-1 overflow-x-auto pb-2 md:pb-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Settings Content */}
        <div className="flex-1 space-y-6">
          {activeTab === "general" && (
            <Card>
              <CardHeader>
                <CardTitle>Company Information</CardTitle>
                <CardDescription>Details that will appear on official documents and reports.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input id="companyName" defaultValue="Souqak General Trading" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="taxId">Global Tax ID / TRN</Label>
                    <Input id="taxId" defaultValue="TRN-123456789" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Contact Email</Label>
                    <Input id="email" type="email" defaultValue="admin@souqak.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" defaultValue="+971 50 123 4567" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address">Registered Address</Label>
                    <Input id="address" defaultValue="Dubai Silicon Oasis, HQ Building, Dubai, UAE" />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <Button><Save className="h-4 w-4 mr-2" /> Save Changes</Button>
              </CardFooter>
            </Card>
          )}

          {activeTab === "localization" && (
            <Card>
              <CardHeader>
                <CardTitle>Localization Settings</CardTitle>
                <CardDescription>Configure regional formatting and currency preferences.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="currency">Base Currency</Label>
                    <Input id="currency" defaultValue="AED" disabled />
                    <p className="text-xs text-muted-foreground">Contact support to change base currency.</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Input id="timezone" defaultValue="Asia/Dubai" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dateFormat">Date Format</Label>
                    <Input id="dateFormat" defaultValue="DD/MM/YYYY" />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <Button><Save className="h-4 w-4 mr-2" /> Save Changes</Button>
              </CardFooter>
            </Card>
          )}

          {activeTab === "notifications" && (
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Manage how the ERP communicates system events.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Low Stock Alerts</Label>
                    <p className="text-sm text-muted-foreground">Receive daily emails summarizing items below minimum threshold.</p>
                  </div>
                  <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">Enabled</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Daily Sales Digest</Label>
                    <p className="text-sm text-muted-foreground">Receive a summary of all sales and refunds at end of day.</p>
                  </div>
                  <Badge variant="outline" className="bg-muted text-muted-foreground">Disabled</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">New User Signups</Label>
                    <p className="text-sm text-muted-foreground">Get notified when a new employee account is created.</p>
                  </div>
                  <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">Enabled</Badge>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "invoicing" && (
            <Card>
              <CardHeader>
                <CardTitle>Invoicing Defaults</CardTitle>
                <CardDescription>Set up how your invoices and receipts are generated.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="invoicePrefix">Invoice Prefix</Label>
                    <Input id="invoicePrefix" defaultValue="INV-" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="receiptFooter">Receipt Footer Message</Label>
                    <Input id="receiptFooter" defaultValue="Thank you for your business! Returns accepted within 14 days." />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="defaultTerms">Default Payment Terms</Label>
                    <Input id="defaultTerms" defaultValue="Net 30" />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <Button><Save className="h-4 w-4 mr-2" /> Save Changes</Button>
              </CardFooter>
            </Card>
          )}

          {activeTab === "inventory" && (
            <Card>
              <CardHeader>
                <CardTitle>Inventory Operations</CardTitle>
                <CardDescription>Configure system-wide inventory behaviors.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="lowStockThreshold">Global Low Stock Threshold</Label>
                    <Input id="lowStockThreshold" type="number" defaultValue="10" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="defaultWarehouse">Default Receiving Warehouse</Label>
                    <Input id="defaultWarehouse" defaultValue="Main HQ Store" disabled />
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="space-y-0.5">
                    <Label className="text-base">Allow Negative Inventory</Label>
                    <p className="text-sm text-muted-foreground">Permit selling items even when system stock reaches zero.</p>
                  </div>
                  <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Strictly Disabled</Badge>
                </div>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <Button><Save className="h-4 w-4 mr-2" /> Save Changes</Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
