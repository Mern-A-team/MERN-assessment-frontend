import React, { useState } from "react";
import "../../styles/components/forms/loginForm.style.scss";
import "../../styles/components/forms/categoryForm.style.scss";
import "../../styles/components/forms/userForm.style.scss";

import API from "../../axios.config";

import SubmitButton from "../buttons/standard_button.component";

export default function AddUserForm(props) {
    // eslint-disable-next-line
  const [errMessage, setErrMessage] = useState("");

  // API call to create the user.
  const CreateUser = event => {
    event.preventDefault();
    API.post("/user/", {
      username: event.target.username.value,
      password: event.target.password.value,
      role: event.target.role.value
    })
      .then(res => CloseAndPrompt(res) )
      .catch(err => setErrMessage(err.response.data));
  };

  const CloseAndPrompt = (res) => {
    props.setConfirmPrompt(res.data)
    props.Close()
  }

  return (
    // Render for the Add User Form.
    <div id="addUserFormContainer" className="formContainer">
      <form onSubmit={CreateUser} id="addUser">
        <h3 className="divHeading" data-cy="addUserDivHeading">
          Add User
        </h3>

        { errMessage &&
					<p style={{color: "darkred"}}>{errMessage}</p>
				}

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
        <h3 className="divHeading" data-cy="roleInfoDivHeading">
          Role Information
        </h3>
        <p>This is role information.</p>
      </div>

      {/* This is the button that closes the Add User Form Prompt. */}
      <button onClick={props.Close}>X</button>
    </div>
  );
}
