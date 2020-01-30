import React, { useState, useEffect } from 'react'
import { BrowserRouter, Route, Redirect } from "react-router-dom";

import API from './axios.config'
import decode from 'jwt-decode'

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

export default function App() {

  const [token, getToken] = useState(sessionStorage.getItem("token"))
  const [userRole] = useState(token ? decode(token).role : null)

//Here when the component is initialized we check session storage for a token
  useEffect(() => {
    getToken(sessionStorage.getItem("token"))
    if (token) {
      API.setHeader(token)
    }
    //Instructing the app upon initialization to use the interceptor.
	  //We are passing in to this function an annonymous function as a paramater
	  //It is not called straight away its just a parameter to be used by the function
	  // Basically it is used to remove the token from session storage if its expired

    API.handleTokenExpiry(() => {
      sessionStorage.clear()
      getToken(null)
    })

  }, [])

  const onSuccess = token => {
    getToken(sessionStorage.setItem("token", token))
    API.setHeader(token)
    window.location.reload()
  };

    return (
      <>
        <BrowserRouter>
          <div>
            <Route exact path="/" 
              render={ (props) => <LandingPage {...props}  /> } />
            <Route exact path="/login" 
              render={ (props) => token ? <Redirect to="/dashboard" /> : <LoginPage {...props} userRole={userRole} onSuccess={onSuccess} /> } />
            <Route exact path="/dashboard" 
              render={ (props) => token ? <DashboardPage {...props} userRole={userRole} /> : <Redirect to="/login" /> } />
            <Route exact path="/addphoto" 
              render={ (props) => userRole==="admin" || userRole==="volunteer" ? <AddPhotoPage {...props} /> : <Redirect to={{pathname: '/dashboard', state: { promptMessage: "This is a prompt" }}} /> } />
            <Route exact path="/editphoto" 
              render={ (props) => userRole==="admin" || userRole==="volunteer" ? <EditPhotoPage {...props} /> : <Redirect to={{pathname: '/dashboard', state: { promptMessage: "This is another prompt" }}} /> } />
            <Route exact path="/showphoto" 
              render={ (props) => token ? <ShowPhotoPage {...props} /> : <Redirect to="/login" /> } />
            <Route exact path="/users"
              render={ (props) => userRole==="admin" ? <UsersPage {...props} /> : <Redirect to="/dashboard" /> } />
            <Route exact path="/categories"
              render={ (props) => token ? <CategoriesPage {...props} /> : <Redirect to="/login" /> } />
            <Route exact path="/search"
              render={ (props) => token ? <SearchPage {...props} /> : <Redirect to="/login" /> } />
            <Route exact path="/help"
              render={ (props) => token ? <HelpPage {...props} /> : <Redirect to="/login" /> } />
          </div>
        </BrowserRouter>
      </>
    )
}
