import React from "react";

import SideNav from "../components/navigation/navbar.component";
import StaticNav from "../components/navigation/staticnav.component";
import "../styles/pages/dashboard.page.scss";
import AuthorizationPrompt from "../components/prompts/authorization.prompt.component";

export default function Dashboard(props) {
  return (
    <>
      <SideNav />
      <AuthorizationPrompt {...props} />
      <StaticNav />
      <h1>This is the Dashboard page.</h1>
    </>
  );
}
