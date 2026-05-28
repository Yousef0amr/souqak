"use client";

import { UsersList } from "@/modules/users";

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Users & Permissions</h1>
        <p className="text-muted-foreground">Manage system users, roles, and access levels</p>
      </div>
      <UsersList />
    </div>
  );
}
