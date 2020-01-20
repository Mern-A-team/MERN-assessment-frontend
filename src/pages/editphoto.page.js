import React, { Component } from 'react'
import StaticNav from '../components/navigation/staticnav.component'
import '../styles/pages/editphoto.page.scss'

export default class EditPhoto extends Component {
  render() {
    return (
      <>
        <StaticNav />
        <h1>This is the Edit Photo page.</h1>
      </>
    )
  }
}

