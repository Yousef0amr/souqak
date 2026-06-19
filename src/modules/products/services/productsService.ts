import { swaggerApiClient } from "@/config/swagger-apis/swaggerApiClient";
import {
  getApiProducts,
  getApiProductsById,
  postApiProducts,
  putApiProductsById,
  deleteApiProductsById,
  type ProductDto
} from "@/config/swagger-apis";

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
  images: (File | string)[];
}

export interface Product extends Omit<ProductDto, 'id'> {
  id: string;
  imageUrl: string;
  imageUrls: string[];
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
  imageUrl: (dto.imageUrls && dto.imageUrls.length > 0) ? dto.imageUrls[0] : "",
  imageUrls: dto.imageUrls || [],
  createdAt: dto.createdAt || new Date().toISOString(),
  updatedAt: dto.updatedAt || null,
});

const getFileObjects = (images: (File | string)[]): File[] => {
  return images.map((img, index) => {
    if (typeof img === 'string') {
      // It's a base64 string from the backend, convert it back to a File
      const arr = img.split(',');
      const mimeMatch = arr[0]?.match(/:(.*?);/);
      const mime = mimeMatch ? mimeMatch[1] : 'image/png';
      
      let bstr = '';
      try {
        bstr = atob(arr[1] || '');
      } catch (e) {
        // Fallback for malformed base64
        console.error("Invalid base64 string", e);
        return new File([], `image_${index}.png`, { type: mime });
      }
      
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], `image_${index}.png`, { type: mime });
    }
    return img;
  });
};

export const productsService = {
  getAll: async (params?: any): Promise<Product[]> => {
    const response = await getApiProducts({
      client: swaggerApiClient,
      query: params,
      throwOnError: true,
    });
    const payload = response.data;
    const products = Array.isArray(payload) ? payload : (payload as any)?.data || [];
    return products.map(mapProductDto);
  },

  getById: async (id: string): Promise<Product> => {
    const response = await getApiProductsById({
      client: swaggerApiClient,
      path: { id },
      throwOnError: true,
    });
    return mapProductDto(response.data);
  },

  create: async (input: CreateProductInput): Promise<Product> => {
    const response = await postApiProducts({
      client: swaggerApiClient,
      body: {
        NameEn: input.nameEn || "",
        NameAr: input.nameAr || "",
        DescriptionEn: input.descriptionEn || "",
        DescriptionAr: input.descriptionAr || "",
        Sku: input.sku || "",
        Barcode: input.barcode || "",
        CategoryId: input.categoryId || "00000000-0000-0000-0000-000000000000",
        BrandId: input.brandId || undefined,
        CostPrice: input.costPrice || 0,
        SellPrice: input.sellPrice || 0,
        StockQty: input.stockQty || 0,
        ReorderLevel: input.reorderLevel ?? 10,
        BaseUnitId: input.baseUnitId || "00000000-0000-0000-0000-000000000000",
        PurchaseUnitId: input.purchaseUnitId || input.baseUnitId || undefined,
        ConversionFactor: input.conversionFactor ?? 1,
        TaxId: input.taxId || "00000000-0000-0000-0000-000000000000",
        Active: input.active ?? true,
        Images: input.images ? getFileObjects(input.images) : undefined,
      },
      throwOnError: true,
    });
    return mapProductDto(response.data);
  },

  update: async (id: string, input: Partial<CreateProductInput>): Promise<Product> => {
    const response = await putApiProductsById({
      client: swaggerApiClient,
      path: { id },
      body: {
        NameEn: input.nameEn,
        NameAr: input.nameAr,
        DescriptionEn: input.descriptionEn,
        DescriptionAr: input.descriptionAr,
        Sku: input.sku,
        Barcode: input.barcode,
        CategoryId: input.categoryId,
        BrandId: input.brandId || undefined,
        CostPrice: input.costPrice,
        SellPrice: input.sellPrice,
        StockQty: input.stockQty,
        ReorderLevel: input.reorderLevel,
        BaseUnitId: input.baseUnitId,
        PurchaseUnitId: input.purchaseUnitId || undefined,
        ConversionFactor: input.conversionFactor,
        TaxId: input.taxId,
        Active: input.active,
        Images: input.images ? getFileObjects(input.images) : undefined,
      },
      throwOnError: true,
    });
    return mapProductDto(response.data);
  },

  delete: async (id: string): Promise<void> => {
    await deleteApiProductsById({
      client: swaggerApiClient,
      path: { id },
      throwOnError: true,
    });
  },
};
