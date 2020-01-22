import React, { Component } from 'react'
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
               <a href="/"><i class="fas fa-home fa-lg"></i></a>
               <a href="/search"><i class="fas fa-search fa-lg"></i></a>
               <a href="/categories"><i class="fas fa-book fa-lg"></i></a>
               <a href="/addphoto"><i class="fas fa-plus fa-lg"></i></a>
            </div>
            <div className="sidenavContainer" id="sidenavMiddle">
               <input type="checkbox" id="toggle" onClick={toggleNav} />
               <i className="fas fa-arrow-right fa-lg" id="toggleArrow"></i>
            </div>
            <div className="sidenavContainer" id="sidenavBottom">
               <a href="/users"><i class="fas fa-user-friends fa-lg"></i></a>
               <a href="/help"><i class="far fa-question-circle fa-lg"></i></a>
            </div>

         </nav>
         <nav id="extendednav">
         <h1>This is the extended navigation.</h1>
         </nav>
      </>
    )
  }
}