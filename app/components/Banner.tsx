import Image from 'next/image'
import styles from '@/app/sass/home.module.sass'
import main from '@/public/imgs/angels_new_baner.jpg'
import logo from '@/public/imgs/assets/new_logo.png'


export default function Banner(){
    return(
        <div className={styles.home}>
            <div className='relative'>
            <Image src={main} alt='banner' className={styles.background} />
            </div>
        </div>
    )
}