"use client";
import DefaultSelect from "@/common/forms/DefaultSelect";
import { useCallback, useMemo } from "react";

const TablePaginationPerPage = ({
  total = 0,
  onPerPageChange,
  label = "Rows per page",
  perPage = 0,
  fixedPerPage = 5,
}: TablePaginationPerPageProps) => {
  const optionsCount = useMemo(() => {
    return Math.ceil(total / fixedPerPage);
  }, [total, fixedPerPage]);

  const allOptions = useCallback(() => {
    const options = Array.from({ length: optionsCount }, (_, index) => {
      const count = fixedPerPage * (index + 1);
      if (count > total) return null;
      return { label: count, value: count.toString() };
    });

    if (total % fixedPerPage !== 0) {
      options.push({ label: total, value: total.toString() });
    }

    return options.filter(Boolean) || [];
  }, [optionsCount, fixedPerPage, total]);

  const defalutValue = total < perPage ? total : perPage;

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium">{label}</span>
      <DefaultSelect
        options={allOptions() as []}
        defValue={defalutValue.toString()}
        withCheckIcon={false}
        elementWidth="w-[72px]"
        onChange={(val) => {
          const selectedValue = Number(val);
          onPerPageChange(selectedValue, 1);
        }}
      />
    </div>
  );
};

export default TablePaginationPerPage;
