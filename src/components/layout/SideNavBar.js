import "./SideNavBar.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAuth } from "../../features/authSlice";
import { GrHomeRounded } from "react-icons/gr";
import { HiOutlineBriefcase } from "react-icons/hi2";
import { RiBarChartBoxLine } from "react-icons/ri";
import { FiUpload } from "react-icons/fi";

const linkList = [
  {
    icon: <GrHomeRounded className="icon-md" />,
    text: "Home",
    url: "/user/dashboard",
  },
  {
    icon: <HiOutlineBriefcase className="icon-md" />,
    text: "My Account",
    url: "/user/my-account",
  },
  {
    icon: <RiBarChartBoxLine className="icon-md" />,
    text: "Cashflow",
    url: "/user/cashflow",
  },
  {
    icon: <FiUpload className="icon-md" />,
    text: "Transactions",
    url: "/user/transactions",
  },
];

export default function SideNavbar({ isExpanded }) {
  const pathname = window.location.pathname;
  const [activeLink, setActiveLink] = useState("Dashboard");
  const { accessToken, user } = useSelector(selectAuth);

  const activeLinkHandler = (url) => {
    return pathname.includes(url);
  };

  const cls = `nav-item has-treeview ${
    isExpanded ? "menu-item" : "menu-item menu-item-NX"
  }`;

  return (
    <>
      {accessToken && user ? (
        <div
          className={
            isExpanded
              ? "side-nav-container"
              : "side-nav-container side-nav-container-NX"
          }
        >
          <div className="brand-link">
            <img
              src="/logo/LoginLogo.png"
              alt=""
              width={"36px"}
              height={"auto"}
            />
            <span
              className="brand-text ms-2 font-weight-light"
              style={{
                fontWeight: 800,
              }}
            >
              $ayv
            </span>
          </div>

          <div className="sidebar">
            <nav className="pt-2">
              <ul
                className="nav-pills nav-sidebar px-0 d-flex flex-column flex-wrap gap-3"
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
              </ul>
            </nav>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
