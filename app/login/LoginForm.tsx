'use client'
import React, {useState} from 'react'
import Link from 'next/link'
import axios from 'axios'
import styles from '@/app/sass/form.module.sass'
import { signIn } from 'next-auth/react'

type Props = {}

const LoginForm = (props: Props) => {
    const [user,setUser] = useState({
        email: "",
        password: "",
    })
    const Login = () => {
        try{
            signIn('credentials', {
                email: user.email,
                password: user.password,
                redirect: true,
                callbackUrl: '/'
            })
        }
        catch{
            console.log('Error ao logar Usuário')
        }
    }

    return (
        <div className={styles.login}>
            <div className='p-10 rounded-lg shadow-lg flex flex-col'>
                <h1 className='text-xl font-medium mb-4 text-white'> Login </h1>
                <label htmlFor='' className='mb-2 text-white'>
                        Email
                </label>
                <input 
                type='text'
                className='p-2 border-gray-300 border-[1px] rounded-lg w-[300px] mb-4 focus:outline-none focus:border-gray-600 text-black'
                id='email'
                value={user.email}
                placeholder='Digite seu email: '
                onChange={(e) => setUser({...user, email: e.target.value})}
                />
                <label htmlFor='' className='mb-2 text-white'>
                        Senha
                </label>
                <input 
                type='text'
                className='p-2 border-gray-300 border-[1px] rounded-lg w-[300px] mb-4 focus:outline-none focus:border-gray-600 text-black'
                id='password'
                value={user.password}
                placeholder='Digite sua senha: '
                onChange={(e) => setUser({...user, password: e.target.value})}
                />
                <button onClick={Login} className='text-white'>
                    <span> Entrar </span>
                </button>
                <Link href='/registrar' className='text-white'>
                    Ainda não possuí uma conta? Cadastre-se Já!
                </Link>
            </div>
        </div>
    )
}

export default LoginForm