import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/common/shared/card";

import { TrendingUp, TrendingDown, LucideIcon } from "lucide-react";
import { cn } from "@/config/shadcnUtils";
import { Badge } from "@/common/shared/badge";

interface KPICardProps {
  title: string;
  value: string | number;
  change: number;
  trend: "up" | "down";
  icon: LucideIcon;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  change,
  trend,
  icon: Icon,
  prefix = "",
  suffix = "",
  className,
}) => {
  const isPositive = trend === "up";
  const changeColor = isPositive ? "text-green-600" : "text-red-600";
  const bgColor = isPositive ? "bg-green-50" : "bg-red-50";
  const TrendIcon = isPositive ? TrendingUp : TrendingDown;

  const formatValue = (val: string | number) => {
    if (typeof val === "number") {
      if (val >= 1000000) {
        return `${(val / 1000000).toFixed(1)}M`;
      } else if (val >= 1000) {
        return `${(val / 1000).toFixed(1)}K`;
      }
      return val.toLocaleString();
    }
    return val;
  };

  return (
    <Card className={cn("relative overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon className="h-4 w-4 text-primary" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="text-2xl font-bold">
            {prefix}
            {formatValue(value)}
            {suffix}
          </div>
          <div className="flex items-center space-x-2">
            <Badge
              variant="secondary"
              className={cn(
                "flex items-center space-x-1 px-2 py-1",
                isPositive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
              )}
            >
              <TrendIcon className="h-3 w-3" />
              <span className="text-xs font-medium">{Math.abs(change)}%</span>
            </Badge>
            <span className="text-xs text-muted-foreground">vs last month</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
