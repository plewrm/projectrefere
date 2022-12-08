import "../../Style/jobs.scss"
import "../../Style/candidate.scss"
import Navbar from '../navbar/Navbar';
import Sidebar from '../sidebar/Sidebar';
import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'reactstrap';
import "../../Style/countrymaster.scss"
// import { Table } from 'reactstrap';
import Table from 'react-bootstrap/Table';
// import Switch from '@mui/material/Switch'
// import { Link } from "react-router-dom";
// import { IconButton, Dialog, Grid } from '@mui/material'
// import EditIcon from '@mui/icons-material/Edit';
import { useFormik } from "formik";
import { signupSchema } from "../../schemas";
// import TextField from '@mui/material/TextField'
// import Modals from "../CountryMaster/Modals"
// import DialogTitle from '@mui/material/DialogTitle'
// import DialogActions from '@mui/material/DialogActions'
// import DialogContent from '@mui/material/DialogContent'
import { Link } from 'react-router-dom';
import swal from '@sweetalert/with-react'
import { BsEyeFill, BsPencilFill, BsFillTrashFill, BsTrashFill } from "react-icons/bs";
import { BsFillPencilFill } from "react-icons/bs";
import AxiosApi from "../../AxiosApi"
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import ReferenceSet from "yup/lib/util/ReferenceSet";

const Country = () => {

  const [is_edit, setIsEdit] = useState(false)
  const [open, setOpen] = useState(false)
  const navigate = useNavigate();
  const [client_masters, setClient_Masters] = useState([]);
  
  
  
  const getClient = async () => {
    const response = await AxiosApi.get('/client_data/')
    setClient_Masters(response.data)
  }
  useEffect(() => {
    getClient();
  }, []);
 

  const deletClient = async (id) => {
    await AxiosApi.delete('/client_data/' + id)
    alert("Data Deleted")
    getClient();
  }

 
  return (
    <div className='jobList'>
      <Sidebar />
      <div className="jobListContainer">
        <Navbar />
        <div className="bar">
          <div className="barTitle">Client</div>
          {/* <Link to="/candidates/new"  style={{textDecoration:"none"}} className="barAddButton">
              Add Country
            </Link> */}
          {/* <Button
            outline
            className="btn"
            // className="openModalBtn"
            color="primary"
            // onClick={handleClickOpen}
          // onClick={()=>{setOpen(true)}}
          >Add New Client
          </Button> */}
          <Link to="/AddNewClient"
            className="btn"
            style={{ marginLeft: 545, color: "white", backgroundColor: "Blue" }}
          >Add New Client
          </Link>
          {/* {open && <Modals/>} */}
        </div>
        <section className="form-block">
          <div className="container headerTable">
            <div className="table-container-home white-box">
              <Table striped bordered hover>
                <thead >
                  <tr >
                    <th className="al_center">ID</th>
                    <th>Client Name</th>
                    <th>Client Code</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    client_masters?.map((row, index) => (
                      <tr key={row.id}>
                        <td>{index + 1}</td>
                        <td>{row.client_name}</td>
                        <td>{row.client_code}</td>
                        <td className="tb_al"><span title="Edit">
                          <Link to={`/ClientEdit/&user=` + row.id} className="barAddButton">
                            {/* <EditIcon></EditIcon> */}
                            <BsFillPencilFill />
                          </Link>
                        </span>
                          <span title="View">
                            <Link to={`/ViewClient/&user=` + row.id} className="barAddButton">
                              {/* <View /> */}
                              <BsEyeFill />
                            </Link>
                          </span>
                          <span title="Delete">
                            <Link className="barAddButton"
                              to=""
                            // to={'deleteCandidate' + row.id}
                            // onClick={() => deleteCandidate(row.id)} 
                            >
                              <BsTrashFill onClick={() => deletClient(row.id)} />
                              {/* <DeleteIcon onClick={() => deleteCandidate(row.id)}></DeleteIcon> */}
                            </Link>
                          </span></td>

                      </tr>
                    ))
                  }
                </tbody>
              </Table>
            </div>
          </div>
        </section>

       

      </div>
    </div>
  )
}
export default Country;




