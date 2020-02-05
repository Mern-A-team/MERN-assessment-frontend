import React, { Component } from 'react'

// Seperately styled login button for landing.
export default class LoginButton extends Component {
  render() {
    return (
      <button cy-data="loginButton" id="loginButton">Log In</button>
    )
  }
}
