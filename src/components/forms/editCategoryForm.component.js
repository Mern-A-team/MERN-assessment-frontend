import React, { Component } from 'react'
import '../../styles/components/forms/loginForm.style.scss'
import '../../styles/components/forms/categoryForm.style.scss'

import SubmitButton from '../buttons/standard_button.component'

export default class EditCategoryForm extends Component {
  render() {

    let data = [
        { parent: "All", name: "Landscapes" },
        { parent: "All", name: "People"},
        { parent: "People", name: "General MacArthur"},
        { parent: "All", name: "Year" },
        { parent: "Year", name: "40s" },
        { parent: "40s", name: "1942" }
    ]

    // Populates a string that is used for each option in the "Select Category" dropdown list.
    // Passes data as an array of objects, sets the top level parent and the default level of indentation.
    function populateList(data, parent="All", level=0) {
        // assigns x as all items that have the parent parameter as their parent. 
        const x = data.filter(item => item.parent === parent)
        // if the parent is "All", push the element name to options and call the function again.
        if (parent === "All") {
            x.forEach((element, index) => {
                options.push(`${element.name}`)
                populateList(data, element.name)                
            });
        // This will run if the parent isn't "All"
        } else {
            // For each element that isn't top level, add a space by default and another for each level of indentation.
            x.forEach((element, index) => {
                let space = "\u00A0\u00A0"
                for (let i=0; i < level; i++) {
                    space += "\u00A0\u00A0"
                }
                // Push the element name with the appropriate indentation.
                options.push(`${space}${element.name}`)
                // Call the function again but pass in the element's name as the parent and add a level of indentation.
                populateList(data, element.name, level+1)
            })
        }
    }

    // Sets the empty array for options to be mapped.
    let options = []
    // Calls the populateList function and passes in the data to be mapped.
    populateList(data)

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
                        {options.map(opt => <option>{opt}</option>)}
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