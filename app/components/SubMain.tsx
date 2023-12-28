import React from 'react'
import styles from '@/app/sass/submain.module.sass'
import Image from 'next/image'
import Nike from '@/public/imgs/nike.png'
import Palace from '@/public/imgs/palace.png'
import Supreme from '@/public/imgs/supreme.png'
import Obey from '@/public/imgs/obey.png'
import Trasher from '@/public/imgs/trasher.png'
import Drop from '@/public/imgs/collection.jpg'
import prisma from '@/app/prismadb'
import Link from 'next/link'

async function SubMain(){
    const products = await prisma.product.findMany({})
    if(products.length === 0){
        return (
            <div>
                Sem estoque 
            </div>
        )
    }

    return (
        <div className={styles.submain}>
            <div className={styles.concepts}>
                <Image src={Nike} height={100} width={200} alt='nike' className='relative left-6'/>
                <Image src={Obey} height={100} alt='obey'/>
                <Image src={Supreme} height={100} alt='supreme'/>
                <Image src={Palace} height={100} alt='palace' className='relative right-6'/>
                <Image src={Trasher} height={100} alt='palace' className='relative right-10'/>
            </div>
            <div className='ml-10 mt-8'>
                Seja bem vindo a StrettAngels, este projeto é um conceito de ecommerce streetwear utilizando o NextJS 14, o protótipo foi criado utilizando códigos de autenticidade e rotas do própio Next, graças ao Prisma o usúario poderá simular compra de produtos além de garantir que possa editar o estoque e finalizar suas compras. Lembrando que este projeto não tem por objetivo gerar lucro e se trata apenas de um projeto pessoal acadêmico. Aproveite!
            </div>
            <div className='flex'>
                <Image src={Drop} alt='drop' height={500} className='mt-20 ml-20 rounded-2xl' />
                <div>
                <h1 className='mt-20 ml-10 text-5xl'>
                    O novo drop Palace já está disponivel! 
                </h1>
                <div className='flex ml-10 mt-5'>
                {products.map((product) => (
                        product.store === 'Palace' ? (
                                <div key={product.id}>
                                    <Link href={`/dashboard/${product.id}`}>
                                        <div className='height-[200px]'> 
                                            <img src={product.images.split(',')[0]} alt='' height={300} width={200} className='flex ml-4 rounded-xl'/>
                                        </div>
                                        <div>
                                            <div className='height-[200px]'>
                                                <h1 className='mt-5 ml-5'>
                                                    {product.title}
                                                </h1>
                                                <p className='ml-5'>{product.store}</p>
                                                <span className='ml-5'>
                                                    {product.price}R$
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                        ) : (
                                <>
                                </>
                        )
                    ))
                }
                </div>
                <div className={`mt-54 ml-3 text-sm ${styles.text}`}>
                        Antenção! Todas as peças utilziadas neste drop e no site são meras concepts retiradas da internet, caso aja algum problema entre em contato pelo Linkedin ou demais contatos 
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SubMain