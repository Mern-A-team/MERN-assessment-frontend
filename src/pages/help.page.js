import React, { Component } from 'react'
import StaticNav from '../components/navigation/staticnav.component'
import '../styles/pages/help.page.scss'

export default class Help extends Component {
  render() {
    return (
      <>
        <StaticNav />
        <h1>This is the Help page.</h1>
      </>
    )
  }
}

