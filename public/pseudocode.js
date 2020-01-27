formlist
selection

function() {
   if the selection is "No Parent Category" {
      clear the formlist
   } else if the formlist already contains the selection {
      display "this category is already tagged."
   } else {
      formlist.unshift(selection) // adds the selection to the start of the list.
      finds the piece of data with the same name as the selection
      finds the parent of that object, passes it into the find parent function.
   }
}

findparent(parentname) {
   if parentname is not "All" {
      if formlist already contains the parentname {
         take it from the array and put it at the start
      } else {
         put parentname at the start of the array
      }
      let newparent = the data that has the parentname as it's name .parent
      pass that newparent into the findparent function.
   }
}

should be left with the formlist as an array of ordered categories.
