export interface Category {
  id: string;
  nameEn: string;
  nameAr: string;
  code: string;
  iconName?: string;
  color?: string;
  image?: File | string | null;
  imageUrl?: string | null;
}
