import { Input } from '@/common/forms/input'
import React from 'react'

const AddProducts = () => {
    return (
        <div className='w-[1000px]'>
            <Input className='w-[800px]' placeholder='Product Name' />
            <Input placeholder='Product Description' />
            <Input placeholder='Product Price' />
        </div>
    )
}

export default AddProducts