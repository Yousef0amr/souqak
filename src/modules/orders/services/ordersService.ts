import {
  getApiOrders,
  getApiOrdersById,
  postApiOrders,
} from "@/config/swagger-apis";
import { swaggerApiClient } from "@/config/swagger-apis/swaggerApiClient";

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  total: number;
  itemsCount: number;
  date: string;
  status: "Completed" | "Pending" | "Cancelled";
  paymentMethod: "Cash" | "Card";
  items: Array<{
    productId: string;
    name: string;
    quantity: number;
    price: number;
  }>;
}

const mapOrderDto = (dto: any): Order => ({
  id: dto.id,
  orderNumber: dto.orderNumber || `ORD-${dto.id.slice(0, 8).toUpperCase()}`,
  customerName: dto.cashierName || "Walk-in Customer",
  total: dto.total ?? 0,
  itemsCount: dto.items?.reduce((sum: number, item: any) => sum + (item.quantity ?? 0), 0) ?? 0,
  date: dto.createdAt || new Date().toISOString(),
  status: (dto.status === "Completed" || dto.status === "Pending" || dto.status === "Cancelled") ? dto.status : "Completed",
  paymentMethod: (dto.paymentMethod === "Cash" || dto.paymentMethod === "Card") ? dto.paymentMethod : "Cash",
  items: dto.items?.map((item: any) => ({
    productId: item.productId,
    name: item.productName || "Product",
    quantity: item.quantity ?? 1,
    price: item.unitPrice ?? 0,
  })) || [],
});

export const ordersService = {
  getAll: async (): Promise<Order[]> => {
    const response = await getApiOrders({
      client: swaggerApiClient,
      responseStyle: "data",
      throwOnError: true,
    });
    return (Array.isArray(response) ? response : ((response as any)?.data ?? [])).map(mapOrderDto);
  },

  getById: async (id: string): Promise<Order> => {
    const response = await getApiOrdersById({
      client: swaggerApiClient,
      path: { id },
      responseStyle: "data",
      throwOnError: true,
    });
    return mapOrderDto(response as any);
  },

  create: async (order: Omit<Order, "id" | "orderNumber" | "date">): Promise<Order> => {
    const response = await postApiOrders({
      client: swaggerApiClient,
      body: {
        paymentMethod: order.paymentMethod,
        amountPaid: order.total,
        notes: `POS Checkout - ${order.itemsCount} items`,
        items: order.items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
      },
      responseStyle: "data",
      throwOnError: true,
    });
    return mapOrderDto(response as any);
  },
};
