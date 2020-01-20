import React, { Component } from 'react'
import StaticNav from '../components/navigation/staticnav.component'
import '../styles/pages/dashboard.page.scss'

export default class Dashboard extends Component {
  render() {
    return (
      <>
        <StaticNav />
        <h1>This is the Dashboard page.</h1>
      </>
    )
  }
}
