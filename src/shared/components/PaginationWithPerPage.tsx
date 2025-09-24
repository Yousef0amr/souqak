import { DataListPagination } from "./DataListPagination";
import TablePaginationPerPage from "./TablePaginationPerPage";

const PaginationWithPerPage: React.FC<PaginationWithPerPageProps> = ({
  total,
  perPage,
  fixedPerPage,
  currentPage,
  onPageChange,
  onPerPageChange,
  hidePagination = false,
}) => {
  if (hidePagination) return;

  return (
    <div className="w-full flex justify-end items-center gap-8">
      <TablePaginationPerPage
        onPerPageChange={(pageSize, page) => onPerPageChange(pageSize, page)}
        total={total}
        perPage={perPage}
        fixedPerPage={fixedPerPage}
      />
      <DataListPagination
        total={total}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={(page) => onPageChange(page)}
      />
    </div>
  );
};

export default PaginationWithPerPage;
