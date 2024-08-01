import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { IoIosSettings } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { IoMdNotifications } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { GiHamburgerMenu } from "react-icons/gi";
import GoalComponent from "../HeaderComponents/GoalComponent";
import PayDayComponent from "../HeaderComponents/PayDayComponent";
import { useNavigate } from "react-router-dom";
import Notification from "../HeaderComponents/Notification";
import SettingsComponent from "../HeaderComponents/SettingsComponent";
import OffcanvasAccount from "../HeaderComponents/OffcanvasAccount";
import AddAccount from "../HeaderComponents/AddAccount";
import "./Header.css";

export default function Header({ sidebarHandler }) {
  const navigate = useNavigate();
  // const { user, accessToken } = useSelector(selectAuth);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);

  const accessToken = localStorage.getItem("accessToken");
  const bankToken = localStorage.getItem("bankToken");

  const [goalBackLink, setGoalBackLink] = useState(1);
  const [goalModal, setGoalModal] = useState(false);

  const [payDaysLink, setPayDaysLink] = useState(1);
  const [payDays, setPayDays] = useState(false);

  const [notificationModal, setNotificationModal] = useState(false);

  const [settings, setSettings] = useState(false);

  const [addAccountModal, setAddAccountModal] = useState(false);
  const [addAccountLink, setAddAccountLink] = useState(1);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("bankToken");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <>
      {accessToken && bankToken ? (
        <>
          <Container className="header">
            <Row>
              <Col className="customize-dashboard" md={4}>
                <div className="d-flex gap-5 align-items-center">
                  <div
                    onClick={() => setSettings(true)}
                    style={{
                      backgroundColor: "rgba(245, 247, 248, 1)",
                      borderRadius: "100%",
                      height: "50px",
                      width: "50px",
                      padding: "12.5px",
                    }}
                  >
                    <IoIosSettings
                      size={25}
                      cursor={"pointer"}
                      color="rgba(92, 182, 249, 1)"
                    />
                  </div>

                  <div
                    className="p-3 d-flex align-items-center"
                    style={{
                      backgroundColor: "rgba(235, 241, 248, 1)",
                      height: "50px",
                      width: "200px",
                      borderRadius: "22px",
                      fontSize: "12px",
                      color: "var(--primary-color)",
                      fontWeight: 600,
                    }}
                  >
                    <img src="/images/badge.png" alt="..." />{" "}
                    <span>Customise dasboard</span>
                    <IoIosArrowForward size={16} />
                  </div>
                </div>
              </Col>

              <Col>
                <div className="gap-4 mobile-responsive">
                  <GiHamburgerMenu
                    className="hamburger"
                    style={{
                      fontSize: "1.5rem",
                      color: "rgba(0, 0, 139, 1)",
                      marginLeft: "1rem",
                      cursor: "pointer",
                    }}
                    onClick={() => sidebarHandler()}
                  />

                  <div
                    className="d-flex align-items-center gap-3"
                    style={{
                      backgroundColor: "rgba(242, 249, 255, 1)",
                      height: "50px",
                      width: "200px",
                      borderRadius: "22px",
                    }}
                  >
                    <div
                      onClick={() => {
                        setGoalModal(true);
                        setGoalBackLink(1);
                      }}
                      className="d-flex align-items-center"
                      style={{
                        cursor: "pointer",
                        padding: "26px",
                        backgroundColor: "rgba(235, 241, 248, 1)",
                        height: "50px",
                        width: "110px",
                        borderRadius: "22px",
                        fontSize: "12px",
                        color: "var(--primary-color)",
                        fontWeight: 600,
                      }}
                    >
                      <img src="/images/badge.png" alt="..." />{" "}
                      <span>Goal</span>
                      <IoIosArrowForward size={16} />
                    </div>

                    <div
                      style={{
                        fontSize: "8px",
                        color: "var(--primary-color)",
                        fontWeight: 600,
                      }}
                    >
                      Goals on target ?
                      <div
                        className="d-flex align-items-center mt-1"
                        style={{
                          padding: "2px",
                          backgroundColor: "rgba(235, 241, 248, 1)",
                          height: "20px",
                          width: "40px",
                          borderRadius: "22px",
                          fontSize: "12px",
                          color: "rgba(255, 1, 9, 1)",
                          fontWeight: 600,
                        }}
                      >
                        <RxCross2 /> <span>No</span>
                      </div>
                    </div>
                  </div>

                  <div
                    className="customize-dashboard"
                    onClick={() => {
                      setPayDays(true);
                      setPayDaysLink(1);
                    }}
                    style={{
                      cursor: "pointer",
                      padding: "26px",
                      backgroundColor: "rgba(235, 241, 248, 1)",
                      height: "50px",
                      width: "140px",
                      borderRadius: "22px",
                      fontSize: "12px",
                      color: "var(--primary-color)",
                      fontWeight: 600,
                    }}
                  >
                    <img src="/images/badge.png" alt="..." />{" "}
                    <span>Payday</span>
                    <IoIosArrowForward size={16} />
                  </div>

                  <div
                    className="customize-dashboard"
                    onClick={() => setAddAccountModal(true)}
                    style={{
                      padding: "26px",
                      backgroundColor: "var(--primary-color)",
                      height: "40px",
                      width: "160px",
                      borderRadius: "22px",
                      fontSize: "12px",
                      color: "white",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    + Add account
                  </div>

                  <div
                    onClick={() => setNotificationModal(true)}
                    className="p-2 customize-dashboard"
                    style={{
                      backgroundColor: "rgba(245, 247, 248, 1)",
                      borderRadius: "100%",
                      height: "40px",
                      width: "40px",
                      cursor: "pointer",
                    }}
                  >
                    <IoMdNotifications
                      size={25}
                      cursor={"pointer"}
                      color="rgba(92, 182, 249, 1)"
                    />
                  </div>

                  <div
                    className="p-2"
                    onClick={toggleShow}
                    style={{
                      backgroundColor: "rgba(245, 247, 248, 1)",
                      borderRadius: "100%",
                      height: "40px",
                      width: "40px",
                      cursor: "pointer",
                    }}
                  >
                    <FaUserCircle
                      size={25}
                      cursor={"pointer"}
                      color="rgba(92, 182, 249, 1)"
                    />
                  </div>
                </div>
              </Col>
            </Row>
          </Container>

          {/* Settings */}
          <SettingsComponent show={settings} hide={setSettings} />

          {/* Goal  */}
          <GoalComponent
            show={goalModal}
            hide={setGoalModal}
            active={goalBackLink}
            activeLink={setGoalBackLink}
          />

          {/* Paydays */}
          <PayDayComponent
            show={payDays}
            hide={setPayDays}
            active={payDaysLink}
            activeLink={setPayDaysLink}
          />

          {/* Add account */}
          <AddAccount
            show={addAccountModal}
            hide={setAddAccountModal}
            active={addAccountLink}
            activeLink={setAddAccountLink}
          />

          {/* Notification */}
          <Notification show={notificationModal} hide={setNotificationModal} />

          {/*Account Offcanvas */}
          <OffcanvasAccount show={show} handleClose={handleClose} />
        </>
      ) : (
        <></>
      )}
    </>
  );
}
