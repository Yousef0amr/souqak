"use client";

import React, { useEffect, useRef, useState } from "react";
import { TrendingUp, TrendingDown, LucideIcon } from "lucide-react";
import { cn } from "@/config/shadcnUtils";

// ─── KPI card variants keyed by index ────────────────────────────────────────
const CARD_CONFIG = [
  {
    gradientClass: "from-blue-500/15 via-indigo-500/8 to-transparent",
    iconBg: "bg-blue-500/10 ring-blue-500/20",
    iconColor: "text-blue-600 dark:text-blue-400",
    glowColor: "rgba(59,130,246,0.15)",
  },
  {
    gradientClass: "from-cyan-500/15 via-sky-500/8 to-transparent",
    iconBg: "bg-cyan-500/10 ring-cyan-500/20",
    iconColor: "text-cyan-600 dark:text-cyan-400",
    glowColor: "rgba(6,182,212,0.15)",
  },
  {
    gradientClass: "from-violet-500/15 via-purple-500/8 to-transparent",
    iconBg: "bg-violet-500/10 ring-violet-500/20",
    iconColor: "text-violet-600 dark:text-violet-400",
    glowColor: "rgba(139,92,246,0.15)",
  },
  {
    gradientClass: "from-amber-500/15 via-orange-500/8 to-transparent",
    iconBg: "bg-amber-500/10 ring-amber-500/20",
    iconColor: "text-amber-600 dark:text-amber-400",
    glowColor: "rgba(245,158,11,0.15)",
  },
] as const;

// ─── Tiny sparkline SVG ───────────────────────────────────────────────────────
function Sparkline({ trend }: { trend: "up" | "down" }) {
  // Simulated 7-point data for the mini sparkline
  const upPoints    = [20, 28, 22, 35, 30, 42, 50];
  const downPoints  = [50, 42, 48, 35, 40, 28, 22];
  const points = trend === "up" ? upPoints : downPoints;

  const w = 64;
  const h = 28;
  const maxVal = Math.max(...points);
  const minVal = Math.min(...points);
  const range = maxVal - minVal || 1;

  const coords = points.map((v, i) => {
    const x = (i / (points.length - 1)) * w;
    const y = h - ((v - minVal) / range) * (h - 4) - 2;
    return `${x},${y}`;
  });

  const pathD = `M ${coords.join(" L ")}`;
  const fillD = `M ${coords[0]} L ${coords.join(" L ")} L ${w},${h} L 0,${h} Z`;

  const color = trend === "up" ? "#10b981" : "#f43f5e";

  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      aria-hidden="true"
      className="overflow-visible"
    >
      <defs>
        <linearGradient id={`spark-fill-${trend}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={fillD} fill={`url(#spark-fill-${trend})`} />
      <path d={pathD} stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Animated number count-up ─────────────────────────────────────────────────
function AnimatedNumber({ value, prefix, suffix }: { value: string | number; prefix?: string; suffix?: string }) {
  const [displayed, setDisplayed] = useState<string | number>(0);
  const frameRef = useRef<number>(null);
  const startRef = useRef<number>(null);

  const formatValue = (val: number | string) => {
    if (typeof val === "number") {
      if (val >= 1_000_000) return `${(val / 1_000_000).toFixed(1)}M`;
      if (val >= 1_000)     return `${(val / 1_000).toFixed(1)}K`;
      return val.toLocaleString();
    }
    return val;
  };

  useEffect(() => {
    if (typeof value !== "number") {
      setDisplayed(value);
      return;
    }

    const target = value;
    const duration = 900; // ms

    const animate = (ts: number) => {
      if (!startRef.current) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out quad
      const eased = 1 - (1 - progress) * (1 - progress);
      setDisplayed(Math.floor(eased * target));

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayed(target);
      }
    };

    startRef.current = null;
    frameRef.current = requestAnimationFrame(animate);
    return () => { if (frameRef.current) cancelAnimationFrame(frameRef.current); };
  }, [value]);

  return (
    <span className="tabular-nums">
      {prefix}{formatValue(displayed)}{suffix}
    </span>
  );
}

// ─── KPICard Props ────────────────────────────────────────────────────────────
interface KPICardProps {
  title: string;
  value: string | number;
  change: number;
  trend: "up" | "down";
  icon: LucideIcon;
  prefix?: string;
  suffix?: string;
  className?: string;
  index?: number;
}

// ─── KPICard Component ────────────────────────────────────────────────────────
export const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  change,
  trend,
  icon: Icon,
  prefix = "",
  suffix = "",
  className,
  index = 0,
}) => {
  const config = CARD_CONFIG[index % CARD_CONFIG.length];
  const isPositive = trend === "up";
  const TrendIcon = isPositive ? TrendingUp : TrendingDown;

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-border/50 bg-card p-5",
        "shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1",
        "group",
        className
      )}
      style={{ boxShadow: `0 4px 24px -8px ${config.glowColor}` }}
    >
      {/* Background gradient blob — top-right */}
      <div
        className={cn(
          "pointer-events-none absolute -top-6 -right-6 h-32 w-32 rounded-full bg-gradient-radial opacity-70 blur-2xl",
          `bg-gradient-to-br ${config.gradientClass}`
        )}
      />

      <div className="relative space-y-3.5">
        {/* ── Header: title + icon ───────────── */}
        <div className="flex items-start justify-between gap-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground leading-tight">
            {title}
          </p>
          <div
            className={cn(
              "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ring-1 transition-transform duration-300 group-hover:scale-110",
              config.iconBg
            )}
          >
            <Icon className={cn("h-4 w-4", config.iconColor)} />
          </div>
        </div>

        {/* ── Value ─────────────────────────── */}
        <div className="text-2xl font-bold tracking-tight text-foreground animate-count-up">
          <AnimatedNumber value={value} prefix={prefix} suffix={suffix} />
        </div>

        {/* ── Sparkline + trend badge ────────── */}
        <div className="flex items-end justify-between gap-2">
          <div className="flex flex-col gap-1">
            {/* Trend badge */}
            <div
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold w-fit",
                isPositive
                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 ring-1 ring-emerald-500/20"
                  : "bg-rose-500/10 text-rose-600 dark:text-rose-400 ring-1 ring-rose-500/20"
              )}
            >
              <TrendIcon className="h-3 w-3" />
              {Math.abs(change)}%
            </div>
            <span className="text-[10px] text-muted-foreground">vs last month</span>
          </div>

          {/* Mini sparkline */}
          <div className="opacity-70 group-hover:opacity-100 transition-opacity duration-300">
            <Sparkline trend={trend} />
          </div>
        </div>
      </div>
    </div>
  );
};
