// import "./candidate.css";
import "../../Style/candidate.scss"
// import "bootstrap/dist/css/bootstrap.min.css"
import Navbar from '../navbar/Navbar'
import Sidebar from '../sidebar/Sidebar';
import React, { useState, useEffect } from 'react';
import AxiosApi from "../../AxiosApi"
import axios from "axios";
import { BsEyeFill,  BsTrashFill } from "react-icons/bs";
import { Table } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { BsFillPencilFill } from "react-icons/bs";
// import { Table } from 'reactstrap';
// import BootstrapTable from "react-bootstrap-table-next"

console.log("hihii22");

const Candidate = () => {
  const [tableData, setTableData] = useState([]);
  //here start my code pro

  const getCandidate = async () => {

    console.log('start here')
    const response = await AxiosApi.get('/Data/');
    setTableData(response.data)
    // setTableData(response.data)
    // const candidatesUrl = "https://83b6-2401-4900-1c46-b744-451b-c866-6125-d25.in.ngrok.io/globalnetwork_candidate/";
    // const candidatesUrl = "http://localhost:8000/api/candidates/";
    // const candidatesUrl = "http://localhost:3000/Data";
    // const candidates_response = await fetch(candidatesUrl);
    // const candidates_data = await candidates_response.json();
    // setTableData(candidates_data);
    console.log("tableData", tableData)
  }
  useEffect(() => {
    getCandidate();
  }, []);
  // const getCandidate =  () => {
  //   axios("http://localhost:3000/Data").then((res)=>{
  //     setTableData(res.tableData.reverse());
  //   })
  // }

  // const getCandidate = async () => {
  //   let result = await fetch('http://localhost:3000/Data/', {
  //     headers: {
  //       authorization: JSON.parse(localStorage.getItem('token'))
  //     }
  //   });
  //   result = await result.json();
  //   setTableData(result);
  // }

  /*here end my code pro*/

  const deleteCandidate = async id => {
    await AxiosApi.delete('/Data/' + id)
    alert("Data Deleted")
    getCandidate();
  }

  console.log(tableData)

  return (
    <div className='candidateList'>
      <Sidebar />
      <div className="candidateListContainer">
        <Navbar />
        <div className="bar">
          <div className="barTitle">Candidates</div>
          <Link to="/addNewCandidate"
            className="btn"
            style={{ marginLeft: 545, color: "white", backgroundColor: "Blue" }}
          >Add New Candidate
          </Link>
        </div>

        {/* <Paper sx={{ width: '100%', overflow: 'hidden' }}> */}
        {/* <TableContainer className="jobTableContainer"> */}
        {/* <div style={{ overflowX: "auto" }}
            // className="tableContainer"
            > */}
        <section className="form-block">
          <div className="container headerTable">
            <div className="table-container-home white-box">
              <Table className="tabledata-home" striped bordered hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>CV</th>
                    <th>Working/Not</th>
                    {/* <th>Job Id</th> */}
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    tableData?.map((row, index) => (
                      <tr key={row.id}>
                        <td>{index + 1}</td>
                        <td>{row.first_name}</td>
                        <td>{row.last_name}</td>
                        <td>{row.email}</td>
                        <td>{row.phone}</td>
                        {/* <td>{row.cv.split(/.*[\/|\\]/)[1]}</td> */}
                        <td>{row.cv}</td>
                        <td>{row.currently_working=== true? "Yes" : "No"}</td>
                        {/* <td>{row.job_id}</td> */}
                        <td className="tb_al"><span title="Edit">
                          <Link to={`/EditCandidate/&user=` + row.id} className="barAddButton">
                            {/* <EditIcon></EditIcon> */}
                            <BsFillPencilFill />
                          </Link>
                        </span>
                          <span title="View">
                            <Link to={`/ViewCandidate/&user=` + row.id} className="barAddButton">
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
                              <BsTrashFill onClick={() => deleteCandidate(row.id)} />
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

        {/* </div> */}
        {/* </TableContainer> */}
        {/* </Paper> */}
      </div>
    </div >
  )
}

export default Candidate;


// // import "./candidate.css";
// import "../../Style/candidate.scss"
// // import "bootstrap/dist/css/bootstrap.min.css"
// import Navbar from '../navbar/Navbar';
// import Sidebar from '../sidebar/Sidebar';
// import React, { useState, useEffect } from 'react';
// import axios from "axios"
// import AxiosApi from "../../AxiosApi"
// import Paper from '@mui/material/Paper';
// import TableContainer from '@mui/material/TableContainer';
// import { BsEyeFill, BsPencilFill, BsFillTrashFill, BsTrashFill } from "react-icons/bs";
// import { Button, Table } from 'react-bootstrap';
// import { Link } from "react-router-dom";
// import { BsFillPencilFill } from "react-icons/bs";
// import DataTable from 'react-data-table-component'
// import BootstrapTable from 'react-bootstrap-table-next';
// import { router } from "json-server";
// // import { Table } from 'reactstrap';

// console.log("hihii22");

// const Candidate = () => {
//   const [tableData, setTableData] = useState([]);
//   //here start my code pro

//   const getCandidate = async () => {

//     console.log('start here')
//     const response = await AxiosApi.get('/Data');
//     setTableData(response.data)
//     // const candidatesUrl = "https://83b6-2401-4900-1c46-b744-451b-c866-6125-d25.in.ngrok.io/globalnetwork_candidate/";
//     // const candidatesUrl = "http://localhost:8000/api/candidates/";
//     // const candidatesUrl = "http://localhost:3000/Data";
//     // const candidates_response = await fetch(candidatesUrl);
//     // const candidates_data = await candidates_response.json();
//     // setTableData(candidates_data);
//     console.log("tableData", tableData)
//   }
//   useEffect(() => {
//     getCandidate();
//   }, []);
//   // const getCandidate =  () => {
//   //   axios("http://localhost:3000/Data").then((res)=>{
//   //     setTableData(res.tableData.reverse());
//   //   })
//   // }

//   // const getCandidate = async () => {
//   //   let result = await fetch('http://localhost:3000/Data/', {
//   //     headers: {
//   //       authorization: JSON.parse(localStorage.getItem('token'))
//   //     }
//   //   });
//   //   result = await result.json();
//   //   setTableData(result);
//   // }

//   /*here end my code pro*/

//   const deleteCandidate = async id => {
//     await AxiosApi.delete('/Data/' + id)
//     alert("Data Deleted")
//     getCandidate();
//   }



//   const columns = [{
//     dataField: 'id',
//     text: 'id',
//   },
//   {
//     dataField: 'first_name',
//     text: 'First Name'
//   },
//   {
//     dataField: 'last_name',
//     text: 'Last Name'
//   },
//   {
//     dataField: 'email',
//     text: 'Email Id'
//   },

//   {
//     dataField: 'phone',
//     text: 'Phone No'
//   },
//   {
//     dataField: 'cv',
//     text: 'Resume',
//   },
//   {
//     dataField: 'Action',
//     text: 'Action',
//     classes: "tb_al",
//     formatter: (cellContent, row) => {
//       return (
//         <span>
//           <span title="Edit">
//             <Link to={`/EditCandidate/&user=` + row.id} className="barAddButton">
//               <BsFillPencilFill />
//             </Link>
//           </span>
//           <span title="View">
//             <Link to={`/ViewCandidate/&user=` + row.id} className="barAddButton">
//               <BsEyeFill />
//             </Link>
//           </span>
//           <span title="Delete">
//             <Link className="barAddButton"
//               to=''
//             // to={'deleteCandidate' + row.id}
//             // onClick={() => deleteCandidate(row.id)}
//             >
//               <BsTrashFill onClick={() => deleteCandidate(row.id)} />
//             </Link>
//           </span>
//         </span>
//       )
//     }
//   },

//   ];
//   console.log(tableData)

//   return (
//     <div className='candidateList'>
//       <Sidebar />
//       <div className="candidateListContainer">
//         <Navbar />
//         <div className="bar">
//           <div className="barTitle">Candidates</div>
//           <Link to="/addNewCandidate"
//             className="btn"
//             style={{ marginLeft: 545, color: "white", backgroundColor: "Blue" }}
//           >Add New Candidate
//           </Link>
//         </div>

//         {/* <Paper sx={{ width: '100%', overflow: 'hidden' }}>
//           <TableContainer className="jobTableContainer"> 
//              <div style={{ overflowX: "auto" }}
//             // className="tableContainer"
//             > */}
//         <section className="form-block">
//           <dvi className="container headerTable">
//             <div className="table-container-home white-box">
//               <BootstrapTable keyField='id'
//                 data={tableData}
//                 columns={columns}
//                 noDataIndication="There is no data"
//                 classes="tabledata-home" />
//             </div>
//           </dvi>
//         </section>

//         {/* </div> 
//           </TableContainer>
//         </Paper> */}
//       </div>
//     </div >
//   )
// }

// export default Candidate;