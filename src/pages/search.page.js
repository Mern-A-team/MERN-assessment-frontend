import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import SearchForm from '../components/forms/searchForm.component'

import SideNav from '../components/navigation/navbar.component'
import '../styles/pages/search.page.scss'

import API from '../axios.config'

export default function Search(props) {

  const [results, setResults] = useState()


  useEffect(() => {
    PhotoIndex()
  }, [])

  const PhotoIndex = () => {
    API.get("/photos/", {

    })
    .then(res => setResults(res.data))
    .catch(err => console.log(err))
  }

    return (
      <>
        <SideNav />
        <div id="main">
        <SearchForm />
        { results && results.map((photo) => <p>Name:{photo.name} Categories:{photo.category.join(", ")} Description:{photo.description.substring(0, 25)}...<Link to={{pathname: `/photo/${photo._id}`}}>Show</Link></p> )}   
        </div>
      </>
    )
  }

