import React, { Component } from 'react'
import SearchFilters from '../components/forms/searchFilters.component'
import SideNav from '../components/navigation/navbar.component'
import StaticNav from '../components/navigation/staticnav.component'
import '../styles/pages/search.page.scss'

export default class Search extends Component {
  render() {
    return (
      <>
        <SideNav />
        <StaticNav />
        <h1>This is the Search page.</h1>
        <SearchFilters />
      </>
    )
  }
}

