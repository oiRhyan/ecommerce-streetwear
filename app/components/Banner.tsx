import Image from 'next/image'
import styles from '@/app/sass/home.module.sass'
import logo from '@/public/imgs/main.png'
import collection from '@/public/imgs/collection.jpg'
import Link from 'next/link'
import adesivo from '../../public/imgs/restricted.png'
import {} from 'react-icons'

export default function Banner(){
    return(
        <div className={styles.home}>
            <Image src={logo} alt='logo' className={styles.home_image}/>
            <div className={styles.promo}>
                <Link href='/myproducts'>
                <Image src={collection} alt='promo' className={styles.promo_image} />
                <h2> Palace® New Drop </h2>
                <h3> O verão chegou e com ele uma nova moda, veja agora o novo drop Palace da Angels</h3>
                </Link>
            </div>
            <div className={styles.adesivo}>
                <Image src={adesivo}  alt='restrito'/>

            </div>
        </div>
    )
}