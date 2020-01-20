import React, { Component } from 'react'

import StaticNav from '../components/navigation/staticnav.component'
import AddUserForm from '../components/forms/addUserForm.component'

import '../styles/pages/users.page.scss'

export default class Users extends Component {
  render() {
    return (
      <>
        <StaticNav />
        <h1>This is the Users page.</h1>
        <AddUserForm />
      </>
    )
  }
}

