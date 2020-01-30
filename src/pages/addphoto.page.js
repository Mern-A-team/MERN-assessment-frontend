import React, { Component } from 'react'

import AddPhotoForm from '../components/forms/addPhotoForm.component'
import SideNav from '../components/navigation/navbar.component'
import '../styles/pages/addphoto.page.scss'

export default class AddPhoto extends Component {
  render() {
    return (
      <>
        <SideNav />
        <AddPhotoForm />
      </>
    )
  }
}
