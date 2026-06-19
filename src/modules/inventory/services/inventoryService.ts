import {
  getApiProductsById,
  getApiProducts,
  postApiInventoryByProductIdAddStock,
} from "@/config/swagger-apis";
import { swaggerApiClient } from "@/config/swagger-apis/swaggerApiClient";

export interface Product {
  id: string;
  name: string;
  department: string;
  sku: string;
  brand: string;
  category: string;
  subcategory: string;
  description: string;
  variant: {
    id: string;
    variant_sku: string;
    color: string;
    costPrice: number;
    retailPrice: number;
    size: string;
    barcode: string;
    stock?: number;
  };
}

const mapProductDto = (dto: any): Product => ({
  id: dto.id,
  name: dto.nameEn || dto.nameAr || "",
  department: dto.categoryNameEn || "General",
  sku: dto.sku || "",
  brand: dto.brandNameEn || dto.brandNameAr || "General",
  category: dto.categoryNameEn || "General",
  subcategory: dto.categoryNameAr || "",
  description: dto.descriptionEn || dto.descriptionAr || "",
  variant: {
    id: dto.id,
    variant_sku: dto.sku || "",
    color: "Standard",
    costPrice: dto.costPrice ?? 0,
    retailPrice: dto.sellPrice ?? 0,
    size: "Standard",
    barcode: dto.barcode || "",
    stock: dto.stockQty ?? 0,
  },
});

export const inventoryService = {
  getAllProducts: async (): Promise<Product[]> => {
    const response = await getApiProducts({
      client: swaggerApiClient,
      responseStyle: "data",
      throwOnError: true,
    });
    return (Array.isArray(response) ? response : ((response as any)?.data ?? [])).map(mapProductDto);
  },

  adjustStock: async (id: string, amount: number): Promise<Product | undefined> => {
    await postApiInventoryByProductIdAddStock({
      client: swaggerApiClient,
      path: { productId: id },
      body: { quantityToAdd: amount, note: "Manual stock adjustment via Admin Panel" },
      responseStyle: "data",
      throwOnError: true,
    });

    const response = await getApiProductsById({
      client: swaggerApiClient,
      path: { id },
      responseStyle: "data",
      throwOnError: true,
    });

    return mapProductDto(response as any);
  },
};
