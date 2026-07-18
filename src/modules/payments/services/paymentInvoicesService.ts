import { 
  getApiPaymentInvoices,
  getApiPaymentInvoicesOverdue,
  postApiPaymentInvoicesByIdPay
} from "@/config/swagger-apis";
import { swaggerApiClient } from "@/config/swagger-apis/swaggerApiClient";
import { PaymentInvoice } from "../types/paymentInvoice";

const mapInvoiceDto = (dto: any): PaymentInvoice => ({
  id: dto.id,
  invoiceNumber: dto.invoiceNumber || `INV-${dto.id.slice(0, 8)}`,
  customerName: dto.customerNameEn || dto.customerNameAr || "Customer",
  total: dto.total ?? 0,
  balance: dto.balance ?? 0,
  status: dto.status || "Pending",
  paymentMethod: dto.paymentMethod || "Cash",
  createdAt: dto.createdAt || new Date().toISOString(),
});

export const paymentInvoicesService = {
  getPaymentInvoices: async (): Promise<PaymentInvoice[]> => {
    const response = await getApiPaymentInvoices({
      client: swaggerApiClient,
      responseStyle: "data",
      throwOnError: true,
    });
    return (Array.isArray(response) ? response : ((response as any)?.data ?? [])).map(mapInvoiceDto);
  },

  getOverdueInvoices: async (): Promise<PaymentInvoice[]> => {
    const response = await getApiPaymentInvoicesOverdue({
      client: swaggerApiClient,
      responseStyle: "data",
      throwOnError: true,
    });
    return (Array.isArray(response) ? response : ((response as any)?.data ?? [])).map(mapInvoiceDto);
  },

  markInvoicePaid: async (id: string, amountPaid?: number): Promise<PaymentInvoice> => {
    const response = await postApiPaymentInvoicesByIdPay({
      client: swaggerApiClient,
      path: { id },
      body: {
        amountPaid: amountPaid ?? null,
      },
      responseStyle: "data",
      throwOnError: true,
    });
    return mapInvoiceDto((response as any)?.data ?? response);
  },
};
