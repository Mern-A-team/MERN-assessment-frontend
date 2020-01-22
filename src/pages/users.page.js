import React, { Component } from 'react'

import SideNav from '../components/navigation/navbar.component'
import StaticNav from '../components/navigation/staticnav.component'
import AddUserForm from '../components/forms/addUserForm.component'
import EditUserForm from '../components/forms/editUserForm.component'

import '../styles/pages/users.page.scss'

export default class Users extends Component {
  render() {
    return (
      <>
        <SideNav />
        <StaticNav />
        <h1>This is the Users page.</h1>
        <AddUserForm /><br />
        <EditUserForm />
      </>
    )
  }
}

