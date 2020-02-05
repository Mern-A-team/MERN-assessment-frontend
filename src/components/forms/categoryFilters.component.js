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

                    let index = stringtaglist.indexOf(matches[0])
                    console.log(`stringtaglist: ${stringtaglist}`)
                    console.log(`index: ${index}`)
                    if (matches.length) stringtaglist.splice(index, 1)
                })
                stringtaglist.unshift(stringtag)
                console.log(`this should only have unique strings: ${stringtaglist}`)
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
        console.log(`the formlist for populatetags: ${formlist}`)
        setTag(formlist, data)
    }

    function findParent(category, formcategories) {
        let parent = category.parent
        console.log(`this is the category's parent: ${parent}`)
        if (parent !== "All") {
            if (!formcategories.includes(parent)) {
              formcategories.unshift(parent)
            }
            else {
              formcategories.splice(formcategories.indexOf(parent), 1)
              formcategories.unshift(parent)
            }
        let newParent = data.find(x => x.name === parent)
        console.log(`this is the new parent: ${newParent}`)
        findParent(newParent, formcategories)
      }
   }

    const setFilters = () => {
        let formcategories = [...formCategories]
        let selection = document.getElementsByTagName("select")[0].value
        let trimmed = selection.trim()
        console.log(`this is the selection: ${trimmed}`)
        setTagError("")
        if (trimmed === "All") {
            formcategories = []
            setTags([])
        } else if (formcategories.includes(trimmed)) {
            setTagError("This tag already exists")
        } else {
            formcategories.unshift(trimmed)
            console.log(`selection at the start of formcategories: ${formcategories}`)
            let category = data.filter(element => element.name === trimmed)[0]
            console.log(`this is the category: ${category}`)
            findParent(category, formcategories)
        }
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


    const removeTag = (index) => {
        let formlist = [...formCategories]
        let taglist = [...tags]
        let item = taglist[index]
        console.log(`removing item: ${item}`)
        taglist.splice(index, 1) 
        let split = item.split(" > ")
        console.log(`this is split ${split}`)
        split.forEach(element => {
            let formindex = formlist.indexOf(element)
            formlist.splice(formindex, 1)
            console.log(`${element} should not be in ${formlist}`)
        })
        setFormCategories(formlist)
        setTags(taglist)
    }

    return (
        <>
            <div id="tagContainer">
               {tags.map((t,i) => <div id="tags" key={t}>{t}<button key={i} onClick={() => removeTag(i)}><i  className="fas fa-times"></i></button></div>)} 
            </div>
            <select id="categorySelect" name="category" form="add" defaultValue="All" onChange={setFilters}>
                <option className="option" value="All">No Parent Category</option>
                {options.map(opt => <option key={opt} className="option">{opt}</option>)}
            </select>
            <div id="tagErrorDiv">
                {tagError}
            </div>
        </>
    )
}