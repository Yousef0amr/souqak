import { 
  getApiExpenses, 
  postApiExpenses, 
  deleteApiExpensesById, 
  putApiExpensesById,
  getApiExpenseCategories,
  postApiExpenseCategories
} from "@/config/swagger-apis";
import { swaggerApiClient } from "@/config/swagger-apis/swaggerApiClient";
import { Expense } from "../types/expense";

const mapExpenseDto = (dto: any): Expense => ({
  id: dto.id,
  title: dto.title || "",
  amount: dto.amount ?? 0,
  category: dto.categoryNameEn || dto.categoryNameAr || "Other",
  date: dto.expenseDate ? dto.expenseDate.split("T")[0] : new Date().toISOString().split("T")[0],
  status: "Paid",
});

export const expensesService = {
  getExpenses: async (): Promise<Expense[]> => {
    const response = await getApiExpenses({
      client: swaggerApiClient,
      responseStyle: "data",
      throwOnError: true,
    });
    return (Array.isArray(response) ? response : ((response as any)?.data ?? [])).map(mapExpenseDto);
  },

  createExpense: async (expense: Omit<Expense, "id" | "date">): Promise<Expense> => {
    let categoryId = "";
    try {
      const categoriesResp = await getApiExpenseCategories({
        client: swaggerApiClient,
        responseStyle: "data",
        throwOnError: true,
      });
      const categories = Array.isArray(categoriesResp) ? categoriesResp : ((categoriesResp as any)?.data ?? []);
      const match = categories.find(
        (c: any) =>
          c.nameEn?.toLowerCase() === expense.category.toLowerCase() ||
          c.nameAr?.toLowerCase() === expense.category.toLowerCase()
      );
      if (match) {
        categoryId = match.id;
      } else {
        const newCatResp = await postApiExpenseCategories({
          client: swaggerApiClient,
          body: {
            nameEn: expense.category,
            nameAr: expense.category,
          },
          responseStyle: "data",
          throwOnError: true,
        });
        const newCat = (newCatResp as any)?.data ?? newCatResp;
        categoryId = newCat.id;
      }
    } catch (catErr) {
      console.warn("Could not resolve or create expense category, using a fallback uuid:", catErr);
      categoryId = "00000000-0000-0000-0000-000000000000";
    }

    const response = await postApiExpenses({
      client: swaggerApiClient,
      body: {
        title: expense.title,
        expenseDate: new Date().toISOString(),
        categoryId,
        amount: expense.amount,
        paymentMethod: "Cash",
        notes: `Status: ${expense.status}`,
      },
      responseStyle: "data",
      throwOnError: true,
    });
    return mapExpenseDto((response as any)?.data ?? response);
  },

  deleteExpense: async (id: string): Promise<void> => {
    await deleteApiExpensesById({
      client: swaggerApiClient,
      path: { id },
      responseStyle: "data",
      throwOnError: true,
    });
  },

  updateExpense: async (id: string, expense: Omit<Expense, "id" | "date">): Promise<Expense> => {
    const response = await putApiExpensesById({
      client: swaggerApiClient,
      path: { id },
      body: {
        title: expense.title,
        amount: expense.amount,
        categoryId: "00000000-0000-0000-0000-000000000000",
        paymentMethod: "Cash",
        notes: `Status: ${expense.status}`,
      },
      responseStyle: "data",
      throwOnError: true,
    });
    return mapExpenseDto((response as any)?.data ?? response);
  },
};
