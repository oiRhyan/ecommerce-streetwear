'use client'
import React from 'react'
import { useState } from 'react'
import styles from '@/app/sass/imagegalery.module.sass'
import { AiOutlineHeart } from 'react-icons/ai'

type Props = {
    imageUrls: string
}

const ImageGallery = ({imageUrls}: Props) => {
    const [selectedImage, setSelectedImage] = useState<number>(0)
    const urlArray = imageUrls.split(',')
    return (
        <div className='images grid grid-cols-7'>
            <div className='all-images flex flex-col  justify-center'>
                    {urlArray.map((url, index) => (
                        <div key={index} className='image relative rounded-lg'>
                            <img onClick={() => setSelectedImage(index)} className={`w-[90px] h-[90px] rounded-lg mb-3 p-1 object-cover object-top ${selectedImage === index ? "border-[1px] border-orange-500":"border-[1px] border-orange-300"} ${styles.image_select}`} src={url} alt={`Image ${index + 1}`} />
                        </div>
                    ))}
            </div>
            <div className='selected-image col-span-5'>
                    <img className={`height-[500px] w-auto object-cover object-top ${styles.image_galery}`} src={urlArray[selectedImage]} alt='imagem'/>
            </div>
        </div>
    )
}

export default ImageGallery