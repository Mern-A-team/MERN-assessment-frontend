import React, { Component } from 'react'
import StaticNav from '../components/navigation/staticnav.component'
import '../styles/pages/addphoto.page.scss'

export default class AddPhoto extends Component {
  render() {
    return (
      <>
        <StaticNav />
        <h1>This is the Add Photo page.</h1>
      </>
    )
  }
}
