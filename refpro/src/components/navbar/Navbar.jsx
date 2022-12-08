// import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
// import SearchIcon from '@mui/icons-material/Search';
import { BsSearch } from "react-icons/bs";
// import "./navbar.css";
import "../../Style/navbar.scss"

function Navbar() {
  return (
    <div className='navbar'>
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder="Search..." />
          {/* <SearchIcon /> */}
          <BsSearch/>
        </div>
        <div className="items">
          {/* <div className="item">
            <NotificationsNoneIcon className='icon' />
            <div className="counter">1</div>
          </div>
          <div className="item">
            <NotificationsNoneIcon className='icon' />
          </div> */}
          <div className="item">
            <img src="https://picsum.photos/200/300?random=100000" alt="" className='avatar' />
          </div>
        </div>
      </div>
    </div>
  )
};

export default Navbar;