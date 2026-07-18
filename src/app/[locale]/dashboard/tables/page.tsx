"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/common/shared/card";
import { UtensilsCrossed } from "lucide-react";

export default function TablesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tables</h1>
        <p className="text-muted-foreground">Manage restaurant table layout and assignments</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UtensilsCrossed className="h-5 w-5" />
            Table Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Table management will be available in an upcoming update.</p>
        </CardContent>
      </Card>
    </div>
  );
}
