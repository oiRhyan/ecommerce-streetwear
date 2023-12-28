import React from 'react'
import prisma from "@/app/prismadb"
import ImageGallery from '../ImageGallery'
import Info from '../Info'
import Review from '@/app/components/Review'
import ReviewSection from '../ReviewSection'
import { getServerSession } from "next-auth";
import {options} from "@/app/api/auth/[...nextauth]/options"
import logo from '@/public/imgs/street-logo.png'
import Image from 'next/image'
import Link from 'next/link'
import review from '@/public/imgs/banner2.png'



type Props = {}

export default async function Page({params}:{params:{slug:string}}){
    const productId = parseInt(params.slug,10)
    const session = await getServerSession(options);
    const currentUserId = session?.user.id
    const product = await prisma.product.findUnique({
        where:{
            id:productId
        }
    })
    const allReview = await prisma.review.findMany({
        where:{
            productId:productId
        }
    })
    let averageRating = 0;
    if(allReview.length > 0){
        const totalRating = allReview.reduce((acc,review)=>{
            return acc + review.rating
        },0)
        averageRating = totalRating/ allReview.length
    }
    const urlString = product?.images
    return(
        <div className='max-w-[1280px] mx-auto px-5 py-5'>
            <div className='font-semibold text-2xl mb-2 flex'>
                <Link href={'/myproducts'}>
                <Image alt='logo' src={logo} height={50} />
                </Link>
                <Link href={'/myproducts'}>
                <h1 className='relative top-2 text-white ml-[950px]'> Retornar </h1>
                </Link>
            </div>
            <hr />
            {product && (
                <div className='grid grid-cols-2 mt-5 gap-14'>
                    {urlString && (
                        <ImageGallery imageUrls = {urlString} />
                    )}
                    <Info {...product} rating={averageRating} numbercomments={allReview.length} />
                </div>
            )}
            <div className='mb-20 mt-20'>
                <div className='flex items-center space-x-5 mb-10'>
                    <span className='w-[5px] h-[30px] bg-orange-600 rounded-full inline-block'></span>
                    <span className='font-medium text-xl text-white'>Descrição do Produto</span>
                </div>
                {product && (
                    <div className='grid grid-cols-2'>
                        <div className='fles flex-col justify-center'>
                            <div className='grid grid-cols-3 gap-5 mb-5'>
                                <div>
                                    <h3 className='font-medium text-white'>Estilo</h3>
                                    <p className='text-sm text-orange-500'>{product.category}</p>
                                </div>
                                <div>
                                    <h3 className='font-medium text-white'>Modelo</h3>
                                    <p className='text-sm text-orange-500'>{product.style}</p>
                                </div>
                                <div>
                                    <h3 className='font-medium text-white'>Drop</h3>
                                    <p className='text-sm text-orange-500'>{product.store}</p>
                                </div>
                            </div>
                            <div style={{borderColor:`{${product.color.split(',').pop()}}`}} className={`leading-6 text-sm text-neutral-700 h-[200px] border-[1px] rounded-md p-4 overflow-scroll`} dangerouslySetInnerHTML={{__html:product?.description}}>
                            </div>
                        </div>
                        <div className='flex justify-end relative items-center ml-10 mb-2 rounded-2xl'>
                                <Image src={review} alt='banner' className='rounded-2xl mb-5'/>
                        </div>
                    </div>
                )}
            </div>
            <div className='mt-20 mb-20'>
                <div className='flex items-center space-x-5 mb-10'>
                    <span className='w-[5px] h-[30px] bg-orange-600 rounded-full inline-block text-white'></span>
                    <span className='font-medium text-xl text-white'>Comentários e Dúvidas</span>
                </div>
                <div className='grid grid-cols-2'>
                    <div>
                        {allReview.map((review,index)=>(
                            <div key={review.id} className='mb-5'>
                                <h1 className='mb-2 font-medium text-white'>Comentário: {index + 1}</h1>
                                <ReviewSection {...review} />
                            </div>
                        ))}
                    </div>
                    <Review productId = {product?.id} userId = {currentUserId}/>
                </div>
            </div>
        </div>
    )
}