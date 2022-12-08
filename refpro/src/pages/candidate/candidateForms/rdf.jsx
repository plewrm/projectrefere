    const handleFormSubmit= () => {
        if (formData.first_name && formData.last_name)
        {
        fetch
        (createCandidateURL,
            {
            method:"POST",
            body:JSON.stringify(formData),
            headers:{'content-type':"application/json"}
            }
        )
        } 
        else {
        alert ("Please fill all mandatory fields");
        }
        }

    const handleSelectedIndustries = (event, values) =>{
        console.log("Industryevent:", event, "IndutryValues:", values)
        // setFormData({...formData,['selected_industry']:JSON.stringify(values.map(function(i){return i.id}))})
        const {value,id}=event.target
        setFormData({...formData,[id]:value});
        }
        console.log("formDataaaa", formData);
        return (
            <div className="formInput">
              <label>First Name*</label>
              <input type="text" id="first_name" value={formData.first_name} onChange={e=>onChange(e)} minLength={2} maxLength={200} placeholder="John" name="first_name" autoComplete="off" required/>
            </div>
        

<button type='submit' onClick={()=>handleFormSubmit()} className="submitbtn">Create</button>