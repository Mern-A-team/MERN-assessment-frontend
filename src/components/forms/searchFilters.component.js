import React, { Component } from 'react'

import SubmitButton from '../buttons/standard_button.component'

export default class LoginForm extends Component {
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

//   let filter = []
  let relations = []

  function findParent(x) {
     console.log(x)
      let parent = x.parent
      if (parent !== "All") {
         relations.push(parent)
         let newParent = data.find(x => x.name === parent)
         findParent(newParent)
      }
   }

   function addFilter() {
      let selection = document.getElementsByTagName("select")[0].value

      if (selection !== "All") {
         let output = selection.trim()
         relations.push(output)
         let category = data.find(x => x.name === output)
         findParent(category)
         // filters.push(output)
         
         let filter = relations.reverse()
         let final = filter.join(" > ")
         document.getElementById("filterContainer").innerHTML = `${final}`
      }
   }

    return (
        <div id="searchFilters" className="searchContainer">
            <h1 className="pageHeading" data-cy="searchFormHeading">Search Form</h1>
            <form>

                <div id="filterContainer">
                    
                </div>
                     <select name="categoryList" form="addCategory" defaultValue="All" onChange={addFilter}>
                        <option className="option" value="All">No Parent Category</option>
                        {options.map(opt => <option className="option">{opt}</option>)}
                     </select>
                <div className="fieldset">
                    <SubmitButton />
                </div>

            </form>
        </div>
    )
  }
}