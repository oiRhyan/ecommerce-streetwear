import React from 'react'
import Productform from './productform'
import Footer from '../components/Footer'

type Props = {}

const page = (props: Props) => {
    return (
        <>
        <Productform/>
        <Footer/>
        </>
    )
}

export default page