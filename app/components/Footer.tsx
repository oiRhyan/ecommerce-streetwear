import React from 'react'
import styles from '@/app/sass/footer.module.sass'
import {FaLinkedin, FaInstagram, FaGithub} from 'react-icons/fa'

type Props = {}

const Footer = (props: Props) => {
    return (
        <div className={styles.footer}>
        <h1>
            Desenvolvido por Rhyan Araujo Chaves
        </h1>
        <div className='flex relative ml-[622px] mt-24'>
            <ul className='flex gap-3 text-[30px]'> 
                <li>
                    <a href='https://www.linkedin.com/in/rhyan-araujo-chaves/' title='linkedin'>
                        <FaLinkedin/>
                    </a>
                </li>
                <li>
                    <a href='https://www.instagram.com/eiryder/' title='instagram'>
                        <FaInstagram/>
                    </a>
                </li>
                <li>
                    <a href='https://github.com/oiRyder' title='github'>
                        <FaGithub/>
                    </a>
                </li>
            </ul>
        </div>
        </div>
    )
}

export default Footer