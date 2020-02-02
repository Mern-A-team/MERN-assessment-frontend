import React, { useState, useEffect } from 'react'
import '../../styles/components/forms/loginForm.style.scss'
import '../../styles/components/forms/categoryForm.style.scss'
import '../../styles/components/forms/userForm.style.scss'

import SubmitButton from '../buttons/standard_button.component'

export default function EditUserForm(props) {
    return (
        <div id="editUserFormContainer" className="formContainer">
            <form>
            <h3 className="divHeading" data-cy="editUserDivHeading">Edit User</h3>
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

                    <select name="Role" form="editUser" defaultValue="Guest">
                        <option value="Admin">Admin</option>
                        <option value="Volunteer">Volunteer</option>
                        <option value="Guest">Guest</option>
                    </select>

                </div>
                <div className="fieldset">
                    <SubmitButton />
                </div>
            </form>

        </div>
    )
}
