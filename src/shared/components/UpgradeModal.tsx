"use client";

import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, Check, Crown, Sparkles } from "lucide-react";
import { useRouter } from "@/config/i18n/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/common/models/dialog";
import { Button } from "@/common/buttons/button";
import { getPlan, type PlanFeature, type PlanId } from "@/lib/plans";
import { usePlan } from "@/shared/hooks/usePlan";
import { cn } from "@/config/shadcnUtils";

interface UpgradeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** The feature the user tried to use */
  feature: PlanFeature;
  /** Plan required to unlock the feature */
  requiredPlan: PlanId;
}

export function UpgradeModal({ open, onOpenChange, feature, requiredPlan }: UpgradeModalProps) {
  const t = useTranslations("plans");
  const locale = useLocale();
  const router = useRouter();
  const { plan: currentPlanId } = usePlan();

  const currentPlan = getPlan(currentPlanId);
  const targetPlan = getPlan(requiredPlan);
  const planName = (p: typeof targetPlan) => (locale === "ar" ? p.nameAr : p.nameEn);

  const goToBilling = () => {
    onOpenChange(false);
    router.push("/dashboard/settings/billing");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <DialogHeader className="items-center text-center space-y-3">
            <div className="relative mx-auto">
              <div className="absolute inset-0 rounded-2xl bg-primary/30 blur-xl" />
              <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/15 ring-1 ring-primary/30">
                <Crown className="h-7 w-7 text-primary" />
              </div>
            </div>
            <DialogTitle className="text-lg">
              {t("featureLocked", { plan: planName(targetPlan) })}
            </DialogTitle>
            <DialogDescription className="text-sm">
              {t(`features.${feature}`)} — {t("upgradePitch")}
            </DialogDescription>
          </DialogHeader>

          {/* Current vs required plan comparison */}
          <div className="mt-5 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
            <div className="rounded-xl border border-border/60 bg-muted/30 p-3 text-center">
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">
                {t("current")}
              </p>
              <p className="text-sm font-semibold">{planName(currentPlan)}</p>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground rtl:rotate-180" />
            <div className="rounded-xl border-2 border-primary/50 bg-primary/8 p-3 text-center shadow-[0_0_20px_-6px_var(--primary)]">
              <p className="text-[10px] uppercase tracking-widest text-primary/80 mb-1 flex items-center justify-center gap-1">
                <Sparkles className="h-3 w-3" />
                {t("recommended")}
              </p>
              <p className="text-sm font-semibold text-primary">{planName(targetPlan)}</p>
              {!targetPlan.custom && (
                <p className="text-xs text-muted-foreground mt-0.5">
                  {targetPlan.priceMonthly} {targetPlan.currency} {t("perMonth")}
                </p>
              )}
            </div>
          </div>

          {/* A few highlight features of the target plan */}
          <ul className="mt-4 space-y-1.5">
            {targetPlan.features
              .filter((f) => !currentPlan.features.includes(f))
              .slice(0, 4)
              .map((f) => (
                <li key={f} className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                  {t(`features.${f}`)}
                </li>
              ))}
          </ul>

          <DialogFooter className="mt-6 gap-2 sm:gap-2">
            <Button variant="ghost" onClick={() => onOpenChange(false)}>
              {t("maybeLater")}
            </Button>
            <Button onClick={goToBilling} className={cn("gap-2")}>
              {t("upgradeNow")}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </Button>
          </DialogFooter>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
