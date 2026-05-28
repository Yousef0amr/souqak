export interface BrandDto {
  id: string;
  nameEn?: string | null;
  nameAr?: string | null;
  descriptionEn?: string | null;
  descriptionAr?: string | null;
  logoUrl?: string | null;
  website?: string | null;
  country?: string | null;
  active: boolean;
  createdAt?: string;
}

export interface CreateBrandCommand {
  request: {
    nameEn?: string | null;
    nameAr?: string | null;
    descriptionEn?: string | null;
    descriptionAr?: string | null;
    logoUrl?: string | null;
    website?: string | null;
    country?: string | null;
    active?: boolean;
  };
}

export interface UpdateBrandCommand {
  id: string;
  request: {
    nameEn?: string | null;
    nameAr?: string | null;
    descriptionEn?: string | null;
    descriptionAr?: string | null;
    logoUrl?: string | null;
    website?: string | null;
    country?: string | null;
    active?: boolean;
  };
}
