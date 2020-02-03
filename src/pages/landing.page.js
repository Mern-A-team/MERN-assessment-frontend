import React, {} from 'react'
import { Link } from 'react-router-dom'
import '../styles/pages/landing.page.scss'

import LoginButton from '../components/buttons/landing_login.component'

export default function Landing(props) {
    return (
      <div id="landing">
          <div id="landingGradient">
            <h1>Welcome to Archivise</h1>
            <h3>A photo archiving application built for the MacArthur Museum Brisbane</h3>
              <Link id="loginButton" data-cy="loginButton" to="/login">Log In</Link>
          </div>
      </div>
    )
}
