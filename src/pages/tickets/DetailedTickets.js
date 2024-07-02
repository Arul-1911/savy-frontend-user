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
import { Col, Row, Form } from "react-bootstrap";
import CountCard from "../../components/layout/CountCard";
import { ReceiptButton } from "../../components/layout/CustomTable";
import { selectAuth } from "../../features/authSlice";
import { useGetAdminTicketMutation } from "../../features/apiSlice";

export default function DetailedTickets() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { accessToken } = useSelector(selectAuth);
  const [error, setError] = useState(null);
  // const [users,setUsers] = useState([]);
  const [usersCount, setUsersCount] = useState([]);
  const [curPage, setCurPage] = useState(1);
  const [resultPerPage, setResultPerPage] = useState(10);
  const [searchInput, setSearchInput] = useState("");
  const [query, setQuery] = useState("");
  const [tickets, setTickets] = useState([]);
  const [status, setStatus] = useState("Closed");

  const curPageHandler = (p) => setCurPage(p);

  const [getAdminTicket, { isLoading }] = useGetAdminTicketMutation();

  useEffect(() => {
    fetchTickets();
  }, [status, query]);

  const fetchTickets = async () => {
    try {
      const { data } = await getAdminTicket({ status, query });
      setTickets(data.tickets);
    } catch (error) {
      getError(error);
    }
  };

  // console.log(tickets);

  const numOfPages = Math.ceil(usersCount / resultPerPage);
  const skip = resultPerPage * (curPage - 1);
  // console.log("no of Page", numOfPages, resultPerPage, usersCount);

  const column = [
    "S.No",
    "Raised By",
    "Email",
    "Subject ",
    "Area of speciality",
    "Prof Name",
    "Status",
    "Actions",
  ];

  return (
    <MotionDiv>
      {error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
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
            title={
              <div className="fs-3">
                <Form.Select
                  className="drop-option  fs-3 border-0"
                  style={{ maxWidth: "200px", height: "50px" }}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option className="custom-drop" value="Closed">
                    Close
                  </option>
                  <option className="custom-drop" value="Open">
                    Open
                  </option>
                  <option className="custom-drop" value="Pending">
                    Pending
                  </option>
                </Form.Select>
              </div>
            }
          >
            {tickets &&
              tickets.length > 0 &&
              tickets?.map((ticket, i) => (
                <tr key={ticket?._id} className="odd">
                  <td className="text-center">{skip + i + 1}</td>
                  {/* <td>{ticket?._id}</td> */}
                  <td>
                    {ticket?.from?.first_name} {ticket?.from?.last_name}
                  </td>
                  <td>{ticket?.from?.email}</td>
                  <td>{ticket?.subject}</td>
                  <td>{ticket?.subdomain?.sub_domain_name}</td>
                  <td>{ticket?.to?.name}</td>
                  <td>{ticket?.status}</td>
                  <td>
                    <ViewButton
                      onClick={() =>
                        navigate(`/admin/ticket/chat/${ticket?._id}`)
                      }
                    />
                  </td>
                </tr>
              ))}
          </CustomTable>
        </>
      )}
      <ToastContainer />
    </MotionDiv>
  );
}
