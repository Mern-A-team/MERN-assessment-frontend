import React, { Component } from "react";

import LoginForm from "../components/forms/loginForm.component";

import "../styles/pages/login.page.scss";

export default function Login(props) {
    return (
      <>
        <LoginForm onSuccess={props.onSuccess} promptMessage={props.promptMessage} setPromptMessage={props.setPromptMessage}/>
      </>
    );
  }
