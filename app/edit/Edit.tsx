'use client'
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { signIn, signOut, useSession } from 'next-auth/react'
import Navbar from '../components/Navbar'
import { useRouter } from 'next/navigation'
import Size from '../components/Size'
import Color from '../components/Color'
import Para from '../components/Para'
import ImageUpload from '../components/ImageUpload'

interface Props {
    id:number
    title:string
    description:string
    category:string
    style:string
    store:string
    size:string
    inventory:number
    color:string
    price:number
    images:string
    userId:number
}

const Edit = ({id,title,description,category,style,store,size, inventory,color,price,images,userId}: Props) => {
    const Id = userId
    const router= useRouter()
    const [formData, setFormData ] = useState({
        id:id,
        title:title,
        description:description,
        category:category,
        style:style,
        store:store,
        size:size,
        inventory:inventory,
        color:color,
        price:price,
        images:images,
        userId:Id,
    })
    const [Description, setDescription] = useState<string>('')
    const [info, updateinfo] = useState<any>()
    const [imageUrls, setImageUrls] =useState<string[]>([])

    useEffect(() => {
        if(formData.images){
            const imageUrlArray = formData.images.split(',')
            setImageUrls(imageUrlArray)
        }
    },[])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setFormData({
            ...formData,
            [name]:value
        })
    }
    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.name === "price" ? parseInt(e.target.value):parseInt(e.target.value)
        const inventory = e.target.name === "inventory" ? parseInt(e.target.value):parseInt(e.target.value)
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
            description:Description,
            userId:id
        })
    }

    useEffect(() => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            description:Description,
            images:imageUrls.toString(),
            userId:id
        }))
    }, [imageUrls])

    const updateData = async () => {
        handleImageChange()
        try{
            const response = await axios.patch('/api/updateproduct',formData)
            console.log(response.data)
            router.push('/')
            router.refresh()
        }catch(error){
            console.log(error)
        }
    }

    return (
    <div className='px-5 max-w-[1280px] mx-auto mb-10 text-black'>
        <div>
            <Navbar/>
        </div>
        <h1 className='text-3xl font-semibold py-6 text-white'>Editar Produto</h1>
        <div className='text-white mt-4'>
            <div className='grid md:grid-cols-2 grid-cols-1 gap-5 text-black'>
                <div>
                    <label htmlFor="title" className='font-medium text-white'>Titulo:</label>
                    <input 
                    type="text"
                    className='w-full h-[50px] border-[1px] rounded-lg focus:border-orange-500 px-3 focus:border-2 outline-none'
                    name='title'
                    value={formData.title}
                    onChange={handleChange}
                    placeholder='...'
                    />
                </div>
                <div>
                    <label htmlFor="category" className='font-medium text-white'>Estilo:</label>
                    <input 
                        type="text"
                        className='w-full h-[50px] border-[1px] rounded-lg focus:border-orange-500 px-3 focus:border-2 outline-none'
                        name='category'
                        value={formData.category}
                        onChange={handleChange}
                        placeholder='...'
                        />
                </div>
                <div>
                    <label htmlFor="style" className='font-medium text-white'>Modelo:</label>
                    <input 
                        type="text"
                        className='w-full h-[50px] border-[1px] rounded-lg focus:border-orange-500 px-3 focus:border-2 outline-none'
                        name='style'
                        value={formData.style}
                        onChange={handleChange}
                        placeholder='...'
                        />
                </div>
                <div>
                    <label htmlFor="store" className='font-medium text-white'>Drop</label>
                    <input 
                        type="text"
                        className='w-full h-[50px] border-[1px] rounded-lg focus:border-orange-500 px-3 focus:border-2 outline-none'
                        name='store'
                        value={formData.store}
                        onChange={handleChange}
                        placeholder='...'
                        />
                </div>
                <div>
                    <label htmlFor="size" className='font-medium text-white'>Tamanho:</label>
                    <input 
                        type="text"
                        className='w-full h-[50px] border-[1px] rounded-lg focus:border-orange-500 px-3 focus:border-2 outline-none'
                        name='size'
                        value={formData.size}
                        onChange={handleChange}
                        placeholder='...'
                        />
                    <Size setFormData={setFormData}/>
                </div>
                <div>
                    <label htmlFor="inventory" className='font-medium text-white'>Disponibilidade:</label>
                    <input 
                        type="number"
                        className='w-full h-[50px] border-[1px] rounded-lg focus:border-orange-500 px-3 focus:border-2 outline-none'
                        name='inventory'
                        value={formData.inventory}
                        onChange={handlePriceChange}
                        placeholder='...'
                        />
                </div>
                <div>
                    <label htmlFor="price" className='font-medium text-white'>Valor:</label>
                    <input 
                        type="number"
                        className='w-full h-[50px] border-[1px] rounded-lg focus:border-orange-500 px-3 focus:border-2 outline-none'
                        name='price'
                        value={formData.price}
                        onChange={handlePriceChange}
                        placeholder='...'

                        />
                </div>
                <div>
                    <div>
                        <label htmlFor="color" className='font-medium text-white'>Cor    (opicional):</label>
                        <input 
                            type="text"
                            className='w-full h-[50px] border-[1px] rounded-lg focus:border-orange-500 px-3 focus:border-2 outline-none'
                            name='color'
                            value={formData.color}
                            onChange={handleChange}
                            />
                    </div>
                    <Color setFormData={setFormData} Color={formData.color}/>
                </div>
            </div>
            <label htmlFor="" className='mt-10 inline-block font-medium'>Descrição do seu produto </label>
            <Para setDescription={setDescription} description={formData.description} />
            <label htmlFor="" className='mt-10 inline-block font-medium'>Adicione Imagens</label>
            <ImageUpload info={info} updateInfo={updateinfo} imageUrls={imageUrls} setImageUrls={setImageUrls} handleImageChange={handleImageChange}/>
            <button onClick={updateData} className='text-white mt-10 border-[1px] bg-orange-500 rounded-lg px-5 p-2'> Atualizar Produto </button>
        </div>
    </div>
    )
}

export default Edit