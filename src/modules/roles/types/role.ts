export interface Permission {
  id: string;
  name: string;
  description: string;
  module: string;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  isCustom: boolean;
  isSystem?: boolean;
  active?: boolean;
  permissions: string[]; // array of permission ids
}

export interface UpdateRolePermissionsPayload {
  role: Role;
  permissionId: string;
  enabled: boolean;
}

export interface CreateRolePayload {
  name: string;
  description: string;
  permissions: string[];
}
