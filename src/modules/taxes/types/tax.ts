export interface TaxDto {
  id: string;
  nameEn?: string | null;
  nameAr?: string | null;
  type?: string | null;
  value: number;
  active: boolean;
  isDefault: boolean;
  createdAt?: string;
}

export interface CreateTaxCommand {
  request: {
    nameEn?: string | null;
    nameAr?: string | null;
    type?: string | null;
    value: number;
    active?: boolean;
    isDefault?: boolean;
  };
}

export interface UpdateTaxCommand {
  id: string;
  request: {
    nameEn?: string | null;
    nameAr?: string | null;
    type?: string | null;
    value?: number;
    active?: boolean;
    isDefault?: boolean;
  };
}
