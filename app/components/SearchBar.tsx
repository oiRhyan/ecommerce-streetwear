import React from 'react'
import {BiSearch} from 'react-icons/bi'
import styles from '../sass/searchbar.module.sass'

type Props = {}

const SearchBar = (props: Props) => {
    return (
        <div className={styles.searchbar}>
            <button title='search'><BiSearch size={20} className='opacity-50' /></button>
            <input
            type='text'
            className='outline-none bg-transparent ml-2 caret-blue-500 placeholder:font-light placeholder:text-gray-600 text-[15px]'
            placeholder='Pesquisar'
            autoComplete='false'
            />
        </div>
    )
    }

export default SearchBar