// import "./jobs.css";
import "../../Style/jobs.scss"
// import "../../Style/candidate.scss"
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import React, { useState, useEffect } from 'react';
// import { Button } from "reactstrap";
import Paper from '@mui/material/Paper'
import TableContainer from '@mui/material/TableContainer'
import { Button, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'
import AxiosApi from "../../AxiosApi"
import { BsEyeFill, BsPencilFill, BsFillTrashFill, BsTrashFill } from "react-icons/bs";
import { BsFillPencilFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const Job = () => {
  const [tabledata, setTableData] = useState();
  const navigate = useNavigate()
  const [formData, setFormData] = useState()

  const getJob = async () => {

    console.log('start here')
    const result = await AxiosApi.get('/candidate_job/');
    setTableData(result.data)
    console.log("tableData", tableData)
  }

  const deleteJobs = async id => {
    await AxiosApi.delete('/candidate_job/' + id)
    alert("Data Deleted")
    getJob();
  }
  useEffect(() => {
    getJob();
  }, []);
  // const getCandidatesData = () => {
  //   fetch(candidatesUrl)
  //   .then(res => res.json())
  //       .then(res => setCandidatesData(res))
  //       .catch(err => console.log(err));
  // };

  // useEffect(() => {
  //   getCandidatesData();
  //   console.log("eneterUSeEffect");
  // }, [candidatesUrl]);
  // console.log("candidatesData", candidatesData);
  // const JobsUrl = "http://localhost:8000/api/jobs/";
  // console.log("cURL", JobsUrl);
  // useEffect(() => {
  //   (
  //     // console.log("hihi66"),
  //     async () => {
  //       // console.log('start here')
  //       const jobs_response = await fetch(JobsUrl);
  //       const jobs_data = await jobs_response.json();
  //       setTableData(jobs_data);


  //     }
  //   )();
  // }, []);


  console.log("formData", formData);
  return (
    <div className='jobList'>
      <Sidebar />
      <div className="jobListContainer">
        <Navbar />
        <div className="bar">
          <div className="barTitle">Jobs</div>
          {/* <Link to="/candidates/new" className="barAddButton">
              +Add New
            </Link> */}
          <Button
            outline
            className="btn"
            // className="openModalBtn"
            color="primary"
            onClick={() => navigate('/jobs/JobNew')}
          // onClick={()=>{setOpen(true)}}
          >Add New Job
          </Button>

        </div>
        {/* <Paper sx={{ width: '100%', overflow: 'hidden' }}> */}
        {/* <TableContainer className="jobTableContainer"> */}
        <section className="form-block">
          <div className="container headerTable">
            <div className="table-container-home white-box">
            <Table className="tabledata-home"striped bordered hover>
          <thead>
            <tr>
              {/* <TableCell>ID</TableCell> */}
              <th >Job Id</th>
              <th >Title</th>
              <th >Recruiter</th>
              {/* <th >Display on Web</th> */}
              <th >Client</th>
              <th >Job Type</th>
              <th >Experience</th>
              <th >Display Order</th>
              <th >Display Date</th>
              <th >Location</th>
              {/* <th >Skills</th> */}
              <th >Action</th>

            </tr>
          </thead>
          <tbody>
            {
              // formData?.map(row => (
              tabledata?.map((row, index) => (
                <tr key={row.id} >
                  {/* <TableCell>
                        <Link to={"/jobs/mapjo/"} className="barAddButton">
                          {row.job_id}
                        </Link>
                      </TableCell> */}
                  <td>{index + 1}</td>
                  <td >{row.job_title}</td>
                  <td >{row.recruiter}</td>
                  {/* <td>{row.display_on_web}</td> */}
                  <td>{row.client}</td>
                  <td>{row.job_type}</td>
                  <td>{row.experience}</td>
                  <td>{row.display_order}</td>
                  <td>{row.display_date}</td>
                  <td>{row.location}</td>
                  {/* <td>{row.skills}</td> */}

                  <td className="tb_al">
                    <span><Link to={`/jobs/jobsEdit/&user=` + row.id}>
                      <BsFillPencilFill /></Link>
                    </span>
                    <span><Link to={`/jobs/JobsView/&user=` + row.id}>
                      <BsEyeFill /></Link>
                    </span>
                    <span><Link to="">
                      <BsTrashFill onClick={() => deleteJobs(row.id)} /></Link>
                    </span>
                  </td>

                </tr>
              ))
            }
          </tbody>
        </Table>
            </div>
          </div>
        </section>
        {/* <div style={{overflow:"auto"}}> */}
        
        {/* </div> */}
        {/* </TableContainer> */}
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
        {/* </Paper> */}
      </div>
    </div>
  )
}


export default Job;

const tableData = [{
  "id": 1,
  "job_id": "ACE534C",
  "title": "Back-end Developer",
  "recruiter": "Galadrial",
  "display_on_web": "Yes",
  "client": "Acenture",
  "job_type": "Full Time",
  "experience": "8",
  "display_order": "70",
  "display_date": "27-April-2021",
  "skills": "NOde.JS",
  "location": "india",
}, {
  "id": 2,
  "job_id": "ACE535C",
  "title": "Front-end Developer",
  "recruiter": "Raquel",
  "display_on_web": "Yes",
  "client": "Acenture",
  "job_type": "Full Time",
  "experience": "8",
  "display_order": "70",
  "display_date": "27-April-2021",
  "location": "Bangluru",
  "skills": "React.JS",
}, {
  "id": 3,
  "job_id": "ACE536C",
  "title": "Back-end Developer",
  "recruiter": "Murillo",
  "display_on_web": "Yes",
  "client": "Acenture",
  "job_type": "Full Time",
  "experience": "8",
  "display_order": "70",
  "display_date": "27-April-2021",
  "location": "Bangluru",
  "skills": "NOde.JS",
}, {
  "id": 4,
  "job_id": "ACE537C",
  "title": "Back-end Developer",
  "recruiter": "Alicia",
  "display_on_web": "Yes",
  "client": "Acenture",
  "job_type": "Full Time",
  "experience": "8",
  "display_order": "70",
  "display_date": "27-April-2021",
  "location": "Bangluru",
  "skills": "NOde.JS",
}, {
  "id": 5,
  "job_id": "ACE5438",
  "title": "Back-end Developer",
  "recruiter": "Stephen",
  "display_on_web": "Yes",
  "client": "Acenture",
  "job_type": "Full Time",
  "experience": "8",
  "display_order": "70",
  "display_date": "27-April-2021",
  "location": "Bangluru",
  "skills": "NOde.JS",
}, {
  "id": 6,
  "job_id": "ACE539C",
  "title": "Back-end Developer",
  "recruiter": "Jessica",
  "display_on_web": "Yes",
  "client": "Acenture",
  "job_type": "Full Time",
  "experience": "8",
  "display_order": "70",
  "display_date": "27-April-2021",
  "location": "Bangluru",
  "skills": "NOde.JS",
}, {
  "id": 7,
  "job_id": "ACE540C",
  "title": "Back-end Developer",
  "recruiter": "Dwelley",
  "display_on_web": "Yes",
  "client": "Acenture",
  "job_type": "Full Time",
  "experience": "8",
  "display_order": "70",
  "display_date": "27-April-2021",
  "location": "Bangluru",
  "skills": "NOde.JS",
}, {
  "id": 8,
  "job_id": "ACE541C",
  "title": "Back-end Developer",
  "recruiter": "Camelis",
  "display_on_web": "Yes",
  "client": "Acenture",
  "job_type": "Full Time",
  "experience": "8",
  "display_order": "70",
  "display_date": "27-April-2021",
  "location": "Bangluru",
  "skills": "NOde.JS",
}, {
  "id": 9,
  "job_id": "ACE542C",
  "title": "Back-end Developer",
  "recruiter": "Marque",
  "display_on_web": "Yes",
  "client": "Acenture",
  "job_type": "Full Time",
  "experience": "8",
  "display_order": "70",
  "display_date": "27-April-2021",
  "location": "Bangluru",
  "skills": "NOde.JS",
}, {
  "id": 10,
  "job_id": "ACE543C",
  "title": "Back-end Developer",
  "recruiter": "Nilopher",
  "display_on_web": "Yes",
  "client": "Acenture",
  "job_type": "Full Time",
  "experience": "8",
  "display_order": "70",
  "display_date": "27-April-2021",
  "location": "Bangluru",
  "skills": "NOde.JS",
}];




