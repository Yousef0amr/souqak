import { axiosInstance } from "@/config/axiosInstance";

export interface Category {
  id: string;
  nameEn: string;
  nameAr: string;
  code: string;
}

export interface Brand {
  id: string;
  nameEn: string;
  nameAr: string;
  description: string;
}

export interface Unit {
  id: string;
  nameEn: string;
  nameAr: string;
  abbreviation: string;
}

export interface Tax {
  id: string;
  name: string;
  rate: number;
}

const mapCategoryDto = (dto: any): Category => ({
  id: dto.id,
  nameEn: dto.nameEn || "",
  nameAr: dto.nameAr || "",
  code: dto.descriptionEn || dto.sortOrder?.toString() || "",
});

const mapBrandDto = (dto: any): Brand => ({
  id: dto.id,
  nameEn: dto.nameEn || "",
  nameAr: dto.nameAr || "",
  description: dto.descriptionEn || "",
});

const mapUnitDto = (dto: any): Unit => ({
  id: dto.id,
  nameEn: dto.nameEn || "",
  nameAr: dto.nameAr || "",
  abbreviation: dto.symbol || "",
});

const mapTaxDto = (dto: any): Tax => ({
  id: dto.id,
  name: dto.nameEn || dto.nameAr || "",
  rate: dto.value ?? 0,
});

export const settingsService = {
  // Categories CRUD
  getCategories: async (): Promise<Category[]> => {
    const { data } = await axiosInstance.get<any[]>("/Categories");
    return data.map(mapCategoryDto);
  },
  addCategory: async (category: Omit<Category, "id">): Promise<Category> => {
    const command = {
      request: {
        nameEn: category.nameEn,
        nameAr: category.nameAr,
        descriptionEn: category.code || "",
        descriptionAr: "",
        active: true,
      },
    };
    const { data } = await axiosInstance.post<any>("/Categories", command);
    return mapCategoryDto(data);
  },
  updateCategory: async (id: string, category: Omit<Category, "id">): Promise<Category> => {
    const command = {
      id,
      request: {
        nameEn: category.nameEn,
        nameAr: category.nameAr,
        descriptionEn: category.code || "",
        descriptionAr: "",
        active: true,
      },
    };
    const { data } = await axiosInstance.put<any>(`/Categories/${id}`, command);
    return mapCategoryDto(data);
  },
  deleteCategory: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/Categories/${id}`);
  },

  // Brands CRUD
  getBrands: async (): Promise<Brand[]> => {
    const { data } = await axiosInstance.get<any[]>("/Brands");
    return data.map(mapBrandDto);
  },
  addBrand: async (brand: Omit<Brand, "id">): Promise<Brand> => {
    const command = {
      request: {
        nameEn: brand.nameEn,
        nameAr: brand.nameAr,
        descriptionEn: brand.description || "",
        descriptionAr: "",
        active: true,
        logoUrl: "",
        website: "",
        country: "",
      },
    };
    const { data } = await axiosInstance.post<any>("/Brands", command);
    return mapBrandDto(data);
  },
  updateBrand: async (id: string, brand: Omit<Brand, "id">): Promise<Brand> => {
    const command = {
      id,
      request: {
        nameEn: brand.nameEn,
        nameAr: brand.nameAr,
        descriptionEn: brand.description || "",
        descriptionAr: "",
        active: true,
        logoUrl: "",
        website: "",
        country: "",
      },
    };
    const { data } = await axiosInstance.put<any>(`/Brands/${id}`, command);
    return mapBrandDto(data);
  },
  deleteBrand: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/Brands/${id}`);
  },

  // Units CRUD
  getUnits: async (): Promise<Unit[]> => {
    const { data } = await axiosInstance.get<any[]>("/Units");
    return data.map(mapUnitDto);
  },
  addUnit: async (unit: Omit<Unit, "id">): Promise<Unit> => {
    const command = {
      request: {
        nameEn: unit.nameEn,
        nameAr: unit.nameAr,
        symbol: unit.abbreviation,
        type: "Piece",
        active: true,
      },
    };
    const { data } = await axiosInstance.post<any>("/Units", command);
    return mapUnitDto(data);
  },
  updateUnit: async (id: string, unit: Omit<Unit, "id">): Promise<Unit> => {
    const command = {
      id,
      request: {
        nameEn: unit.nameEn,
        nameAr: unit.nameAr,
        symbol: unit.abbreviation,
        type: "Piece",
        active: true,
      },
    };
    const { data } = await axiosInstance.put<any>(`/Units/${id}`, command);
    return mapUnitDto(data);
  },
  deleteUnit: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/Units/${id}`);
  },

  // Taxes CRUD
  getTaxes: async (): Promise<Tax[]> => {
    const { data } = await axiosInstance.get<any[]>("/Taxes");
    return data.map(mapTaxDto);
  },
  addTax: async (tax: Omit<Tax, "id">): Promise<Tax> => {
    const command = {
      request: {
        nameEn: tax.name,
        nameAr: tax.name,
        type: "Percentage",
        value: tax.rate,
        active: true,
        isDefault: false,
      },
    };
    const { data } = await axiosInstance.post<any>("/Taxes", command);
    return mapTaxDto(data);
  },
  updateTax: async (id: string, tax: Omit<Tax, "id">): Promise<Tax> => {
    const command = {
      id,
      request: {
        nameEn: tax.name,
        nameAr: tax.name,
        type: "Percentage",
        value: tax.rate,
        active: true,
        isDefault: false,
      },
    };
    const { data } = await axiosInstance.put<any>(`/Taxes/${id}`, command);
    return mapTaxDto(data);
  },
  deleteTax: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/Taxes/${id}`);
  },
};
