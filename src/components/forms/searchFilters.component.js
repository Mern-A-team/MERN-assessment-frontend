import React, { useState, useEffect } from 'react'
import '../../styles/components/forms/searchFilters.style.scss'

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
    const [tagError, setTagError] = useState("")

    useEffect(() => {
        let list = populateList(data)
        setOptions(list)
    }, [])

    useEffect(() => {
        populateTags(data)
    },)

    function findChildren(current, tag, data, formlist) {
            tag.push(current)
            if (data.find(element => element.parent === current)) {
                let newCategory = data.find(element => element.parent === current)
                console.log(newCategory)
                findChildren(newCategory.name, tag, data, formlist)
            }
            else {
                console.log(tag)
                let stringtag = tag.join(" > ")
                tag.forEach(element => {
                    let position = formlist.indexOf(element)
                    formlist.splice(position, 1)
                })
                console.log(stringtag)
        }
    }

    function setTag(formlist, data) {
        formlist.forEach(e => {
            let tag = []
            findChildren(e, tag, data, formlist)
            console.log(tag)
            tag = []
        })
    }

    function populateTags(data) {
        let formlist = [...formCategories]

        setTag(formlist, data)
    }

    function findParent(category, formcategories) {
        let parent = category.parent
        if (parent !== "All") {
            if (!formcategories.includes(parent)) {
              formcategories.unshift(parent)
            }
            else {
              formcategories.splice(formcategories.indexOf(parent), 1)
              formcategories.unshift(parent)
            }
        let newParent = data.find(x => x.name === parent)
        findParent(newParent, formcategories)
      }
   }

    const setFilters = () => {
        let formcategories = [...formCategories]
        let selection = document.getElementsByTagName("select")[0].value
        let trimmed = selection.trim()
        setTagError("")
        if (trimmed === "All") {
            formcategories = []
        } else if (formcategories.includes(trimmed)) {
            setTagError("This tag already exists")
        } else {
            formcategories.unshift(trimmed)
            let category = data.filter(element => element.name === trimmed)[0]
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


    return (
        <>
            <div id="tagContainer">
               {tags && tags.map(t => <div id="tags">{t}</div>)} 
            </div>
            <select name="categoryList" form="addCategory" defaultValue="All" onChange={setFilters}>
                <option className="option" value="All">No Parent Category</option>
                {options.map(opt => <option className="option">{opt}</option>)}
            </select>
            <div id="tagErrorDiv">
                {tagError}
            </div>
        </>
    )
}