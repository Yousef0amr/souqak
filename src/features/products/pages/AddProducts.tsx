
import React from 'react'
import ProductForm from '../components/add-product/ProductForm'
import { ProductTable } from '../components/shared/ProductTable'
import PageHeaderWrapper from '@/shared/components/PageHeaderWrapper'
import { PackageOpen } from 'lucide-react'
import { Separator } from '@/common/shared/separator'
import { Button } from '@/common/buttons/button'
import { useAddProductStore } from '../stores/useAddProductStore'

const AddProducts = () => {
    const products = useAddProductStore((state) => state.products)
    return (
        <div className='flex justify-between '>
            <div className='p-4 rounded-md w-1/4'>
                <ProductForm />
            </div>
            <Separator orientation='vertical' className='mx-2' />
            <div className='flex-1  m-4 w-3/4  flex flex-col justify-between gap-4'>
                <PageHeaderWrapper rightContent={<div className='flex '>

                </div>} leftContent={
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                            <PackageOpen className="size-5" />
                            <h3 className="text-xl font-semibold">Add Products</h3>
                        </div>
                        <p className="text-xs text-muted-foreground">Add new products to your catalog </p>
                    </div>
                } />
                <ProductTable hiddenItems={["filters", "export"]} data={products} />
                <div className='flex justify-between p-3'>
                    <Button variant='outline' >
                        Cancel
                    </Button>
                    <Button variant="default" >
                        Confirm
                    </Button>
                </div>
            </div>

        </div>

    )
}

export default AddProducts