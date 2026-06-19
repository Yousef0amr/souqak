import {
  getApiPurchaseInvoices,
  getApiPurchaseInvoicesById,
  getApiPurchaseInvoicesPending,
  postApiPurchaseInvoices,
  postApiPurchaseInvoicesByIdApprove,
} from "@/config/swagger-apis";
import { swaggerApiClient } from "@/config/swagger-apis/swaggerApiClient";

export interface PurchaseInvoiceItem {
  id: string;
  productId: string;
  productNameEn: string;
  productNameAr: string;
  quantity: number;
  unitCost: number;
  totalCost: number;
}

export interface PurchaseInvoice {
  id: string;
  referenceNumber: string;
  supplierInvoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  supplierId: string;
  supplierNameEn: string;
  supplierNameAr: string;
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  shippingCost: number;
  total: number;
  amountPaid: number;
  balance: number;
  status: string;
  paymentMethod: string;
  stockUpdated: boolean;
  notes: string;
  approvedByName: string;
  approvedAt: string | null;
  createdAt: string;
  items: PurchaseInvoiceItem[];
}

const mapItemDto = (dto: any): PurchaseInvoiceItem => ({
  id: dto.id,
  productId: dto.productId,
  productNameEn: dto.productNameEn || "",
  productNameAr: dto.productNameAr || "",
  quantity: dto.quantity ?? 0,
  unitCost: dto.unitCost ?? 0,
  totalCost: dto.totalCost ?? 0,
});

const mapInvoiceDto = (dto: any): PurchaseInvoice => ({
  id: dto.id,
  referenceNumber: dto.referenceNumber || `PO-${dto.id.slice(0, 8)}`,
  supplierInvoiceNumber: dto.supplierInvoiceNumber || "",
  invoiceDate: dto.invoiceDate ? dto.invoiceDate.split("T")[0] : "",
  dueDate: dto.dueDate ? dto.dueDate.split("T")[0] : "",
  supplierId: dto.supplierId,
  supplierNameEn: dto.supplierNameEn || "",
  supplierNameAr: dto.supplierNameAr || "",
  subtotal: dto.subtotal ?? 0,
  taxRate: dto.taxRate ?? 0,
  taxAmount: dto.taxAmount ?? 0,
  shippingCost: dto.shippingCost ?? 0,
  total: dto.total ?? 0,
  amountPaid: dto.amountPaid ?? 0,
  balance: dto.balance ?? 0,
  status: dto.status || "Pending",
  paymentMethod: dto.paymentMethod || "Cash",
  stockUpdated: dto.stockUpdated ?? false,
  notes: dto.notes || "",
  approvedByName: dto.approvedByName || "",
  approvedAt: dto.approvedAt || null,
  createdAt: dto.createdAt || new Date().toISOString(),
  items: Array.isArray(dto.items) ? dto.items.map(mapItemDto) : [],
});

export const purchaseInvoicesService = {
  getAll: async (): Promise<PurchaseInvoice[]> => {
    const response = await getApiPurchaseInvoices({
      client: swaggerApiClient,
      responseStyle: "data",
      throwOnError: true,
    });
    return (Array.isArray(response) ? response : ((response as any)?.data ?? [])).map(mapInvoiceDto);
  },

  getById: async (id: string): Promise<PurchaseInvoice> => {
    const response = await getApiPurchaseInvoicesById({
      client: swaggerApiClient,
      path: { id },
      responseStyle: "data",
      throwOnError: true,
    });
    return mapInvoiceDto(response as any);
  },

  getPending: async (): Promise<PurchaseInvoice[]> => {
    const response = await getApiPurchaseInvoicesPending({
      client: swaggerApiClient,
      responseStyle: "data",
      throwOnError: true,
    });
    return (Array.isArray(response) ? response : ((response as any)?.data ?? [])).map(mapInvoiceDto);
  },

  create: async (payload: {
    supplierInvoiceNumber?: string;
    invoiceDate: string;
    dueDate: string;
    supplierId: string;
    taxRate: number;
    shippingCost: number;
    paymentMethod: string;
    notes?: string;
    updateStockOnApproval: boolean;
    items: {
      productId: string;
      description?: string;
      descriptionAr?: string;
      quantity: number;
      unitCost: number;
    }[];
  }): Promise<PurchaseInvoice> => {
    const response = await postApiPurchaseInvoices({
      client: swaggerApiClient,
      body: {
        supplierInvoiceNumber: payload.supplierInvoiceNumber,
        invoiceDate: payload.invoiceDate,
        dueDate: payload.dueDate,
        supplierId: payload.supplierId,
        taxRate: payload.taxRate,
        shippingCost: payload.shippingCost,
        paymentMethod: payload.paymentMethod,
        notes: payload.notes,
        updateStockOnApproval: payload.updateStockOnApproval,
        items: payload.items.map((item) => ({
          productId: item.productId,
          description: item.description ?? undefined,
          descriptionAr: item.descriptionAr ?? undefined,
          quantity: item.quantity,
          unitCost: item.unitCost,
        })),
      },
      responseStyle: "data",
      throwOnError: true,
    });
    return mapInvoiceDto(response as any);
  },

  approve: async (id: string): Promise<PurchaseInvoice> => {
    const response = await postApiPurchaseInvoicesByIdApprove({
      client: swaggerApiClient,
      path: { id },
      responseStyle: "data",
      throwOnError: true,
    });
    return mapInvoiceDto(response as any);
  },

  // delete: async (id: string): Promise<void> => {
  //   await deleteApiPurchaseInvoicesById({
  //     client: swaggerApiClient,
  //     path: { id },
  //     responseStyle: "data",
  //     throwOnError: true,
  //   });
  // },
};
