import {
  deleteApiBrandsById,
  getApiBrands,
  getApiBrandsById,
  postApiBrands,
  putApiBrandsById,
} from "@/config/swagger-apis";
import { swaggerApiClient } from "@/config/swagger-apis/swaggerApiClient";
import { BrandDto, CreateBrandCommand, UpdateBrandCommand } from "../types/brand";

const getFileObject = (img: File | string | null | undefined): File | undefined => {
  if (!img) return undefined;
  if (img instanceof File) return img;
  if (typeof img === 'string') {
    // If it's a base64 string, convert it to a File
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

const mapBrandRequest = (command: CreateBrandCommand | UpdateBrandCommand | { request?: any }) => ({
  NameEn: command.request?.nameEn,
  NameAr: command.request?.nameAr,
  DescriptionEn: command.request?.descriptionEn,
  DescriptionAr: command.request?.descriptionAr,
  Website: command.request?.website,
  Country: command.request?.country,
  Active: command.request?.active,
  Image: getFileObject(command.request?.image) || undefined,
});

export const brandsService = {
  getAll: async (): Promise<BrandDto[]> => {
    const response = await getApiBrands({
      client: swaggerApiClient,
      responseStyle: "data",
      throwOnError: true,
    });
    return (Array.isArray(response) ? response : (response as any)?.data ?? []) as BrandDto[];
  },

  getById: async (id: string): Promise<BrandDto> => {
    const response = await getApiBrandsById({
      client: swaggerApiClient,
      path: { id },
      responseStyle: "data",
      throwOnError: true,
    });
    return (response as any)?.data ?? response;
  },

  create: async (brand: CreateBrandCommand): Promise<BrandDto> => {
    const response = await postApiBrands({
      client: swaggerApiClient,
      body: mapBrandRequest(brand),
      responseStyle: "data",
      throwOnError: true,
    });
    return (response as any)?.data ?? response;
  },

  update: async (id: string, command: UpdateBrandCommand): Promise<BrandDto> => {
    const response = await putApiBrandsById({
      client: swaggerApiClient,
      path: { id },
      body: mapBrandRequest(command),
      responseStyle: "data",
      throwOnError: true,
    });
    return (response as any)?.data ?? response;
  },

  delete: async (id: string): Promise<void> => {
    await deleteApiBrandsById({
      client: swaggerApiClient,
      path: { id },
      responseStyle: "data",
      throwOnError: true,
    });
  },
};
