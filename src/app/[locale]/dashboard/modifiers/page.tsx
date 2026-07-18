"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/common/shared/card";
import { Pizza } from "lucide-react";

export default function ModifiersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Modifiers</h1>
        <p className="text-muted-foreground">Manage product modifiers, extras, and variations</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Pizza className="h-5 w-5" />
            Product Modifiers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Modifier management will be available in an upcoming update.</p>
        </CardContent>
      </Card>
    </div>
  );
}
