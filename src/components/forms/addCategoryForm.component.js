import React, { Component } from 'react'
import '../../styles/components/forms/loginForm.style.scss'
import '../../styles/components/forms/categoryForm.style.scss'

import SubmitButton from '../buttons/standard_button.component'

export default class AddCategoryForm extends Component {
  render() {
    return (
        <div id="addCategoryFormContainer" className="formContainer">
            <h1 className="pageHeading" data-cy="addCategoryFormHeading">Add Category</h1>
            <form>

                <div className="fieldset">
                    <label>Name:</label>
                    <input type="text" />
                </div>
                <div className="fieldset">
                    <label>Parent Category:</label>

                    <select name="categoryList" form="addCategory">
                        <option value="All">No Parent Category</option>
                        <option value="People">People</option>
                        <option value="Landscapes">Landscapes</option>
                        <option value="Year">Year</option>
                    </select>

                </div>
                <div className="fieldset">
                    <SubmitButton />
                </div>

            </form>
        </div>
    )
  }
}