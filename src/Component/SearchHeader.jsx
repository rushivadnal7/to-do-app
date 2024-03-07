import React from 'react'
import '../Component/SearchHeader.css'

import { HiOutlineSearch } from "react-icons/hi";

const SearchHeader = () => {

    return (
        <>
            <section className='search-header'>
                <div className='w-full h-full flex items-center justify-around'>
                    <div className="title-text">
                        Projects
                    </div>
                    <div className="search-div">
                        <HiOutlineSearch className='search-icon' />
                        <input type='text' placeholder='search..' />
                    </div>
                </div>
            </section>
        </>
    )
}

export default SearchHeader