"use client";

import React, { useState } from "react";
import { useUsers, useCreateUser, useUpdateUser, useDeleteUser } from "../hooks/useUsers";
import { DataTable } from "@/common/tables/DataTable";
import { Badge } from "@/common/shared/badge";
import { Button } from "@/common/buttons/button";
import { Input } from "@/common/forms/input";
import { Search, Plus, UserPlus, Pencil, Trash, MoreHorizontal, Shield, ShieldCheck, ShieldX } from "lucide-react";
import { ConfirmDialog } from "@/common/shared/confirm-dialog";
import { ColumnDef, VisibilityState } from "@tanstack/react-table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/common/models/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/common/shared/dropdown-menu";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import type { User } from "../services/usersService";

const userSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email"),
  role: z.string().min(2, "Role is required"),
  password: z.string().min(6, "Password must be at least 6 characters").optional().or(z.literal("")),
});

type UserFormData = z.infer<typeof userSchema>;

export function UsersList() {
  const { data: users = [], isLoading } = useUsers();
  const createMutation = useCreateUser();
  const updateMutation = useUpdateUser();
  const deleteMutation = useDeleteUser();
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [deleteTarget, setDeleteTarget] = useState<User | null>(null);

  const form = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: { name: "", email: "", role: "Staff", password: "" },
  });

  const { register, handleSubmit, reset, setValue, formState: { errors, isSubmitting } } = form;

  const openAdd = () => {
    setEditingUser(null);
    reset({ name: "", email: "", role: "Staff", password: "" });
    setIsDialogOpen(true);
  };

  const openEdit = (u: User) => {
    setEditingUser(u);
    setValue("name", u.name);
    setValue("email", u.email);
    setValue("role", u.role);
    setValue("password", "");
    setIsDialogOpen(true);
  };

  const onSubmit = async (data: UserFormData) => {
    try {
      if (editingUser) {
        await updateMutation.mutateAsync({
          id: editingUser.id,
          payload: { name: data.name, email: data.email, role: data.role },
        });
      } else {
        await createMutation.mutateAsync({
          name: data.name,
          email: data.email,
          role: data.role,
          password: data.password || "changeme123",
        });
      }
      setIsDialogOpen(false);
      setEditingUser(null);
      reset();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = (u: User) => {
    setDeleteTarget(u);
  };

  const toggleActive = (u: User) => {
    updateMutation.mutate({ id: u.id, payload: { active: !u.active } });
  };

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => <span className="font-semibold">{row.original.name}</span>,
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => <span className="text-muted-foreground">{row.original.email}</span>,
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => (
        <Badge variant={row.original.role === "Admin" ? "default" : "secondary"} className="flex items-center gap-1 w-fit">
          {row.original.role === "Admin" ? <ShieldCheck className="h-3 w-3" /> : <Shield className="h-3 w-3" />}
          {row.original.role}
        </Badge>
      ),
    },
    {
      accessorKey: "active",
      header: "Status",
      cell: ({ row }) => {
        const active = row.original.active;
        return (
          <Badge
            className={`cursor-pointer ${active ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"}`}
            onClick={() => toggleActive(row.original)}
          >
            {active ? "Active" : "Inactive"}
          </Badge>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const u = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon"><MoreHorizontal className="size-4" /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => openEdit(u)}><Pencil className="size-4 mr-2" /> Edit</DropdownMenuItem>
              <DropdownMenuItem variant="destructive" onClick={() => handleDelete(u)}><Trash className="size-4 mr-2" /> Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center gap-4">
        <div className="flex items-center gap-2 max-w-sm w-full">
          <Search className="h-4 w-4 text-muted-foreground absolute ml-3" />
          <Input placeholder="Search by name, email, role..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9" />
        </div>
        <Button onClick={openAdd} className="flex items-center gap-2"><Plus className="h-4 w-4" /> Invite User</Button>
      </div>

      <div className="rounded-lg border bg-card shadow-sm p-2">
        <DataTable data={filtered} columns={columns} columnVisibility={columnVisibility} setColumnVisibility={setColumnVisibility} isLoading={isLoading} scrollAreaClassName="h-[500px]" />
      </div>

      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => { if (!open) setDeleteTarget(null); }}
        onConfirm={() => {
          if (deleteTarget) {
            deleteMutation.mutate(deleteTarget.id);
            setDeleteTarget(null);
          }
        }}
        title="Delete user"
        description={`Are you sure you want to delete "${deleteTarget?.name}"? This cannot be undone.`}
      />

      <Dialog open={isDialogOpen} onOpenChange={(o) => { setIsDialogOpen(o); if (!o) setEditingUser(null); }}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl font-bold">
              <UserPlus className="h-5 w-5 text-indigo-500" />
              {editingUser ? "Edit User" : "Add System User"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-2">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-muted-foreground">Full Name</span>
              <Input placeholder="John Doe" {...register("name")} />
              {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
            </div>
            <div className="space-y-1">
              <span className="text-xs font-semibold text-muted-foreground">Email Address</span>
              <Input type="email" placeholder="john@company.com" {...register("email")} />
              {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
            </div>
            <div className="space-y-1">
              <span className="text-xs font-semibold text-muted-foreground">Role</span>
              <select {...register("role")} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <option value="Admin">Admin</option>
                <option value="Manager">Manager</option>
                <option value="Staff">Staff</option>
                <option value="Cashier">Cashier</option>
              </select>
            </div>
            {!editingUser && (
              <div className="space-y-1">
                <span className="text-xs font-semibold text-muted-foreground">Initial Password</span>
                <Input type="password" placeholder="min 6 characters" {...register("password")} />
                {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
              </div>
            )}
            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={() => { setIsDialogOpen(false); setEditingUser(null); }}>Cancel</Button>
              <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Saving..." : editingUser ? "Update User" : "Create User Account"}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
