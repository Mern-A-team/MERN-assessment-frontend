import React, { useEffect } from 'react'
import CategoryFilters from './categoryFilters.component'
import '../../styles/components/forms/categoryFilters.style.scss'

export default function SearchFilters() {

    useEffect(() => {

    }, [])


    return (
        <>
            <div id="searchContainer">
               <input id="searchInput" type="text" placeholder="Search descriptions here..."></input>
               <button>Search</button>
            </div>
            <p id="filterTitle">Category Filters:</p>
               <CategoryFilters />     
        </>
   )
}