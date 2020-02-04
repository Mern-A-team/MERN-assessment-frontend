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
  const [promptMessage, setPromptMessage] = useState()

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
  }, [token])

  const onSuccess = token => {
    getToken(sessionStorage.setItem("token", token))
    API.setHeader(token)
  };

    return (
      <>
        <BrowserRouter>
          <div>
            <Route exact path="/" 
              render={ (props) => token ? <Redirect to="/dashboard" /> : <LandingPage {...props}  /> } />
            <Route exact path="/login" 
              render={ (props) => token ? <Redirect to="/dashboard" /> : <LoginPage {...props} userRole={userRole} onSuccess={onSuccess} promptMessage={promptMessage} setPromptMessage={setPromptMessage} /> } />
            <Route exact path="/dashboard" 
              render={ (props) => token ? <DashboardPage {...props} userRole={userRole} promptMessage={promptMessage} /> : <Redirect to="/login" /> } />
            <Route exact path="/addphoto" 
              render={ (props) => userRole==="admin" || userRole==="volunteer" ? <AddPhotoPage {...props} /> : <Redirect to={{pathname: '/dashboard', state: { promptMessage: "You need to be logged in as Admin or Volunteer to do this." }}} /> } />
            <Route exact path="/photo/:id/edit" 
              render={ (props) => userRole==="admin" || userRole==="volunteer" ? <EditPhotoPage {...props} /> : <Redirect to={{pathname: '/dashboard', state: { promptMessage: "You need to be logged in as Admin or Volunteer to do this." }}} /> } />
            <Route exact path="/photo/:id" 
              render={ (props) => token ? <ShowPhotoPage {...props} userRole={userRole} /> : <Redirect to="/login" /> } />
            <Route exact path="/users"
              render={ (props) => userRole==="admin" ? <UsersPage {...props} /> : <Redirect to="/dashboard" /> } />
            <Route exact path="/categories"
              render={ (props) => token ? <CategoriesPage {...props} userRole={userRole} /> : <Redirect to="/login" /> } />
            <Route exact path="/search"
              render={ (props) => token ? <SearchPage {...props} /> : <Redirect to="/login" /> } />
            <Route exact path="/help"
              render={ (props) => token ? <HelpPage {...props} /> : <Redirect to="/login" /> } />
          </div>
        </BrowserRouter>
      </>
    )
}
