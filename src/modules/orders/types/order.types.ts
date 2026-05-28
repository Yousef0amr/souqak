export interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  total: number;
  itemsCount: number;
  date: string;
  status: "Completed" | "Pending" | "Cancelled";
  paymentMethod: "Cash" | "Card";
  items: OrderItem[];
}

export interface CreateOrderRequest {
  customerName: string;
  total: number;
  itemsCount: number;
  paymentMethod: "Cash" | "Card";
  items: OrderItem[];
}
