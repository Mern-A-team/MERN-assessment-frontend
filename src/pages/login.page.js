import React, {} from "react";

import LoginForm from "../components/forms/loginForm.component";
import LogoutPrompt from "../components/prompts/logoutPrompt.prompt.component"

import "../styles/pages/login.page.scss";

export default function Login(props) {
    return (
      <>
      {props.logoutMessage &&
        <LogoutPrompt {...props}/>
      }
        <LoginForm onSuccess={props.onSuccess} promptMessage={props.promptMessage} setPromptMessage={props.setPromptMessage}/>
      </>
    );
  }
