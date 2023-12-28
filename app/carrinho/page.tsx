import React from 'react'
import { getServerSession } from 'next-auth'
import {options} from "@/app/api/auth/[...nextauth]/options"
import Navbar from '../components/Navbar'
import AllCartProduct from '../components/AllCartProduct'
import Allpurchased from '../components/Allpurchased'
import Footer from '../components/Footer'


type Props = {}

const Cart = async (props: Props) => {
    const session = await getServerSession(options)
    return (
    <>
    <Navbar/>
    <div className='max-w-[1280px] mx-auto px-5 text-white'>
        <AllCartProduct userId = {session?.user?.id} />
        <hr className='mt-10 mb-10' />
    </div>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <Footer/>
    </>
    )
}

export default Cart