import React, { Component } from 'react'
import SideNav from '../components/navigation/navbar.component'
import StaticNav from '../components/navigation/staticnav.component'
import '../styles/pages/showphoto.page.scss'

export default class ShowPhoto extends Component {
  render() {
    return (
      <>
        <SideNav />
        <StaticNav />
        <h1>This is the Show Photo page.</h1>
      </>
    )
  }
}