// import "../../Style/jobs.scss"
// import "../../Style/candidate.scss"
// import Navbar from '../navbar/Navbar';
// import Sidebar from '../sidebar/Sidebar';
// import React, { useState, useEffect, useRef } from 'react';
// import { Button } from 'reactstrap';
// import "../../Style/countrymaster.scss"
// // import { Table } from 'reactstrap';
// import Table from 'react-bootstrap/Table';
// import Switch from '@mui/material/Switch'
// // import { Link } from "react-router-dom";
// import { IconButton, Dialog, Grid } from '@mui/material'
// import EditIcon from '@mui/icons-material/Edit';
// import { useFormik } from "formik";
// import { signupSchema } from "../../schemas";
// import TextField from '@mui/material/TextField'
// // import Modals from "../CountryMaster/Modals"
// import DialogTitle from '@mui/material/DialogTitle'
// import DialogActions from '@mui/material/DialogActions'
// import DialogContent from '@mui/material/DialogContent'
// import { Link } from 'react-router-dom';
// import swal from '@sweetalert/with-react'
// import { BsEyeFill, BsPencilFill, BsFillTrashFill, BsTrashFill } from "react-icons/bs";
// import { BsFillPencilFill } from "react-icons/bs";
// import AxiosApi from "../../AxiosApi"
// import { useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import ReferenceSet from "yup/lib/util/ReferenceSet";

// const Country = () => {

//   // const [country_masters, setClient_Masters] = useState(subscribarList);
//   const [country_masters, setCountry_Masters] = useState([]);
//   const [is_edit, setIsEdit] = useState(false)
//   // const [edit_id,setEditId]=useState("")
//   const [open, setOpen] = useState(false)
//   const navigate = useNavigate();
//   const ref = React.useRef();
//   const {
//     register,
//     watch,
//     handleSubmit,
//     // reset,
//     setValue,
//     formState: { errors },
//     formState,
//   } = useForm({
//     mode: "onTouched",
    
//   });
//   const [formdata, setFormData] = useState(
//     {
//       client_name: "",
//       client_code: "",
//     })
//   const getClient = async () => {
//     const response = await AxiosApi.get('/client_data/')
//     setCountry_Masters(response.data)
//   }
//   useEffect(() => {
//     getClient();
//   }, []);
//   const inputEvent = (event) => {
//     const { name, value } = event.target;
//     setFormData((preValue) => {
//       return {
//         ...preValue,
//         [name]: value,
//       };
//     });
//   };

//   // function setdefaultvalue() {
//   //   setFormData({ client_name: "", isActice: 1 })
//   // }

//   function handleClickOpen() {
//     // ref.current.click();
//     // setdefaultvalue()
//     setIsEdit(false)
//     setOpen(true)
//     // alert("hello")
//   }

//   function handleClose() {
//     setOpen(false)
//   }

//   function reset(ev) {
//     ev.preventDefault();
//     ref.current.reset();
//   }

//   const deletClient = async (id) => {
//     await AxiosApi.delete('/client_data/' + id)
//     alert("Data Deleted")
//     getClient();
//   }

//   const onSubmit = async (e) => {
//     const formvalue = {
//       client_name: formdata.client_name,
//       client_code: formdata.client_code
//     }
//     console.log("FormData  values", formvalue)
//     const confirmationButton = window.confirm(
//       "Client Added Sucussesfuly..."
//     )
//     if (confirmationButton === true) {
//       const result = AxiosApi.post('/client_data/', formvalue).then((result) => {
//         if (result.data == "success") {
//           alert("Client Created Success...")
//         }
//         handleClose();
//     getClient();

//         // navigate("/client")
//       })
//     }

//   }

