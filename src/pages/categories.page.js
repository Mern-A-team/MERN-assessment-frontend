import React, { Component } from 'react'
import StaticNav from '../components/navigation/staticnav.component'
import '../styles/pages/categories.page.scss'

export default class Categories extends Component {
  render() {
    return (
      <>
        <StaticNav />
        <h1>This is the Categories page.</h1>
      </>
    )
  }
}

