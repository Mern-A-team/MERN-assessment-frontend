import React, { Component } from 'react'
import StaticNav from '../components/navigation/staticnav.component'
import '../styles/pages/landing.page.scss'

export default class Landing extends Component {
  render() {
    return (
      <>
        <StaticNav />
        <h1>This is the Landing page.</h1>
      </>
    )
  }
}
