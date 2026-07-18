"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Lock } from "lucide-react";
import { Button } from "@/common/buttons/button";
import { Badge } from "@/common/shared/badge";
import { getPlan, minPlanFor, type PlanFeature, type PlanId } from "@/lib/plans";
import { usePlan } from "@/shared/hooks/usePlan";
import { UpgradeModal } from "@/shared/components/UpgradeModal";
import { cn } from "@/config/shadcnUtils";

interface PlanGateProps {
  /** The feature required to render the children un-gated */
  feature: PlanFeature;
  /** Plan advertised in the upgrade prompt; defaults to the cheapest plan with the feature */
  upgrade?: PlanId;
  children: React.ReactNode;
  /** "overlay" blurs the children behind a lock; "hide" renders nothing when locked */
  mode?: "overlay" | "hide";
  className?: string;
}

/**
 * Gates a feature behind the user's subscription plan.
 *
 * <PlanGate feature="split_payment">
 *   <SplitPaymentButton />
 * </PlanGate>
 */
export function PlanGate({ feature, upgrade, children, mode = "overlay", className }: PlanGateProps) {
  const t = useTranslations("plans");
  const locale = useLocale();
  const { can } = usePlan();
  const [modalOpen, setModalOpen] = useState(false);

  if (can(feature)) return <>{children}</>;
  if (mode === "hide") return null;

  const requiredPlan = upgrade ?? minPlanFor(feature);
  const targetPlan = getPlan(requiredPlan);
  const planName = locale === "ar" ? targetPlan.nameAr : targetPlan.nameEn;

  return (
    <div className={cn("relative overflow-hidden rounded-xl", className)}>
      {/* Locked content: blurred and inert */}
      <div className="pointer-events-none select-none blur-[6px] opacity-60" aria-hidden="true">
        {children}
      </div>

      {/* Lock overlay */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-background/40 backdrop-blur-[2px] p-4 text-center">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 ring-1 ring-primary/30">
          <Lock className="h-4 w-4 text-primary" />
        </div>
        <div className="space-y-1">
          <Badge variant="glow">{planName}</Badge>
          <p className="text-xs text-muted-foreground max-w-[240px]">
            {t("featureLocked", { plan: planName })}
          </p>
        </div>
        <Button size="sm" onClick={() => setModalOpen(true)}>
          {t("upgrade")}
        </Button>
      </div>

      <UpgradeModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        feature={feature}
        requiredPlan={requiredPlan}
      />
    </div>
  );
}
