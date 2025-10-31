"use client";

import * as React from "react";
import { useFormContext } from "react-hook-form";
import { cn } from "@/config/shadcnUtils";
import { Button } from "@/common/buttons/button";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/common/shared/carousel";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/common/shared/dropdown-menu";
import { FormFieldWrapper } from "@/common/forms/fields/FormFieldWrapper";

interface SizeChartSelectorProps {
    nameSystem?: string;
    nameSize?: string;
}

const sizeSystems = {
    Normal: ["XS", "S", "M", "L", "XL", "XXL"],
    US: ["2", "4", "6", "8", "10", "12"],
    EU: ["34", "36", "38", "40", "42", "44"],
    UK: ["6", "8", "10", "12", "14", "16"],
};

export function SizeChartSelector({
    nameSystem = "sizeSystem",
    nameSize = "size",
}: SizeChartSelectorProps) {
    const { control, watch, setValue } = useFormContext();

    const selectedSystem = watch(nameSystem) || "Normal";
    const selectedSize = watch(nameSize);
    const availableSizes = sizeSystems[selectedSystem] || [];

    return (
        <div className="space-y-4">
            {/* Dropdown for Size System */}
            <FormFieldWrapper control={control} name={nameSystem as any} label="Size System">
                {(field) => (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="outline"
                                className="w-full justify-between"
                                type="button"
                            >
                                {field.value || "Select System"}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                            {Object.keys(sizeSystems).map((system) => (
                                <DropdownMenuItem
                                    key={system}
                                    onClick={() => field.onChange(system)}
                                >
                                    {system}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
            </FormFieldWrapper>

            {/* Carousel for Sizes */}
            <FormFieldWrapper control={control} name={nameSize as any} label="Size">
                {(field) => (
                    <div className="relative">
                        <Carousel className="w-full">
                            <CarouselContent className="ml-0">
                                {availableSizes.map((size) => (
                                    <CarouselItem key={size} className="basis-auto px-1">
                                        <Button
                                            type="button"
                                            variant={field.value === size ? "default" : "outline"}
                                            className={cn(
                                                "min-w-[3rem] justify-center transition-colors",
                                                field.value === size && "bg-primary text-white"
                                            )}
                                            onClick={() => field.onChange(size)}
                                        >
                                            {size}
                                        </Button>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious className="-left-6" />
                            <CarouselNext className="-right-6" />
                        </Carousel>
                    </div>
                )}
            </FormFieldWrapper>
        </div>
    );
}
