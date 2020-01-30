import React, {  } from 'react'
import StaticNav from '../components/navigation/staticnav.component'
import SideNav from '../components/navigation/navbar.component'
import '../styles/pages/landing.page.scss'

export default function Landing(props) {
    return (
      <>
        <StaticNav />
        <h1>This is the Landing page.</h1>
        
        <SideNav />
      </>
    )
}
