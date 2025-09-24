import { Button } from "@/common/buttons/button";
import { Badge } from "@/common/shared/badge";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Pencil, Trash, Image as ImageIcon } from "lucide-react";
import TableColumnHeader from "@/common/tables/TableColumnHeader";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/common/shared/dropdown-menu";


export const ProductsTableColumns: ColumnDef<Product>[] = [
    {
        accessorKey: "image",
        size: 80,
        header: ({ column }) => (
            <TableColumnHeader column={column} columnName="Image" />
        ),
        cell: ({ row }) => (
            <div className="flex items-center justify-center">
                {row.original.image ? (
                    <img
                        src={row.original.image}
                        alt={row.original.name}
                        className="h-12 w-12 rounded-md object-cover border"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            target.nextElementSibling?.classList.remove('hidden');
                        }}
                    />
                ) : (
                    <div className="h-12 w-12 rounded-md bg-muted flex items-center justify-center">
                        <ImageIcon className="h-6 w-6 text-muted-foreground" />
                    </div>
                )}
                {!row.original.image && (
                    <div className="h-12 w-12 rounded-md bg-muted flex items-center justify-center hidden">
                        <ImageIcon className="h-6 w-6 text-muted-foreground" />
                    </div>
                )}
            </div>
        ),
    },
    {
        accessorKey: "name",
        size: 280,
        header: ({ column }) => (
            <TableColumnHeader column={column} columnName="Name" />
        ),
        cell: ({ row }) => (
            <button
                className="font-medium text-primary hover:underline w-full truncate inline-block text-left"
            >
                {row.original.name}
            </button>
        ),
    },
    {
        accessorKey: "sku",
        size: 140,
        header: ({ column }) => (
            <TableColumnHeader column={column} columnName="SKU" />
        ),
        cell: ({ row }) => <span className="text-muted-foreground whitespace-nowrap">{row.original.sku}</span>,
    },
    {
        accessorKey: "price",
        size: 140,
        header: ({ column }) => (
            <TableColumnHeader column={column} columnName="Price" />
        ),
        cell: ({ row }) => <span className="tabular-nums whitespace-nowrap">${row.original.price.toFixed(2)}</span>,
    },
    {
        accessorKey: "status",
        size: 140,
        header: ({ column }) => (
            <TableColumnHeader column={column} columnName="Status" />
        ),
        cell: ({ row }) => (
            <Badge variant={row.original.status === "active" ? "default" : row.original.status === "draft" ? "outline" : "secondary"}>
                {row.original.status}
            </Badge>
        ),
    },
    {
        id: "actions",
        size: 100,
        header: () => <span className="text-sm font-medium text-muted-foreground">Actions</span>,
        cell: ({ row }) => {
            const product = row.original;
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" aria-label="Actions">
                            <MoreHorizontal className="size-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="min-w-[140px]">
                        <DropdownMenuItem onClick={() => console.log("Edit", product.id)}>
                            <Pencil className="size-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem variant="destructive" onClick={() => console.log("Delete", product.id)}>
                            <Trash className="size-4" /> Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];


