import * as React from "react";
import { Button } from "@/common/buttons/button";
import { Input } from "@/common/forms/input";
import DefaultSelect from "@/common/forms/DefaultSelect";
import { Popover, PopoverContent, PopoverTrigger } from "@/common/shared/popover";
import { X, SlidersHorizontal } from "lucide-react";
import DateRangePicker from "@/common/forms/DatePickerRange";

interface ProductFiltersProps {
    search: string;
    setSearch: (search: string) => void;
    statusFilter: string;
    setStatusFilter: (status: string) => void;
    category: string;
    setCategory: (category: string) => void;
    minPrice: string;
    setMinPrice: (price: string) => void;
    maxPrice: string;
    setMaxPrice: (price: string) => void;
    dateRange: { from?: Date; to?: Date } | undefined;
    setDateRange: (range: { from?: Date; to?: Date } | undefined) => void;
    onResetFilters: () => void;
}

export function ProductFilters({
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    category,
    setCategory,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    dateRange,
    setDateRange,
    onResetFilters
}: ProductFiltersProps) {
    const categories = React.useMemo(() => [
        { label: "All", value: "" },
        { label: "Shoes", value: "shoes" },
        { label: "Apparel", value: "apparel" },
        { label: "Accessories", value: "accessories" },
    ], []);

    const statuses = React.useMemo(() => [
        { label: "All", value: "" },
        { label: "Active", value: "active" },
        { label: "Draft", value: "draft" },
        { label: "Archived", value: "archived" },
    ], []);

    const hasActiveFilters = search || statusFilter || category || minPrice || maxPrice || dateRange;

    return (
        <div className="space-y-4">
            {/* Active Filters Display */}
            {hasActiveFilters && (
                <div className="flex flex-wrap items-center gap-2">
                    {search && (
                        <Button size="sm" variant="outline" onClick={() => setSearch("")}>
                            {search}<X className="size-3 ml-2" />
                        </Button>
                    )}
                    {statusFilter && (
                        <Button size="sm" variant="outline" onClick={() => setStatusFilter("")}>
                            {statusFilter}<X className="size-3 ml-2" />
                        </Button>
                    )}
                    {category && (
                        <Button size="sm" variant="outline" onClick={() => setCategory("")}>
                            {category}<X className="size-3 ml-2" />
                        </Button>
                    )}
                    {minPrice && (
                        <Button size="sm" variant="outline" onClick={() => setMinPrice("")}>
                            Min {minPrice}<X className="size-3 ml-2" />
                        </Button>
                    )}
                    {maxPrice && (
                        <Button size="sm" variant="outline" onClick={() => setMaxPrice("")}>
                            Max {maxPrice}<X className="size-3 ml-2" />
                        </Button>
                    )}
                    {dateRange && (
                        <Button size="sm" variant="outline" onClick={() => setDateRange(undefined)}>
                            Date range<X className="size-3 ml-2" />
                        </Button>
                    )}
                </div>
            )}

            {/* Search and Filters */}
            <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 flex-wrap">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline"><SlidersHorizontal className="size-4 mr-2" />Filters</Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[320px] p-3">
                            <div className="space-y-3">
                                <DefaultSelect
                                    placeholder="Category"
                                    elementWidth="w-full"
                                    options={categories}
                                    defValue={category}
                                    onChange={setCategory}
                                />
                                <DefaultSelect
                                    placeholder="Status"
                                    elementWidth="w-full"
                                    options={statuses}
                                    defValue={statusFilter}
                                    onChange={setStatusFilter}
                                />
                                <div className="grid grid-cols-2 gap-2">
                                    <Input
                                        type="number"
                                        placeholder="Min price"
                                        value={minPrice}
                                        onChange={(e) => setMinPrice(e.target.value)}
                                    />
                                    <Input
                                        type="number"
                                        placeholder="Max price"
                                        value={maxPrice}
                                        onChange={(e) => setMaxPrice(e.target.value)}
                                    />
                                </div>
                                <DateRangePicker
                                    placeholder="Date added"
                                    value={dateRange as any}
                                    onChange={(range) => setDateRange(range as any)}
                                />
                                <div className="flex items-center justify-between">
                                    <Button variant="ghost" onClick={onResetFilters}>Reset</Button>
                                    <Button onClick={() => { /* popover closes by click outside */ }}>Apply</Button>
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>



                </div>
            </div>
        </div>
    );
}


