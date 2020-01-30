import React, { useState, useEffect } from 'react'

import SideNav from '../components/navigation/navbar.component'
import StaticNav from '../components/navigation/staticnav.component'
import AddUserForm from '../components/forms/addUserForm.component'
import EditUserForm from '../components/forms/editUserForm.component'

import '../styles/pages/users.page.scss'

import API from '../axios.config'

export default function Users(props) {

  const [users, getUsers] = useState([])

  useEffect(() => {
    CallUsers()
  }, [])

  useEffect(() => {
    console.log(`these are the users: ${users}`)
  }, [users])

  const CallUsers = () => {
    API.get("/user/", {
    })
    .then(res => getUsers(res.data.users))
    .catch(err => console.log(err))
  }

    return (
      <>
        <SideNav />
        <StaticNav />
        <h1>This is the Users page.</h1>
        {users && users.map((u) => <div id="user">{u.username}</div>)}
        <AddUserForm /><br />
        <EditUserForm />
      </>
    )
}

