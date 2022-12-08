import '../../Style/sidebar.scss'
import { RiDashboardFill,RiAccountCircleFill,RiChatHistoryFill,RiAccountPinCircleLine } from "react-icons/ri";
import { GrLanguage } from "react-icons/gr";
import { Link } from "react-router-dom";
// import "./sidebar.css";
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import WorkHistoryRoundedIcon from '@mui/icons-material/WorkHistoryRounded';
// import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded';
// import AddReactionRoundedIcon from '@mui/icons-material/AddReactionRounded';
const Sidebar = () => {
    return (
        <div className='sidebar'>
            <div className="top">
                <Link to="/" style={{ textDecoration: "none" }}>
                    <span className="logo">ATS AceNet</span>
                </Link >
            </div>
            <hr />
            <div className="center">
                <ul>
                    <Link to="/" style={{ textDecoration: "none" }}>
                        <li>
                            <RiDashboardFill className="icon" />
                            <span className="logo1">Dashboard</span>
                        </li>
                    </Link >

                    <Link to="/NewCandidate" style={{ textDecoration: "none" }}>
                        <li>
                            < RiAccountCircleFill className="icon" />
                            <span className="logo1">Candidates</span>
                        </li>
                    </Link >
                    <Link to="/Jobs" style={{ textDecoration: "none" }}>
                        <li>
                            <RiChatHistoryFill className="icon" />
                            <span className="logo1">Jobs</span>
                        </li>
                    </Link>

                    <Link to="/client" style={{ textDecoration: "none" }}>
                        <li>
                            <RiAccountPinCircleLine className="icon" />
                            <span className="logo1">Client</span>
                        </li>
                    </Link>
                    
                    <Link to="/CountryMaster" style={{ textDecoration: "none" }}>
                        <li>
                            <GrLanguage className="icon" />
                            <span className="logo1">Country Master</span>
                        </li>
                    </Link>
                    
                    {/* <Link to="/FormikData1" style={{ textDecoration: "none" }}>
                        <li>
                            <AccountCircleIcon className="icon" />
                            <span className="logo1">Formik1</span>
                        </li>
                    </Link> */}
                    
                    {/* <Link to="/PagTable" style={{ textDecoration: "none" }}>
                        <li>
                            <DashboardIcon className="icon" />
                            <span className="logo1">Paginatio</span>
                        </li>
                    </Link > */}
                    {/* <Link to="/addNewCandidate" style={{ textDecoration: "none" }}>
                        <li>
                            <DashboardIcon className="icon" />
                            <span className="logo1">Add New Candidate</span>
                        </li>
                    </Link > */}

                    {/* <Link to="/Candy" style={{textDecoration:"none"}}>
                    <li> 
                        <AccountCircleIcon className="icon"/>
                        <span className="logo1">Candy</span> 
                    </li>
                </Link> */}
                    {/* <Link to="/FormikData" style={{textDecoration:"none"}}>
                    <li> 
                        <AccountCircleIcon className="icon"/>
                        <span className="logo1">Formik</span> 
                    </li>
                </Link> */}
                    {/* <Link to="/NewJob" style={{textDecoration:"none"}}>
                    <li> 
                        <AccountCircleIcon className="icon"/>
                        <span className="logo1">NewJob</span> 
                    </li>
                </Link> */}



                    {/* <Link to="/Emp" style={{textDecoration:"none"}}>
                    <li> 
                        <AccountCircleIcon className="icon"/>
                        <span className="logo1">Emp</span> 
                    </li>
                </Link> */}

                    {/* <li> 
                    <DashboardIcon className="icon"/>
                    <span>Clients</span> 
                </li>
                <li> 
                    <DashboardIcon className="icon"/>
                    <span>Interviewers</span> 
                </li> */}
                </ul>
            </div>
        </div>
    )
};

export default Sidebar;