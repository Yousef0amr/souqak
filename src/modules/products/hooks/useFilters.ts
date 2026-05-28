import * as React from "react";

export interface FilterState {
  statusFilter: string;
  category: string;
  minPrice: string;
  maxPrice: string;
  dateRange: { from?: Date; to?: Date } | undefined;
}

export function useFilters() {
  const [filters, setFilters] = React.useState<FilterState>({
    statusFilter: "",
    category: "",
    minPrice: "",
    maxPrice: "",
    dateRange: undefined,
  });

  const updateFilter = React.useCallback((key: keyof FilterState, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  const resetFilters = React.useCallback(() => {
    setFilters({
      statusFilter: "",
      category: "",
      minPrice: "",
      maxPrice: "",
      dateRange: undefined,
    });
  }, []);

  const hasActiveFilters = React.useMemo(() => {
    return Object.values(filters).some(
      (value) =>
        value !== "" && value !== undefined && (typeof value === "string" ? value.length > 0 : true)
    );
  }, [filters]);

  const clearFilter = React.useCallback(
    (key: keyof FilterState) => {
      const defaultValue = key === "dateRange" ? undefined : "";
      updateFilter(key, defaultValue);
    },
    [updateFilter]
  );

  return {
    filters,
    updateFilter,
    resetFilters,
    clearFilter,
    hasActiveFilters,
    // Individual filter getters for convenience
    statusFilter: filters.statusFilter,
    category: filters.category,
    minPrice: filters.minPrice,
    maxPrice: filters.maxPrice,
    dateRange: filters.dateRange,
  };
}
