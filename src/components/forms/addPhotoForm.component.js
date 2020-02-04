import React, { useEffect, useState } from 'react'
import CategoryFilters from './categoryFilters.component'
import '../../styles/components/forms/loginForm.style.scss'

import SubmitButton from '../buttons/standard_button.component'

import API from '../../axios.config'
import S3 from 'react-s3'
import S3config from '../../s3-config'

export default function EditCategoryForm(props) {
	const [formcat, setformcat] = useState()
	const [file, setFile] = useState(null)

	const onChangeFile = event => {
		setFile(event.target.files[0])
	}

	const uploadAndSave = event => {
		event.preventDefault()
		event.persist()
		S3.uploadFile(file, S3config)
			.then(data => {
				API.post(`/photos/addPhoto`, {
					name: event.target.name.value,
					idNumber: event.target.idNumber.value,
					location: event.target.location.value,
					description: event.target.description.value,
					category: formcat,
					fileRef: data.location,
					fileName: data.key
				})
					.then(res => {
						console.log(res.data.message)
					})
					.catch(err => console.log(err.message))
			})
			.catch(err => console.log(err))
	}

	const GetCategories = array => {
		setformcat(array)
	}

	return (
		<div id='addPhotoFormContainer' className='formContainer'>
			<h1 className='pageHeading' data-cy='addPhotoFormHeading'>
				Add Photo
			</h1>
			<form id='add' onSubmit={uploadAndSave}>
				<div className='fieldset'>
					<label>Photo Name:</label>
					<input type='text' name='name' />
				</div>

				<div className='fieldset'>
					<label>ID Number:</label>
					<input type='text' name='idNumber' />
				</div>

				<div className='fieldset'>
					<label>Location:</label>
					<input type='text' name='location' />
				</div>

				<div className='fieldset'>
					<label>Description:</label>
					<input type='text' name='description' />
				</div>

				<div className='fieldset'>
					<label>Categories:</label>
					<CategoryFilters GetCategories={GetCategories} />
				</div>

				<div className='fieldset'>
					<label>Image Upload</label>
					<input type='file' name='image' onChange={onChangeFile} />
				</div>

				<div className='fieldset'>
					<SubmitButton />
				</div>
			</form>
		</div>
	)
}
