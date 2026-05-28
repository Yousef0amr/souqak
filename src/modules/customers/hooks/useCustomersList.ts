import { useState, useMemo } from "react";
import { useCustomers, useDeleteCustomer } from "./useCustomers";
import type { Customer } from "../services/customersService";
import { useModalStore } from "@/shared/stores/DynamicModalStore";
import { VisibilityState } from "@tanstack/react-table";

export function useCustomersList() {
  const { data: customers = [], isLoading } = useCustomers();
  const { mutateAsync: deleteCustomer } = useDeleteCustomer();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [deleteTarget, setDeleteTarget] = useState<Customer | null>(null);

  const { openModal } = useModalStore();

  const filteredCustomers = useMemo(() => {
    if (!searchQuery) return customers;
    const query = searchQuery.toLowerCase();
    return customers.filter(
      (c) =>
        c.nameEn.toLowerCase().includes(query) ||
        (c.nameAr && c.nameAr.toLowerCase().includes(query)) ||
        (c.email && c.email.toLowerCase().includes(query)) ||
        (c.phone && c.phone.includes(query))
    );
  }, [customers, searchQuery]);

  const handleCreate = () => {
    openModal({
      componentName: "customer-form",
      modalTitle: "Add Customer Account",
      mode: "dialog",
    });
  };

  const handleEdit = (customer: Customer) => {
    openModal({
      componentName: "customer-form",
      modalTitle: "Edit Customer",
      mode: "dialog",
      extraProps: { customer },
    });
  };

  const handleDeleteClick = (customer: Customer) => {
    setDeleteTarget(customer);
  };

  const confirmDelete = async () => {
    if (deleteTarget) {
      await deleteCustomer(deleteTarget.id);
      setDeleteTarget(null);
    }
  };

  return {
    filteredCustomers,
    isLoading,
    searchQuery,
    setSearchQuery,
    columnVisibility,
    setColumnVisibility,
    deleteTarget,
    setDeleteTarget,
    handleCreate,
    handleEdit,
    handleDeleteClick,
    confirmDelete,
  };
}
