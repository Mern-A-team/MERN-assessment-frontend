import React, { Component } from 'react'
import StaticNav from '../components/navigation/staticnav.component'
import '../styles/pages/search.page.scss'

export default class Search extends Component {
  render() {
    return (
      <>
        <StaticNav />
        <h1>This is the Search page.</h1>
      </>
    )
  }
}

