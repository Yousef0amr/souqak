import React, { useState } from "react";
import { Loader2, AlertCircle } from "lucide-react";
import { useCreateRole } from "../../hooks/useRoles";
import { useModalStore } from "@/shared/stores/DynamicModalStore";
import { Switch } from "@/common/forms/switch";

export default function CreateRoleForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isSystem, setIsSystem] = useState(false);
  const [active, setActive] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const { mutate: createRole, isPending } = useCreateRole();
  const { closeModal } = useModalStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setErrorMsg("");

    createRole(
      { name, description, isSystem, active, permissions: [] } as any,
      {
        onSuccess: () => {
          closeModal();
        },
        onError: (error: any) => {
          setErrorMsg(error?.response?.data?.title || error?.response?.data?.errors?.Request?.[0] || "Failed to create role. Please check API requirements.");
        }
      }
    );
  };

  return (
    <div className="pt-2">
      {errorMsg && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-md flex items-start gap-2 text-red-500 text-sm">
          <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Role Name</label>
          <input
            autoFocus
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            placeholder="e.g. Marketing Lead"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Description (Optional)</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring min-h-[80px]"
            placeholder="Describe the responsibilities of this role..."
          />
        </div>

        <div className="flex items-center justify-between p-3 border rounded-md">
          <div>
            <p className="text-sm font-medium">Active Status</p>
            <p className="text-xs text-muted-foreground">Enable or disable this role entirely.</p>
          </div>
          <Switch checked={active} onCheckedChange={setActive} />
        </div>

        <div className="flex items-center justify-between p-3 border rounded-md">
          <div>
            <p className="text-sm font-medium">System Role</p>
            <p className="text-xs text-muted-foreground">Mark this role as a core system requirement.</p>
          </div>
          <Switch checked={isSystem} onCheckedChange={setIsSystem} />
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={closeModal}
            className="px-4 py-2 rounded-md hover:bg-muted text-sm font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isPending || !name.trim()}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-sm font-medium transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
            Create Role
          </button>
        </div>
      </form>
    </div>
  );
}
