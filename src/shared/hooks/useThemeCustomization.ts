"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";
import {
  useThemeCustomizationStore,
  ACCENT_PRESETS,
  BORDER_RADIUS_MAP,
  FONT_SCALE_MAP,
  ANIMATION_INTENSITY_MAP,
  type BorderRadiusOption,
  type FontScaleOption,
  type AnimationIntensityOption,
  type DarkStyleOption,
} from "@/shared/stores/themeCustomizationStore";

/**
 * Syncs user customization preferences (accent colour, border radius,
 * font scale) from the Zustand store to CSS custom properties on
 * `document.documentElement`. Called once on mount in a client boundary.
 */
export function useThemeCustomization() {
  const { theme, setTheme } = useTheme();
  const {
    accentId, borderRadius, fontScale, animationIntensity, darkStyle,
    setAccent, setBorderRadius, setFontScale, setAnimationIntensity, setDarkStyle, reset,
  } = useThemeCustomizationStore();

  // Apply stored customizations whenever they change
  useEffect(() => {
    const root = document.documentElement;

    // ── Accent colour ──────────────────────────────────────────────────
    const preset = ACCENT_PRESETS.find((p) => p.id === accentId);
    if (preset && preset.color) {
      root.style.setProperty("--primary", preset.color);
      root.style.setProperty("--ring", preset.ring);
      root.style.setProperty("--sidebar-primary", preset.color);
      root.style.setProperty("--sidebar-ring", preset.ring);
    } else {
      root.style.removeProperty("--primary");
      root.style.removeProperty("--ring");
      root.style.removeProperty("--sidebar-primary");
      root.style.removeProperty("--sidebar-ring");
    }

    // ── Border radius ──────────────────────────────────────────────────
    root.style.setProperty("--radius", BORDER_RADIUS_MAP[borderRadius]);

    // ── Font scale ─────────────────────────────────────────────────────
    root.style.setProperty("font-size", FONT_SCALE_MAP[fontScale]);

    // ── Animation intensity ────────────────────────────────────────────
    root.style.setProperty("--anim-duration-fast", ANIMATION_INTENSITY_MAP[animationIntensity]);
    root.style.setProperty("--anim-duration-normal", ANIMATION_INTENSITY_MAP[animationIntensity]);
    root.style.setProperty("--anim-duration-slow", ANIMATION_INTENSITY_MAP[animationIntensity]);

    // ── Dark style ─────────────────────────────────────────────────────
    root.style.setProperty("--dark-style", darkStyle);
  }, [accentId, borderRadius, fontScale, animationIntensity, darkStyle]);

  return {
    // next-themes
    theme,
    setTheme,
    // customization
    accentId,
    borderRadius,
    fontScale,
    animationIntensity,
    darkStyle,
    setAccent,
    setBorderRadius,
    setFontScale,
    setAnimationIntensity,
    setDarkStyle,
    reset,
    // derived helpers
    accentPreset: ACCENT_PRESETS.find((p) => p.id === accentId) ?? ACCENT_PRESETS[0],
    allAccents: ACCENT_PRESETS,
    borderRadiusOptions: ["compact", "default", "relaxed"] as BorderRadiusOption[],
    fontScaleOptions: ["sm", "md", "lg"] as FontScaleOption[],
    animationIntensityOptions: ["subtle", "standard", "expressive"] as AnimationIntensityOption[],
    darkStyleOptions: ["slate", "zinc", "pureBlack"] as DarkStyleOption[],
  };
}
