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
    // on resolution, run the CloseAndPrompt function with the response message.
      .then(res => CloseAndPrompt(res) )
      .catch(err => setErrMessage(err.response.data));
  };

  // sets the confirmation prompt via a function passed into props from the parent component, then unmounts the current component.
  const CloseAndPrompt = (res) => {
    props.setConfirmPrompt(res.data) //set this to null to test while in local host
    // change axios config to local host 5000
    // run backend in local environment 5000
    props.Close()
  }

  return (
    // Render for the Add User Form.
    <div id="addUserFormContainer" className="formContainer">
      <form onSubmit={CreateUser} id="addUser">
        <h3 className="divHeading" data-cy="addUserDivHeading">
          Add User
        </h3>

        {/* This is where the error message will be displayed if there is one. */}
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
          <button id="backButt" onClick={props.Close}>Back to User Dashboard</button>
        </div>
      </form>

      

      {/* This is the button that closes the Add User Form Prompt. */}
      {/* <button onClick={props.Close}>X</button> */}
    </div>
  );
}
