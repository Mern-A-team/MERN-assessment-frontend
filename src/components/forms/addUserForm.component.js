import React, { Component } from 'react'
import '../../styles/components/forms/loginForm.style.scss'
import '../../styles/components/forms/categoryForm.style.scss'
import '../../styles/components/forms/userForm.style.scss'

import SubmitButton from '../buttons/standard_button.component'

export default class AddUserForm extends Component {
  render() {
    return (
        <div id="addUserFormContainer" className="formContainer">
            <form>
            <h3 className="divHeading" data-cy="addUserDivHeading">Add User</h3>
                <div className="fieldset">
                    <label>Username:</label>
                    <input type="text" />
                </div>
                <div className="fieldset">
                    <label>Password:</label>
                    <input type="text" />
                </div>
                <div className="fieldset">
                    <label>Role:</label>

                    <select name="Role" form="addUser" defaultValue="Guest">
                        <option value="Admin">Admin</option>
                        <option value="Volunteer">Volunteer</option>
                        <option value="Guest">Guest</option>
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
}