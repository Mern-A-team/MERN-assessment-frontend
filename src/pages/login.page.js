import React, { Component } from 'react'

import SideNav from '../components/navigation/navbar.component'
import StaticNav from '../components/navigation/staticnav.component'
import LoginForm from '../components/forms/loginForm.component'

import '../styles/pages/login.page.scss'

export default class Login extends Component {
  render() {
    return (
      <>
        <SideNav />
        <StaticNav />
        <h1>This is the Login page.</h1>
        <LoginForm />
      </>
    )
  }
}
