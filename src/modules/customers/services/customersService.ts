import { axiosInstance } from "@/config/axiosInstance";

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
    const { data } = await axiosInstance.get<any[]>("/Customers");
    return data.map(mapCustomerDto);
  },
  
  getById: async (id: string): Promise<Customer> => {
    const { data } = await axiosInstance.get<any>(`/Customers/${id}`);
    return mapCustomerDto(data);
  },
  
  create: async (payload: {
    nameEn: string;
    nameAr?: string;
    email?: string;
    phone?: string;
    address?: string;
    taxNumber?: string;
  }): Promise<Customer> => {
    const command = { request: payload };
    const { data } = await axiosInstance.post<any>("/Customers", command);
    return mapCustomerDto(data);
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
    const command = { id, request: payload };
    const { data } = await axiosInstance.put<any>(`/Customers/${id}`, command);
    return mapCustomerDto(data);
  },
  
  delete: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/Customers/${id}`);
  },
  
  getInvoices: async (customerId: string): Promise<CustomerInvoice[]> => {
    const { data } = await axiosInstance.get<any[]>(`/Customers/${customerId}/invoices`);
    return data.map(mapInvoiceDto);
  },
};
