import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../../styles/components/navigation/navbar.style.scss'

export default class SideNav extends Component {
  render() {

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

    return (
         <>
         <nav id="sidenav">
            <div className="sidenavContainer" id="sidenavTop">
               <Link to="/"><i class="fas fa-home fa-lg"></i></Link>
               <Link to="/search"><i class="fas fa-search fa-lg"></i></Link>
               <Link to="/categories"><i class="fas fa-book fa-lg"></i></Link>
               <Link to="/addphoto"><i class="fas fa-plus fa-lg"></i></Link>
            </div>
            <div className="sidenavContainer" id="sidenavMiddle">
               <input type="checkbox" id="toggle" onClick={toggleNav} />
               <i className="fas fa-arrow-right fa-lg" id="toggleArrow"></i>
            </div>
            <div className="sidenavContainer" id="sidenavBottom">
               <Link to="/users"><i class="fas fa-user-friends fa-lg"></i></Link>
               <Link to="/help"><i class="far fa-question-circle fa-lg"></i></Link>
            </div>

         </nav>
         <nav id="extendednav">
         <h1>This is the extended navigation.</h1>
         </nav>
      </>
    )
  }
}