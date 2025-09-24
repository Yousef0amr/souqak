"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/common/shared/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, ReactElement } from "react";

export function DataListPagination({
  total,
  perPage,
  currentPage,
  onPageChange,
}: DataListPaginationProps) {
  const totalPages = Math.ceil(total / perPage);

  const renderedPages = useMemo(() => {
    const pages: ReactElement[] = [];

    const start = Math.max(currentPage - 1, 1);
    const end = Math.min(currentPage + 1, totalPages);

    if (start > 1) {
      pages.push(
        <PaginationItem key={1}>
          <PaginationLink onClick={() => onPageChange(1)}>1</PaginationLink>
        </PaginationItem>,
      );
      if (start > 2) {
        pages.push(<PaginationEllipsis key="ellipsis-start" />);
      }
    }

    for (let i = start; i <= end; i++) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink isActive={i === currentPage} onClick={() => onPageChange(i)}>
            {i}
          </PaginationLink>
        </PaginationItem>,
      );
    }

    if (end < totalPages) {
      if (end < totalPages - 1) {
        pages.push(<PaginationEllipsis key="ellipsis-end" />);
      }
      pages.push(
        <PaginationItem key={totalPages}>
          <PaginationLink onClick={() => onPageChange(totalPages)}>{totalPages}</PaginationLink>
        </PaginationItem>,
      );
    }

    return pages;
  }, [currentPage, totalPages, onPageChange]);

  return (
    <div className="flex items-center gap-8">
      <span className="text-sm font-medium">
        Page {currentPage} of {perPage}
      </span>
      <Pagination className="w-fit m-0">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious onClick={() => onPageChange(Math.max(currentPage - 1, 1))}>
              <ChevronLeft className="h-4 w-4" />
            </PaginationPrevious>
          </PaginationItem>

          {renderedPages}

          <PaginationItem>
            <PaginationNext onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}>
              <ChevronRight className="h-4 w-4" />
            </PaginationNext>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
