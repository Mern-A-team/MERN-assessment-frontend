import React, { useState, useEffect } from 'react'
import '../../styles/components/forms/categoryFilters.style.scss'

export default function SearchFilters(props) {
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
        props.GetCategories(formCategories)
    }, [formCategories])

    function findChildren(current, tag, data, formlist) {
            console.log(`this is the current category: ${current}`)
            tag.push(current)
            if (data.find(element => element.parent === current)) {
                let newCategory = data.find(element => element.parent === current)
                console.log(`this is the newCategory: ${newCategory}`)
                if (formlist.includes(newCategory.name)) {
                findChildren(newCategory.name, tag, data, formlist)
                }
            }
                console.log(`this is the tag before join: ${tag}`)
                let stringtag = tag.join(" > ")
                console.log(`this is the stringtag: ${stringtag}`)
                let stringtaglist = [...tags]
                console.log(`This should be existing tags: ${stringtaglist}`)
                tag.forEach(element => {
                    let matches = stringtaglist.filter(x => x.includes(element))
                    console.log(`This matches the string: ${matches}`)
                    let index = stringtaglist.indexOf(matches[0])
                    console.log(`stringtaglist: ${stringtaglist}`)
                    console.log(`index: ${index}`)
                    if (matches.length) stringtaglist.splice(index, 1)
                })
                stringtaglist.unshift(stringtag)
                console.log(`this should only have unique strings: ${stringtaglist}`)
                setTags(stringtaglist.filter(e => e))
    }

    function setTag(formlist, data) {
        // for each element in formlist
            let tag = []
            let element = formlist[0]
            findChildren(element, tag, data, formlist)
            console.log(`this is the new formlist: ${formlist}`)
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
               {tags.map((t,i) => <div id="tags">{t}<a href="#" onClick={() => removeTag(i)}><i class="fas fa-times"></i></a></div>)} 
            </div>
            <select id="categorySelect" name="category" form="add" defaultValue="All" onChange={setFilters}>
                <option className="option" value="All">No Parent Category</option>
                {options.map(opt => <option className="option">{opt}</option>)}
            </select>
            <div id="tagErrorDiv">
                {tagError}
            </div>
        </>
    )
}