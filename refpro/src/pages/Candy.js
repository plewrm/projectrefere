import React, { useState, useEffect } from 'react';
import Navbar from "../../src/components/navbar/Navbar"
import Sidebar from "../../src/components/sidebar/Sidebar";
// import "../../src/Style/candidateNew.scss";
// import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import base_url from '../../src/services/base_url';
import { Link, useParams } from "react-router-dom";
import {
  Card,
  Row,
  Col,
  Container,
  CardBody,
  Label,
  FormGroup,
  Form,
  Button,
  Input,
  FormText,
  FormFeedback,
} from "reactstrap"

import   'react-bootstrap';
function CandidateEdit() {



  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="bar">

          <div className="top">
            <h1>Edit Candidate</h1>
          </div>
          <p align="right">
            <Link to="/candidates"
              // className="barAddButton"
              className="btn"
            >
              Back
            </Link>
          </p>
        </div>
        <Form>
      <Row>
        <Col>
          <Form.Control placeholder="First name" />
        </Col>
        <Col>
          <Form.Control placeholder="Last name" />
        </Col>
      </Row>
    </Form>

        
        <div style={{ display: "none" }}>
          <Link to="/candidates/" className="barAddButton">
            <button id="candidates">Candidates</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CandidateEdit;





// import "../Style/candidate.scss"
// import Navbar from "../components/navbar/Navbar";
// import Sidebar from "../components/sidebar/Sidebar";
// import React, { useState, useEffect } from 'react';

// import Paper from '@mui/material/Paper';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell, { tableCellClasses } from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TablePagination from '@mui/material/TablePagination';
// import TableRow from '@mui/material/TableRow';
// import { styled } from '@mui/material/styles';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIco from '@mui/icons-material/DeleteForeverRounded';
// import { Link } from "react-router-dom";
// import Candidate from "./candidate/Candidate";


// const initialFormData = {
//     salutation: "1", first_name: "", last_name: "", email: "", calling_code: "91",
//     phone: "", country: "39", state: "0", city: "0", job_change_reason: "1", notice_period: "1",
//     total_experience_years: "10", total_experience_months: "11", open_to_relocate: "1",
//     current_ctc_currency: "1",
//     current_ctc: "", expected_ctc_currency: "2", expected_ctc: "", selected_industry: "['1','2','3']",
//     industry_other: "", cv: "", linkedin: "", pan_number: "", date_of_birth: "", source: "", remarks: "",
//     role: "",
//     organization: "", start_month: "", start_year: "", end_month: "", end_year: "", description: "",
//     category: "2"
// };

// const Candy = () => {
//     const [tableData, setTableData] = useState([]);
//     const [formData, setFormData] = useState(initialFormData);


//     const getCandidate = async () => {
//         console.log('start here')
//         fetch("http://localhost:8000/api/candidates").then((result) => {
//             result.json().then((response) => {
//                 setTableData(response)
//             })
//         })
//     }

//     const AddCandidate = () => {
//         fetch("http://localhost:8000/api/candidates", {
//             method: "POST",
//             body: JSON.stringify({
//                 formData: formData
//                 // ...formData
//             }),
//             headers: {
//                 Action: "Application/json",
//                 "content-type": "Application/json"
//             }
//         })
//             .then((response) => response.json())
//             .then((Candidate) => console.log(Candidate))
//         alert("Candidate Created")
//         getCandidate();
//     }

//     function DeleteCanddate(id) {
//         fetch(`http://localhost:8000/api/candidates/${id}`, {
//             method: 'DELETE'
//         }).then((result) => {
//             result.json().then((response) => {
//                 console.log(response)
//                 alert("Candidate Deleted")
//             })
//         })
//     }

//     useEffect(() => {
//         getCandidate();
//     }, [])




//     return (
//         <div className='candidateList'>
//             <Sidebar />
//             <div className="candidateListContainer">
//                 <Navbar />
//                 <div className="bar">
//                     <div className="barTitle">Candidates</div>
//                     {/* <Link to="/candidates/new" className="barAddButton">
//               +Add New
//             </Link> */}
//                     {/* <button onClick={AddCandidate}>Add</button> */}
//                     <Link to="/candidates/new"
//                         // className="barAddButton"
//                         className="btn"
//                     >
//                         Add New Candidate
//                     </Link>
//                 </div>
//                 <Paper sx={{ width: '100%', overflow: 'hidden' }}>
//                     <TableContainer className="tableContainer">
//                         <Table stickyHeader aria-label="sticky table">
//                             <TableHead>
//                                 <TableRow>
//                                     <TableCell className="tableHead">Edit</TableCell>
//                                     {/* <TableCell className="tableHead">U_ID</TableCell> */}
//                                     <TableCell className="tableHead" sx={{ minWidth: '0px' }}>Expert ID</TableCell>
//                                     <TableCell className="tableHead" sx={{ minWidth: '5px' }}>First Name</TableCell>
//                                     <TableCell className="tableHead" sx={{ minWidth: '50px' }}>Last Name</TableCell>
//                                     <TableCell className="tableHead">Email</TableCell>
//                                     <TableCell className="tableHead">Phone</TableCell>
//                                     <TableCell className="tableHead">CV</TableCell>
//                                     <TableCell className="tableHead">LinkedIn</TableCell>
//                                     <TableCell className="tableHead">PAN</TableCell>
//                                     <TableCell className="tableHead" sx={{ minWidth: '75px' }}>DOB</TableCell>
//                                     <TableCell className="tableHead">Source</TableCell>
//                                     <TableCell className="tableHead">Remarks</TableCell>

//                                 </TableRow>
//                             </TableHead>
//                             <TableBody>
//                                 {
//                                     tableData.map(row => (
//                                         <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
//                                             <TableCell sx={{ maxWidth: '10px' }}>
//                                                 <Link to={`/candidates/edit/${row.id}`} className="barAddButton">
//                                                     <EditIcon />
//                                                 </Link>
//                                                 <button onClick={() => DeleteCanddate(row.id)}><DeleteIco /></button>
//                                                 {/* <DeleteIco onClick={() => deleteProduct(row.id)}/> */}
//                                             </TableCell>
//                                             {/* <TableCell sx={{maxWidth: '5px'}}>{row.user_id}</TableCell> */}
//                                             <TableCell sx={{ maxWidth: '100px' }}>
//                                                 <Link to={"/candidates/map/" + row.id} className="barAddButton">
//                                                     {row.expert_profile_id}
//                                                 </Link>
//                                             </TableCell>
//                                             <TableCell sx={{ maxWidth: '100px' }} className="overflow-candidateFirstName" scope="row" > {row.salutations.title} {row.first_name} {row.first_name_old}</TableCell>
//                                             <TableCell sx={{ maxWidth: '100px' }} className="overflow-candidateLastName" scope="row" >{row.last_name} {row.last_name_old}</TableCell>
//                                             <TableCell sx={{ maxWidth: '150px' }} className="overflow-candidateEmail" scope="row" title={row.email}>{row.email}</TableCell>
//                                             <TableCell sx={{ maxWidth: '100px' }}>{row.phone}</TableCell>
//                                             <TableCell sx={{ maxWidth: '100px' }} className="overflow-candidateCV" scope="row" url="row.cv">{row.cv_displayname}</TableCell>
//                                             <TableCell sx={{ maxWidth: '150px' }} className="overflow-candidateLinkedin" scope="row">{row.linkedin}</TableCell>
//                                             <TableCell sx={{ maxWidth: '100px' }}>{row.pan_number}</TableCell>
//                                             <TableCell sx={{ maxWidth: "100px" }}>{row.date_of_birth}</TableCell>
//                                             <TableCell sx={{ maxWidth: "100px" }}>{row.source}</TableCell>
//                                             <TableCell className="overflow-candidateRemarks" scope="row" title={row.remarks}>{row.remarks}</TableCell>
//                                         </TableRow>
//                                     ))
//                                 }
//                             </TableBody>
//                         </Table>
//                     </TableContainer>
//                     {/* <TablePagination
//             rowsPerPageOptions={[10, 25, 100]}
//             component="div"
//             count={rows.length}
//             rowsPerPage={rowsPerPage}
//             page={page}
//             onPageChange={handleChangePage}
//             onRowsPerPageChange={handleChangeRowsPerPage}
//             // pageSize={16}
//             // rowsPerPageOptions={[5]}
//           /> */}
//                 </Paper>
//             </div>
//         </div>
//     )
// }


// export default Candy;

// // const taleData =[{
// //   "id": 1,
// //   "first_name": "Cedric",
// //   "last_name": "Asprey",
// //   "email": "casprey0@wikia.com",
// //   "gender": "Bigender",
// //   "ip_address": "10.135.241.54"
// // }, {
// //   "id": 2,
// //   "first_name": "Erminia",
// //   "last_name": "Sanham",
// //   "email": "esanham1@desdev.cn",
// //   "gender": "Female",
// //   "ip_address": "55.138.62.82"
// // }, {
// //   "id": 3,
// //   "first_name": "Marigold",
// //   "last_name": "Luddy",
// //   "email": "mluddy2@booking.com",
// //   "gender": "Female",
// //   "ip_address": "192.89.162.22"
// // }, {
// //   "id": 4,
// //   "first_name": "Chrissy",
// //   "last_name": "Halse",
// //   "email": "chalse3@google.co.uk",
// //   "gender": "Female",
// //   "ip_address": "103.80.136.134"
// // }, {
// //   "id": 5,
// //   "first_name": "Ginger",
// //   "last_name": "Buckingham",
// //   "email": "gbuckingham4@msn.com",
// //   "gender": "Male",
// //   "ip_address": "201.141.196.94"
// // }, {
// //   "id": 6,
// //   "first_name": "Krishnah",
// //   "last_name": "Shervil",
// //   "email": "kshervil5@timesonline.co.uk",
// //   "gender": "Male",
// //   "ip_address": "11.249.172.202"
// // }, {
// //   "id": 7,
// //   "first_name": "Sidoney",
// //   "last_name": "Gemmill",
// //   "email": "sgemmill6@si.edu",
// //   "gender": "Female",
// //   "ip_address": "79.73.155.209"
// // }, {
// //   "id": 8,
// //   "first_name": "Jerrie",
// //   "last_name": "Bobasch",
// //   "email": "jbobasch7@hostgator.com",
// //   "gender": "Female",
// //   "ip_address": "19.61.15.35"
// // }, {
// //   "id": 9,
// //   "first_name": "Trudy",
// //   "last_name": "Beilby",
// //   "email": "tbeilby8@theatlantic.com",
// //   "gender": "Female",
// //   "ip_address": "47.31.0.234"
// // }, {
// //   "id": 10,
// //   "first_name": "Kermie",
// //   "last_name": "Covet",
// //   "email": "kcovet9@de.vu",
// //   "gender": "Male",
// //   "ip_address": "153.146.47.180"
// // }];

// // import React from "react";
// // // import { makeStyles } from "@material-ui/core/styles";
// // import Table from "@material-ui/core/Table";
// // import TableBody from "@material-ui/core/TableBody";
// // import TableCell from "@material-ui/core/TableCell";
// // import TableContainer from "@material-ui/core/TableContainer";
// // import TableHead from "@material-ui/core/TableHead";
// // import TableRow from "@material-ui/core/TableRow";
// // import Paper from "@material-ui/core/Paper";

// // function createData(name, calories, fat, carbs, protein) {
// //   return { name, calories, fat, carbs, protein };
// // }

// // const rows = [
// //   createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
// //   createData(
// //     "Ice cream sandwich dsdadsads dsadsadsadsa dsadasdsadsa dsadsadsa dsadsads asdsadsadsadsa  cream sandwich dsdadsads dsadsadsadsa dsadasdsadsa dsadsadsa dsadsads asdsadsadsadsa  cream sandwich dsdadsads dsadsadsadsa dsadasdsadsa dsadsadsa dsadsads asdsadsadsadsa  cream sandwich dsdadsads dsadsadsadsa dsadasdsadsa dsadsadsa dsadsads asdsadsadsadsa  cream sandwich dsdadsads dsadsadsadsa dsadasdsadsa dsadsadsa dsadsads asdsadsadsadsa",
// //     237,
// //     9.0,
// //     37,
// //     4.3
// //   ),
// //   createData("Eclair", 262, 16.0, 24, 6.0),
// //   createData("Cupcake", 305, 3.7, 67, 4.3),
// //   createData("Gingerbread", 356, 16.0, 49, 3.9)
// // ];

// // export default function SimpleTable() {
// //   return (
// //     <TableContainer component={Paper}>
// //       <Table aria-label="simple table">
// //         <TableHead>
// //           <TableRow>
// //             <TableCell>Dessert (100g serving)</TableCell>
// //             <TableCell align="right">Calories</TableCell>
// //           </TableRow>
// //         </TableHead>
// //         <TableBody>
// //           {rows.map(row => (
// //             <TableRow key={row.name}>
// //               <TableCell
// //                 style={{
// //                   whiteSpace: "nowrap",
// //                   textOverflow: "ellipsis",
// //                   width: "300px",
// //                   display: "block",
// //                   overflow: "hidden"
// //                 }}
// //                 className="overflow-test"
// //                 component="th"
// //                 scope="row"
// //               >
// //                 {row.name}
// //               </TableCell>
// //               <TableCell align="right">{row.calories}</TableCell>
// //             </TableRow>
// //           ))}
// //         </TableBody>
// //       </Table>
// //     </TableContainer>
// //   );
// // }




// // .App {
// //   font-family: sans-serif;
// //   text-align: center;
// // }
// // .overflow-test {
// //   overflow-x: hidden !important;
// //   text-overflow: ellipsis !important;
// // }
