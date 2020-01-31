import React, { useState, useEffect } from 'react'
import '../../styles/components/forms/loginForm.style.scss'
import '../../styles/components/forms/categoryForm.style.scss'

import SubmitButton from '../buttons/standard_button.component'

import API from '../../axios.config'

export default function AddCategoryForm(props) {

    const [options] = useState(props.selectoptions)
    const [errMessage, setErrMessage] = useState("")


    useEffect (() => {
    }, [errMessage])

    const CreateCategory = event => {
        event.preventDefault()
        API.post("/categories/", {
            name: event.target.name.value,
            parent: event.target.parent.value.trim()
        })
        .then(res => console.log(res))
        .catch(err => setErrMessage(err.response.data.errorMessage))  
    }

    const LogReq = event => {
        event.preventDefault()
        let name = event.target.name.value
        let parent = event.target.parent.value
        let datavalue = [name, parent]
        console.log(datavalue)
    }

    return (
        <div id="addCategoryFormContainer" className="formContainer">
            <h1 className="pageHeading" data-cy="addCategoryFormHeading">Add Category</h1><button onClick={props.Close}>X</button>
            <form id ="addCategory" onSubmit={CreateCategory}>
                <div className="fieldset">
                    <label>Name:</label>
                    <input type="text" name="name" />
                </div>
                <div className="fieldset">
                    <label>Parent Category:</label>

                    <select name="parent" form="addCategory" defaultValue="All">
                        <option className="option" value="All">No Parent Category</option>
                        {options.map(opt => <option className="option" value={opt} >{opt}</option>)}
                    </select>

                </div>
                <div className="fieldset">
                    <SubmitButton />
                </div>

            </form>
        </div>
    )
  }