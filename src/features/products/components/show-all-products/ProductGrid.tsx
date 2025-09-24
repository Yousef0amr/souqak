import { Button } from "@/common/buttons/button";
import { Badge } from "@/common/shared/badge";
import { Hash, Pencil, Trash } from "lucide-react";


interface ProductGridProps {
    data: Product[];
    onProductClick: (product: Product) => void;
}

export function ProductGrid({ data, onProductClick }: ProductGridProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 overflow-x-auto h-[calc(100vh-250px)]">
            {data.map((product) => (
                <div
                    key={product.id}
                    className="group border rounded-xl p-4 hover:shadow-lg transition-all duration-200 cursor-pointer bg-card"
                    onClick={() => onProductClick(product)}
                >
                    {/* Product Image */}
                    <div className="relative mb-4 aspect-square overflow-hidden rounded-lg bg-muted">
                        {product.image ? (
                            <img
                                src={product.image}
                                alt={product.name}
                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none';
                                    target.nextElementSibling?.classList.remove('hidden');
                                }}
                            />
                        ) : (
                            <div className="h-full w-full flex items-center justify-center">
                                <div className="h-12 w-12 text-muted-foreground" />
                            </div>
                        )}

                        {/* Status Badge Overlay */}
                        <div className="absolute top-2 right-2">
                            <Badge variant={product.status === "active" ? "default" : product.status === "draft" ? "outline" : "secondary"} className="text-xs">
                                {product.status}
                            </Badge>
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="space-y-3">
                        <div>
                            <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors">
                                {product.name}
                            </h3>
                            <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                                <Hash className="size-3" />
                                {product.sku}
                            </p>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="text-xl font-bold text-primary">
                                ${product.price.toFixed(2)}
                            </div>
                            <div className="flex gap-2">
                                <Button size="sm" variant="outline" className="opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Pencil className="size-4" />
                                </Button>
                                <Button size="sm" variant="outline" className="opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Trash className="size-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}


