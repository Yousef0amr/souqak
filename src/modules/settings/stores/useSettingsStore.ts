import { create } from "zustand";
import { persist } from "zustand/middleware";
import { BusinessMode, businessModeFromString } from "@/types/business-mode";

interface AppSettings {
  businessMode: BusinessMode;
  language: string;
  currency: string;
}

interface SettingsState {
  settings: AppSettings;
  setBusinessMode: (mode: BusinessMode) => void;
  setLanguage: (lang: string) => void;
  setCurrency: (currency: string) => void;
  updateSettings: (partial: Partial<AppSettings>) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      settings: {
        businessMode: BusinessMode.retail,
        language: "en",
        currency: "USD",
      },
      setBusinessMode: (mode) =>
        set((state) => ({
          settings: { ...state.settings, businessMode: mode },
        })),
      setLanguage: (language) =>
        set((state) => ({
          settings: { ...state.settings, language },
        })),
      setCurrency: (currency) =>
        set((state) => ({
          settings: { ...state.settings, currency },
        })),
      updateSettings: (partial) =>
        set((state) => ({
          settings: { ...state.settings, ...partial },
        })),
    }),
    {
      name: "souqak-settings-storage",
      partialize: (state) => ({ settings: state.settings }),
      merge: (persisted, current) => ({
        ...current,
        settings: {
          ...current.settings,
          ...((persisted as { settings?: Partial<AppSettings> })?.settings ?? {}),
          businessMode: businessModeFromString(
            (persisted as { settings?: { businessMode?: string } })?.settings
              ?.businessMode ?? "retail"
          ),
        },
      }),
    }
  )
);
