import React from 'react'
import {AiOutlineHeart} from "react-icons/ai"
import prisma from '@/app/prismadb'
import Link from 'next/link'

type Props = {}

const Item = async (props: Props) => {
    const products = await prisma.product.findMany({})
    //console.log(products)
    if(products.length === 0){
        return (
            <div>
                Sem estoque 
            </div>
        )
    }

    return(
        <div className='ml-5'>
            <h1 className='py-3 text-xl text-white'>
                    Roupas
            </h1>
            <div className='grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-10'>
                {products.map((product) => (
                    <div key={product.id}>
                        <Link href={`/dashboard/${product.id}`}>
                            <div className='relative rounded-lg '> 
                                <img src={product.images.split(',')[0]} className='w-[250px] h-[300px] object-cover object-top rounded-lg ' alt=''/>
                            </div>
                            <div className='flex item-center justify-between mt-4 '>
                                <div>
                                    <h1 className='text-[14px] font-medium max-w-[150px] whitespace-nowrap overflow-hidden text-white'>
                                        {product.title}
                                    </h1>
                                    <p className='text-[13px] opacity-60 text-white'>{product.store}</p>
                                    <span className='px-2 font-medium bg-gray-100 rounded-lg'>
                                        {product.price}R$
                                    </span>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Item