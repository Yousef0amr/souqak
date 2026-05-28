import { Button } from "@/common/buttons/button";
import { Badge } from "@/common/shared/badge";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Pencil, Trash, Image as ImageIcon } from "lucide-react";
import TableColumnHeader from "@/common/tables/TableColumnHeader";
import { useDeleteProduct } from "../hooks/useProducts";
import { useModalStore } from "@/shared/stores/DynamicModalStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/common/shared/dropdown-menu";

export function createProductsTableColumns(onDelete?: (product: Product) => void): ColumnDef<Product>[] {
  return [
    {
      accessorKey: "imageUrl",
      size: 80,
      header: ({ column }) => <TableColumnHeader column={column} columnName="Image" />,
      cell: () => (
        <div className="h-12 w-12 rounded-md bg-muted flex items-center justify-center">
          <ImageIcon className="h-6 w-6 text-muted-foreground" />
        </div>
      ),
    },
    {
      accessorKey: "nameEn",
      size: 280,
      header: ({ column }) => <TableColumnHeader column={column} columnName="Name" />,
      cell: ({ row }) => (
        <button className="font-medium text-primary hover:underline w-full truncate inline-block text-left">
          {row.original.nameEn}
        </button>
      ),
    },
    {
      accessorKey: "sku",
      size: 140,
      header: ({ column }) => <TableColumnHeader column={column} columnName="SKU" />,
      cell: ({ row }) => (
        <span className="text-muted-foreground whitespace-nowrap">{row.original.sku}</span>
      ),
    },
    {
      accessorKey: "categoryNameEn",
      size: 140,
      header: ({ column }) => <TableColumnHeader column={column} columnName="Category" />,
      cell: ({ row }) => (
        <span className="text-muted-foreground whitespace-nowrap">{row.original.categoryNameEn}</span>
      ),
    },
    {
      accessorKey: "brandNameEn",
      size: 140,
      header: ({ column }) => <TableColumnHeader column={column} columnName="Brand" />,
      cell: ({ row }) => (
        <span className="text-muted-foreground whitespace-nowrap">{row.original.brandNameEn}</span>
      ),
    },
    {
      accessorKey: "sellPrice",
      size: 140,
      header: ({ column }) => <TableColumnHeader column={column} columnName="Price" />,
      cell: ({ row }) => {
        const price = row.original.sellPrice ?? 0;
        return (
          <span className="tabular-nums whitespace-nowrap font-semibold text-foreground">
            ${price.toLocaleString()}
          </span>
        );
      },
    },
    {
      accessorKey: "stockQty",
      size: 120,
      header: ({ column }) => <TableColumnHeader column={column} columnName="Stock Qty" />,
      cell: ({ row }) => {
        const stock = row.original.stockQty ?? 0;
        return (
          <Badge
            className={
              stock > 10
                ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/20 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800"
                : stock > 0
                ? "bg-amber-100 text-amber-800 dark:bg-amber-950/20 dark:text-amber-400 border border-amber-200 dark:border-amber-800"
                : "bg-red-100 text-red-800 dark:bg-red-950/20 dark:text-red-400 border border-red-200 dark:border-red-800"
            }
          >
            {stock} left
          </Badge>
        );
      },
    },
    {
      id: "actions",
      size: 100,
      header: () => <span className="text-sm font-medium text-muted-foreground">Actions</span>,
      cell: function ActionsCell({ row }) {
        const product = row.original;
        const deleteMutation = useDeleteProduct();
        const openModal = useModalStore((state) => state.openModal);

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Actions">
                <MoreHorizontal className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[140px]">
              <DropdownMenuItem
                onClick={() =>
                  openModal({
                    componentName: "edit-product",
                    mode: "dialog",
                    modalTitle: `Edit: ${product.nameEn}`,
                    modalContentClassName: "sm:max-w-[600px]",
                    extraProps: { productId: product.id, initialData: product },
                    withCloseBtn: true,
                  })
                }
              >
                <Pencil className="size-4 mr-2" /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                variant="destructive"
                disabled={deleteMutation.isPending}
                onClick={() => onDelete?.(product)}
              >
                <Trash className="size-4 mr-2" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
}

export const ProductsTableColumns = createProductsTableColumns();
