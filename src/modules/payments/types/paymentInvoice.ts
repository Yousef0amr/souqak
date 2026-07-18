export interface PaymentInvoice {
  id: string;
  invoiceNumber: string;
  customerName: string;
  total: number;
  balance: number;
  status: string;
  paymentMethod: string;
  createdAt: string;
}
