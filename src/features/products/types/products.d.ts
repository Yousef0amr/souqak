

declare global {




    type Product = {
        id: string;
        name: string;
        sku: string;
        price: number;
        status: "active" | "draft" | "archived";
        image: string;
    };

    interface ProductsViewManagementProps {
        children?: (props: {
            columnVisibility: VisibilityState;
            setColumnVisibility: React.Dispatch<React.SetStateAction<VisibilityState>>;
            view: "table" | "grid";
        }) => ReactNode;
        showFilter?: boolean;
    }

}

export { };