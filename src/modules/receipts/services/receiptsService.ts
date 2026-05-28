import { axiosInstance } from "@/config/axiosInstance";

export interface Receipt {
  id: string;
  receiptNumber: string;
  orderId: string;
  subtotal: number;
  taxAmount: number;
  discountAmount: number;
  total: number;
  amountPaid: number;
  change: number;
  paymentMethod: string;
  createdAt: string;
}

const mapDto = (dto: any): Receipt => ({
  id: dto.id,
  receiptNumber: dto.receiptNumber || `RCPT-${dto.id.slice(0, 8)}`,
  orderId: dto.orderId,
  subtotal: dto.subtotal ?? 0,
  taxAmount: dto.taxAmount ?? 0,
  discountAmount: dto.discountAmount ?? 0,
  total: dto.total ?? 0,
  amountPaid: dto.amountPaid ?? 0,
  change: dto.change ?? 0,
  paymentMethod: dto.paymentMethod || "Cash",
  createdAt: dto.createdAt || new Date().toISOString(),
});

export const receiptsService = {
  getById: async (id: string): Promise<Receipt> => {
    const { data } = await axiosInstance.get<any>(`/Receipts/${id}`);
    return mapDto(data);
  },

  getByOrderId: async (orderId: string): Promise<Receipt[]> => {
    const { data } = await axiosInstance.get<any[]>(`/Receipts/order/${orderId}`);
    return data.map(mapDto);
  },

  void: async (id: string): Promise<Receipt> => {
    const { data } = await axiosInstance.put<any>(`/Receipts/${id}`, { void: true });
    return mapDto(data);
  },
};
