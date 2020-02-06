import React, { useState, useEffect } from 'react'
import '../../styles/components/forms/categoryFilters.style.scss'

import API from '../../axios.config'

export default function SearchFilters(props) {
    // The live data from the API request.
    const [data, setData] = useState([])
    // Tags to be physically rendered in the view.
    const [tags, setTags] = useState([])
    // Options for the drop down select.
    const [options, setOptions] = useState([])
    // Form Categories that are actually passed into the form as an array.
    const [formCategories, setFormCategories] = useState([])
    // Error variable for messages.
    const [tagError, setTagError] = useState("")

    // On mount of Category Filters component, run getData().
    useEffect(() => {
        GetData()
    }, [])

    // When the data variable changes, populateList with the new data and setOptions with that resulting list.
    useEffect(() => {
        let list = populateList(data)
        setOptions(list)
        // eslint-disable-next-line
    }, [data])

    // When the formCategories variable changes, populateTags with data. Pass the formCategories up to the parent component using GetCategory function.
    useEffect(() => {
        populateTags(data)
        props.GetCategories(formCategories)
        // eslint-disable-next-line
    }, [formCategories])

    // API call to get an array of all photos in the database.
    const GetData = () => {        
        API.get(`/categories/`, {
            
        })
        // On resolution, set the data variable to the array of 
        .then(res => {setData(res.data.results)})
        .catch(err =>console.log(err.response.data.errorMessage))  
    }

    // Find the children categories of a category, if there are any, and remove them from formlist.
    function findChildren(current, tag, data, formlist) {
            // Add the current category to the tag.
            tag.push(current)

            // if there is a category where the parent is the current category, set it as the newCategory.
            if (data.find(element => element.parent === current)) {
                let newCategory = data.find(element => element.parent === current)
                 // if the newCategory is in the formlist also, run the function on the name of newCategory to find it's children.
                if (formlist.includes(newCategory.name)) {
                findChildren(newCategory.name, tag, data, formlist)
                }
            }
            // sets stringtag as a joined string of all the elements in the tag variable.
                let stringtag = tag.join(" > ")

            // sets stringtaglist as the array of already present tags.
                let stringtaglist = [...tags]

            // for each tag...
                tag.forEach(element => {
                    // if a tag in stringtaglist includes the element, set it to the matches variable.
                    let matches = stringtaglist.filter(x => x.includes(element))
                    // set the index of the match in stringtaglist as the index variable.
                    let index = stringtaglist.indexOf(matches[0])
                    // if there is a match, splice the tag from the stringtaglist.
                    if (matches.length) stringtaglist.splice(index, 1)
                })
                // add the new tag to the stringtaglist.
                stringtaglist.unshift(stringtag)
                
                // set stringtaglist as the tags.
                setTags(stringtaglist.filter(e => e))
    }

    // using the formlist and data, set the tags to be rendered.
    function setTag(formlist, data) {
            // a new tag.
            let tag = []
            let element = formlist[0]
            // Find the children categories of the first element in formlist.
            findChildren(element, tag, data, formlist)
    }

    function populateTags(data) {
        let formlist = [...formCategories]
        setTag(formlist, data)
    }

    // find the parent of the category and manipulate the formcategories array.
    function findParent(category, formcategories) {
        // assign the category parent to the parent variable.
        let parent = category.parent
        // if it's not a top level category..
        if (parent !== "All") {
            // if formcategories doesn't include parent, put it to the front of the formcategories array.
            if (!formcategories.includes(parent)) {
              formcategories.unshift(parent)
            }
            // if parent is already present in the array, splice it, and put it at the beginning of the array.
            else {
              formcategories.splice(formcategories.indexOf(parent), 1)
              formcategories.unshift(parent)
            }
        // set newParent as the object where the name of the category is the new elements parent.
        let newParent = data.find(x => x.name === parent)
        // run findParent using the newParent.
        findParent(newParent, formcategories)
      }
   }

   // Set the filters to be applied to the search or photo.
    const setFilters = () => {
        // set formCategories array as the formcategories variable.
        let formcategories = [...formCategories]
        // get the value of the drop down selection, and set the value as the selection variable.
        let selection = document.getElementsByTagName("select")[0].value
        // set the trimmed selection as the trimmed variable.
        let trimmed = selection.trim()
        // set the tag error to a falsey value.
        setTagError("")
        // if the trimmed selection value is all (if there is no parent category), empty the tags and formcategories array.
        if (trimmed === "All") {
            formcategories = []
            setTags([])
        // if formcategories already includes trimmed, render an error message.
        } else if (formcategories.includes(trimmed)) {
            setTagError("This tag already exists")
        // otherwise, add the trimmed selection to the start of the form category array.
        } else {
            formcategories.unshift(trimmed)
            // set category as the object where the trimmed value equals the element name.
            let category = data.filter(element => element.name === trimmed)[0]
            // find the parent of the category, and pass in the formcategories array.
            findParent(category, formcategories)
        }
        // set FormCategories using the manipulated formcategories array.
        setFormCategories(formcategories)
    }

    // Populates a string that is used for each option in the "Select Category" dropdown list.
    // Passes data as an array of objects, sets the top level parent and the default level of indentation.
    function populateList(data, list=[], parent="All", level=0) {
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
                let space = "\u00A0\u00A0\u00A0\u00A0"
                for (let i=0; i < level; i++) {
                    space += "\u00A0\u00A0\u00A0\u00A0"
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

// remove the tag from the page, and formcategory.
    // takes the index of the tag as a parameter.
    const removeTag = (index) => {
        // set variables to be manipulated.
        let formlist = [...formCategories]
        let taglist = [...tags]
        let item = taglist[index]
        // remove the item from the taglist.
        // split the string and remove the specific item from the tag.
        let split = item.split(" > ")
        split.forEach(element => {
            let formindex = formlist.indexOf(element)
            formlist.splice(formindex, 1)
        })
        // set the variables from the manipulated data.
        setFormCategories(formlist)
        setTags(taglist)
    }

    return (
        <>
        {/* This is where the tags are mapped and rendered. */}
            <div id="tagContainer">
               {tags.map((t,i) => <div id="tags" key={t}>{t}<button key={i} onClick={() => removeTag(i)}><i  className="fas fa-times"></i></button></div>)} 
            </div>
            {/* category drop down. */}
            <select id="categorySelect" name="category" form="add" defaultValue="All" onChange={setFilters}>
                <option className="option" value="All">No Parent Category</option>
                {options.map(opt => <option key={opt} className="option">{opt}</option>)}
            </select>
            {/* Where a tag error will render if there is one. */}
            <div id="tagErrorDiv">
                {tagError}
            </div>
        </>
    )
}