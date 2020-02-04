import React, { useState, useEffect } from 'react'
// import { history } from 'react-dom'
import '../../styles/components/prompts/authorization.prompt.style.scss'

export default function LogoutPrompt(props) {
  useEffect(() => {
    return () => {
      props.setLogoutMessage(false)
    }
  }, []);
  
    return (
       <>
         { props.logoutMessage && 
         <div id="logoutPrompt">
            <p>{props.logoutMessage}</p>
         </div>
         }
         
         
      </>
    )
  }