//   return (
//     <div className='jobList'>
//       <Sidebar />
//       <div className="jobListContainer">
//         <Navbar />
//         <div className="bar">
//           <div className="barTitle">Client</div>
//           {/* <Link to="/candidates/new"  style={{textDecoration:"none"}} className="barAddButton">
//               Add Country
//             </Link> */}
//           <Button
//             outline
//             className="btn"
//             // className="openModalBtn"
//             color="primary"
//             onClick={handleClickOpen}
//           // onClick={()=>{setOpen(true)}}
//           >Add New Client
//           </Button>
//           {/* {open && <Modals/>} */}
//         </div>
//         <section className="form-block">
//           <div className="container headerTable">
//             <div className="table-container-home white-box">
//               <Table striped bordered hover>
//                 <thead >
//                   <tr >
//                     <th className="al_center">ID</th>
//                     <th>Client Name</th>
//                     <th>Client Code</th>
//                     <th>Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {
//                     country_masters?.map((row, index) => (
//                       <tr key={row.id}>
//                         <td>{index + 1}</td>
//                         <td>{row.client_name}</td>
//                         <td>{row.client_code}</td>
//                         <td className="tb_al"><span title="Edit">
//                           <Link to={`/EditCandidate/&user=` + row.id} className="barAddButton">
//                             {/* <EditIcon></EditIcon> */}
//                             <BsFillPencilFill />
//                           </Link>
//                         </span>
//                           <span title="View">
//                             <Link to={`/ViewCandidate/&user=` + row.id} className="barAddButton">
//                               {/* <View /> */}
//                               <BsEyeFill />
//                             </Link>
//                           </span>
//                           <span title="Delete">
//                             <Link className="barAddButton"
//                               to=""
//                             // to={'deleteCandidate' + row.id}
//                             // onClick={() => deleteCandidate(row.id)} 
//                             >
//                               <BsTrashFill onClick={() => deletClient(row.id)} />
//                               {/* <DeleteIcon onClick={() => deleteCandidate(row.id)}></DeleteIcon> */}
//                             </Link>
//                           </span></td>

//                       </tr>
//                     ))
//                   }
//                 </tbody>
//               </Table>
//             </div>
//           </div>
//         </section>

//         <Dialog
//           open={open}
//           // disableBackdropClick
//           disableEscapeKeyDown
//           aria-labelledby="form-dialog-title"
//         >

//           <form 
//           onSubmit={handleSubmit(onSubmit)}
//           ref={ref}
//           >


//             <DialogTitle id="form-dialog-title">{is_edit ? 'Update' : 'Add New'} Client</DialogTitle>
//             <DialogContent>
//               <Grid container spacing={3}>
//                 <Grid item lg={10} md={12} sm={12} xs={12} sx={{ mt: 2 }}>
//                   <TextField
//                     className="required"
//                     id="client_name"
//                     label="Client Name"
//                     type="text"
//                     fullWidth
//                     name="client_name"
//                     value={formdata.client_name || ''}
//                     onChange={inputEvent}

//                   // validators={['required' ,'matchRegexp:^[a-zA-Z][[^a-zA-Z ]+$']}
//                   // errorMessages={['this field is required','Only Characters allowed']}
//                   />
//                   {/* {errors.clientName && touched.clientName ?
//                     (<p className="form-error">{errors.clientName}</p>
//                     ) : null} */}
//                 </Grid>
//                 <Grid item lg={6} md={12} sm={12} xs={12} sx={{ mt: 2 }}>
//                   <TextField
//                     className="required"
//                     id="client_code"
//                     label="Client Code"
//                     type="text"
//                     fullWidth
//                     name="client_code"
//                     value={formdata.client_code || ''}
//                     onChange={inputEvent}

//                   // validators={['required' ,'matchRegexp:^[a-zA-Z][[^a-zA-Z ]+$']}
//                   // errorMessages={['this field is required','Only Characters allowed']}
//                   />
//                   {/* {errors.clientName && touched.clientName ?
//                     (<p className="form-error">{errors.clientName}</p>
//                     ) : null} */}
//                 </Grid>
//               </Grid>
//             </DialogContent>
//             <DialogActions>
//               <Button
//                 variant="outlined"
//                 color="secondary"
//                 onClick={handleClose}
//               >
//                 Cancel
//               </Button>
//               <Button 
//               // onClick={handleClose} 
//               type="submit" 
//               variant="outlined" 
//               color="primary">
//                 Save
//               </Button>
//             </DialogActions>
//           </form>
//         </Dialog>

//       </div>
//     </div>
//   )
// }
// export default Country;


