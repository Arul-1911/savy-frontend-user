import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import {
  MessageBox,
  // useTitle,
  MotionDiv,
  CustomTable,
  ViewButton,
  DeleteButton,
} from "../../components";
import { getError } from "../../utils/error";
// import { useDispatch, useSelector } from "react-redux";
// import { hideLoading, showLoading } from "../../features/loadingSlice";
// import axiosInstance from "../../utils/axiosUtil";
import { Col, Row } from "react-bootstrap";
import CountCard from "../../components/layout/CountCard";
// import { selectAuth } from "../../features/authSlice";
import {
  useDeleteTicketMutation,
  useGetAdminTicketMutation,
} from "../../features/apiSlice";
import ModalTemplate from "../../components/modals/ModalTemplate";

export default function Tickets() {
  const navigate = useNavigate();
  const [getAdminTicket, { isLoading }] = useGetAdminTicketMutation();
  const [
    deleteTicket,
    {
      isLoading: { deleteTicketLoading },
    },
  ] = useDeleteTicketMutation();
  const [error, setError] = useState(null);
  const [usersCount, setUsersCount] = useState([]);
  const [curPage, setCurPage] = useState(1);
  const [resultPerPage, setResultPerPage] = useState(10);
  const [searchInput, setSearchInput] = useState("");
  const [query, setQuery] = useState("");
  const [tickets, setTickets] = useState([]);
  const [deleteId, setDeleteId] = useState("");

  const [showCancelModal, setShowCancelModal] = useState(false);
  const handleShowCancelModal = () => setShowCancelModal(true);
  const handleCloseCancelModal = () => setShowCancelModal(false);

  const curPageHandler = (p) => setCurPage(p);

  const viewDetails = () => {
    navigate("/admin/tickets/details");
  };

  const numOfPages = Math.ceil(usersCount / resultPerPage);
  const skip = resultPerPage * (curPage - 1);
  // console.log("no of Page", numOfPages, resultPerPage, usersCount);

  const column = [
    "Id",
    "Raised By",
    "Email",
    "Subject",
    "Area of Speciality",
    "Prof Name",
    "Status",
    "Ticket Raised on",
    "Actions",
  ];

  useEffect(() => {
    fetchTickets();
  }, [query]);

  const fetchTickets = async () => {
    try {
      const { data } = await getAdminTicket({ status: "", query });
      setTickets(data);
    } catch (error) {
      getError(error);
    }
  };

  // console.log(tickets);
  const handleDeleteTicket = (id) => {
    handleShowCancelModal();
    setDeleteId(id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteTicket(deleteId);
      fetchTickets();
      handleCloseCancelModal();
    } catch (error) {
      getError(error);
    }
  };

  return (
    <MotionDiv>
      {error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <ModalTemplate
            show={showCancelModal}
            onHide={handleCloseCancelModal}
            title={`Are you sure you want to delete this ticket?`}
            // description={
            //   "Lorem ipsum dolor sit amet consectetur. Suscipit nunc tincidunt iaculis sit feugiat platea. Aliquet amet cras amet mauris neque facilisi. Scelerisque interdum elit maecenas."
            // }
            src={"/icons/deleteIcon.png"}
            onDiscard={handleCloseCancelModal}
            onConfirm={handleDelete}
            loading={deleteTicketLoading}
            color={true}
          />

          <Row>
            <CountCard
              title={"Total Tickets Raised"}
              textColor="#6172F3"
              count={tickets.totalTickets && tickets.totalTickets}
              loading={isLoading}
            />
            <CountCard
              title={"Pending Tickets"}
              textColor="#FF9C06"
              count={tickets.pendingTicket && tickets.pendingTicket}
              loading={isLoading}
            />
            <CountCard
              title={"Closed Tickets"}
              textColor="#FF0E53"
              count={tickets.closeTicket && tickets.closeTicket}
              viewDetails={viewDetails}
              loading={isLoading}
            />
            <CountCard
              title={"Active Tickets"}
              textColor="#737373"
              count={tickets.openTicket && tickets.openTicket}
              viewDetails={viewDetails}
              loading={isLoading}
            />
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
            title="User details"
          >
            {tickets.success &&
              tickets.tickets?.map((ticket, i) => (
                <tr key={ticket?._id} className="odd">
                  <td className="text-center">{skip + i + 1}</td>
                  {/* <td>{ticket?.ticketId}</td> */}
                  <td>
                    {ticket?.from?.first_name} {ticket?.from?.last_name}
                  </td>
                  <td>{ticket?.from?.email}</td>
                  <td>{ticket?.subject}</td>
                  <td>{ticket?.subdomain?.sub_domain_name}</td>
                  <td>{ticket?.to?.name}</td>
                  <td
                    style={{
                      color: `${
                        ticket?.status === "Open"
                          ? "rgba(46, 211, 183, 1)"
                          : ticket?.status === "Pending"
                          ? "rgba(251, 177, 35, 1)"
                          : "#000"
                      }`,
                    }}
                  >
                    {ticket?.status}
                  </td>
                  <td>{ticket?.createdAt.split("T")[0]}</td>
                  <td>
                    <ViewButton
                      onClick={() =>
                        navigate(`/admin/ticket/chat/${ticket?._id}`)
                      }
                    />
                    <DeleteButton
                      onClick={() => {
                        handleDeleteTicket(ticket?._id);
                      }}
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
