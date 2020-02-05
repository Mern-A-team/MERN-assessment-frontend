import React, { useState } from "react";
import "../../styles/components/forms/loginForm.style.scss";
import "../../styles/components/forms/categoryForm.style.scss";

import SubmitButton from "../buttons/standard_button.component";

import API from "../../axios.config";

export default function AddCategoryForm(props) {
  const [options] = useState(props.selectoptions);
  const [errMessage, setErrMessage] = useState("");

  // API call method to create a category.
  const CreateCategory = event => {
    event.preventDefault();
    API.post("/categories/", {
      name: event.target.name.value,
      parent: event.target.parent.value.trim()
    })
    // on resolution, close the Add Category prompt, which also re-renders the data.
      .then(res => {props.Close()})
    // on failure, set the errMessage variable.
      .catch(err => setErrMessage(err.response.data));
  };

  return (
    // Add Category Prompt render.
    <div id="addCategoryFormContainer" className="formContainer">
      <h1 className="pageHeading" data-cy="addCategoryFormHeading">
        Add Category
      </h1>
      {/* Close prompt button. */}
      <button onClick={props.Close}>X</button>
      <form id="addCategory" onSubmit={CreateCategory}>
        {/* Error Message displayed here, if there is one. */}
        {errMessage && <span>{errMessage}</span>}

        <div className="fieldset">
          <label>Name:</label>
          <input type="text" name="name" />
        </div>

        <div className="fieldset">
          <label>Parent Category:</label>
          <select name="parent" form="addCategory" defaultValue="All">
            <option className="option" value="All">
              No Parent Category
            </option>
            {/* Drop down box options mapped from the options variable. */}
            {options.map(opt => (
              <option className="option" key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        <div className="fieldset">
          <SubmitButton />
        </div>

      </form>
    </div>
  );
}
