import React from 'react'
import Navbar from '../components/Navbar'
import styles from '../sass/navbar.module.sass'
import Container from '../components/container/Container'
import Footer from '../components/Footer'

type Props = {}

const page = (props: Props) => {
    return (
        <div className={styles.navbar_space}>
            <Navbar/>
            <Container/>
            <Footer/>
        </div>
    )
}

export default page