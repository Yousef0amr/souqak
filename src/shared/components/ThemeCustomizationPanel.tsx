"use client";

import React from "react";
import { useThemeCustomization } from "@/shared/hooks/useThemeCustomization";
import { ACCENT_PRESETS, BORDER_RADIUS_MAP } from "@/shared/stores/themeCustomizationStore";
import { cn } from "@/config/shadcnUtils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/common/shared/sheet";
import { Sun, Moon, Sparkles, Crown, Check, RotateCcw } from "lucide-react";
import { Button } from "@/common/buttons/button";

// ─── Base theme options ───────────────────────────────────────────────────────
const BASE_THEMES = [
  {
    id: "light",
    label: "Light",
    icon: Sun,
    preview: { bg: "#f9fafb", card: "#ffffff", primary: "#4f46e5", sidebar: "#0f172a", text: "#111827", accent: "#e0e7ff" },
  },
  {
    id: "dark",
    label: "Dark",
    icon: Moon,
    preview: { bg: "#0d1117", card: "#161b22", primary: "#818cf8", sidebar: "#010409", text: "#e6edf3", accent: "#312e81" },
  },
  {
    id: "primary",
    label: "Blue Pro",
    icon: Sparkles,
    preview: { bg: "#f8fafc", card: "#ffffff", primary: "#1d4ed8", sidebar: "#0f172a", text: "#0f172a", accent: "#dbeafe" },
  },
  {
    id: "vip",
    label: "Gold VIP",
    icon: Crown,
    preview: { bg: "#fdfbf0", card: "#ffffff", primary: "#b45309", sidebar: "#1c1002", text: "#1c1917", accent: "#fef3c7" },
  },
] as const;

// ─── Mini Preview SVG ─────────────────────────────────────────────────────────
function ThemePreviewSVG({
  preview,
  active,
}: {
  preview: { bg: string; card: string; primary: string; sidebar: string; text: string; accent: string };
  active: boolean;
}) {
  return (
    <svg
      width="80"
      height="54"
      viewBox="0 0 80 54"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        "rounded-lg border-2 transition-all duration-200",
        active ? "border-primary" : "border-border/50"
      )}
    >
      {/* Background */}
      <rect width="80" height="54" fill={preview.bg} rx="8" />

      {/* Sidebar */}
      <rect width="18" height="54" fill={preview.sidebar} rx="8" />
      <rect width="18" height="54" fill={preview.sidebar} />
      {/* Sidebar top logo dot */}
      <circle cx="9" cy="8" r="3" fill={preview.primary} opacity="0.9" />
      {/* Sidebar items */}
      <rect x="4" y="16" width="10" height="2" rx="1" fill="white" opacity="0.55" />
      <rect x="4" y="21" width="10" height="2" rx="1" fill="white" opacity="0.3" />
      <rect x="4" y="26" width="10" height="2" rx="1" fill="white" opacity="0.3" />
      <rect x="4" y="31" width="8" height="2" rx="1" fill="white" opacity="0.3" />
      {/* Active item indicator */}
      <rect x="0" y="15" width="2" height="5" rx="1" fill={preview.primary} />

      {/* Top bar */}
      <rect x="22" y="4" width="54" height="8" rx="3" fill={preview.card} opacity="0.7" />

      {/* KPI Cards row */}
      <rect x="22" y="16" width="16" height="11" rx="2.5" fill={preview.card} />
      <rect x="22" y="16" width="16" height="11" rx="2.5" stroke={preview.text} strokeOpacity="0.07" strokeWidth="0.5" />
      <rect x="25" y="19" width="7" height="1.5" rx="0.75" fill={preview.primary} opacity="0.8" />
      <rect x="25" y="22" width="10" height="1" rx="0.5" fill={preview.text} opacity="0.2" />

      <rect x="41" y="16" width="16" height="11" rx="2.5" fill={preview.card} />
      <rect x="41" y="16" width="16" height="11" rx="2.5" stroke={preview.text} strokeOpacity="0.07" strokeWidth="0.5" />
      <rect x="44" y="19" width="7" height="1.5" rx="0.75" fill={preview.primary} opacity="0.6" />
      <rect x="44" y="22" width="10" height="1" rx="0.5" fill={preview.text} opacity="0.2" />

      <rect x="60" y="16" width="16" height="11" rx="2.5" fill={preview.accent} opacity="0.6" />
      <rect x="63" y="19" width="7" height="1.5" rx="0.75" fill={preview.primary} opacity="0.7" />
      <rect x="63" y="22" width="10" height="1" rx="0.5" fill={preview.text} opacity="0.2" />

      {/* Main table card */}
      <rect x="22" y="31" width="54" height="19" rx="3" fill={preview.card} />
      <rect x="22" y="31" width="54" height="19" rx="3" stroke={preview.text} strokeOpacity="0.07" strokeWidth="0.5" />
      {/* Table header */}
      <rect x="22" y="31" width="54" height="5" rx="3" fill={preview.primary} opacity="0.08" />
      <rect x="25" y="33" width="12" height="1.5" rx="0.75" fill={preview.text} opacity="0.25" />
      <rect x="50" y="33" width="8" height="1.5" rx="0.75" fill={preview.text} opacity="0.15" />
      {/* Table rows */}
      <rect x="25" y="39" width="20" height="1.5" rx="0.75" fill={preview.text} opacity="0.15" />
      <rect x="25" y="43" width="28" height="1.5" rx="0.75" fill={preview.text} opacity="0.1" />
      {/* Row accent dot */}
      <circle cx="67" cy="40" r="2" fill={preview.primary} opacity="0.4" />
      <circle cx="67" cy="44" r="2" fill={preview.primary} opacity="0.25" />
    </svg>
  );
}

