import React, { Component } from 'react'
import StaticNav from '../components/navigation/staticnav.component'
import '../styles/pages/login.page.scss'

export default class Login extends Component {
  render() {
    return (
      <>
        <StaticNav />
        <h1>This is the Login page.</h1>
      </>
    )
  }
}
