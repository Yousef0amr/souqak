import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { PlanId } from "@/lib/plans";

export type BillingCycle = "monthly" | "annual";

interface SubscriptionState {
  plan: PlanId;
  billingCycle: BillingCycle;
  /** ISO date of the next renewal; null for free/custom plans */
  renewsAt: string | null;

  setPlan: (plan: PlanId, cycle?: BillingCycle) => void;
  setBillingCycle: (cycle: BillingCycle) => void;
  cancel: () => void;
}

function nextRenewalDate(cycle: BillingCycle): string {
  const d = new Date();
  if (cycle === "annual") d.setFullYear(d.getFullYear() + 1);
  else d.setMonth(d.getMonth() + 1);
  return d.toISOString();
}

export const useSubscriptionStore = create<SubscriptionState>()(
  persist(
    (set) => ({
      plan: "free",
      billingCycle: "monthly",
      renewsAt: null,

      setPlan: (plan, cycle) =>
        set((state) => {
          const billingCycle = cycle ?? state.billingCycle;
          return {
            plan,
            billingCycle,
            renewsAt: plan === "free" ? null : nextRenewalDate(billingCycle),
          };
        }),
      setBillingCycle: (billingCycle) => set({ billingCycle }),
      cancel: () => set({ plan: "free", renewsAt: null }),
    }),
    { name: "souqak-subscription" }
  )
);
