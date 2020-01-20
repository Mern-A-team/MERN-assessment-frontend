import React, { Component } from 'react'

export default class StaticNav extends Component {
  render() {
    return (
        <>
            <h1>This is the static navigation.</h1>
            <nav>
                <a href="/">Home</a><br />
                <a href="/login">Login</a><br />
                <a href="/dashboard">Dashboard</a><br />
                <a href="/users">Users</a><br />
                <a href="/addphoto">Add Photo</a><br />
                <a href="/editphoto">Edit Photo</a><br />
                <a href="/showphoto">Show Photo</a><br />
                <a href="/categories">Categories</a><br />
                <a href="/search">Search</a><br />
                <a href="/help">Help</a><br />
            </nav>
        </>
    )
  }
}
