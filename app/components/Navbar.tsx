'use client';
import { useState } from 'react';
import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import Logo from '../../public/imgs/logo.png'
import SearchBar from './SearchBar';
import styles from '../sass/navbar.module.sass';
import { CiUser } from 'react-icons/ci'
import { CiShoppingCart } from "react-icons/ci";
import {BsChevronCompactUp} from "react-icons/bs"

type Props = {}

const Navbar = (props: Props) => {
    const [showProfile, setShowProfile] = useState(false)
    const [showNav, setShowNav] = useState(false)

    return (
        <div className={styles.navbar_base}>
            <div className={styles.navbar_base}>
                <div className={styles.navbar_base}>
                    <Link href='/'>
                        <Image src={Logo} height={128} width={128} alt='logo'/>
                    </Link>
                    <nav className={styles.navbar_base}>
                        <ul className={styles.navbar_base}>
                            <li>
                                <Link href="/" className=''> Inicio </Link>
                            </li>
                            <li>
                                <Link href="myproducts" className=''> Produtos </Link>
                            </li>
                            <li>
                                <Link href="filter" className=''> Sobre </Link>
                            </li>
                            <li>
                                <Link href="contatos" className=''> Contatos </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className={styles.navbar_search}>
                    <SearchBar/>
                <div className={styles.navbar_icons}>
                    <div className={styles.user_cart}>
                        <Link href='/carrinho'>
                            <CiShoppingCart />
                        </Link>
                    </div>
                    <div className={styles.user_icon} onClick={() => setShowProfile(!showProfile)}>
                            <CiUser />
                        <div className={`text-xs mg-1 ${showProfile ? "" : "hidden"} ${styles.navbar_login}`} id=''> 
                        <Link href='/login'>
                            Login
                        </Link>
                        <span onClick={() => setShowNav(!showNav)} className='p-[9px] bg-gray-100 rounded-full md:hidden'>
                            <BsChevronCompactUp className={`transition ease-in duration-150 ${showNav ? "rotate-180": "0"}`} />
                        </span>
                        </div>
                    </div>
                </div>
                </div>
            <div className={`md:hidden ${showNav ? "pb-4 px-5": "h-0 invisible opacity-0"}`}>
                <ul className='flex flex-col text-[15px] opacity-75 px-2'>
                    <li>

                    </li>

                </ul>
            </div>
            </div>
        </div>
    )
}
export default Navbar