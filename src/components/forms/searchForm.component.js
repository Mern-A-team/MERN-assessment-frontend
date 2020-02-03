import React, { useEffect, useState } from 'react'
import CategoryFilters from './categoryFilters.component'
import '../../styles/components/forms/categoryFilters.style.scss'



export default function SearchFilters() {

   
   const [formcat, setformcat] = useState()



    const GetCategories = (array) => { 
      setformcat(array)
   }

    return (
        <>
            <div id="searchContainer">
               <input id="searchInput" type="text" placeholder="Search descriptions here..."></input>
               <button>Search</button>
            </div>
            <p id="filterTitle">Category Filters:</p>
               <CategoryFilters GetCategories={GetCategories} />  

        </>
   )
}