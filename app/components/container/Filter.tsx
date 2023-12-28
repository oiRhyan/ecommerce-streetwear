'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import {BsSliders2Vertical, BsChevronUp} from 'react-icons/bs'
import styles from '@/app/sass/filter.module.sass'
import axios from 'axios'

type Props = {}

const Filter = (props: Props) => {
    const [showFilter, setShowFilter] = useState(false)
    const [selectedCategories, setSelectedCategories] = useState<string[]>([])
    const [selectedSize, setSelectedSize] = useState<string[]>([])
    const [allHexValues, setHexValues] = useState<string[]>([])
    const [selectedHexValues, setSelectedHexValues] = useState<string[]>([])
    const [price, setPrice] = useState({
        min: 0,
        max: 100,
    })

    const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.name === "min" ? parseInt(e.target.value) : e.target.value;
            setPrice({
                ...price,
                [e.target.name]: value
            })
    }

    const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.name === "max" ? parseInt(e.target.value) : e.target.value;
        setPrice({
            ...price,
            [e.target.name]: value
        })
    }

    const toggleCategory = (category: string) => {
        setSelectedCategories((prevCategories) => 
        prevCategories.includes(category)
        ? prevCategories.filter((c) => c !== category):
        [...prevCategories, category]
        )
    }

    const toggleSize = (size: string) => {
        setSelectedCategories((prevSize) => 
        prevSize.includes(size)
        ? prevSize.filter((c) => c !== size):
        [...prevSize, size]
        )
    }
    
    const toggleColor = (color: string) => {
        setSelectedCategories((prevColor) => 
        prevColor.includes(color)
        ? prevColor.filter((c) => c !== color):
        [...prevColor, color]
        )
    }

    const getAllColors = async () => {
        try{
            const response = await axios.get('/api/color');
            //console.log("Colors:", response.data)
            return response.data
        }
        catch(error){
            console.log("Erro", error)
            return null
        }
    }

    useEffect(() => {
        getAllColors().then((allColors) => {
            if(allColors){
                const hexSet = new Set<string>()
                allColors.forEach((element: any) => {
                    const colors = element.color.split(',')
                    colors.forEach((color: string) => {
                        const hexValue = color.replace("#", "")
                        hexSet.add(hexValue)
                    })
                })
                const uniqueHexValues: string[] = Array.from(hexSet)
                setHexValues(uniqueHexValues)
            }
        })
    }, [])


    const allHexValue = allHexValues

    return(
        <div className='relative'>
            <div className={styles.filter}>
                <div className='flex items-center justify-between px-5 py-4'>
                        <h1 className='text-white'> Filtros </h1>
                        <BsSliders2Vertical size={20} className='text-white' />
                </div>
                <div className='flex flex-col py-3 pb-5 tet-sm text-white border-b-[0.5px]'>
                        <span
                        className={`py-3 px-5 ${selectedCategories.includes('Moletons') ? "bg-orange-500":""}`}
                        onClick={() => toggleCategory('Moletons')}
                        >
                            Moletons
                        </span>
                        <span
                        className={`py-3 px-5 ${selectedCategories.includes('Camisetas') ? "bg-orange-500":""}`}
                        onClick={() => toggleCategory('Camisetas')}
                        >
                            Camisetas
                        </span>
                        <span
                        className={`py-3 px-5 ${selectedCategories.includes('Calças') ? "bg-orange-500":""}`}
                        onClick={() => toggleCategory('Calças')}
                        >
                            Calças
                        </span>
                        <span
                        className={`py-3 px-5 ${selectedCategories.includes('Shorts') ? "bg-orange-500":""}`}
                        onClick={() => toggleCategory('Shorts')}
                        >
                            Shorts
                        </span>
                        <span
                        className={`py-3 px-5 ${selectedCategories.includes('Calçados') ? "bg-orange-500":""}`}
                        onClick={() => toggleCategory('Calçados')}
                        >
                            Calçados
                        </span>
                </div>
                <div className='border-b-[0.5px] pb-10'>
                    <div className='flex items-center justify-between px-5 py-4 border-b-[0.5px] mb-5'>
                        <h1 className='text-white'>
                                Preços
                        </h1>
                        <BsChevronUp size={18} className= 'text-white'/>
                    </div>
                    <div className='grid grid-cols-2 gap-5 px-5 overflow-hidden'>
                        <div className='flex flex-col justify-center items-center'>
                                <label className='text-[15px] opacity-75 text-white'>
                                        Min
                                </label>
                                <div className='relative'>
                                        <span className='absolute left-3 top-1 '>
                                                $
                                        </span>
                                        <input type='number' name='min' id='' onChange={handleMinChange} value={price.min} className='w-[200px] outline-none border-[1px] rounded-lg px-2 text-center py-[2px]' placeholder='...'/>
                                </div>
                                <label className='text-[15px] opacity-75 text-white'>
                                        Max
                                </label>
                                <div className='relative'>
                                        <span className='absolute left-3 top-1 '>
                                                $
                                        </span>
                                        <input type='number' name='max' id='' onChange={handleMaxChange} value={price.max} className='w-[200px] outline-none border-[1px] rounded-lg text-center py-[2px]' placeholder='...'/>
                                </div>
                        </div>
                    </div>
                </div>
                <div className='border-b-[0.5px]'>
                        <div className='flex items-center justify-between px-5 py-4 border-b-[0.5px] mb-5'>
                        <h1 className='text-white'>
                                Cores
                        </h1>
                        </div>
                        <ul className='grid grid-cols-4 px-5 gap-5'>
                                {allHexValue.map((hexvalue, index) => (
                                    <li key={index} className={`w-[30px] h-[30px] rounded-2xl border-[0.5px] border-neutral-300 cursor-pointer ${selectedHexValues.includes(`#${hexvalue}`) ? "shadow-2xl opacity-25": ""}`}
                                    style={{backgroundColor:`#${hexvalue}`}}
                                    onClick={() => toggleColor(`#${hexvalue}`)}>

                                    </li>
                                ))}
                        </ul>
                </div>
                <div className='sizes'>
                    <div className='flex items-center justify-between px-5 py-4 border-b-[0.5px] mb-5'>
                        <h1 className='text-white'>
                                Tamanhos
                        </h1>
                        <div className={styles.espace}>
                        <ul className='grid grid-cols-2 px-5 gap-5'>
                            <li className={`border-[0.5px] rounded-lg text-center text-[14px] py-[2px] cursor-pointer ${selectedSize.includes('P') ? 'bg-neutral-900 text-white': ''}`}
                            onClick={() => toggleSize('P')}>
                                P
                            </li>
                            <li className={`border-[0.5px] rounded-lg text-center text-[14px] py-[2px] cursor-pointer ${selectedSize.includes('M') ? 'bg-neutral-900 text-white': ''}`}
                            onClick={() => toggleSize('M')}>
                                M
                            </li>
                            <li className={`border-[0.5px] rounded-lg text-center text-[14px] py-[2px] cursor-pointer ${selectedSize.includes('G') ? 'bg-white text-white': ''}`}
                            onClick={() => toggleSize('G')}>
                                G
                            </li>
                            <li className={`border-[0.5px] rounded-lg text-center text-[14px] py-[2px] cursor-pointer ${selectedSize.includes('GG') ? 'bg-neutral-900 text-white': ''}`}
                            onClick={() => toggleSize('GG')}>
                                GG
                            </li>
                            <li className={`border-[0.5px] rounded-lg text-center text-[14px] py-[2px] cursor-pointer ${selectedSize.includes('XG') ? 'bg-neutral-900 text-white': ''}`}
                            onClick={() => toggleSize('XG')}>
                                XG
                            </li>
                        </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Filter