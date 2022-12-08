import React from 'react'

function ValidateForm() {
   
        var x = document.forms["myForm"]["fname"].value;
        if (x == "" || x == null) {
          alert("Name must be filled out");
          return false;
        }
      
//   return (
//     <div>
      
//     </div>
//   )
}

export default ValidateForm


