import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { IoIosSettings } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { IoMdNotifications } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import { RxCross2, RxCheck } from "react-icons/rx";
import { GiHamburgerMenu } from "react-icons/gi";
import GoalComponent from "../HeaderComponents/GoalComponent";
import PayDayComponent from "../HeaderComponents/PayDayComponent";
import Notification from "../HeaderComponents/Notification";
import SettingsComponent from "../HeaderComponents/SettingsComponent";
import OffcanvasAccount from "../HeaderComponents/OffcanvasAccount";
import AddAccount from "../HeaderComponents/AddAccount";
import "./Header.css";
import { selectAuth } from "../../features/authSlice";
import { useSelector } from "react-redux";
import { useGetGoalsMutation } from "../../features/apiSlice";
import { getError } from "../../utils/error";

export default function Header({ sidebarHandler }) {
  const { user, accessToken } = useSelector(selectAuth);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);
  const [goalBackLink, setGoalBackLink] = useState(1);
  const [goalModal, setGoalModal] = useState(false);
  const [payDaysLink, setPayDaysLink] = useState(1);
  const [payDays, setPayDays] = useState(false);
  const [notificationModal, setNotificationModal] = useState(false);
  const [settings, setSettings] = useState(false);
  const [addAccountModal, setAddAccountModal] = useState(false);
  const [addAccountLink, setAddAccountLink] = useState(1);
  const [getGoals, { isLoading: goalsLoading }] = useGetGoalsMutation();
  const [goalsOnTarget, setGoalsOnTarget] = useState(null); 

  const getAllGoals = async () => {
    try {
      const { goals } = await getGoals().unwrap();
      if (goals.length === 0) {
        setGoalsOnTarget(null); 
      } else {
        const allOnTarget = goals.every((goal) => goal?.onTarget);
        setGoalsOnTarget(allOnTarget);
      }
    } catch (error) {
      getError(error);
    }
  };

  useEffect(() => {
    if (accessToken) {
      getAllGoals();
    }
  }, [accessToken]);

  return (
    <>
      {accessToken && user && (
        <>
          <Container className="header">
            <Row>
              <Col className="customize-dashboard" md={3}>
                <div className="d-flex gap-3 align-items-center">
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
                      borderRadius: "22px",
                      fontSize: "12px",
                      color: "var(--primary-color)",
                      fontWeight: 400,
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
                      className="d-flex align-items-center py-3 px-3"
                      style={{
                        cursor: "pointer",
                        backgroundColor: "rgba(235, 241, 248, 1)",
                        borderRadius: "22px",
                        fontSize: "12px",
                        color: "var(--primary-color)",
                        fontWeight: 400,
                      }}
                    >
                      <img src="/images/badge.png" alt="..." />{" "}
                      <span>Goal</span>
                      <IoIosArrowForward size={16} />
                    </div>

                    <div>
                      <div
                        style={{
                          fontSize: "11px",
                          color: "var(--primary-color)",
                          fontWeight: 400,
                          marginLeft: "-10px",
                        }}
                      >
                        Goals on target ?
                      </div>
                      {goalsOnTarget === null ? (
                        <div
                          role="status"
                          className="d-flex align-items-center mt-1 goal-status-no-goals"
                          style={{ color: "red" }}
                        >
                          No Goals
                        </div>
                      ) : goalsOnTarget ? (
                        <div
                          role="status"
                          className="d-flex align-items-center mt-1 goal-status-on-target"
                          style={{ color: "green" }}
                        >
                          <RxCheck /> <span>Yes</span>
                        </div>
                      ) : (
                        <div
                          role="status"
                          className="d-flex align-items-center mt-1 goal-status-not-on-target"
                          style={{ color: "red" }}
                        >
                          <RxCross2 /> <span>No</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div
                    className="customize-dashboard custom-dasboard-payday"
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
                      fontWeight: 500,
                    }}
                  >
                    <img src="/images/badge.png" alt="..." />{" "}
                    <span>Payday</span>
                    <IoIosArrowForward size={16} />
                  </div>

                  <div
                    className="customize-dashboard py-3 px-4 dasboard-add-account"
                    onClick={() => setAddAccountModal(true)}
                    style={{
                      backgroundColor: "var(--primary-color)",
                      borderRadius: "22px",
                      fontSize: "12px",
                      color: "white",
                      fontWeight: 400,
                      cursor: "pointer",
                    }}
                  >
                    <GoPlus size={16} /> Add account
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

          {/* Goal */}
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

          {/* Notification */}
          <Notification show={notificationModal} hide={setNotificationModal} />

          {/* Add Account */}
          <AddAccount
            show={addAccountModal}
            hide={setAddAccountModal}
            active={addAccountLink}
            activeLink={setAddAccountLink}
          />

          {/* Offcanvas Account */}
          <OffcanvasAccount
            show={show}
            handleClose={handleClose}
            user={user}
            accessToken={accessToken}
          />
        </>
      )}
    </>
  );
}
