import React, { useState, useEffect } from 'react'
import CategoryFilters from './categoryFilters.component'
import '../../styles/components/forms/categoryFilters.style.scss'

export default function SearchFilters() {
    const [data] = useState([])

    useEffect(() => {

    }, [])

    return (
        <>
            <div id="searchContainer">
               <input id="searchInput" type="text" placeholder="Search descriptions here..."></input>
               <CategoryFilters />
            </div>
        </>
   )
}