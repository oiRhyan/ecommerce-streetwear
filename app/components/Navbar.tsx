'use client';
import { useState } from 'react';
import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import Logo from '../../public/imgs/street-logo.png'
import SearchBar from './SearchBar';
import styles from '../sass/navbar.module.sass';
import { HiMiniUserCircle } from "react-icons/hi2";
import { HiMiniShoppingCart } from "react-icons/hi2";
import {BsChevronCompactUp} from "react-icons/bs"
import {signIn, signOut, useSession } from 'next-auth/react';

type Props = {}

const Navbar = (props: Props) => {
    const [showProfile, setShowProfile] = useState(false)
    const [showNav, setShowNav] = useState(false)
    const {data:session} = useSession()
    console.log(session?.user)

    const SignOut = () => {
        if(session && session.user){
            return (
                <ul className='py-5 px-1 text-neutral-600 '>
                    <li className='hover: bg-gray-100 hover: text-neutral-900 px-5 py-2 cursor-pointer'>
                            {session.user.name}
                    </li>
                    <li onClick={() => signOut()} className='whitespace-nowrap hover:text-red-900 px-5 py-2 cursor-pointer'>
                            Sair 
                    </li>
                    <li className='whitespace-nowrap hover: bg-gray-100 hover: text-neutral-900 px-5 py-2 cursor-pointer'>
                            <Link href='/adicionar-produto'>
                                Adicionar 
                            </Link>
                    </li>
                </ul>
            )
        }
        return (
            <ul>
                <li onClick={() => signIn()} className='whitespace-nowrap hover: bg-gray-100 hover: text-neutral-900 px-5 py-2 cursor-pointer'>
                        Login
                </li>
            </ul>
        )
    }

    return (
        <div className={styles.navbar_base}>
            <div className={styles.navbar_base}>
                <div className={styles.navbar_base}>
                    <Link href='/'>
                        <Image src={Logo} height={35} className={styles.image} alt='logo'/>
                    </Link>
                    <nav className={styles.navbar_base}>
                        <ul className={styles.navbar_texts}>
                            <li>
                                <Link href="/" className=''> Inicio </Link>
                            </li>
                            {session?.user &&  (
                            <li>
                                <Link href="myproducts" className=''> Vestuário </Link>
                            </li>
                            )}
                            <li>
                                <Link href="filter" className=''> Sobre </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className={styles.navbar_search}>
                    <SearchBar/>
                <div className={styles.navbar_icons}>
                    <div className={styles.user_cart}>
                        <Link href='/carrinho'>
                            <HiMiniShoppingCart size={25} className="mt-1"/>
                        </Link>
                    </div>
                    <div className={styles.user_icon} onClick={() => setShowProfile(!showProfile)}>
                            <HiMiniUserCircle size={28} />
                        <div className={`text-xs mg-1 ${showProfile ? "" : "hidden"} ${styles.navbar_login}`} id=''> 
                        <SignOut/>
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