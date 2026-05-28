import { axiosInstance } from "@/config/axiosInstance";

export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
  status: "Paid" | "Pending";
}

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

const mapExpenseDto = (dto: any): Expense => ({
  id: dto.id,
  title: dto.title || "",
  amount: dto.amount ?? 0,
  category: dto.categoryNameEn || dto.categoryNameAr || "Other",
  date: dto.expenseDate ? dto.expenseDate.split("T")[0] : new Date().toISOString().split("T")[0],
  status: "Paid",
});

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

export const paymentsService = {
  getExpenses: async (): Promise<Expense[]> => {
    const { data } = await axiosInstance.get<any[]>("/Expenses");
    return data.map(mapExpenseDto);
  },

  createExpense: async (expense: Omit<Expense, "id" | "date">): Promise<Expense> => {
    let categoryId = "";
    try {
      const { data: categories } = await axiosInstance.get<any[]>("/ExpenseCategories");
      const match = categories.find(
        (c) =>
          c.nameEn?.toLowerCase() === expense.category.toLowerCase() ||
          c.nameAr?.toLowerCase() === expense.category.toLowerCase()
      );
      if (match) {
        categoryId = match.id;
      } else {
        const { data: newCat } = await axiosInstance.post<any>("/ExpenseCategories", {
          nameEn: expense.category,
          nameAr: expense.category,
        });
        categoryId = newCat.id;
      }
    } catch (catErr) {
      console.warn("Could not resolve or create expense category, using a fallback uuid:", catErr);
      categoryId = "00000000-0000-0000-0000-000000000000";
    }

    const requestPayload = {
      title: expense.title,
      expenseDate: new Date().toISOString(),
      categoryId,
      amount: expense.amount,
      paymentMethod: "Cash",
      notes: `Status: ${expense.status}`,
    };

    const { data } = await axiosInstance.post<any>("/Expenses", requestPayload);
    return mapExpenseDto(data);
  },

  deleteExpense: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/Expenses/${id}`);
  },

  updateExpense: async (id: string, expense: Omit<Expense, "id" | "date">): Promise<Expense> => {
    const { data } = await axiosInstance.put<any>(`/Expenses/${id}`, {
      title: expense.title,
      amount: expense.amount,
      categoryId: "00000000-0000-0000-0000-000000000000",
      paymentMethod: "Cash",
      notes: `Status: ${expense.status}`,
    });
    return mapExpenseDto(data);
  },

  getPaymentInvoices: async (): Promise<PaymentInvoice[]> => {
    const { data } = await axiosInstance.get<any[]>("/PaymentInvoices");
    return data.map(mapInvoiceDto);
  },

  getOverdueInvoices: async (): Promise<PaymentInvoice[]> => {
    const { data } = await axiosInstance.get<any[]>("/PaymentInvoices/overdue");
    return data.map(mapInvoiceDto);
  },

  markInvoicePaid: async (id: string, amountPaid?: number): Promise<PaymentInvoice> => {
    const { data } = await axiosInstance.post<any>(`/PaymentInvoices/${id}/pay`, {
      amountPaid: amountPaid ?? null,
    });
    return mapInvoiceDto(data);
  },
};
