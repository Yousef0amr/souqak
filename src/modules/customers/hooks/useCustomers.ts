import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { customersService } from "../services/customersService";
import { toast } from "sonner";
import type { Customer } from "../services/customersService";

export function useCustomers() {
  return useQuery({
    queryKey: ["customers"],
    queryFn: () => customersService.getAll(),
  });
}

export function useCustomer(id: string) {
  return useQuery({
    queryKey: ["customer", id],
    queryFn: () => customersService.getById(id),
    enabled: !!id,
  });
}

export function useCreateCustomer() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newCustomer: Parameters<typeof customersService.create>[0]) => 
      customersService.create(newCustomer),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      toast.success("Customer created successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.title || "Failed to create customer");
    },
  });
}

export function useUpdateCustomer() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Parameters<typeof customersService.update>[1] }) =>
      customersService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      toast.success("Customer updated successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.title || "Failed to update customer");
    },
  });
}

export function useDeleteCustomer() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => customersService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      toast.success("Customer deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.title || "Failed to delete customer");
    },
  });
}

export function useCustomerInvoices(customerId: string) {
  return useQuery({
    queryKey: ["customerInvoices", customerId],
    queryFn: () => customersService.getInvoices(customerId),
    enabled: !!customerId,
  });
}
