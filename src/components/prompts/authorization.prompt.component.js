import React, { useState, useEffect } from 'react'
// import { history } from 'react-dom'
import '../../styles/components/prompts/authorization.prompt.style.scss'

export default function AuthorizationPrompt(props) {

    return (
       <>
         { props.promptMessage && 
         <div id="authPrompt">
            <p>{props.promptMessage}</p>
         </div>
         }
         
         
      </>
    )
  }