import React, { Component, useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

export default function SearchFilters() {
    const [data] = useState([
        { parent: "All", name: "Landscapes" },
        { parent: "All", name: "People"},
        { parent: "People", name: "General MacArthur"},
        { parent: "All", name: "Year" },
        { parent: "Year", name: "40s" },
        { parent: "40s", name: "1942" }
    ])
    const [tags, setTags] = useState([])
    const [options, setOptions] = useState([])
    const [formCategories, setFormCategories] = useState([])

    useEffect(() => {
        let list = populateList(data)
        setOptions(list)
    }, [])

    useEffect(() => {
    //     let relations = "People > General MacArthur"
        let taglist = populateTags()
        setTags(taglist)
    }, [])

    function populateTags() {
        let relations = ["People > General MacArthur", "Year > 40s > 1942"]
        return relations
    }

    function findParent(category, keywords, formlist, tag) {
        console.log(category)
        let parent = category.parent
        if (parent !== "All") {
            if (!formlist.includes(parent)) {
              formlist.unshift(parent)
              keywords.unshift(parent)
              tag.unshift(parent)
            }
            else {
              formlist.splice(formlist.indexOf(parent), 1)
              formlist.unshift(parent)
            }
        let newParent = data.find(x => x.name === parent)
        findParent(newParent)
      }
   }

    const setFilters = (keywords=[], formlist=[]) => {
        let selection = document.getElementsByTagName("select")[0].value
        let trimmed = selection.trim()
        let tag = ['']
        if (trimmed === "All") {
            //Delete
        } else if (formlist.includes(trimmed)) {
            //Render already contains prompt
        } else {
            keywords.unshift(trimmed)
            formlist.unshift(trimmed)
            tag.unshift(trimmed)
            let category = data.filter(element => element.name === trimmed)
            findParent(category, keywords, formlist, tag)
        }
        console.log(formlist)
        console.log(tag)
        console.log(keywords)
    }
    // TODO:
    //  - For each change of select
    //      - if the value isn't in FORMCATEGORIES
    //          - find the data where the value === name, push .name to LIST
    //          - if the parent isn't "All"
    //              - Pushes the element.name to LIST and iterates check parent with element.parent
    //          - Reverse LIST
    //          - String LIST with > seperation
    //          - Add new string to TAG array (this will render the visual tag)
    //      - if the value is in FORMCATEGORIES
    //          - render error message

    // Populates a string that is used for each option in the "Select Category" dropdown list.
    // Passes data as an array of objects, sets the top level parent and the default level of indentation.
    function populateList(data, list=[], parent="All", level=0) {
        list = list
        // assigns x as all items that have the parent parameter as their parent. 
        const x = data.filter(item => item.parent === parent)
        // if the parent is "All", push the element name to options and call the function again.
        if (parent === "All") {
            x.forEach(element => {
              list.push(element.name)
              list = populateList(data, list, element.name)                
            });
        // This will run if the parent isn't "All"
        } else {
            // For each element that isn't top level, add a space by default and another for each level of indentation.
            x.forEach(element => {
                let space = "\u00A0\u00A0"
                for (let i=0; i < level; i++) {
                    space += "\u00A0\u00A0"
                }
            // Push the element name with the appropriate indentation.
            //   setOptions([...options, `${space}${element.name}` ])
            // Call the function again but pass in the element's name as the parent and add a level of indentation.
                list.push(space + element.name)
                list = populateList(data, list, element.name, level+1)
            })
        }
        return list
    }


    return (
        <>
            <ul>
               {tags && tags.map(t => <li>{t}</li>)} 
            </ul>
            <select name="categoryList" form="addCategory" defaultValue="All" onChange={setFilters}>
                <option className="option" value="All">No Parent Category</option>
                {options.map(opt => <option className="option">{opt}</option>)}
            </select>
        </>
    )
}

// export default class LoginForm extends Component {
//     constructor() {
//         super()
//         this.state = {
//             options: []
//         }
//     }
//   render() {

//    let data = [
//       { parent: "All", name: "Landscapes" },
//       { parent: "All", name: "People"},
//       { parent: "People", name: "General MacArthur"},
//       { parent: "All", name: "Year" },
//       { parent: "Year", name: "40s" },
//       { parent: "40s", name: "1942" }
//   ]

//   // Populates a string that is used for each option in the "Select Category" dropdown list.
//   // Passes data as an array of objects, sets the top level parent and the default level of indentation.
//   function populateList(data, parent="All", level=0) {
//       // assigns x as all items that have the parent parameter as their parent. 
//       const x = data.filter(item => item.parent === parent)
//       // if the parent is "All", push the element name to options and call the function again.
//       if (parent === "All") {
//           x.forEach((element, index) => {
//               options.push(`${element.name}`)
//               populateList(data, element.name)                
//           });
//       // This will run if the parent isn't "All"
//       } else {
//           // For each element that isn't top level, add a space by default and another for each level of indentation.
//           x.forEach((element, index) => {
//               let space = "\u00A0\u00A0"
//               for (let i=0; i < level; i++) {
//                   space += "\u00A0\u00A0"
//               }
//               // Push the element name with the appropriate indentation.
//               options.push(`${space}${element.name}`)
//               // Call the function again but pass in the element's name as the parent and add a level of indentation.
//               populateList(data, element.name, level+1)
//           })
//       }
//   }

//   // Sets the empty array for options to be mapped.
//   let options = []
//   // Calls the populateList function and passes in the data to be mapped.
//   populateList(data)

//   let relations = []

//   function findParent(x) {
//      console.log(x)
//       let parent = x.parent
//       if (parent !== "All") {
//           if (!relations.includes(parent)) {
//               relations.unshift(parent)
//           }
//           else {
//               relations.splice(relations.indexOf(parent), 1)
//               relations.unshift(parent)
//           }
//          let newParent = data.find(x => x.name === parent)
//          findParent(newParent)
//       }
//    }

//    const addFilter = () => {
//       let selection = document.getElementsByTagName("select")[0].value
//       document.getElementById("select-warning").innerHTML = ""
//     if (selection !== "All") {
//         let output = selection.trim()
//         if (!relations.includes(output)) {
//             relations.unshift(output)

//             let category = data.find(x => x.name === output)
//             findParent(category)
            
//         }
//         else {
//             document.getElementById("select-warning").innerHTML = "This category has already been added as a filter."
//             // relations.splice(relations.indexOf(output))
//             // relations.unshift(output)
//         }    
//     }
//     else {
//         relations = []
//     }
//          // filters.push(output)
         
//         //  let categories = relations

//         // let tags = []

//          let filter = relations.reverse()
//          let final = filter.join(" > ")
//         //  tags.push(final)
//          document.getElementById("filterContainer").innerHTML = `${relations}`

//             //  instead of a new element on the page, we'll be copying the current options state
//         //and adding the selected option to the list of options

//         let newOptions = [...this.state.options, final ]

//         this.setState({options: newOptions})
         
//         //  let tag = React.createElement("div", { id: "tag-test" }, `this is a tag: ${tags}`)
//         //  ReactDOM.render(
//             //  tags,
//             //  document.getElementById("select-warning")
//         //  )
//         //  final = []
//          filter = []
//     }


//     //instead of a new element on the page, we'll be copying the current options state
//     //and adding the selected option to the list of options

//     // let newOptions = [...options, final ]

//     //this.setState({options: newOptions})

//     return (
//         <div id="searchFilters" className="searchContainer">
//             <h1 className="pageHeading" data-cy="searchFormHeading">Search Form</h1>
//             <form>

//                 {this.state.options && <FilterContainer elements={this.state.options} /> }

//                 <select name="categoryList" form="addCategory" defaultValue="All" onChange={addFilter}>
//                         <option className="option" value="All">No Parent Category</option>
//                         {options.map(opt => <option className="option">{opt}</option>)}
//                 </select>
//                 <div id="select-warning">

//                 </div>

//                 <div className="fieldset">
//                     <SubmitButton />
//                 </div>

//             </form>
//         </div>
//     )
//   }
// }

// function FilterContainer({elements}) {
//     return (
//         <div id='filterContainer'>
//             {elements.map(element => (
//                 <React.Fragment>
//                     <p style={{display: "inline"}}>{element}</p><button>X</button>
//                 </React.Fragment>
//             ))}
//         </div>
//     )
// }