import React, { useState, useEffect } from 'react'
import SideNav from '../components/navigation/navbar.component'
import '../styles/pages/dashboard.page.scss'
import AuthorizationPrompt from '../components/prompts/authorization.prompt.component'
import API from '../axios.config'

export default function Dashboard(props) {
	const [currentImage, setCurrentImage] = useState('army-dudes')
	const [imageCount, setImageCount] = useState(0)

	// for the random images on the dashboard.
	useEffect(() => {
		let images = ['ladies', 'party', 'photography', 'army-dudes']
		setCurrentImage(images[Math.floor(Math.random() * images.length)])
		API.get('/photos').then(res => setImageCount(res.data.length))
	}, [])

	return (
		<>
			<SideNav />
			<AuthorizationPrompt {...props} />

      <div id="archivise-dash"><h1>ARCHIVISE</h1><h3>A photo database for the MacArthur Museum</h3></div>
			<div id='dashboard-div'>
				<h1>Welcome {props.userRole}</h1>
				<div id='dashboard-links'>
					<h2>Quick Actions</h2>
					{ props.userRole !== "guest" && 
					<a href='/addphoto'>Upload a photo</a>
					}
					<a href='/categories'>Categories</a>
					<a href='/search'>Search images</a>
					<a href='/help'>Help Page</a>
				</div>
				<h2 id='dashboard-count'>You have {imageCount} Images</h2>
				<div id='dashboard-images'>
					<img
						src={require(`../assets/dashboard-images/${currentImage}.jpeg`)}
					/>
				</div>
			</div>
		</>
	)
}
