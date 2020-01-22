import React, { Component } from 'react'
import SideNav from '../components/navigation/navbar.component'
import StaticNav from '../components/navigation/staticnav.component'
import '../styles/pages/help.page.scss'

export default class Help extends Component {
  render() {
    return (
      <>
        <SideNav />
        <StaticNav />
        <h1>This is the Help page.</h1>
      </>
    )
  }
}

