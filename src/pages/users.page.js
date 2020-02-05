import React, { useState, useEffect } from "react";

import SideNav from "../components/navigation/navbar.component";
import StaticNav from "../components/navigation/staticnav.component";
import AddUserForm from "../components/forms/addUserForm.component";
import EditUserForm from "../components/forms/editUserForm.component";

import "../styles/pages/users.page.scss";

import API from "../axios.config";

export default function Users(props) {
  const [users, getUsers] = useState([]);
  const [popup, setPopup] = useState(null);
  const [currentUser, setCurrentUser] = useState();
  const [confirmPrompt, setConfirmPrompt] = useState()

  useEffect(() => {
    CallUsers();
  }, []);

  useEffect(() => {
    console.log(`these are the users: ${users}`);
  }, [users]);

  const CallUsers = () => {
    API.get("/user/", {})
      .then(res => getUsers(res.data.users))
      .catch(err => console.log(err));
  };

  const RenderAddUser = () => {
    let form = "add";
    setConfirmPrompt(null)
    setPopup(form);
  };

  const RenderEditUser = event => {
    event.preventDefault();
    let current = event.target.value;
    setCurrentUser(current);
    let form = "edit";
    setConfirmPrompt(null)
    setPopup(form);
  };

  const CloseAdd = () => {
    let form = "";
    setPopup(form);
    CallUsers()
  };

  const CloseEdit = () => {
    let form = "";
    setPopup(form);
    CallUsers()
  };

  return (
    <>
      <SideNav />

    { confirmPrompt &&
      <p>{confirmPrompt}</p>
    }

      <h1>This is the Users page.</h1>
      <div id="buttonContainer">
        <button onClick={RenderAddUser}>Add User</button>
      </div>
      {users &&
        !popup &&
        users.map(cat => (
          <p>
            {cat.username}
            <button onClick={RenderEditUser} value={cat.id}>
              Edit
            </button>
          </p>
        ))}
      {popup === "add" && <AddUserForm Close={CloseAdd} setConfirmPrompt={setConfirmPrompt} />}
      {popup === "edit" && (
        <EditUserForm Close={CloseEdit} currentUser={currentUser} setConfirmPrompt={setConfirmPrompt} />
      )}
    </>
  );
}
