import React, { Component } from 'react'
import SideNav from '../components/navigation/navbar.component'
import StaticNav from '../components/navigation/staticnav.component'
import '../styles/pages/editphoto.page.scss'

export default class EditPhoto extends Component {
  render() {
    return (
      <>
        <SideNav />
        <StaticNav />
        <h1>This is the Edit Photo page.</h1>
      </>
    )
  }
}

