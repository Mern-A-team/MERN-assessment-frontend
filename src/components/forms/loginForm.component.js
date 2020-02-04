import React, { useState, useEffect } from 'react'
import '../../styles/components/forms/loginForm.style.scss'

import API from '../../axios.config'

export default function LoginForm(props) {

    const [errMessage, setErrMessage] = useState("")
    const [tokenResponse, setTokenResponse] = useState()

    useEffect (() => {
    }, [errMessage])

    const Login = event => {
        event.preventDefault()
        API.post("/user/authorise", {
            username: event.target.username.value,
            password: event.target.password.value
        })
        .then(res => {  LoggedIn(res) })
        .catch(err => setErrMessage(err.response.data.errorMessage))
        
    }

    useEffect (() => {
        if (tokenResponse) {
        props.onSuccess(tokenResponse.data.token)
        }
    }, [tokenResponse])

    const LoggedIn = (res) => {
        props.setPromptMessage("You have been Logged In successfully.")
        setTokenResponse(res)
    }

    
    return (
        <div id="loginFormContainer" className="formContainer">
            <h1 className="pageHeading" data-cy="loginFormHeading">Login Form</h1>
            <form onSubmit={Login}>

                <div className="fieldset">
                    <label>Username:</label>
                    <input name="username" type="text" />
                    {errMessage && errMessage.includes("username") &&
                        <span id="inputError">{errMessage}</span>
                    }
                </div>
                <div className="fieldset">
                    <label>Password:</label>
                    <input type="text" name="password" />
                    {errMessage && errMessage.includes("password") &&
                        <span id="inputError">{errMessage}</span>
                    }
                </div>
                <div className="fieldset">
                    <button cy-data="submitButton" id="submitButton" type="submit" value="Submit"> Submit </button>
                </div>

            </form>
        </div>
    )
}