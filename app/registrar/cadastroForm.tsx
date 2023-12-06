'use client'
import React from 'react'
import { useState } from 'react'
import styles from '@/app/sass/form.module.sass'
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/navigation'

type Props = {}

const CadastroForm = (props: Props) => {
        const [user, setUser] = useState({
            nome: "",
            email: "",
            password: "",
        })

        const router = useRouter()

        const Registrar = () => {
            const data = {
                name: user.nome,
                email: user.email,
                password: user.password
            }
            axios.post('/api/cadastro', data)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error)
            })
            .finally(() => {
                router.push('/login')
            })
        }
    return (
        <div className={styles.form}>
            <div className='p-10 rounded-lg shadow-lg flex flex-col'>
                <h1 className='text-xl font-medium mb-4'> Registrar</h1>
                <label htmlFor='' className='mb-2'>
                        Nome
                </label>
                <input
                type='text'
                className='p-2 border-gray-300 border-[1px] rounded-lg w-[300px] mb-4 focus:outline-none focus:border-gray-600 text-black'
                id='name'
                value={user.nome}
                placeholder='Digite seu nome:'
                onChange={(e) => setUser({...user, nome: e.target.value})}
                />
                <label htmlFor='' className='mb-2'>
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
                <label htmlFor='' className='mb-2'>
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
                <button onClick={Registrar} className={styles.form_btn}>
                    <span> Criar Conta </span>
                </button>
                <Link href='/login' className={styles.form_text}>
                    Já possuí uma conta?
                </Link>
                <Link href="/" className={styles.form_sub_text}>
                    Entrar
                </Link>
            </div>
        </div>
    )
}

export default CadastroForm