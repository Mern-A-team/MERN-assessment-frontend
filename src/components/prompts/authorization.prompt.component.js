import React, { useEffect } from 'react'

import '../../styles/components/prompts/authorization.prompt.style.scss'

export default function AuthorizationPrompt(props) {
  useEffect(() => {
    return () => {
      props.setPromptMessage(false)
    }
    // eslint-disable-next-line
  }, []);
  
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