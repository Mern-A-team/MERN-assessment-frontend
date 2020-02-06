import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../../styles/components/navigation/navbar.style.scss'

import decode from 'jwt-decode'

export default function SideNav(props) {

   // eslint-disable-next-line
   const [token] = useState(sessionStorage.getItem("token"))
   const [userRole] = useState(token ? decode(token).role : null)

   // Logic to toggle extended navigation.
   function toggleNav() {
      function openNav() {
         document.getElementById("extendednav").style.left = "50px"
         document.getElementById("root").style.transitionDuration = ".5s"
         document.getElementById("root").style.marginLeft = "200px"
         document.getElementById("toggleArrow").style.transform = "scaleX(-1)"
      }

      function closeNav() {
         document.getElementById("extendednav").style.left = "-100px"
         document.getElementById("root").style.transitionDuration = ".5s"
         document.getElementById("root").style.marginLeft = "50px"
         document.getElementById("toggleArrow").style.transform = "scaleX(1)"
      }

      let checkbox = document.getElementById("toggle")

      if (checkbox.checked === true) {
         openNav()
      } else { closeNav() }
   }

   // Logout function.
   function clearToken() {
      if (sessionStorage.getItem("token")) {
      sessionStorage.removeItem("token")
      window.location.reload()
      }
   }

    return (
         <>
         <nav id="sidenav">
            <div className="sidenavContainer" id="sidenavTop">
               <Link to="/"><i className="fas fa-home fa-lg"></i></Link>
               <Link to="/search"><i className="fas fa-search fa-lg"></i></Link>
               <Link to="/categories"><i className="fas fa-book fa-lg"></i></Link>
               {/* eslint-disable-next-line */}
               {token && userRole === "volunteer" || userRole === "admin" ?
                <Link to="/addphoto"><i className="fas fa-plus fa-lg"></i></Link>
                :
                 "" }
            </div>
            <div className="sidenavContainer" id="sidenavMiddle">
               <input type="checkbox" id="toggle" onClick={toggleNav} />
               <i className="fas fa-arrow-right fa-lg" id="toggleArrow"></i>
            </div>
            <div className="sidenavContainer" id="sidenavBottom">
               {sessionStorage.getItem("token") && <Link to="" onClick={clearToken}><i className="fas fa-sign-out-alt fa-lg"></i></Link>}
               {token && userRole === "admin" && <Link to="/users"><i className="fas fa-user-friends fa-lg"></i></Link>}
               <Link to="/help"><i className="far fa-question-circle fa-lg"></i></Link>
            </div>

         </nav>
         <nav id="extendednav">
         <div className="sidenavContainer" id="sidenavTop">
               <Link to="/">Home</Link>
               <Link to="/search">Search</Link>
               <Link to="/categories">Category Index</Link>
               {/* eslint-disable-next-line */}
               {token && userRole === "volunteer" || userRole === "admin" &&<Link to="/addphoto">Add a Photo</Link>}
            </div>
            <div className="sidenavContainer" id="sidenavBottom">
               {sessionStorage.getItem("token") && <Link to="" onClick={clearToken}>Logout</Link>}
               {token && userRole === "admin" &&<Link to="/users">Users</Link>}
               <Link to="/help">Help</Link>
            </div>
         </nav>
      </>
    )
}