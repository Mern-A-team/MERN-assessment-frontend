import React, { useEffect } from 'react'
import '../../styles/components/forms/loginForm.style.scss'
import '../../styles/components/forms/categoryForm.style.scss'
import '../../styles/components/forms/userForm.style.scss'

import SubmitButton from '../buttons/standard_button.component'
import API from '../../axios.config'

export default function EditUserForm(props) {

    useEffect(() => {
        
    })

    const UpdateUser = event => {
        event.preventDefault()
        API.put(`/user/${props.currentUser}`, {
            username: event.target.username.value,
            password: event.target.password.value,
            role: event.target.role.value
        })
        .then(res => console.log(res))
        .catch(err => console.log(err.response.data.errorMessage))
        
    }

    const DeleteUser = event => {
        event.preventDefault()
        API.delete(`/user/${props.currentUser}`)
        .then(res => console.log(res))
        .catch(err => console.log(err.response.data.errorMessage))
        
    }

    return (
        <div id="editUserFormContainer" className="formContainer"><button onClick={props.Close}>X</button>
            <form id="editUser" onSubmit={UpdateUser}>
            <h3 className="divHeading" data-cy="editUserDivHeading">Edit User</h3>
                <div className="fieldset">
                    <label>Username:</label>
                    <input type="text" name="username" />
                </div>
                <div className="fieldset">
                    <label>Password:</label>
                    <input type="text" name="password"/>
                </div>
                <div className="fieldset">
                    <label>Role:</label>

                    <select name="Role" form="editUser" name="role" defaultValue="Guest">
                        <option value="Admin">Admin</option>
                        <option value="Volunteer">Volunteer</option>
                        <option value="Guest">Guest</option>
                    </select>

                </div>
                <div className="fieldset">
                    <SubmitButton />
                </div>
                <div className="fieldset">
                    <button onClick={DeleteUser}>Delete</button>
                </div>
            </form>

        </div>
    )
}