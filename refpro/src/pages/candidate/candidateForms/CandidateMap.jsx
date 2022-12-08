// import "./CandidateNew";
import Navbar from "../../../components/navbar/Navbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import React, {useState, useEffect} from 'react';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses }  from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import base_url from '../../../services/base_url';
import {Link} from "react-router-dom";

const CandidateMap = () => {
    const [tableData, setTableData] = useState([]);
    // const tableHeader = Object.keys(tableData[0]);
    // const groupedData = {};
    const candidatesUrl = "http://localhost:8000/api/candidatejobs/";
    console.log("cURL", candidatesUrl);
    useEffect(() => {
      (
        console.log("hihi66"),
        async () => {
          console.log('start here')
          const candidates_response = await fetch(candidatesUrl);
          const candidates_data = await candidates_response.json();
          setTableData(candidates_data);
          console.log("tableData", tableData)
          
        }
        )();
    }, []);
    
    // tableData.forEach((row) => {
    //   if (!groupedData[row.member]) 
    //   {
    //     groupedData[row.member] = [];
    //   }
    //   groupedData[row.member].push(row.job);
    // });
    

    // return (
    //   <div>
    //     <table>
    //       <tr>
    //         {tableHeader.map((key) => (
    //           <th>{key}</th>
    //         ))}
    //       </tr>
    //       {Object.keys(groupedData).map((key) => (
    //         <tr>
    //           <td>{key}</td>
    //           <td>{groupedData[key].join(", ")}</td>
    //         </tr>
    //       ))}
    //     </table>
    //   </div>
    // );

  
    return (
      <div className='candidateList'>
        <Sidebar/>
        <div className="candidateListContainer">
          <Navbar/>
          <div className="bar">
              <div className="barTitle">Candidate Mapping</div>
              <p align="right">
          <Link to="/candidates"
            // className="barAddButton"
            className="btn"
          >
              Back
          </Link>
          </p>
          </div>
          
          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer className="tableContainer">
              <Table stickyHeader aria-label="sticky table">
                <TableHead> 
                  <TableRow>
                    <TableCell className="tableHead" sx={{minWidth:'5px'}}>Member ID</TableCell>
                    <TableCell className="tableHead" sx={{minWidth:'50px'}}>Job ID</TableCell>  
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    tableData.map((row) => {
                      return(
                      <TableRow key={row.member} sx={{'&:last-child td, &:last-child th':{border:0} }}>
                        <TableCell sx={{maxWidth:'100px'}}>{row.member}</TableCell>                  
                        <TableCell sx={{maxWidth:'100px'}}>{row.title}</TableCell>
                      </TableRow>
                    )})
                  }
                </TableBody>
                {/* <TableBody>
                {
                  Object.keys(groupedData).map
                  ((key) => 
                    (
                      <TableRow>
                        <TableCell sx={{maxWidth:'100px'}}>
                          {key}
                        </TableCell>
                        <TableCell sx={{maxWidth:'100px'}}>
                          {groupedData[key].join(", ")}
                        </TableCell>
                      </TableRow>
                    )
                  )
                }
                </TableBody> */}
              </Table>
            </TableContainer>
            {/* <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              // pageSize={16}
              // rowsPerPageOptions={[5]}
            /> */}
          </Paper>
        </div>
      </div>
    )
  }
  
  
  export default CandidateMap;