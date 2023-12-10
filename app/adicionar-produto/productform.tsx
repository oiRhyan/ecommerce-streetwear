'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import {signIn, signOut, useSession} from 'next-auth/react'
import Navbar from '../components/Navbar'
import { useRouter } from 'next/navigation'
import styles from '@/app/sass/products.module.sass'
import { HtmlContext } from 'next/dist/server/future/route-modules/app-page/vendored/contexts/entrypoints'
import Size from '../components/Size'
import Color from '../components/Color'
import Para from '../components/Para'
import ImageUpload from '../components/ImageUpload'

type Props = {}

const Productform = (props: Props) => {
    const {data:session} = useSession()
    const id = session?.user.id
    const router = useRouter()
    const [formData, setFormData] = useState({
        title: '',
        description: `<div> <p> Descreva seu produto aqui...</p></div>`,
        category: '',
        style: '',
        inventory: 0,
        color: '#121212',
        price: 0,
        images: '',
        userId: id,
        store: '',
        size: '',
    })
    
    const [Description, setDescription] = useState('')
    const [info, updateInfo] = useState()
    const [imageUrls, setImageUrls] = useState<string[]>([])


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const {name, value} = e.target
            setFormData({
                ...formData,
                [name]: value
            })
    }

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.name == "price" ? parseInt(e.target.value): parseInt(e.target.value)
        const inventory = e.target.name == "inventory" ? parseInt(e.target.value): parseInt(e.target.value)
        setFormData({
            ...formData,
            [e.target.name] : value,
            [e.target.name] : inventory,
        })
}

    const handleImageChange = () => {
        const stringimages = JSON.stringify(imageUrls)
        setFormData({
            ...formData, 
            images:stringimages,
            description: Description,
            userId: id
        })
    }

    useEffect(() => {
        console.log(formData.images)
        console.log(formData)
    }, [formData])
    
    useEffect(() => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            description:Description,
            images:imageUrls.toString(),
            userId: id
        }))
    }, [imageUrls])
    
    const postData = async () => {
        handleImageChange()
        try{
            const response = await axios.post('/api/adicionarProduto', formData)
            router.push('/')
            console.log(response)
        }
        catch(error){
            console.log(error)
        }
    }

    return (
        <div className={styles.products}>
            <div>
                <Navbar/>
            </div>
            <h1 className='text-3xl font-semibold py-6'> Adicione seu Produto </h1>
            <div className='text-black mt-4 '>
                <div className='grid md:grid-cols-2 grid-cols-1 gap-5'>
                    <div>
                        <label htmlFor='title' className='font-medium text-black'>
                                Titulo: 
                        </label>
                        <input 
                        placeholder='...'
                        type="text"
                        className='w-full h-[50px] boder-radius-[1px] rounded-lg focus:border-pink-500 px-3 focus:border-2 outline-none '
                        name='title'
                        value={formData.title}
                        onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor='category' className='font-medium text-black'>
                                    Categoria: 
                        </label>
                        <input 
                            placeholder='...'
                            type="text"
                            className='w-full h-[50px] boder-radius-[1px] rounded-lg focus:border-pink-500 px-3 focus:border-2 outline-none '
                            name='category'
                            value={formData.category}
                            onChange={handleChange}
                            />
                    </div>
                    <div>
                        <label htmlFor='style' className='font-medium text-black'>
                                    Estilo: 
                        </label>
                        <input 
                            placeholder='...'
                            type="text"
                            className='w-full h-[50px] boder-radius-[1px] rounded-lg focus:border-pink-500 px-3 focus:border-2 outline-none '
                            name='style'
                            value={formData.style}
                            onChange={handleChange}
                            />
                    </div>
                    <div>
                        <label htmlFor='store' className='font-medium text-black'>
                                    Estoque: 
                        </label>
                        <input 
                            placeholder='...'
                            type="text"
                            className='w-full h-[50px] boder-radius-[1px] rounded-lg focus:border-pink-500 px-3 focus:border-2 outline-none '
                            name='store'
                            value={formData.store}
                            onChange={handleChange}
                            />
                    </div>
                    <div>
                        <label htmlFor='size' className='font-medium text-black'>
                                    Tamanho: 
                        </label>
                        <input 
                            placeholder='...'
                            type="text"
                            className='w-full h-[50px] boder-radius-[1px] rounded-lg focus:border-pink-500 px-3 focus:border-2 outline-none '
                            name='size'
                            value={formData.size}
                            onChange={handleChange}
                            />
                        <Size setFormData={setFormData}/>
                    </div>
                    <div>
                    <label htmlFor='inventory' className='font-medium text-black'>
                                    Disponibilidade: 
                    </label>
                    <input 
                            placeholder='...'
                            type="number"
                            className='w-full h-[50px] boder-radius-[1px] rounded-lg focus:border-pink-500 px-3 focus:border-2 outline-none '
                            name='inventory'
                            value={formData.inventory}
                            onChange={handlePriceChange}
                            />
                    </div>
                    <div>
                    <label htmlFor='price' className='font-medium text-black'>
                                    Valor: 
                    </label>
                    <input 
                            placeholder='...'
                            type="number"
                            className='w-full h-[50px] boder-radius-[1px] rounded-lg focus:border-pink-500 px-3 focus:border-2 outline-none '
                            name='price'
                            value={formData.price}
                            onChange={handlePriceChange}
                            />
                    </div>
                    <div>
                        <div>
                        <label htmlFor='color' className='font-medium text-black'>
                                    Cor (opcional): 
                        </label>
                        <input 
                            placeholder='...'
                            type="text"
                            className='w-full h-[50px] boder-radius-[1px] rounded-lg focus:border-pink-500 px-3 focus:border-2 outline-none '
                            name='color'
                            value={formData.color}
                            onChange={handleChange}
                            />
                        </div>
                        <Color setFormData={setFormData} Color={formData.color}/>
                    </div>
                </div>
                <label htmlFor="" className='mt-10 inline-block font-medium'>
                    Descrição do seu Produto
                </label>
                <Para setDescription={setDescription} description={formData.description} />
                <label htmlFor="" className='mt-10 inline-block font-medium'>
                    Adicione uma Imagem
                </label>
                <ImageUpload info={info} updateInfo={updateInfo} imageUrls={imageUrls} setImageUrls={setImageUrls} handleImageChange={handleImageChange}/>
                <button onClick={postData} className='text-black mt-10 border-[1px] bg-purple-500 rounded-lg px-5 p-2'>
                    Enviar Produto
                </button>
            </div>
        </div>
    )
}

export default Productform