import Size from "@/app/components/Size"
import prisma from "@/app/prismadb"
import { Prisma } from "@prisma/client"
import { NextResponse} from "next/server"

export async function GET(request: Request){
    try {
        const searchParams = new URLSearchParams(request.url.split('?')[1])
        const categories =  searchParams.getAll('categories[]')
        const colors = searchParams.getAll('colors[]')
        let sizes = searchParams.getAll('size[]')
        const minPriceStr = searchParams.get('price[min]')
        const maxPriceStr = searchParams.get('price[max]')

        const minPrice = minPriceStr ? parseInt(minPriceStr) : undefined
        const maxPrice = maxPriceStr ? parseInt(maxPriceStr) : undefined

        const products = await prisma.product.findMany({
            where:{
                OR:[
                    ...categories.map((category) => ({
                        style:{
                            contains:category
                        }
                    })),
                    ...sizes.map((size) => ({
                        size:{
                            contains:size
                        }
                    })),
                    ...colors.map((color) => ({
                        color:{
                            contains:color
                        }
                    })),
                    {
                        price:{
                            gte:minPrice,
                            lte:maxPrice
                        }
                    }
                ]
            }
        })
        return NextResponse.json(products)
    }catch(error){
        console.log("Erro ao selecionar o produto", error)
    }
}