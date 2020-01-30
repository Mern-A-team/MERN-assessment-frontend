import React, { Component } from 'react'

import SideNav from '../components/navigation/navbar.component'
import LoginForm from '../components/forms/loginForm.component'

import '../styles/pages/login.page.scss'

export default class Login extends Component {

  render() {
    return (
      <>
        <SideNav />
        <LoginForm onSuccess={this.props.onSuccess} />
      </>
    )
  }
}
