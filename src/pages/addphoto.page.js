import React, { Component } from 'react'
import SideNav from '../components/navigation/navbar.component'
import StaticNav from '../components/navigation/staticnav.component'
import '../styles/pages/addphoto.page.scss'

export default class AddPhoto extends Component {
  render() {
    return (
      <>
        <SideNav />
        <StaticNav />
        <h1>This is the Add Photo page.</h1>
      </>
    )
  }
}
