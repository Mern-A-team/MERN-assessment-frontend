import React, { Component } from 'react'
import '../../styles/components/forms/loginForm.style.scss'

import SubmitButton from '../buttons/standard_button.component'

export default class LoginForm extends Component {
  render() {
    return (
        <div id="loginFormContainer" className="formContainer">
            <h1 className="pageHeading" data-cy="loginFormHeading">Login Form</h1>
            <form>

                <div className="fieldset">
                    <label>Username:</label>
                    <input type="text" />
                </div>
                <div className="fieldset">
                    <label>Password:</label>
                    <input type="text" />
                </div>
                <div className="fieldset">
                    <SubmitButton />
                </div>

            </form>
        </div>
    )
  }
}