import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Col,
  Container,
  Row,
  Stack,
  Form,
  Spinner,
} from "react-bootstrap";
import { MotionDiv } from "../../components";
import { IoMdArrowBack } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import { io } from "socket.io-client";
import {
  imgAddr,
  useAcceptTicketMutation,
  useCloseTicketMutation,
  useGetSingleTicketMutation,
  usePostMessageMutation,
} from "../../features/apiSlice";
import { getError } from "../../utils/error";
import ModalTemplate from "../../components/modals/ModalTemplate";
import { MdOutlineCancelPresentation } from "react-icons/md";

const TicketChat = () => {
  const { ticketId } = useParams();
  const [getSingleTicket, { isLoading }] = useGetSingleTicketMutation();
  const [closeTicket, { isLoading: isCloseLoading }] = useCloseTicketMutation();
  const [acceptTicket, { isLoading: isStatusLoading }] =
    useAcceptTicketMutation();
  const [postMessage, { isLoading: sendMessageLoading }] =
    usePostMessageMutation();
  const [socket, setSocket] = useState("");
  const [chat, setChat] = useState("");
  const [ticket, setTicket] = useState("");
  const chatContainerRef = useRef(null);
  const user = JSON.parse(localStorage.getItem("user"));

  const [showCancelModal, setShowCancelModal] = useState(false);
  const handleShowCancelModal = () => setShowCancelModal(true);
  const handleCloseCancelModal = () => setShowCancelModal(false);

  useEffect(() => {
    getTicket();
  }, [isCloseLoading]);

  useEffect(() => {
    const newSocket = io("https://scienda-socket.onrender.com");
    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

  useEffect(() => {
    if (ticket._id && socket) {
      socket.emit("login", { _id: ticket._id });
    }
  }, [socket, ticket]);

  useEffect(() => {
    if (!socket) return;
    socket.on("receiveMessage", (message) => {
      console.log(message);
      getTicket();
    });
    return () => socket.off("receiveMessage");
  }, [socket, ticketId]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [ticket.chats]);

  const getTicket = async () => {
    try {
      const response = await getSingleTicket(ticketId).unwrap();
      setTicket(response.ticket);
    } catch (error) {
      getError(error);
    }
  };

  const handleChat = async (e) => {
    e.preventDefault();
    try {
      await postMessage({ message: chat, ticketId }).unwrap();
      socket.emit("sendMessage", {
        chat,
        ticket: ticketId,
        isAdmin: true,
      });
      setChat("");
      getTicket();
    } catch (error) {
      getError(error);
    }
  };

  // ====== Time and date ===========

  function formatDate(dateString) {
    const options = { day: "2-digit", month: "short", year: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", options);
  }

  function formatTime(dateString) {
    const options = { hour: "numeric", minute: "numeric", hour12: true };
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", options);
  }

  function formatDateTime(dateString) {
    const date = new Date(dateString);

    const options = {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    return new Intl.DateTimeFormat("en-US", options).format(date);
  }

  const handleStatus = async (e) => {
    try {
      if (e.target.value === "Open") {
        await acceptTicket(ticketId);
        getTicket();
      }
    } catch (error) {
      getError(error);
    }
  };

  const closeTicketHandler = () => {
    handleShowCancelModal();
  };

  const handleDelete = async () => {
    try {
      await closeTicket(ticketId);
      handleCloseCancelModal();
    } catch (error) {
      getError(error);
    }
  };

  // console.log(ticket);

  return (
    <MotionDiv>
      <Container>
        <ModalTemplate
          show={showCancelModal}
          onHide={handleCloseCancelModal}
          title={`issue resolved ? Are you sure you want to close ticket?`}
          onDiscard={handleCloseCancelModal}
          onConfirm={handleDelete}
          color={true}
          buttonConfirmTxt={true}
          buttonCancelTxt={true}
        />

        <div className="d-flex gap-2 pointer">
          <Link className="back_txt" to="/admin/tickets">
            <IoMdArrowBack size={22} />
            <span>Back</span>
          </Link>
        </div>

        <Row className="px-3 mt-1">
          <Col>
            <div className="d-flex align-items-center gap-4">
              <img
                className="chat_avtar"
                src={ticket.from && imgAddr + ticket.from?.profile_url}
                alt="..."
              />
              <div>
                <div>
                  {ticket.from &&
                    ticket.from?.first_name + " " + ticket.from?.last_name}
                </div>
              </div>
            </div>
          </Col>
          <Col>
            <div className="d-flex flex-column justify-content-between gap-2 mt-1 status_txt">
              <div className="d-flex justify-content-between">
                <div>
                  <div className="issue_raised_txt">Issue Raised :</div>
                </div>
                {ticket.status && ticket.status !== "Closed" && (
                  <Button
                    onClick={closeTicketHandler}
                    style={{
                      backgroundColor: "#6172F3",
                      border: "none",
                      minWidth: "max-content",
                      padding: "0.5rem 0.75rem",
                      borderRadius: "0.75rem",
                      height: "2.5rem",
                    }}
                  >
                    Close Ticket <MdOutlineCancelPresentation size={22} />
                  </Button>
                )}
              </div>

              <div>
                <div
                  style={{
                    width: "100%",
                    height: "50px",
                    overflowY: "scroll",
                  }}
                >
                  <div>{ticket.subject && ticket.subject}</div>
                  {!isLoading ? (
                    ticket.description && ticket.description
                  ) : (
                    <Spinner size="sm" />
                  )}
                </div>
              </div>
            </div>
          </Col>
        </Row>

        <Row className="px-3 mt-1">
          <Col>
            {ticket.status && ticket.status === "Pending" && (
              <div className="d-flex flex-wrap gap-2">
                <div className="head_text">Change Status</div>
                <select onChange={handleStatus} className="select_status">
                  <option
                    style={{
                      color: "#F95428",
                    }}
                    disabled
                    value="Closed"
                  >
                    Pending
                  </option>
                  <option value="Open">Open</option>
                </select>
              </div>
            )}
          </Col>
          <Col>
            <div className="d-flex flex-wrap gap-2 justify-content-end">
              <div className="head_text">Raised On:</div>
              <div className="date">
                {ticket.createdAt && formatDate(ticket.createdAt)}
              </div>
            </div>
            <div className="text-end">
              {ticket.createdAt && formatTime(ticket.createdAt)}
            </div>
          </Col>
        </Row>

        <div className="p-4">
          <div
            className="p-3 pt-5 bg-white rounded-xl chat_box_container"
            style={{
              border: "1px solid #EFEFEF",
              boxShadow: "0px 4px 12px 0px #0000000A",
            }}
            ref={chatContainerRef}
          >
            {ticket.status && ticket.chats.length > 0 ? (
              ticket.chats.map((data) => {
                return (
                  <div
                    key={data._id}
                    className={`${
                      data.from === user._id
                        ? "d-flex flex-row-reverse"
                        : "d-flex flex-row-start w-50"
                    } mt-3 `}
                  >
                    <div className="me-2">
                      <p
                        className="my-0 p-4"
                        style={{
                          fontSize: "0.75rem",
                          fontWeight: 400,
                          backgroundColor: "#EEEEEE",
                          borderRadius: "22px",
                          borderTopRightRadius: "4px",
                        }}
                      >
                        {data.message}
                      </p>
                      <p
                        className="my-1 text-end"
                        style={{
                          fontWeight: 400,
                          fontSize: "0.75rem",
                          color: "#797979",
                        }}
                      >
                        Sent at :{" "}
                        <span style={{ fontWeight: 300 }}>
                          {formatDateTime(data.date)}
                        </span>
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center">No Chats Found!</div>
            )}
          </div>
        </div>

        {ticket.status && ticket.status !== "Closed" && (
          <div className=" rounded-xl">
            <Form onSubmit={handleChat}>
              <Form.Group className="px-4 mx-auto">
                <Stack direction="horizontal" gap={3}>
                  <Form.Control
                    type="text"
                    value={chat}
                    required
                    onChange={(e) => setChat(e.target.value)}
                    placeholder="Write something here..."
                    className="py-2 px-3"
                    style={{
                      border: "1px solid #8098F9",
                    }}
                  />

                  <Button
                    type="submit"
                    disabled={sendMessageLoading}
                    style={{
                      backgroundColor: "var(--primary-color)",
                      border: "none",
                      minWidth: "max-content",
                      padding: "0.5rem 0.75rem",
                      borderRadius: "0.75rem",
                    }}
                  >
                    {sendMessageLoading ? (
                      <Spinner size="sm" />
                    ) : (
                      <span className="me-2">Send</span>
                    )}
                    {/* <FlyingArrowIcon /> */}
                  </Button>
                </Stack>
              </Form.Group>
            </Form>
          </div>
        )}
      </Container>
    </MotionDiv>
  );
};

export default TicketChat;
