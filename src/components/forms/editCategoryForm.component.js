import React, { useState, useEffect } from 'react'
import '../../styles/components/forms/loginForm.style.scss'
import '../../styles/components/forms/categoryForm.style.scss'

import SubmitButton from '../buttons/standard_button.component'

import API from '../../axios.config'

export default function EditCategoryForm(props) {
    const [options, setOptions] = useState()
    const [data] = useState(props.data)
    const [currentName, setCurrentName] = useState()
    const [currentParent, setCurrentParent] = useState()
    const [currentId, setCurrentId] = useState()

    useEffect (() => {
        let editThis = data.find(obj => obj.name === props.current)
        console.log(editThis)
        setCurrentName(editThis.name)
        setCurrentParent(editThis.parent)
        setCurrentId(editThis._id)
    }, [])

    const CreateOptions = () => {
        let newOptions = []
        console.log(newOptions)
        props.selectoptions.forEach(element => {
            element.trim() === currentName ? console.log(`${element} matches ${currentName}`) : newOptions.push(element)
            console.log(newOptions)
        })
        setOptions(newOptions)
    }

    useEffect (() => {
        CreateOptions()
    }, [currentName])

    const UpdateCategory = event => {
        props.Close()
        event.preventDefault()
        API.patch(`/categories/${currentId}`, {
            name: event.target.name.value,
            parent: event.target.parent.value.trim()
        })
        .then(res => {console.log(res); props.Close()})
        .catch(err =>console.log(err.response.data.errorMessage))  
    }


    return (
        <div id="editCategoryFormContainer" className="formContainer">
            <h1 className="pageHeading" data-cy="editCategoryFormHeading">Edit Category</h1><button onClick={props.Close}>X</button>
            <form id="editCategory" onSubmit={UpdateCategory}>
                <div className="fieldset">
                    <label>Rename:</label>
                    <input type="text" name="name" />
                </div>
                <div className="fieldset">
                    <label>Parent Category:</label>

                    {options &&
                    <select name="parent" form="editCategory" defaultValue={currentParent}>
                        <option className="option" value="All">No Parent Category</option>
                        {options.map(opt => <option className="option" value={opt} >{opt}</option>)}
                    </select>
                    }
                </div>
                <div className="fieldset">
                    <SubmitButton />
                </div>
            </form>
        </div>
    )
  }