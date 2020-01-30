import React, { useState, useEffect } from 'react'
// import { history } from 'react-dom'
import '../../styles/components/prompts/authorization.prompt.style.scss'

export default function AuthorizationPrompt(props) {
   const [promptMessage, setMessage] = useState("")

   useEffect(() => {
     if (props.location.state) {
       setMessage(props.location.state.promptMessage)
       window.history.pushState(null, '')
     }
   }, [])

    return (
       <>
         { promptMessage && 
         <div id="authPrompt">
            <p>{promptMessage}</p>
         </div>
         }
         
         
      </>
    )
  }