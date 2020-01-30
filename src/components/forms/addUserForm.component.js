import React, { useEffect, useState } from 'react'
import '../../styles/components/forms/loginForm.style.scss'
import '../../styles/components/forms/categoryForm.style.scss'
import '../../styles/components/forms/userForm.style.scss'

import API from '../../axios.config'

import SubmitButton from '../buttons/standard_button.component'

export default function AddUserForm(props) {

    const [errMessage, setErrMessage] = useState("")

    const CreateUser = event => {
        event.preventDefault()
        API.post("/user/", {
            username: event.target.username.value,
            password: event.target.password.value,
            role: event.target.role.value
        })
        .then(res => console.log(res))
        .catch(err => setErrMessage(err.response.data.errorMessage))
        
    }

    return (
        <div id="addUserFormContainer" className="formContainer">
            <form onSubmit={CreateUser} id="addUser"> 
            <h3 className="divHeading" data-cy="addUserDivHeading">Add User</h3>
                <div className="fieldset">
                    <label>Username:</label>
                    <input type="text" name="username" />
                </div>
                <div className="fieldset">
                    <label>Password:</label>
                    <input type="text" name="password" />
                </div>
                <div className="fieldset">
                    <label>Role:</label>
                    <select name="role" form="addUser" defaultValue="Guest">
                        <option value="admin">Admin</option>
                        <option value="volunteer">Volunteer</option>
                        <option value="guest">Guest</option>
                    </select>

                </div>
                <div className="fieldset">
                    <SubmitButton />
                </div>
            </form>

            <div id="roleInfoContainer">
                <h3 className="divHeading" data-cy="roleInfoDivHeading">Role Information</h3>
                <p>This is role information.</p>
            </div>
        </div>
    )
}