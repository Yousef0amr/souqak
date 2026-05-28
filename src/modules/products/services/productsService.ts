import { axiosInstance } from "@/config/axiosInstance";

export interface CreateProductInput {
  nameEn: string;
  nameAr: string;
  descriptionEn: string;
  descriptionAr: string;
  sku: string;
  barcode: string;
  categoryId: string;
  brandId: string | null;
  costPrice: number;
  sellPrice: number;
  stockQty: number;
  reorderLevel: number;
  baseUnitId: string;
  purchaseUnitId: string | null;
  conversionFactor: number;
  taxId: string;
  active: boolean;
  imageUrl: string;
}

export const mapProductDto = (dto: any): Product => ({
  id: dto.id,
  nameEn: dto.nameEn || "",
  nameAr: dto.nameAr || "",
  descriptionEn: dto.descriptionEn || "",
  descriptionAr: dto.descriptionAr || "",
  sku: dto.sku || "",
  barcode: dto.barcode || "",
  categoryId: dto.categoryId || "",
  categoryNameEn: dto.categoryNameEn || "",
  categoryNameAr: dto.categoryNameAr || "",
  brandId: dto.brandId || null,
  brandNameEn: dto.brandNameEn || "",
  brandNameAr: dto.brandNameAr || "",
  costPrice: dto.costPrice ?? 0,
  sellPrice: dto.sellPrice ?? 0,
  stockQty: dto.stockQty ?? 0,
  reorderLevel: dto.reorderLevel ?? 10,
  baseUnitId: dto.baseUnitId || "",
  baseUnitNameEn: dto.baseUnitNameEn || "",
  baseUnitNameAr: dto.baseUnitNameAr || "",
  purchaseUnitId: dto.purchaseUnitId || null,
  conversionFactor: dto.conversionFactor ?? 1,
  taxId: dto.taxId || "",
  taxNameEn: dto.taxNameEn || "",
  taxNameAr: dto.taxNameAr || "",
  taxRate: dto.taxRate ?? 0,
  active: dto.active ?? true,
  imageUrl: dto.imageUrl || "",
  createdAt: dto.createdAt || new Date().toISOString(),
  updatedAt: dto.updatedAt || null,
});

export const productsService = {
  getAll: async (params?: any): Promise<Product[]> => {
    const { data } = await axiosInstance.get<any>("/Products", { params });
    const products = Array.isArray(data) ? data : data.data || [];
    return products.map(mapProductDto);
  },

  getById: async (id: string): Promise<Product> => {
    const { data } = await axiosInstance.get<any>(`/Products/${id}`);
    return mapProductDto(data);
  },

  create: async (input: CreateProductInput): Promise<Product> => {
    const command = {
      request: {
        nameEn: input.nameEn || "",
        nameAr: input.nameAr || "",
        descriptionEn: input.descriptionEn || "",
        descriptionAr: input.descriptionAr || "",
        sku: input.sku || "",
        barcode: input.barcode || "",
        categoryId: input.categoryId || "00000000-0000-0000-0000-000000000000",
        brandId: input.brandId || null,
        costPrice: input.costPrice || 0,
        sellPrice: input.sellPrice || 0,
        stockQty: input.stockQty || 0,
        reorderLevel: input.reorderLevel ?? 10,
        baseUnitId: input.baseUnitId || "00000000-0000-0000-0000-000000000000",
        purchaseUnitId: input.purchaseUnitId || input.baseUnitId || null,
        conversionFactor: input.conversionFactor ?? 1,
        taxId: input.taxId || "00000000-0000-0000-0000-000000000000",
        active: input.active ?? true,
        imageUrl: input.imageUrl || "",
      },
    };

    const { data } = await axiosInstance.post<any>("/Products", command);
    return mapProductDto(data);
  },

  update: async (id: string, input: Partial<CreateProductInput>): Promise<Product> => {
    const command = {
      id,
      request: {
        nameEn: input.nameEn,
        nameAr: input.nameAr,
        descriptionEn: input.descriptionEn,
        descriptionAr: input.descriptionAr,
        sku: input.sku,
        barcode: input.barcode,
        categoryId: input.categoryId,
        brandId: input.brandId,
        costPrice: input.costPrice,
        sellPrice: input.sellPrice,
        stockQty: input.stockQty,
        reorderLevel: input.reorderLevel,
        baseUnitId: input.baseUnitId,
        purchaseUnitId: input.purchaseUnitId,
        conversionFactor: input.conversionFactor,
        taxId: input.taxId,
        active: input.active,
        imageUrl: input.imageUrl,
      },
    };
    const { data } = await axiosInstance.put<any>(`/Products/${id}`, command);
    return mapProductDto(data);
  },

  delete: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/Products/${id}`);
  },
};
