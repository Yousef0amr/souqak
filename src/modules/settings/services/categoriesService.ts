import { 
  getApiCategories, 
  postApiCategories, 
  putApiCategoriesById, 
  deleteApiCategoriesById 
} from "@/config/swagger-apis";
import { swaggerApiClient } from "@/config/swagger-apis/swaggerApiClient";
import { Category } from "../types/category";

const getFileObject = (img: File | string | null | undefined): File | undefined => {
  if (!img) return undefined;
  if (img instanceof File) return img;
  if (typeof img === 'string') {
    if (img.startsWith('data:')) {
      const arr = img.split(',');
      const mimeMatch = arr[0].match(/:(.*?);/);
      const mime = mimeMatch ? mimeMatch[1] : 'image/png';
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], `image.png`, { type: mime });
    }
  }
  return undefined;
};

const mapCategoryDto = (dto: any): Category => ({
  id: dto.id,
  nameEn: dto.nameEn || "",
  nameAr: dto.nameAr || "",
  code: dto.descriptionEn || dto.sortOrder?.toString() || "",
  iconName: dto.iconName || "",
  color: dto.color || "",
  imageUrl: dto.imageUrl || "",
});

export const categoriesService = {
  getAll: async (): Promise<Category[]> => {
    const response = await getApiCategories({
      client: swaggerApiClient,
      responseStyle: "data",
      throwOnError: true,
    });
    return (Array.isArray(response) ? response : ((response as any)?.data ?? [])).map(mapCategoryDto);
  },

  create: async (category: Omit<Category, "id">): Promise<Category> => {
    const response = await postApiCategories({
      client: swaggerApiClient,
      body: {
        NameEn: category.nameEn,
        NameAr: category.nameAr,
        DescriptionEn: category.code || "",
        DescriptionAr: "",
        IconName: category.iconName || "",
        Color: category.color || "",
        Active: true,
        Image: getFileObject(category.image) || undefined,
      },
      responseStyle: "data",
      throwOnError: true,
    });
    return mapCategoryDto(response as any);
  },

  update: async (id: string, category: Omit<Category, "id">): Promise<Category> => {
    const response = await putApiCategoriesById({
      client: swaggerApiClient,
      path: { id },
      body: {
        NameEn: category.nameEn,
        NameAr: category.nameAr,
        DescriptionEn: category.code || "",
        DescriptionAr: "",
        IconName: category.iconName || "",
        Color: category.color || "",
        Active: true,
        Image: getFileObject(category.image) || undefined,
      },
      responseStyle: "data",
      throwOnError: true,
    });
    return mapCategoryDto(response as any);
  },

  delete: async (id: string): Promise<void> => {
    await deleteApiCategoriesById({
      client: swaggerApiClient,
      path: { id },
      responseStyle: "data",
      throwOnError: true,
    });
  },
};
