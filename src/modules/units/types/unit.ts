export interface UnitDto {
  id: string;
  nameEn?: string | null;
  nameAr?: string | null;
  symbol?: string | null;
  type?: string | null;
  active: boolean;
  createdAt?: string;
}

export interface CreateUnitCommand {
  request: {
    nameEn?: string | null;
    nameAr?: string | null;
    symbol?: string | null;
    type?: string | null;
    active?: boolean;
  };
}

export interface UpdateUnitCommand {
  id: string;
  request: {
    nameEn?: string | null;
    nameAr?: string | null;
    symbol?: string | null;
    type?: string | null;
    active?: boolean;
  };
}
