import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { GiHamburgerMenu } from "react-icons/gi";
import { useSelector } from "react-redux";
import { selectAuth } from "../../features/authSlice";
import { IoIosSettings } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { IoMdNotifications } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

export default function Header({ sidebarHandler }) {
  // const { user, accessToken } = useSelector(selectAuth);
  const accessToken = localStorage.getItem("accessToken");
  const bankToken = localStorage.getItem("bankToken");

  return (
    <>
      {accessToken && bankToken ? (
        <Container className="header">
          <Row>
            <Col md={4}>
              <div className="d-flex gap-5 align-items-center">
                <div
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
              <div className="d-flex gap-4 align-items-center justify-content-end">
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
                    className="d-flex align-items-center"
                    style={{
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
                    <img src="/images/badge.png" alt="..." /> <span>Goal</span>
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
                  className="d-flex align-items-center"
                  style={{
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
                  <img src="/images/badge.png" alt="..." /> <span>Payday</span>
                  <IoIosArrowForward size={16} />
                </div>

                <div
                  className="d-flex align-items-center"
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
                  className="p-2"
                  style={{
                    backgroundColor: "rgba(245, 247, 248, 1)",
                    borderRadius: "100%",
                    height: "40px",
                    width: "40px",
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
                  style={{
                    backgroundColor: "rgba(245, 247, 248, 1)",
                    borderRadius: "100%",
                    height: "40px",
                    width: "40px",
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

          {/* <GiHamburgerMenu
            style={{
              fontSize: "1.5rem",
              color: "rgba(0, 0, 139, 1)",
              marginLeft: "1rem",
              cursor: "pointer",
            }}
            onClick={() => sidebarHandler()}
          /> */}
        </Container>
      ) : (
        // <Container fluid className="ps-0 header">
        //   <div className="header-inside">
        //     {/* <Navbar className=" header-inside"> */}
        //     <Row>
        //       <Col md={3} style={{ border: "1px solid black" }}>
        //         <div className="d-flex justify-content-between gap-5">
        //           <div
        //             className="p-2"
        //             style={{
        //               backgroundColor: "rgba(245, 247, 248, 1)",
        //               borderRadius: "100%",
        //               height: "40px",
        //               width: "40px",
        //             }}
        //           >
        //             <IoIosSettings
        //               size={25}
        //               cursor={"pointer"}
        //               color="rgba(92, 182, 249, 1)"
        //             />
        //           </div>
        //           <div
        //             className="p-2"
        //             style={{
        //               backgroundColor: "rgba(245, 247, 248, 1)",
        //               height: "40px",
        //               width: "80px",
        //             }}
        //           >
        //             <IoIosSettings
        //               size={25}
        //               cursor={"pointer"}
        //               color="rgba(92, 182, 249, 1)"
        //             />
        //           </div>
        //         </div>
        //       </Col>

        //       <Col style={{ border: "1px solid black" }}>
        //         <div className="d-flex justify-content-end gap-5">
        //           <div
        //             className="p-2"
        //             style={{
        //               backgroundColor: "rgba(245, 247, 248, 1)",
        //               borderRadius: "100%",
        //               height: "40px",
        //               width: "40px",
        //             }}
        //           >
        //             <IoIosSettings
        //               size={25}
        //               cursor={"pointer"}
        //               color="rgba(92, 182, 249, 1)"
        //             />
        //           </div>
        //           <div
        //             className="p-2"
        //             style={{
        //               backgroundColor: "rgba(245, 247, 248, 1)",
        //               borderRadius: "100%",
        //               height: "40px",
        //               width: "40px",
        //             }}
        //           >
        //             <IoIosSettings
        //               size={25}
        //               cursor={"pointer"}
        //               color="rgba(92, 182, 249, 1)"
        //             />
        //           </div>
        //         </div>
        //       </Col>
        //     </Row>
        //     {/* <GiHamburgerMenu
        //     style={{
        //       fontSize: "1.5rem",
        //       color: "rgba(0, 0, 139, 1)",
        //       marginLeft: "1rem",
        //       cursor: "pointer",
        //     }}
        //     onClick={() => sidebarHandler()}
        //   /> */}

        //     {/* <Nav className="ms-auto">
        //       <Dropdown align="end">
        //         <Dropdown.Toggle
        //           id="user_profile"
        //           className="right-profile-logo "
        //           variant="light"
        //         >
        //           <FaUserCircle size={"25px"} color="rgba(0, 0, 139, 1)" />
        //         </Dropdown.Toggle>

        //         <Dropdown.Menu>
        //           <Dropdown.Header>
        //             Signed in as
        //             <br />
        //             <b>{user?.name}</b>
        //           </Dropdown.Header>

        //           <Dropdown.Divider />
        //           <Dropdown.Item>
        //             <Link to="admin/view-profile/" className="dropdown-item">
        //               <FaUser className="me-2" /> Profile
        //             </Link>
        //           </Dropdown.Item>
        //         </Dropdown.Menu>
        //       </Dropdown>
        //     </Nav> */}
        //     {/* </Navbar> */}
        //   </div>
        // </Container>
        <></>
      )}
    </>
  );
}
