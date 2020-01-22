import React, { Component } from 'react'

import SideNav from '../components/navigation/navbar.component'
import StaticNav from '../components/navigation/staticnav.component'
import AddCategoryForm from '../components/forms/addCategoryForm.component'
import EditCategoryForm from '../components/forms/editCategoryForm.component'

import '../styles/pages/categories.page.scss'

export default class Categories extends Component {
  render() {
    return (
      <>
        <SideNav />
        <StaticNav />
        <h1>This is the Categories page.</h1>
        <AddCategoryForm />
        <EditCategoryForm />
      </>
    )
  }
}

