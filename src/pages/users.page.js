import React, { useState, useEffect } from 'react'
import SideNav from '../components/navigation/navbar.component'
import AddUserForm from '../components/forms/addUserForm.component'
import EditUserForm from '../components/forms/editUserForm.component'
import API from '../axios.config'
import '../styles/pages/users.page.scss'

export default function Users(props) {
	const [users, getUsers] = useState([])
	const [popup, setPopup] = useState(null)
	const [currentUser, setCurrentUser] = useState()
	const [confirmPrompt, setConfirmPrompt] = useState()

	// On mount, run CallUsers()
	useEffect(() => {
		CallUsers()
	}, [])

	// API call to find all the users.
	const CallUsers = () => {
		API.get('/user/', {})
			// on resolution, set the users as the returned array of users.
			.then(res => getUsers(res.data.users))
			// on error, console.log the error.
			.catch(err => console.log(err))
	}

	// clear any confirm prompts and setPopup to "add"
	const RenderAddUser = () => {
		let form = 'add'
		setConfirmPrompt(null)
		setPopup(form)
	}

	// clear any confirm prompts and setPopup to "edit", pass in the params for the specific user.
	const RenderEditUser = event => {
		event.preventDefault()
		let current = event.target.value
		setCurrentUser(current)
		let form = 'edit'
		setConfirmPrompt(null)
		setPopup(form)
	}

	// close the add prompt and refresh the users list.
	const CloseAdd = () => {
		let form = ''
		setPopup(form)
		CallUsers()
	}

	// close the edit prompt and refresh the users list.
	const CloseEdit = () => {
		let form = ''
		setPopup(form)
		CallUsers()
	}

	return (
		<>
			<SideNav />
			{/* Show a confirm frompt here. */}
			{confirmPrompt && <p>{confirmPrompt}</p>}
			<h1>Admin User Management</h1>
			<div id='buttonContainer'>
				{/* Render each popup depending on the popup variable. */}
				{popup != 'add' && popup != 'edit' ? (
					<button onClick={RenderAddUser}>Add User</button>
				) : (
					''
				)}
				{popup === 'add' && <AddUserForm Close={CloseAdd} />}
				{popup === 'edit' && (
					<EditUserForm Close={CloseEdit} currentUser={currentUser} />
				)}
			</div>
			{!popup ? (
				<div id='user-page-main'>
					<div id='user-page-left'>
						<h2>User List</h2>
						<table id='user-table'>
							<tr>
								<th>Username</th>
								<th>Role</th>
								<th>Edit/Delete</th>
							</tr>
							{users &&
								!popup &&
								users.map(cat => (
									<tr>
										<td>{cat.username}</td>
										<td>{cat.role}</td>
										<td>
											<button onClick={RenderEditUser} value={cat.id}>
												Edit
											</button>
										</td>
									</tr>
								))}
						</table>
					</div>
					<div id='user-page-right'>

						{/* Role information. */}
						<h2>User Roles</h2>
						<h3>Admin :</h3>
						<p>
							Admin users have full permissions and can perform all actions
							within the app. This includes the standard add, edit and delete
							features for photos and categories. They also have the ability to
							create, edit and delete users; including assigning their roles.
						</p>
						<h3>Volunteer :</h3>
						<p>
							Volunteers can add and edit photos, but cannot delete them. They
							can view and select categories for photos, however they cannot
							create categories.
						</p>
						<h3>Guest :</h3>
						<p>Guests may only view photos and categories.</p>
					</div>
				</div>
			) : (
				''
			)}
		</>
	)
}
