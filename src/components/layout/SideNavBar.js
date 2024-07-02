import "./SideNavBar.css";
import React, {  useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiDashboard2Fill } from "react-icons/ri";
import { HiUsers } from "react-icons/hi";
import { LuCrown, LuLifeBuoy, LuUsers } from 'react-icons/lu'
import { TiClipboard } from 'react-icons/ti';
import { LiaFileInvoiceDollarSolid } from 'react-icons/lia';
import {
  
  MdOutlineAnalytics,
} from "react-icons/md";
import {
  FaFileAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { clearAuth,  selectAuth } from "../../features/authSlice";
import { BiPieChartAlt2, BiSolidBookContent } from "react-icons/bi";
import { BsQuestionCircle } from "react-icons/bs";
import { ImProfile } from "react-icons/im";

const linkList = [
  {
    icon: <MdOutlineAnalytics className="icon-md" />,
    text: "Dashboard",
    url: "/admin/dashboard",
  },
  {
    icon: <LuUsers className="icon-md" />,
    text: "Users",
    url: "/admin/users",
  },
  {
    icon: <ImProfile className="icon-md" />,
    text: "Manage Prof.",
    url: "/admin/profs",
  },
  {
    icon: <BiPieChartAlt2 className="icon-md" />,
    text: "Manage Domains",
    url: "/admin/domains",
  },
  {
    icon: <BsQuestionCircle className="icon-md" />,
    text: "Manage Questions",
    url: "/admin/questions",
  },
  {
    icon: <TiClipboard className="icon-md" />,
    text: "Manage Tests",
    url: "/admin/tests",
  },
  {
    icon: <LuCrown className="icon-md" />,
    text: "Manage Plans",
    url: "/admin/manage-plans",
  },
  {
    icon: <LiaFileInvoiceDollarSolid className="icon-md" />,
    text: "Payment",
    url: "/admin/payment",
  },
  {
    icon: <FaFileAlt className="icon-md" />,
    text: "Reports",
    url: "/admin/reports",
  },
  {
    icon: <BiSolidBookContent className="icon-md" />,
    text: "Content Management",
    url: "/admin/content-management",
  },
  
];

const active_text = {
  Dashboard:"dashboard",
  Users:"users",
  Strings:"strings",
 
};

export default function SideNavbar({ isExpanded }) {
  const pathname = window.location.pathname;
  const [activeLink, setActiveLink] = useState("Dashboard");
  const { accessToken } = useSelector(selectAuth);
  const userInfo = {
    fullname:'Siddhant',
  }
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(clearAuth());
    
    navigate("/");
  };

  const activeLinkHandler = (url) => {
    
    return pathname.includes(url);
  };

  const cls = `nav-item has-treeview ${
    isExpanded ? "menu-item" : "menu-item menu-item-NX"
  }`;

  // const logoWidth = isExpanded?"100px":"55px";

  console.log({ userInfo });
  return (
    <>
      {accessToken ? (
        <div
          className={
            isExpanded
              ? "side-nav-container"
              : "side-nav-container side-nav-container-NX"
          }
        >
          <div className="brand-link" >
            <img src="/logo/sciendaLogo.png" alt="" width={'36px'} height={"auto"} />
            <span className="brand-text ms-2 font-weight-light">
              {/* Wiki-Strings */}
            </span>
          </div>

          <div className="sidebar">
            {/* Sidebar user panel (optional) */}
            {/* <div className="user-panel mt-3 pb-3 mb-3 d-flex">
              <div className="info">
                <Link to="/view-profile" className="d-block">
                  {userInfo?.avatar && (
                    <img
                      src={userInfo?.avatar}
                      alt=""
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        marginRight: "0.5rem",
                      }}
                    />
                  )}
                  <FaUserCircle className="text-white mx-2" size={"25px"} />

                  <span className="info-text">
                    Welcome {userInfo ? `${userInfo.fullname}` : "Back"}
                  </span>
                </Link>
              </div>
            </div> */}
            {/* Sidebar Menu */}
            <nav className="pt-2">
              <ul
                className="nav-pills nav-sidebar px-0 d-flex flex-column flex-wrap"
                data-widget="treeview"
                role="menu"
                data-accordion="false"
              >
                {linkList.map(({ icon, text, url }) => (
                  <li
                    key={url}
                    className={`${cls} ${
                      activeLinkHandler(url) && "active-item"
                    }`}
                    onClick={() => setActiveLink(url)}
                  >
                    <Link to={url} className="nav-link">
                      {icon}
                      <p className="ms-2">{text}</p>
                    </Link>
                  </li>
                ))}

                <li className={cls} style={{marginTop:'auto'}}>
                  <Link  to="/admin/tickets" className="nav-link">
                    <LuLifeBuoy className="icon-md" />
                    <p className="ms-2">Tickets</p>
                  </Link>
                </li>
               
               
                 
                
              </ul>
            </nav>
            {/* /.sidebar-menu */}
          </div>

          <div className="sidebar-footer">
          <ul
                className="nav-pills nav-sidebar px-0 d-flex flex-column flex-wrap"
                data-widget="treeview"
                role="menu"
                data-accordion="false"
              >
             <li className={cls}>
          <Link onClick={signoutHandler} to="/" className="nav-link">
                    <FaSignOutAlt className="icon-md" />
                    <p className="ms-2">Log Out</p>
                  </Link>
                  </li>
                  </ul>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
