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

	useEffect(() => {
		CallUsers()
	}, [])

	useEffect(() => {
		console.log(`these are the users: ${users}`)
	}, [users])

	const CallUsers = () => {
		API.get('/user/', {})
			.then(res => getUsers(res.data.users))
			.catch(err => console.log(err))
	}

	const RenderAddUser = () => {
		let form = 'add'
		setPopup(form)
	}

	const RenderEditUser = event => {
		event.preventDefault()
		let current = event.target.value
		setCurrentUser(current)
		let form = 'edit'
		setPopup(form)
	}

	const CloseAdd = () => {
		let form = ''
		setPopup(form)
		CallUsers()
	}

	const CloseEdit = () => {
		let form = ''
		setPopup(form)
		CallUsers()
	}

	return (
		<>
			<SideNav />
			<h1>Admin User Management</h1>
			<div id='buttonContainer'>
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
