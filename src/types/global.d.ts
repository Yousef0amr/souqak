import type { Column, ColumnDef, VisibilityState } from "@tanstack/react-table";
import type { ReactNode } from "react";

declare global {
  // ─── Auth / Session ────────────────────────────────────────────────────────

  interface SessionData {
    accessToken?: string;
    refreshToken?: string;
    userId?: string;
  }

  interface ApiSuccessResponseDto<TData> {
    success: true;
    result: { data: TData };
    errors?: never;
  }

  interface ApiFailedResponseDto<TErrors = Record<string, string[]>> {
    success: false;
    status: number;
    errors?: TErrors;
    message?: string;
  }

  type ApiResult<TData, TErrors = Record<string, string[]>> =
    | ApiSuccessResponseDto<TData>
    | ApiFailedResponseDto<TErrors>;

  interface UseSelectOptionsConfig<T> {
    labelKey: keyof T;
    valueKey: keyof T;
  }

  // ─── Tables ────────────────────────────────────────────────────────────────
  interface DataTableProps<TData> {
    data: TData[];
    columns: ColumnDef<TData>[];
    columnVisibility: VisibilityState;
    isLoading: boolean;
    setColumnVisibility: React.Dispatch<React.SetStateAction<VisibilityState>>;
    wrapperClassName?: string;
    bodyClassName?: string;
    headerClassName?: string;
    withPagination?: boolean;
    scrollAreaClassName?: string;
  }
  interface TableColumnHeaderProps<TData> {
    column: Column<TData, unknown>;
    columnName: string;
    columnContent?: () => ReactNode;
    sortable?: boolean;
  }

  interface TablePagination {
    page: number;
    perPage: number;
    total: number;
  }

  interface DataListPaginationProps {
    total: number;
    perPage: number;
    currentPage: number;
    onPageChange: (page: number) => void;
  }

  interface TablePaginationPerPageProps {
    total: number;
    onPerPageChange: (perPage: number, fixedPage: number) => void;
    label?: string;
    perPage: number;
    fixedPerPage?: number;
    hidePagination?: boolean;
  }

  interface PaginationWithPerPageProps
    extends TablePaginationPerPageProps,
      DataListPaginationProps {}

  interface SelectOption {
    label: string;
    value: string;
  }

  interface CustomSelectProps {
    value?: SelectOption | SelectOption[] | null;
    // onChange?: (selected: SelectOption | SelectOption[] | null) => void;
    onChange?: (selected: SelectOption | SelectOption[] | null | value) => void; // added value type for filter condigition check
    options?: SelectOption[];
    placeholder?: string;
    isMulti?: boolean;
    isCreatable?: boolean;
    fetchOptions?: (input: string) => Promise<SelectOption[]>;
    disabledOptions?: string[];
    disabled?: boolean;
    isLoading?: boolean;
    styleSettings?: {
      selectBoxClassName?: string;
      searchClassName?: string;
      tagValueClassName?: string;
    };
    error?: boolean;
    dropdownPosition?: "top" | "bottom";
  }

  interface DefaultSelectProps {
    options: SelectOption[] | [];
    onChange: (value: string) => void;
    placeholder?: string;
    elementWidth?: string;
    withCheckIcon?: boolean;
    defValue?: string | number;
  }

  type ModalState = {
    isOpen: boolean;
    componentName: string | null;
    modalTitle: string | null;
    modalDescription: string | null;
    withCloseBtn: boolean;
    modalWithFooter: boolean;
    modalFooterContent: React.ReactNode | null;
    modalContentClassName: string | null;
    hideModalTitle: boolean;
    enableOutsideClick: boolean;
    mode?: "dialog" | "sheet";
    sheetSide?: "right" | "left" | "top" | "bottom";
    extraProps?: Record<string, any>;
    openModal: (settings: Partial<Omit<ModalState, "openModal" | "closeModal">>) => void;
    closeModal: () => void;
  };
}
