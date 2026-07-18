"use client";

import { useSubscriptionStore } from "@/shared/stores/subscriptionStore";
import {
  canAccess,
  getPlan,
  minPlanFor,
  PLAN_RANK,
  type PlanFeature,
  type PlanId,
} from "@/lib/plans";

/**
 * Feature-gating hook backed by the persisted subscription store.
 *
 * const { can, isAtLeast } = usePlan();
 * if (!can("split_payment")) ...
 */
export function usePlan() {
  const plan = useSubscriptionStore((s) => s.plan);

  return {
    plan,
    planDef: getPlan(plan),
    can: (feature: PlanFeature) => canAccess(feature, plan),
    isAtLeast: (minPlan: PlanId) => PLAN_RANK[plan] >= PLAN_RANK[minPlan],
    minPlanFor,
  };
}
