import { create } from "zustand";
import { persist } from "zustand/middleware";

// ─── Accent Colour Presets ────────────────────────────────────────────────────
export interface AccentPreset {
  id: string;
  label: string;
  color: string; // hex primary colour
  ring: string;  // hex ring colour (slightly lighter/darker)
}

export const ACCENT_PRESETS: AccentPreset[] = [
  { id: "default",  label: "Default",  color: "",        ring: "" },
  { id: "blue",     label: "Blue",     color: "#2563eb", ring: "#3b82f6" },
  { id: "violet",   label: "Violet",   color: "#7c3aed", ring: "#8b5cf6" },
  { id: "rose",     label: "Rose",     color: "#e11d48", ring: "#f43f5e" },
  { id: "orange",   label: "Orange",   color: "#ea580c", ring: "#f97316" },
  { id: "amber",    label: "Amber",    color: "#d97706", ring: "#f59e0b" },
  { id: "emerald",  label: "Emerald",  color: "#059669", ring: "#10b981" },
  { id: "cyan",     label: "Cyan",     color: "#0891b2", ring: "#06b6d4" },
  { id: "pink",     label: "Pink",     color: "#db2777", ring: "#ec4899" },
  { id: "indigo",   label: "Indigo",   color: "#4338ca", ring: "#6366f1" },
];

// ─── Border Radius Options ────────────────────────────────────────────────────
export type BorderRadiusOption = "compact" | "default" | "relaxed";

export const BORDER_RADIUS_MAP: Record<BorderRadiusOption, string> = {
  compact: "6px",
  default: "12px",
  relaxed: "20px",
};

// ─── Animation Intensity ──────────────────────────────────────────────────────
export type AnimationIntensityOption = "subtle" | "standard" | "expressive";

export const ANIMATION_INTENSITY_MAP: Record<AnimationIntensityOption, string> = {
  subtle: "0.15s",
  standard: "0.3s",
  expressive: "0.5s",
};

// ─── Dark Style Options ───────────────────────────────────────────────────────
export type DarkStyleOption = "slate" | "zinc" | "pureBlack";

// ─── Font Scale Options ───────────────────────────────────────────────────────
export type FontScaleOption = "sm" | "md" | "lg";

export const FONT_SCALE_MAP: Record<FontScaleOption, string> = {
  sm: "14px",
  md: "16px",
  lg: "18px",
};

// ─── Store Shape ──────────────────────────────────────────────────────────────
export interface ThemeCustomizationState {
  accentId: string;
  borderRadius: BorderRadiusOption;
  fontScale: FontScaleOption;
  animationIntensity: AnimationIntensityOption;
  darkStyle: DarkStyleOption;

  // Actions
  setAccent: (id: string) => void;
  setBorderRadius: (r: BorderRadiusOption) => void;
  setFontScale: (f: FontScaleOption) => void;
  setAnimationIntensity: (i: AnimationIntensityOption) => void;
  setDarkStyle: (d: DarkStyleOption) => void;
  reset: () => void;
}

const DEFAULT_STATE = {
  accentId: "default",
  borderRadius: "default" as BorderRadiusOption,
  fontScale: "md" as FontScaleOption,
  animationIntensity: "standard" as AnimationIntensityOption,
  darkStyle: "slate" as DarkStyleOption,
};

export const useThemeCustomizationStore = create<ThemeCustomizationState>()(
  persist(
    (set) => ({
      ...DEFAULT_STATE,

      setAccent: (id) => set({ accentId: id }),
      setBorderRadius: (r) => set({ borderRadius: r }),
      setFontScale: (f) => set({ fontScale: f }),
      setAnimationIntensity: (i) => set({ animationIntensity: i }),
      setDarkStyle: (d) => set({ darkStyle: d }),
      reset: () => set(DEFAULT_STATE),
    }),
    {
      name: "souqak-theme",
    }
  )
);

// ─── Typed Selectors ──────────────────────────────────────────────────────────
export const useAccentId      = () => useThemeCustomizationStore((s) => s.accentId);
export const useBorderRadius  = () => useThemeCustomizationStore((s) => s.borderRadius);
export const useFontScale     = () => useThemeCustomizationStore((s) => s.fontScale);
export const useAnimationIntensity = () => useThemeCustomizationStore((s) => s.animationIntensity);
export const useDarkStyle = () => useThemeCustomizationStore((s) => s.darkStyle);

export const useThemeCustomActions = () =>
  useThemeCustomizationStore((s) => ({
    setAccent:             s.setAccent,
    setBorderRadius:       s.setBorderRadius,
    setFontScale:          s.setFontScale,
    setAnimationIntensity: s.setAnimationIntensity,
    setDarkStyle:          s.setDarkStyle,
    reset:                 s.reset,
  }));
