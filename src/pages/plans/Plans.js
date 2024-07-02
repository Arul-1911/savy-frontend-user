import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import {
  MessageBox,
  useTitle,
  MotionDiv,
  CustomTable,
  ViewButton,
  DeleteButton,
} from "../../components";
import { getError, toastOptions } from "../../utils/error";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../../features/loadingSlice";
import axiosInstance from "../../utils/axiosUtil";
import { Col, Row } from "react-bootstrap";
import CountCard from "../../components/layout/CountCard";
import { EditButton } from "../../components/layout/CustomTable";
import { selectAuth } from "../../features/authSlice";
import { useGetSubdomainsMutation } from "../../features/apiSlice";
import { fetchSubdomains } from "../../utils/apis";

export default function Plans() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { accessToken } = useSelector(selectAuth);
  const [getSubdomains, { isLoading }] = useGetSubdomainsMutation();

  // const [users,setUsers] = useState([]);
  const [usersCount, setUsersCount] = useState([]);
  const [curPage, setCurPage] = useState(1);
  const [resultPerPage, setResultPerPage] = useState(10);
  const [searchInput, setSearchInput] = useState("");
  const [query, setQuery] = useState("getProfessorData=true");
  const [subdomains, setSubdomains] = useState([]);
  const [amountRecieved, setAmountRecieved] = useState(0);
  const [numberOfSubscription, setNumberOfSubscription] = useState(0);

  const curPageHandler = (p) => setCurPage(p);

  const fetchSubdomains = async (id = null) => {
    try {
      const data = await getSubdomains({ id, params: query }).unwrap();
      // console.log(data);
      setSubdomains(data?.subDomains);
      setAmountRecieved(data?.totalAmountReceived);
      setNumberOfSubscription(data?.totalTransaction);
    } catch (error) {
      getError(error);
    }
  };

  useEffect(() => {
    fetchSubdomains();
    //   {
    //   setSubdomains,
    //   id: null,
    //   getSubdomains,
    //   params: query,
    // }
    // setAmountRecieved(data.totalAmountReceived);
    // setNumberOfSubscription(data.totalTransaction);
  }, []);

  const numOfPages = Math.ceil(usersCount / resultPerPage);
  const skip = resultPerPage * (curPage - 1);
  // console.log("no of Page", numOfPages, resultPerPage, usersCount);

  const column = [
    "S.No.",
    "Domain Name",
    "Domain URL",
    "Prof. Alloted",
    <>
      <span>Plans Available</span>
      <br />
      <span style={{ color: "var(--main-blue)", fontSize: "0.9rem" }}>
        M | Q | Y
      </span>
    </>,
    "Actions",
  ];

  return (
    <MotionDiv>
      <Row>
        <CountCard
          title={"Total Amount Received"}
          count={`£${amountRecieved}`}
        />
        <CountCard
          title={"No. of Subscriptions"}
          count={numberOfSubscription}
        />
        {/* <CountCard title={'New Subscription Added'} count={5450}/> */}
      </Row>

      <CustomTable
        loading={isLoading}
        column={column}
        rowNo={resultPerPage}
        rowProps={{ setResultPerPage }}
        paging={numOfPages > 0}
        pageProps={{ numOfPages, curPage }}
        pageHandler={curPageHandler}
        search={true}
        searchProps={{ searchInput, setSearchInput, setQuery }}
        isTitle="true"
        title="Domain Plan Details"
      >
        {subdomains &&
          subdomains?.map((data, i) => (
            <tr key={data?._id} className="odd">
              <td className="text-center">{skip + i + 1}</td>
              <td>{data?.sub_domain_name}</td>
              <td>{data?.domain_url}</td>
              <td>
                {data?.professor?.length > 0
                  ? data?.professor?.map((prof) => prof.name).join(" | ")
                  : "NA"}
              </td>
              <td
                className="text-center"
                style={{ color: "rgba(97, 114, 243, 1)" }}
              >
                {data?.plans.map((plan, index) => (
                  <span key={plan?._id}>
                    {plan?.validity === "Monthly" && `£${plan?.price} | `}
                    {plan?.validity === "Quarterly" && `£${plan?.price} | `}
                    {plan?.validity === "Annually" && `£${plan?.price}`}
                  </span>
                ))}
              </td>
              <td className="text-center">
                <EditButton
                  onClick={() =>
                    navigate(`/admin/domains/edit-specialty/${data?._id}`)
                  }
                />
                <ViewButton
                  onClick={() => navigate(`/admin/manage-plans/view`)}
                />
                <DeleteButton
                  onClick={() => {
                    //  deleteUser(user?._id)
                    console.log("deleted");
                  }}
                />
              </td>
            </tr>
          ))}
      </CustomTable>
    </MotionDiv>
  );
}
