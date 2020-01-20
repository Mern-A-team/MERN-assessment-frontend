import React, { Component } from 'react'
import '../../styles/components/forms/loginForm.style.scss'
import '../../styles/components/forms/categoryForm.style.scss'

import SubmitButton from '../buttons/standard_button.component'

export default class EditCategoryForm extends Component {
  render() {
    return (
        <div id="editCategoryFormContainer" className="formContainer">
            <h1 className="pageHeading" data-cy="editCategoryFormHeading">Edit Category</h1>
            <form>

                <div className="fieldset">
                    <label>Rename:</label>
                    <input type="text" placeholder="Category Name" />
                </div>
                <div className="fieldset">
                    <label>Parent Category:</label>

                    <select name="categoryList" form="editCategory">
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