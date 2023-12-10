import Image from 'next/image'
import banner from '@/public/imgs/image-background.png'
import styles from '@/app/sass/home.module.sass'

export default function Banner(){
    return(
        <div className={styles.home}>
            <Image src={banner} alt='banner' className={styles.home_image} />
        </div>
    )
}