// ─── Radius Preview ───────────────────────────────────────────────────────────
const RADIUS_LABELS: Record<string, string> = {
  compact: "Compact",
  default: "Default",
  relaxed: "Relaxed",
};

const RADIUS_PREVIEW: Record<string, string> = {
  compact: "rounded",
  default: "rounded-xl",
  relaxed: "rounded-3xl",
};

// ─── Panel Component ──────────────────────────────────────────────────────────
interface ThemeCustomizationPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ThemeCustomizationPanel({ open, onOpenChange }: ThemeCustomizationPanelProps) {
  const {
    theme,
    setTheme,
    accentId,
    borderRadius,
    fontScale,
    setAccent,
    setBorderRadius,
    setFontScale,
    reset,
  } = useThemeCustomization();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-[340px] sm:w-[380px] flex flex-col gap-0 p-0 overflow-y-auto"
      >
        {/* Header */}
        <SheetHeader className="px-6 pt-6 pb-4 border-b border-border/60 shrink-0">
          <SheetTitle className="text-base font-semibold">Appearance</SheetTitle>
          <SheetDescription className="text-xs text-muted-foreground">
            Customize how Souqak looks and feels. Changes are saved automatically.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 px-6 py-5 space-y-7">

          {/* ── Base Theme ─────────────────────────────────────── */}
          <section aria-labelledby="theme-section-title">
            <h3 id="theme-section-title" className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
              Base Theme
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {BASE_THEMES.map((t) => {
                const isActive = theme === t.id;
                const Icon = t.icon;
                return (
                  <button
                    key={t.id}
                    id={`theme-option-${t.id}`}
                    onClick={() => setTheme(t.id)}
                    className={cn(
                      "flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all duration-200",
                      "hover:border-primary/50 hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      isActive
                        ? "border-primary bg-primary/8 shadow-sm"
                        : "border-border/50 bg-card"
                    )}
                    aria-pressed={isActive}
                    aria-label={`Switch to ${t.label} theme`}
                  >
                    <ThemePreviewSVG preview={t.preview} active={isActive} />
                    <span className={cn("flex items-center gap-1 text-xs font-medium", isActive ? "text-primary" : "text-muted-foreground")}>
                      <Icon className="h-3 w-3" />
                      {t.label}
                      {isActive && <Check className="h-3 w-3 ml-0.5" />}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* ── Accent Colour ──────────────────────────────────── */}
          <section aria-labelledby="accent-section-title">
            <h3 id="accent-section-title" className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
              Accent Colour
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {ACCENT_PRESETS.map((preset) => {
                const isActive = accentId === preset.id;
                const isDefault = preset.id === "default";
                return (
                  <button
                    key={preset.id}
                    id={`accent-${preset.id}`}
                    onClick={() => setAccent(preset.id)}
                    aria-pressed={isActive}
                    aria-label={`${preset.label} accent colour`}
                    className={cn(
                      "relative h-8 w-8 rounded-full border-2 transition-all duration-200",
                      "hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring",
                      isActive ? "scale-110 border-foreground/70 shadow-md" : "border-border/50"
                    )}
                    style={isDefault ? { background: "conic-gradient(red, yellow, lime, aqua, blue, magenta, red)" } : { backgroundColor: preset.color }}
                    title={preset.label}
                  >
                    {isActive && (
                      <Check
                        className="absolute inset-0 m-auto h-3.5 w-3.5 drop-shadow"
                        style={{ color: isDefault ? "#fff" : "#fff", filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.5))" }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
            {accentId !== "default" && (
              <p className="mt-2 text-[11px] text-muted-foreground">
                Custom accent overrides the theme's primary colour. Choose{" "}
                <button
                  onClick={() => setAccent("default")}
                  className="underline hover:text-foreground transition-colors"
                >
                  Default
                </button>{" "}
                to restore the theme's original colour.
              </p>
            )}
          </section>

          {/* ── Border Radius ──────────────────────────────────── */}
          <section aria-labelledby="radius-section-title">
            <h3 id="radius-section-title" className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
              Border Radius
            </h3>
            <div className="flex gap-2">
              {(["compact", "default", "relaxed"] as const).map((r) => {
                const isActive = borderRadius === r;
                return (
                  <button
                    key={r}
                    id={`radius-${r}`}
                    onClick={() => setBorderRadius(r)}
                    aria-pressed={isActive}
                    className={cn(
                      "flex-1 flex flex-col items-center gap-2 py-3 border-2 transition-all duration-200",
                      "hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      RADIUS_PREVIEW[r],
                      isActive
                        ? "border-primary bg-primary/8 text-primary shadow-sm"
                        : "border-border/50 bg-card text-muted-foreground"
                    )}
                  >
                    {/* Mini rectangle preview */}
                    <div
                      className={cn("h-6 w-10 bg-primary/30 border border-primary/40 transition-all", RADIUS_PREVIEW[r])}
                    />
                    <span className="text-[11px] font-medium">{RADIUS_LABELS[r]}</span>
                    <span className="text-[10px] opacity-60">{BORDER_RADIUS_MAP[r]}</span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* ── Font Scale ─────────────────────────────────────── */}
          <section aria-labelledby="font-section-title">
            <h3 id="font-section-title" className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
              Font Scale
            </h3>
            <div className="flex gap-2">
              {(["sm", "md", "lg"] as const).map((f) => {
                const isActive = fontScale === f;
                const labels = { sm: "Small", md: "Default", lg: "Large" };
                const textSizes = { sm: "text-xs", md: "text-sm", lg: "text-base" };
                return (
                  <button
                    key={f}
                    id={`font-scale-${f}`}
                    onClick={() => setFontScale(f)}
                    aria-pressed={isActive}
                    className={cn(
                      "flex-1 flex flex-col items-center gap-1.5 py-3 rounded-xl border-2 transition-all duration-200",
                      "hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      isActive
                        ? "border-primary bg-primary/8 text-primary shadow-sm"
                        : "border-border/50 bg-card text-muted-foreground"
                    )}
                  >
                    <span className={cn("font-semibold leading-none", textSizes[f])}>Aa</span>
                    <span className="text-[11px] font-medium">{labels[f]}</span>
                  </button>
                );
              })}
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="shrink-0 px-6 py-4 border-t border-border/60 bg-muted/30">
          <Button
            variant="ghost"
            size="sm"
            onClick={reset}
            className="w-full text-muted-foreground hover:text-destructive hover:bg-destructive/10 gap-2"
            id="reset-theme-defaults"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset to Defaults
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
