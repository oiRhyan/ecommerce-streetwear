import React from 'react'
import LoginForm from './LoginForm'
import Footer from '../components/Footer'

type Props = {}

const page = (props: Props) => {
    return (
    <>
        <div>
            <LoginForm/>
        </div>
        <Footer/>
    </>
    )
}

export default page