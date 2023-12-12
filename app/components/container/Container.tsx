import React from 'react'
import styles from '@/app/sass/container.module.sass'
import Link from 'next/link'
import Filter from './Filter'
import Item from './Item'

type Props = {}

const Container = (props: Props) => {
    return (
        <div>
            <div className={styles.container}>
                <Link href='/filters' className='opacity-60'>
                    <div>
                        <Filter/>
                    </div>
                </Link>
                <div className='px-20 ml-[100px]'>
                    <Item/>
                </div>
            </div>
        </div>
    )
}

export default Container