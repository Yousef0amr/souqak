"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/config/shadcnUtils";
import {
  Settings,
  Store,
  Printer,
  Receipt,
  FileSpreadsheet,
  Percent,
  Star,
  CloudUpload,
  RefreshCw,
  KeyRound,
  Palette,
  Plug,
  Building2,
  Globe,
  Bell,
  Sun,
  Moon,
  Monitor,
  Ruler,
  Edit3,
  Sparkles,
  Zap,
  ChevronDown,
  Check,
  Save,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/common/shared/card";
import { Input } from "@/common/forms/input";
import { Label } from "@/common/shared/label";
import { Button } from "@/common/buttons/button";
import { Switch } from "@/common/forms/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/common/forms/select";
import { BusinessMode } from "@/types/business-mode";

// ─── Settings Store ───────────────────────────────────────────────────────────
interface AppSettings {
  companyName: string;
  companyEmail: string;
  companyPhone: string;
  companyAddress: string;
  vatNumber: string;
  businessMode: BusinessMode;
  language: string;
  currency: string;
  printerType: string;
  printerAddress: string;
  paperSize: string;
  defaultCopies: number;
  receiptHeader: string;
  receiptFooter: string;
  showLogoOnReceipt: boolean;
  qrCodeEnabled: boolean;
  defaultReportDateRange: string;
  reportsShowLogo: boolean;
  defaultTaxId: string;
  taxRoundingRule: string;
}

const defaultSettings: AppSettings = {
  companyName: "Souqak General Trading",
  companyEmail: "admin@souqak.com",
  companyPhone: "+971 50 123 4567",
  companyAddress: "Dubai Silicon Oasis, HQ Building, Dubai, UAE",
  vatNumber: "TRN-123456789",
  businessMode: BusinessMode.retail,
  language: "en",
  currency: "USD",
  printerType: "network",
  printerAddress: "192.168.1.100",
  paperSize: "80mm",
  defaultCopies: 1,
  receiptHeader: "",
  receiptFooter: "Thank you for your business!",
  showLogoOnReceipt: true,
  qrCodeEnabled: false,
  defaultReportDateRange: "today",
  reportsShowLogo: true,
  defaultTaxId: "",
  taxRoundingRule: "none",
};

// ─── Tab Config ───────────────────────────────────────────────────────────────
interface TabItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const tabs: TabItem[] = [
  { id: "general",       label: "App Settings",       icon: Settings },
  { id: "business-info", label: "Business Info",      icon: Store },
  { id: "printer",       label: "Printer",            icon: Building2 },
  { id: "receipt",       label: "Receipt",            icon: Receipt },
  { id: "reports",       label: "Reports",            icon: FileSpreadsheet },
  { id: "tax",           label: "Tax Settings",       icon: Globe },
  { id: "loyalty",       label: "Loyalty",            icon: Star },
  { id: "backup",        label: "Backup & Export",    icon: CloudUpload },
  { id: "sync",          label: "Sync",               icon: RefreshCw },
  { id: "license",       label: "License",            icon: KeyRound },
  { id: "theme",         label: "Appearance",         icon: Palette },
  { id: "integrations",  label: "Integrations",       icon: Plug },
];

// ─── Section Card ─────────────────────────────────────────────────────────────
function SectionCard({
  title,
  icon: Icon,
  description,
  children,
}: {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-primary" />
          <CardTitle className="text-sm font-semibold">{title}</CardTitle>
        </div>
        {description && (
          <CardDescription className="text-xs">{description}</CardDescription>
        )}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

function SwitchRow({
  label,
  description,
  checked,
  onCheckedChange,
}: {
  label: string;
  description?: string;
  checked: boolean;
  onCheckedChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-2">
      <div className="space-y-0.5">
        <Label className="text-sm font-medium">{label}</Label>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </div>
      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  );
}

// ─── Settings Page ────────────────────────────────────────────────────────────
export default function SettingsPage() {
  const t = useTranslations();
  const [activeTab, setActiveTab] = useState("general");
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);

  const update = (partial: Partial<AppSettings>) =>
    setSettings((s) => ({ ...s, ...partial }));

  const renderContent = () => {
    switch (activeTab) {
      case "general":
        return (
          <div className="space-y-4">
            <SectionCard title="Work Mode" icon={Settings} description="Choose your business vertical">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {[
                  { mode: BusinessMode.retail, label: "Retail", desc: "Standard retail POS" },
                  { mode: BusinessMode.grocery, label: "Grocery", desc: "Scale barcodes, weighed products" },
                  { mode: BusinessMode.restaurant, label: "Restaurant", desc: "Tables, modifiers, KDS" },
                ].map(({ mode, label, desc }) => (
                  <button
                    key={mode}
                    onClick={() => update({ businessMode: mode })}
                    className={cn(
                      "flex flex-col items-center gap-1.5 p-4 rounded-xl border-2 transition-all text-center",
                      settings.businessMode === mode
                        ? "border-primary bg-primary/5"
                        : "border-border/50 hover:border-primary/30"
                    )}
                  >
                    <span className="text-sm font-semibold">{label}</span>
                    <span className="text-xs text-muted-foreground">{desc}</span>
                  </button>
                ))}
              </div>
            </SectionCard>
            <SectionCard title="Language" icon={Globe} description="Interface language">
              <Select value={settings.language} onValueChange={(v) => update({ language: v })}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="ar">العربية</SelectItem>
                </SelectContent>
              </Select>
            </SectionCard>
          </div>
        );

      case "business-info":
        return (
          <SectionCard title="Business Information" icon={Store} description="Appears on official documents and reports">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Company Name</Label>
                <Input value={settings.companyName} onChange={(e) => update({ companyName: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Tax ID / VAT Number</Label>
                <Input value={settings.vatNumber} onChange={(e) => update({ vatNumber: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input value={settings.companyEmail} onChange={(e) => update({ companyEmail: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input value={settings.companyPhone} onChange={(e) => update({ companyPhone: e.target.value })} />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label>Address</Label>
                <Input value={settings.companyAddress} onChange={(e) => update({ companyAddress: e.target.value })} />
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <Button><Save className="h-4 w-4 mr-2" /> Save Changes</Button>
            </div>
          </SectionCard>
        );

      case "printer":
        return (
          <SectionCard title="Printer Settings" icon={Building2} description="Configure receipt printers">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Printer Type</Label>
                <Select value={settings.printerType} onValueChange={(v) => update({ printerType: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="network">Network</SelectItem>
                    <SelectItem value="usb">USB</SelectItem>
                    <SelectItem value="bluetooth">Bluetooth</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Printer Address / IP</Label>
                <Input value={settings.printerAddress} onChange={(e) => update({ printerAddress: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Paper Size</Label>
                <Select value={settings.paperSize} onValueChange={(v) => update({ paperSize: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="80mm">80mm</SelectItem>
                    <SelectItem value="58mm">58mm</SelectItem>
                    <SelectItem value="A4">A4</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Default Copies</Label>
                <Input type="number" value={settings.defaultCopies} onChange={(e) => update({ defaultCopies: parseInt(e.target.value) || 1 })} />
              </div>
            </div>
          </SectionCard>
        );

      case "receipt":
        return (
          <div className="space-y-4">
            <SectionCard title="Receipt Header" icon={Receipt}>
              <div className="space-y-2">
                <Label>Header Text</Label>
                <Input value={settings.receiptHeader} onChange={(e) => update({ receiptHeader: e.target.value })} />
              </div>
            </SectionCard>
            <SectionCard title="Receipt Footer" icon={Receipt}>
              <div className="space-y-2">
                <Label>Footer Text</Label>
                <Input value={settings.receiptFooter} onChange={(e) => update({ receiptFooter: e.target.value })} />
              </div>
            </SectionCard>
            <SectionCard title="Receipt Options" icon={Receipt}>
              <div className="space-y-1">
                <SwitchRow label="Show Logo on Receipt" checked={settings.showLogoOnReceipt} onCheckedChange={(v) => update({ showLogoOnReceipt: v })} />
                <SwitchRow label="Enable QR Code" description="Embed a QR code for digital verification" checked={settings.qrCodeEnabled} onCheckedChange={(v) => update({ qrCodeEnabled: v })} />
              </div>
            </SectionCard>
          </div>
        );

      case "reports":
        return (
          <SectionCard title="Report Settings" icon={FileSpreadsheet} description="Configure report defaults">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Default Date Range</Label>
                <Select value={settings.defaultReportDateRange} onValueChange={(v) => update({ defaultReportDateRange: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="this_week">This Week</SelectItem>
                    <SelectItem value="this_month">This Month</SelectItem>
                    <SelectItem value="this_year">This Year</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 flex items-end pb-2">
                <SwitchRow label="Show Logo on Reports" checked={settings.reportsShowLogo} onCheckedChange={(v) => update({ reportsShowLogo: v })} />
              </div>
            </div>
          </SectionCard>
        );

      case "tax":
        return (
          <SectionCard title="Tax Settings" icon={Globe} description="Default tax and rounding rules">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Default Tax</Label>
                <Input value={settings.defaultTaxId} onChange={(e) => update({ defaultTaxId: e.target.value })} placeholder="Select a default tax rate" />
              </div>
              <div className="space-y-2">
                <Label>Rounding Rule</Label>
                <Select value={settings.taxRoundingRule} onValueChange={(v) => update({ taxRoundingRule: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No Rounding</SelectItem>
                    <SelectItem value="nearest">Nearest</SelectItem>
                    <SelectItem value="up">Round Up</SelectItem>
                    <SelectItem value="down">Round Down</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </SectionCard>
        );

      case "loyalty":
        return (
          <SectionCard title="Loyalty Program" icon={Star} description="Manage customer rewards">
            <p className="text-sm text-muted-foreground">
              Loyalty configuration will be available in an upcoming update.
            </p>
          </SectionCard>
        );

      case "backup":
        return (
          <SectionCard title="Backup & Export" icon={CloudUpload} description="Export your data or create backups">
            <p className="text-sm text-muted-foreground">
              Backup and export features will be available in an upcoming update.
            </p>
          </SectionCard>
        );

      case "sync":
        return (
          <SectionCard title="Data Sync" icon={RefreshCw} description="Synchronize data across devices">
            <p className="text-sm text-muted-foreground">
              Data sync will be available in an upcoming update.
            </p>
          </SectionCard>
        );

      case "license":
        return (
          <SectionCard title="License" icon={KeyRound} description="Activate and manage your license">
            <p className="text-sm text-muted-foreground">
              License management will be available in an upcoming update.
            </p>
          </SectionCard>
        );

      case "theme":
        return (
          <div className="space-y-4">
            <SectionCard title="Theme Mode" icon={Palette} description="Choose light, dark, or system theme">
              <div className="flex gap-3">
                {[
                  { mode: "light", icon: Sun, label: "Light" },
                  { mode: "dark", icon: Moon, label: "Dark" },
                  { mode: "system", icon: Monitor, label: "System" },
                ].map(({ mode, icon: Icon, label }) => (
                  <button
                    key={mode}
                    className={cn(
                      "flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border-2 text-sm font-medium transition-all",
                      "hover:border-primary/50",
                      "border-border/50"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </button>
                ))}
              </div>
            </SectionCard>
          </div>
        );

      case "integrations":
        return (
          <div className="space-y-4">
            <SectionCard title="Server URL" icon={Plug} description="Backend server connection">
              <div className="space-y-2">
                <Label>API Server URL</Label>
                <Input defaultValue={process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5191/api"} />
              </div>
            </SectionCard>
            <SectionCard title="Payment Gateway" icon={Plug} description="Configure payment processor">
              <Select defaultValue="none">
                <SelectTrigger><SelectValue placeholder="Select payment gateway" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="stripe">Stripe</SelectItem>
                  <SelectItem value="paypal">PayPal</SelectItem>
                </SelectContent>
              </Select>
            </SectionCard>
            <SectionCard title="E-Invoicing" icon={Plug} description="Electronic invoicing provider">
              <Select defaultValue="none">
                <SelectTrigger><SelectValue placeholder="Select e-invoicing provider" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="zoho">Zoho Invoice</SelectItem>
                  <SelectItem value="fatoora">Fatoora</SelectItem>
                </SelectContent>
              </Select>
            </SectionCard>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">System Settings</h1>
        <p className="text-muted-foreground">
          Manage your ERP's global configuration and default preferences.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Settings Sidebar */}
        <aside className="w-full md:w-56 shrink-0">
          <nav className="flex flex-row md:flex-col gap-1 overflow-x-auto pb-2 md:pb-0">
            {tabs.map((tab) => {
              const active = activeTab === tab.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-all whitespace-nowrap shrink-0",
                    active
                      ? "bg-primary/10 text-primary shadow-sm"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span className="truncate">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Settings Content */}
        <div className="flex-1 min-w-0 space-y-4">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}