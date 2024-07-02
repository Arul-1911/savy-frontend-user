import React, { useContext, useEffect, useReducer, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
// icons
import { MdContactPhone } from "react-icons/md";
import { BsShieldFillPlus } from "react-icons/bs";
import { FaArrowCircleRight, FaGuitar, FaUsers } from "react-icons/fa";
import { BiSolidShieldMinus, BiSolidShieldX } from "react-icons/bi";
import { HiShieldCheck, HiShieldExclamation } from "react-icons/hi";


import Skeleton from "react-loading-skeleton";
import axiosInstance from "../utils/axiosUtil";
import { getError, toastOptions } from "../utils/error";
import { MotionDiv, MessageBox } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../features/loadingSlice";
import CountUp from "../components/layout/CountUp";
import { selectAuth } from "../features/authSlice";



const card = [
  {
    key: "usersCount",
    bg: "info",
    icon: <FaUsers />,
    text: "Users",
    url: "/admin/users/"
  },
  {
    key: "guitarsCount",
    bg: "danger",
    icon: <FaGuitar />,
    text: "Guitars ",
    url: "/admin/guitar/"
  },

  // {
  //   key: "active",
  //   bg: "success",
  //   icon: <HiShieldCheck />,
  //   text: "Active Warranties",
  //   url: "/admin/warranty/?status=ACTIVE"
  // },
  // {
  //   key: "rejected",
  //   bg: "danger",
  //   icon: <BiSolidShieldX />,
  //   text: "Rejected Warranties",
  //   url: "/admin/warranty/?status=REJECTED"
  // },
  
  
  // {
  //   key: "enquiry",
  //   bg: "info",
  //   icon: <MdContactPhone />,
  //   text: "Enquiry",
  //   url: "/admin/enquiry"
  // }
];

const ViewCard = ({ loading, data, bg, icon, text, url }) => {
  return (
    <div>
      {loading ? (
        <Skeleton count={5} />
      ) : (
        <div className={`small-box bg-${bg}`}>
          {/* <div className="inner p-sm-1 p-md-2 p-lg-3"> */}
          <div className="inner">
            <CountUp start={0} end={data} duration={2} />
            {/* <h1>
              {data && data[0] ? data[0].total : 0}
            </h1> */}
            <h5 style={{
              overflow: 'hidden',
              whiteSpace: 'nowrap', 
              textOverflow: 'ellipsis'
            }}>{text}</h5>
          </div>
          <div className="icon">
            {icon}
          </div>
          <Link to={url} className="small-box-footer">
            More info {<FaArrowCircleRight />}
          </Link>
        </div>
      )}
    </div>
  )
}

export default function Dashboard() {
  
  const {accessToken} = useSelector(selectAuth);

const dispatch = useDispatch();
const [summary, setSummary] = useState("");
 


  return (
    <MotionDiv>
      {/* {error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <Row
            className="my-3 pb-2"
            style={{ borderBottom: "1px solid rgba(0,0,0,0.2)" }}
          >
            <Col md={6}>
              <h3>Dashboard</h3>
            </Col>
            <Col md={6}></Col>
          </Row>

          <Row className="m-0 mb-3">
            {card.map(({ key, bg, icon, text, url }) => (
              <Col key={url} lg={4} md={6} sm={12} className="p-sm-1 p-md-2 p-lg-3">
                <ViewCard loading={isLoading} data={summary && summary[key]} bg={bg} icon={icon} text={text} url={url} />
              </Col>
            ))}
          </Row>
          <ToastContainer />
        </>
      )} */}
      <h1>Dashboard</h1>
    </MotionDiv >
  );
}
