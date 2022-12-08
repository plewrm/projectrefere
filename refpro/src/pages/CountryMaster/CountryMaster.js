import React, { Component } from "react";
import ReactDOM from "react-dom";
import { colourOptions } from "./data.js";
import { default as ReactSelect } from "react-select";
// import "./styles.css";
import { components } from "react-select";

const Option = (props) => {
  return (
    <div>
      <components.Option {...props}>
        <input
          type="checkbox"
          checked={props.isSelected}
          onChange={() => null}
        />{" "}
        <label>{props.label}</label>
      </components.Option>
    </div>
  );
};

export default class Example extends Component {
  constructor(props) {
    super(props);
    this.state = {
      optionSelected: null
    };
  }

  handleChange = (selected) => {
    this.setState({
      optionSelected: selected
    });
  };

  render() {
    return (
      <span
        class="d-inline-block"
        data-toggle="popover"
        data-trigger="focus"
        data-content="Please selecet account(s)"
      >
        <ReactSelect
          options={colourOptions}
          isMulti
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
          components={{
            Option
          }}
          onChange={this.handleChange}
          allowSelectAll={true}
          value={this.state.optionSelected}
        />
      </span>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Example />, rootElement);







// import "../../Style/jobs.scss"
// import Navbar from '../../components/navbar/Navbar';
// import Sidebar from '../../components/sidebar/Sidebar';
// import React, { useState, useEffect,useRef } from 'react';
// import { Button } from 'reactstrap';
// import "../../Style/countrymaster.scss"
// import Table from 'react-bootstrap/Table';
// import Switch from '@mui/material/Switch'
// // import { Link } from "react-router-dom";
// import {IconButton, Dialog, Grid} from '@mui/material'
// import EditIcon from '@mui/icons-material/Edit';
// import { useFormik } from "formik";
// import { signupSchema } from "../../schemas";
// import TextField from '@mui/material/TextField'
// // import Modals from "../CountryMaster/Modals"
// import DialogTitle from '@mui/material/DialogTitle'
// import DialogActions from '@mui/material/DialogActions'
// import DialogContent from '@mui/material/DialogContent'
// import { Link,useNavigate } from 'react-router-dom';
// import swal from '@sweetalert/with-react'


// const initialValues ={
//     countryName: " "
// }

// const Country = () => { 
//     const {values, errors,touched, handleChange, handleSubmit} = useFormik({
//         initialValues: initialValues,
//         validationSchema: signupSchema, 
//         onSubmit: (values, action)=>{
//             console.log("log value",values);
//             swal("Done!", "Country Added Successfully!", "success");
//             // alert("Country add success...")
//             action.resetForm();
//         },
//     })
//     const [country_masters, setCountry_Masters] = useState(subscribarList);
//     const [is_edit,setIsEdit]=useState(false)
//     // const [edit_id,setEditId]=useState("")
//     const [open, setOpen] = useState(false)
//     const [formdata,setFormData]=useState({countryName:"",isActice:1})

//     function setdefaultvalue(){
//         setFormData({countryName:"",isActice:1})
//     }

//     function handleClickOpen() {
//         // ref.current.click();
//         setdefaultvalue()
//         setIsEdit(false)
//         setOpen(true)
//         // alert("hello")
//     }

//     function handleClose() {
//         setOpen(false)
//     }

//     // const getcountry_masters = async () => {
        
//     //     // var query = "model="+model
//     //     // const response = await getDataFromApi('subscribarList');
//     //     if(response && response.data.code && response.data.data!=null){
//     //         setCountry_Masters(response.data.data);
//     //         console.log('Country data',response);

//     //     }
        
//     // }
    
//     // const getCandidatesData = () => {
//     //   fetch(candidatesUrl)
//     //   .then(res => res.json())
//     //       .then(res => setCandidatesData(res))
//     //       .catch(err => console.log(err));
//     // };

//     // useEffect(() => {
//     //   getCandidatesData();
//     //   console.log("eneterUSeEffect");
//     // }, [candidatesUrl]);
//     // console.log("candidatesData", candidatesData);
//     // const JobsUrl = "http://localhost:8000/api/jobs/";
//     // console.log("cURL", JobsUrl);
//     // useEffect(() => {
//     //     (
//     //         // console.log("hihi66"),
//     //         async () => {
//     //             // console.log('start here')
//     //             const jobs_response = await fetch(JobsUrl);
//     //             const jobs_data = await jobs_response.json();
//     //             // setTableData(jobs_data);

//     //         }
//     //     )();
//     // }, []);

// // const ref = useRef(null)
//     return (
//         <div className='jobList'>
//             <Sidebar />
//             <div className="jobListContainer">
//                 <Navbar />
//                 <div className="bar">
//                     <div className="barTitle">Country Master</div>
//                     {/* <Link to="/candidates/new"  style={{textDecoration:"none"}} className="barAddButton">
//               Add Country
//             </Link> */}
//                     <Button
//                         outline 
//                         className="btn"
//                         // className="openModalBtn"
//                         style={{ marginLeft: 545, color: "white", backgroundColor: "Blue" }}
//                         color="primary"
//                         onClick={handleClickOpen}
//                         // onClick={()=>{setOpen(true)}}
//                     >Add Country
//                     </Button> 
//                     {/* {open && <Modals/>} */}
//                 </div>
//                 <Table className="tablee" striped bordered hover>

//                         <thead>
//                             <tr>
//                                 <th>Sr No.</th>
//                                 <th>Country Name</th>
//                                 <th>Status </th>
//                                 <th>Action</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {
//                                 country_masters.map((country, index) => (
//                                     <tr key={index}>
//                                         <td >
//                                             {index + 1}
//                                         </td>
//                                         <td >
//                                             {country.countryName}
//                                         </td>
//                                         <td><span className="ac_inactive">{country.isActive ? "Active" : "Inactive"}</span><Switch
//                                             // classes={switchStyles}
//                                             abelPlacement="start"
//                                             label={country.isActive ? "Active" : "Inactive"}
//                                             checked={country.isActive}
//                                             // onChange={()=>handleStateChange(country.id,country.isActive)}
//                                             value={country.isActive ? "Active" : "Inactive"}
//                                             inputProps={{ 'aria-label': 'secondary checkbox' }}
//                                         /></td>
//                                         <td>
//                                             <IconButton
//                                             //  onClick={()=>handleClickEdit(index)}
//                                              >
// 	                                    {/* <Icon color="primary">edit</Icon> */}
//                                         <EditIcon/>
// 	                                </IconButton>
//                                         </td>
//                                     </tr>
//                                 ))
//                             }
//                         </tbody>
//                     </Table>
//                     <Dialog
//                 open={open}
//                 disableBackdropClick
//                 disableEscapeKeyDown
//                 aria-labelledby="form-dialog-title"
//             >
                
//                               <form onSubmit={handleSubmit}>

//                     <DialogTitle id="form-dialog-title">{is_edit ? 'Update' : 'Add New'} Country</DialogTitle>
//                     <DialogContent>
//                         <Grid container spacing={3}>
//                         <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mt: 2 }}>
//                         <TextField
//                                 className="required"
//                                 id="country"
//                                 label="Country Name"
//                                 type="text"
//                                 fullWidth
//                                 name="countryName"
//                                 value={values.countryName || ''}
//                                 onChange={handleChange}
                            
//                                 // validators={['required' ,'matchRegexp:^[a-zA-Z][[^a-zA-Z ]+$']}
//                                 // errorMessages={['this field is required','Only Characters allowed']}
//                             />
//                             {errors.countryName && touched.countryName ?
//                             (<p className="form-error">{errors.countryName}</p>
//                             ): null}
//                             </Grid>
//                         </Grid>
//                     </DialogContent>
//                     <DialogActions>
//                         <Button
//                             variant="outlined"
//                             color="secondary"
//                             onClick={handleClose}
//                         >
//                             Cancel
//                         </Button>
//                         <Button 
//                         // onClick={handleClose} 
//                         type="submit" 
//                         variant="outlined" 
//                         color="primary"
//                         >Save
//                         </Button>
//                     </DialogActions>
//                </form>
//             </Dialog>
                                 
//             </div>
//         </div>
//     )
// }
// export default Country;

// const subscribarList = [
//     {
//         id: '1',
//         countryName: 'India',
//         isActive: true,
       
//     },
//     {
//         id: '2',
//         countryName: 'Afganistan',
//         isActive: false,
       
//     }
//     ,
//     {
//         id: '3',
//         countryName: 'Indonesia',
//         isActive: true,
       
//     }
//     ,
//     {
//         id: '4',
//         countryName: 'Argentina',
//         isActive: false,
       
//     }
    
// ]
