import {
  deleteApiCustomersById,
  getApiCustomers,
  getApiCustomersById,
  getApiCustomersByIdInvoices,
  postApiCustomers,
  putApiCustomersById,
} from "@/config/swagger-apis";
import { swaggerApiClient } from "@/config/swagger-apis/swaggerApiClient";

export interface Customer {
  id: string;
  nameEn: string;
  nameAr?: string;
  email?: string;
  phone?: string;
  address?: string;
  taxNumber?: string;
  balance: number;
  totalInvoices: number;
  createdAt: string;
}

export interface CustomerInvoice {
  id: string;
  invoiceNumber: string;
  total: number;
  balance: number;
  status: string;
  createdAt: string;
}

const mapCustomerDto = (dto: any): Customer => ({
  id: dto.id,
  nameEn: dto.nameEn || "",
  nameAr: dto.nameAr || undefined,
  email: dto.email || undefined,
  phone: dto.phone || undefined,
  address: dto.address || undefined,
  taxNumber: dto.taxNumber || undefined,
  balance: dto.balance ?? 0,
  totalInvoices: dto.totalInvoices ?? 0,
  createdAt: dto.createdAt || new Date().toISOString(),
});

const mapInvoiceDto = (dto: any): CustomerInvoice => ({
  id: dto.id,
  invoiceNumber: dto.invoiceNumber || `INV-${dto.id.slice(0, 8).toUpperCase()}`,
  total: dto.total ?? 0,
  balance: dto.balance ?? 0,
  status: dto.status || "Pending",
  createdAt: dto.createdAt || new Date().toISOString(),
});

export const customersService = {
  getAll: async (): Promise<Customer[]> => {
    const response = await getApiCustomers({
      client: swaggerApiClient,
      responseStyle: "data",
      throwOnError: true,
    });
    return (Array.isArray(response) ? response : ((response as any)?.data ?? [])).map(mapCustomerDto);
  },

  getById: async (id: string): Promise<Customer> => {
    const response = await getApiCustomersById({
      client: swaggerApiClient,
      path: { id },
      responseStyle: "data",
      throwOnError: true,
    });
    return mapCustomerDto(response as any);
  },

  create: async (payload: {
    nameEn: string;
    nameAr?: string;
    email?: string;
    phone?: string;
    address?: string;
    taxNumber?: string;
  }): Promise<Customer> => {
    const response = await postApiCustomers({
      client: swaggerApiClient,
      body: { request: payload },
      responseStyle: "data",
      throwOnError: true,
    });
    return mapCustomerDto(response as any);
  },

  update: async (
    id: string,
    payload: {
      nameEn: string;
      nameAr?: string;
      email?: string;
      phone?: string;
      address?: string;
      taxNumber?: string;
    }
  ): Promise<Customer> => {
    const response = await putApiCustomersById({
      client: swaggerApiClient,
      path: { id },
      body: { request: payload },
      responseStyle: "data",
      throwOnError: true,
    });
    return mapCustomerDto(response as any);
  },

  delete: async (id: string): Promise<void> => {
    await deleteApiCustomersById({
      client: swaggerApiClient,
      path: { id },
      responseStyle: "data",
      throwOnError: true,
    });
  },

  getInvoices: async (customerId: string): Promise<CustomerInvoice[]> => {
    const response = await getApiCustomersByIdInvoices({
      client: swaggerApiClient,
      path: { id: customerId },
      responseStyle: "data",
      throwOnError: true,
    });
    return (Array.isArray(response) ? response : ((response as any)?.data ?? [])).map(mapInvoiceDto);
  },
};
