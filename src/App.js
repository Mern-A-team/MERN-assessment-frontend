import React, { Component } from 'react'
import { BrowserRouter, Route } from "react-router-dom";

import LandingPage from './pages/landing.page'
import LoginPage from './pages/login.page'
import DashboardPage from './pages/dashboard.page'
import UsersPage from './pages/users.page'
import SearchPage from './pages/search.page'
import HelpPage from './pages/help.page'

import AddPhotoPage from './pages/addphoto.page'
import EditPhotoPage from './pages/editphoto.page'
import ShowPhotoPage from './pages/showphoto.page'

import CategoriesPage from './pages/categories.page'

import './styles/main.scss'

export default class App extends Component {
  render() {
    return (
      <>
        <BrowserRouter>
          <div>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/dashboard" component={DashboardPage} />
            <Route exact path="/addphoto" component={AddPhotoPage} />
            <Route exact path="/editphoto" component={EditPhotoPage} />
            <Route exact path="/showphoto" component={ShowPhotoPage} />
            <Route exact path="/users" component={UsersPage} />
            <Route exact path="/categories" component={CategoriesPage} />
            <Route exact path="/search" component={SearchPage} />
            <Route exact path="/help" component={HelpPage} />
          </div>
        </BrowserRouter>
      </>
    )
  }
}
