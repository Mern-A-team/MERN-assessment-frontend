import React, { useEffect, useState } from 'react'
import CategoryFilters from './categoryFilters.component'
import '../../styles/components/forms/categoryFilters.style.scss'


export default function SearchFilters(props) {

   const [formcat, setformcat] = useState()

   // const all = [photos]
   const [results, setResults] = useState()
   const [all, setAll] = useState()

   const getAll = () => {
      event.preventDefault()
      API.get(`/photos/`)
      .then(res => { setAll(res)} )
      .catch(err =>console.log(err.response.data.errorMessage))
   }

   useEffect(() => {
      getAll()
   }, [])

   const searchDescription = event => {
      let resultsArr = []
      event.preventDefault()
      let searchTerms = event.target.search.value.split(' ')
      searchTerms.forEach(term => {
         all.forEach(photo => {
            if (photo.description.search(term)) {
               resultsArr.push(photo)
            }
         })
      })
      setResults(resultsArr)
   }


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