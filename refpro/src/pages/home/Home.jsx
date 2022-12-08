import React from 'react';
import axios from "axios"
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Table from '../../components/table/Table';
// import "./home.css";
import "../../Style/home.scss"
import {Link} from "react-router-dom";

function Home() {
  return (
    <div className='home'>
        <Sidebar/>
        <div className="homeContainer">
          <Navbar/>

          <div className='heading'>
            <h1>Dashboard</h1>
          </div>
          <div className='tShow'>
            <Link to="/candidates" style={{textDecoration:"none"}}>
              <div className='tCandidates'>
                <h2>Total Candidates</h2>
                <h5>200</h5>
              </div>
            </Link >
            <Link to="/Jobs" style={{textDecoration:"none"}}>
              <div className='tJobs'>
                <h2>Total Jobs</h2>
                <h5>100</h5>
              </div>
            </Link>

          </div>
          
        </div>
        
    </div>
  )
}

export default Home;