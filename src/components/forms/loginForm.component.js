import React, { useState, useEffect } from 'react'
import '../../styles/components/forms/loginForm.style.scss'

import API from '../../axios.config'

export default function LoginForm(props) {

    const [errMessage, setErrMessage] = useState("")

    useEffect (() => {
    }, [errMessage])

    const Login = event => {
        event.preventDefault()
        API.post("/user/authorise", {
            username: event.target.username.value,
            password: event.target.password.value
        })
        .then(res => props.onSuccess(res.data.token))
        .catch(err => setErrMessage(err.response.data.errorMessage))
        
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