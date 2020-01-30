import React, { Component } from 'react'
import CategoryFilters from './categoryFilters.component'
import '../../styles/components/forms/loginForm.style.scss'

import SubmitButton from '../buttons/standard_button.component'

export default class EditCategoryForm extends Component {
  render() {

    return (
        <div id="addPhotoFormContainer" className="formContainer">
            <h1 className="pageHeading" data-cy="addPhotoFormHeading">Add Photo</h1>
            <form>

                <div className="fieldset">
                    <label>Photo Name:</label>
                    <input type="text" name="photoname"/>
                </div>
                <div className="fieldset">
                    <label>Categories:</label>

                    <CategoryFilters />

                </div>
                <div className="fieldset">
                    <SubmitButton />
                </div>

            </form>
        </div>
    )
  }
}