import React from 'react'
import SideNav from '../components/navigation/navbar.component'
import StaticNav from '../components/navigation/staticnav.component'
import EditPhotoForm from '../components/forms/editPhotoForm.component'
import '../styles/pages/editphoto.page.scss'

export default function EditPhoto(props) {
    return (
      <>
        <SideNav />
        <StaticNav />
        <h1>This is the Edit Photo page.</h1>
        <EditPhotoForm {...props} />
      </>
    )
  }

