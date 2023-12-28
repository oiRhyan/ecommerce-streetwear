import PreviousMap from 'postcss/lib/previous-map'
import React, { use } from 'react'
import { useState } from 'react'

interface ParaProps {
    setFormData: React.Dispatch<React.SetStateAction<any>>
}

const Size: React.FC<ParaProps> = ({setFormData}) => {
    const [selectedSizes, setSelectedSizes] = useState<string[]>([])
    const sizes = ["P","M","G","GG","XG"]

    const handleSizeButtonClick = (size: string) => {
            setSelectedSizes((prevSelectedSizes) => {
                if(prevSelectedSizes.includes(size)){
                    return prevSelectedSizes.filter((s) => s !== size)
                }
                else{
                    return [...prevSelectedSizes, size]
                }
            })
    }


    const handleSubmit = () => {
        setFormData((prevFormData: FormData) => ({
            ...prevFormData,
            size: selectedSizes.join(',')
        }))
    }
    return (
        <div>
            {sizes.map((size) => (
                <button
                key={size}
                className={`border-[0.5px] rounded-lg text-center text-[14px] py-[2px] cursor-pointer px-3 mt-4 mb-5 mr-5 text-white ${selectedSizes.includes(size) ? "bg-gray-500":""}`}
                onClick={() => handleSizeButtonClick(size)}
                > {size }</button>
            ))}
            <button onClick={handleSubmit} className='text-white'>
                Enviar
            </button>
        </div>
    )
}

export default Size