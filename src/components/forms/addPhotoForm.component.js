import React, { useEffect, useState } from 'react'
import CategoryFilters from './categoryFilters.component'
import '../../styles/components/forms/loginForm.style.scss'

import SubmitButton from '../buttons/standard_button.component'

import API from '../../axios.config'

export default function EditCategoryForm(props) {

    const [formcat, setformcat] = useState()

    const AddPhoto = event => {
        event.preventDefault()
        API.post(`/photos/addPhoto`, {
            name: event.target.name.value,
            idNumber: event.target.idNumber.value,
            location: event.target.location.value,
            description: event.target.description.value,
            category: formcat,
            fileRef: "This is a fileRef."
        })
        .then(res => {console.log(res)})
        .catch(err =>console.log(err.response.data.errorMessage))  
    }

    const GetCategories = (array) => { 
        setformcat(array)
    }

    return (
        <div id="addPhotoFormContainer" className="formContainer">
            <h1 className="pageHeading" data-cy="addPhotoFormHeading">Add Photo</h1>
            <form id="add" onSubmit={AddPhoto}>

                <div className="fieldset">
                    <label>Photo Name:</label>
                    <input type="text" name="name"/>
                </div>

                <div className="fieldset">
                    <label>ID Number:</label>
                    <input type="text" name="idNumber"/>
                </div>

                <div className="fieldset">
                    <label>Location:</label>
                    <input type="text" name="location"/>
                </div>

                <div className="fieldset">
                    <label>Description:</label>
                    <input type="text" name="description"/>
                </div>

                <div className="fieldset">
                    <label>Categories:</label>
                    <CategoryFilters GetCategories={GetCategories} formcat={formcat}/>
                </div>

                <div className="fieldset">
                    <SubmitButton />
                </div>

            </form>
        </div>
    )
}