import React, { useState, useEffect } from "react";

import SideNav from "../components/navigation/navbar.component";
import AddCategoryForm from "../components/forms/addCategoryForm.component";
import EditCategoryForm from "../components/forms/editCategoryForm.component";

import "../styles/pages/categories.page.scss";

import API from "../axios.config";

export default function Categories(props) {
  const [data, getData] = useState([]);
  const [popup, setPopup] = useState("");
  const [options, setOptions] = useState([]);
  const [current, setCurrent] = useState();

  useEffect(() => {
    CallCategories();
  }, []);

  useEffect(() => {
    if (data) {
      let options = [];
      // Populates a string that is used for each option in the "Select Category" dropdown list.
      // Passes data as an array of objects, sets the top level parent and the default level of indentation.
      function populateList(data, parent = "All", level = 0) {
        // assigns x as all items that have the parent parameter as their parent.
        const x = data.filter(item => item.parent === parent);
        // if the parent is "All", push the element name to options and call the function again.
        if (parent === "All") {
          x.forEach((element, index) => {
            options.push(`${element.name}`);
            populateList(data, element.name);
          });
          // This will run if the parent isn't "All"
        } else {
          // For each element that isn't top level, add a space by default and another for each level of indentation.
          x.forEach((element, index) => {
            let space = "\u00A0\u00A0";
            for (let i = 0; i < level; i++) {
              space += "\u00A0\u00A0";
            }
            // Push the element name with the appropriate indentation.
            options.push(`${space}${element.name}`);
            // Call the function again but pass in the element's name as the parent and add a level of indentation.
            populateList(data, element.name, level + 1);
          });
        }
      }

      setOptions(options);

      // Calls the populateList function and passes in the data to be mapped.
      populateList(data);
    }
  }, [data]);

  const CallCategories = () => {
    API.get("/categories/", {})
      .then(res => getData(res.data.results))
      .catch(err => console.log(err));
  };

  const RenderAddCategory = () => {
    let form = "add";
    setPopup(form);
  };

  const RenderEditCategory = event => {
    event.preventDefault();
    let category = event.target.value;
    setCurrent(category.trim());
    let form = "edit";
    setPopup(form);
  };

  const CloseAdd = () => {
    let form = "";
    setPopup(form);
  };

  const CloseEdit = () => {
    let form = "";
    setPopup(form);
  };

  return (
    <>
      <SideNav />
      <h1>This is the Categories page.</h1>
      {props.userRole && props.userRole === "admin" && (
        <div id="buttonContainer">
          <button onClick={RenderAddCategory}>Add Category</button>
        </div>
      )}

      {data &&
        popup === "" &&
        options.map((cat,i) => (
          <p key={cat}>
            {cat}
            <button onClick={RenderEditCategory} value={cat} key={i.toString()}>
              Edit
            </button>
          </p>
        ))}

      {popup === "add" && (
        <AddCategoryForm Close={CloseAdd} selectoptions={options} />
      )}
      {popup === "edit" && (
        <EditCategoryForm
          Close={CloseEdit}
          selectoptions={options}
          data={data}
          current={current}
        />
      )}
    </>
  );
}
