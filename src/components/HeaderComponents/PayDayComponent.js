import React from "react";
import ModalWindow from "../modals/ModalWindow";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { Card, Form, Image, InputGroup, ProgressBar } from "react-bootstrap";
import FormField from "../layout/FormField";
import { CalendarSVG } from "../svg/CalendarSVG";
import { FilterSVG } from "../svg/FilterSVG";
import { Filter2SVG } from "../svg/Filter2SVG";

const PayDayComponent = ({ show, hide, active, activeLink }) => {
  return (
    <>
      <ModalWindow show={show} onHide={hide}>
        {active === 1 && (
          <>
            <div className="d-flex">
              <IoArrowBackCircleOutline
                color="rgba(92, 182, 249, 1)"
                cursor={"pointer"}
                size={28}
                onClick={() => hide(false)}
              />
              <div
                style={{
                  margin: "auto",
                  fontWeight: 600,
                  fontSize: "18px",
                  color: "rgba(55, 73, 87, 1)",
                }}
                className="text-center"
              >
                Payday
              </div>
            </div>

            <Card className="mt-3" style={{ borderRadius: "20px" }}>
              <Card.Body>
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <h2
                      style={{ color: "var(--primary-color)", fontWeight: 800 }}
                    >
                      5 days
                    </h2>
                    <div
                      style={{
                        color: "rgba(159, 175, 198, 1)",
                        fontSize: "12px",
                      }}
                    >
                      Left for this week's budget
                    </div>
                  </div>

                  <div>
                    <div
                      className="text-center"
                      style={{
                        backgroundColor: "rgba(92, 182, 249, 0.08)",
                        fontSize: "12px",
                        color: "rgba(92, 182, 249, 1)",
                        fontWeight: 600,
                        borderRadius: "15px",
                        padding: "6px",
                      }}
                    >
                      1 active budget
                    </div>
                    <div
                      className="mt-2"
                      style={{
                        color: "rgba(55, 73, 87, 1)",
                        fontSize: "12px",
                        fontWeight: 600,
                      }}
                    >
                      Weekly on wednesday
                    </div>
                  </div>
                </div>

                <div className="mt-3 mb-3">
                  <ProgressBar now={40} label={`${100}%`} visuallyHidden />
                </div>

                <div
                  className="mt-2"
                  style={{
                    backgroundColor: "rgba(245, 247, 248, 1)",
                    padding: "8px",
                    borderRadius: "10px",
                  }}
                >
                  <div className=" d-flex justify-content-between align-items-center">
                    <div className="d-flex gap-2 align-items-center">
                      <Image src="/images/Rectangle 116.png" alt="..." />
                      <div>
                        <div
                          style={{
                            fontWeight: 600,
                            color: "rgba(55, 73, 87, 1)",
                            fontSize: "12px",
                          }}
                        >
                          Cafe & Coffee
                        </div>
                        <div
                          style={{
                            fontWeight: 400,
                            color: "rgba(159, 175, 198, 1)",
                            fontSize: "12px",
                          }}
                        >
                          $20 spent of 50
                        </div>
                      </div>
                    </div>

                    <div>
                      <div
                        style={{
                          color: "var(--primary-color)",
                          fontSize: "12px",
                          fontWeight: 600,
                        }}
                      >
                        $30.00
                      </div>
                      <div
                        style={{
                          fontWeight: 400,
                          color: "rgba(159, 175, 198, 1)",
                          fontSize: "12px",
                        }}
                      >
                        remaining
                      </div>
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-center gap-3 mt-2">
                  <button
                    className="px-3 py-2"
                    style={{
                      fontWeight: 600,
                      fontSize: "14px",
                      border: "1px solid rgba(228, 228, 228, 1)",
                      borderRadius: "20px",
                      backgroundColor: "white",
                      color: "var(--primary-color)",
                    }}
                  >
                    Edit payday
                  </button>
                  <button
                    onClick={() => activeLink(3)}
                    className="px-3 py-2"
                    style={{
                      fontWeight: 600,
                      fontSize: "14px",
                      border: "1px solid rgba(228, 228, 228, 1)",
                      borderRadius: "20px",
                      backgroundColor: "var(--primary-color)",
                      color: "white",
                    }}
                  >
                    View payday
                  </button>
                </div>
              </Card.Body>
            </Card>

            <div className="d-flex justify-content-center mt-3">
              <button
                onClick={() => activeLink(2)}
                className=" py-2 w-75"
                style={{
                  fontWeight: 600,
                  fontSize: "14px",
                  border: "1px solid rgba(228, 228, 228, 1)",
                  borderRadius: "5px",
                  backgroundColor: "var(--primary-color)",
                  color: "white",
                }}
              >
                Create payday
              </button>
            </div>
          </>
        )}

        {active === 2 && (
          <>
            <div className="d-flex">
              <IoArrowBackCircleOutline
                color="rgba(92, 182, 249, 1)"
                cursor={"pointer"}
                size={28}
                onClick={() => activeLink(1)}
              />
              <div
                style={{
                  margin: "auto",
                  fontWeight: 600,
                  fontSize: "18px",
                  color: "rgba(55, 73, 87, 1)",
                }}
                className="text-center"
              >
                Payday
              </div>
            </div>

            <Form className="mt-3">
              <Form.Label
                style={{
                  fontSize: "18px",
                  fontWeight: 600,
                  color: "var(--primary-color)",
                }}
              >
                Payday
              </Form.Label>
              <InputGroup className="mb-3">
                <Form.Control
                  className="form-field"
                  style={{ borderRight: "none" }}
                  placeholder="Payday"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
                <InputGroup.Text id="basic-addon1" className="grp_input">
                  <CalendarSVG />
                </InputGroup.Text>
              </InputGroup>

              <Form.Label
                style={{
                  fontSize: "18px",
                  fontWeight: 600,
                  color: "var(--primary-color)",
                }}
              >
                Payday Period
              </Form.Label>
              <InputGroup className="mb-3">
                <Form.Control
                  className="form-field"
                  style={{ borderRight: "none" }}
                  placeholder="Select period"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
                <InputGroup.Text id="basic-addon1" className="grp_input">
                  <FilterSVG />
                </InputGroup.Text>
              </InputGroup>

              <Form.Label
                style={{
                  fontSize: "18px",
                  fontWeight: 600,
                  color: "var(--primary-color)",
                }}
              >
                Amount
              </Form.Label>
              <FormField type={"text"} placeholder={"Enter amount"} />

              <div className="d-flex justify-content-center mt-3">
                <button
                  onClick={() => activeLink(2)}
                  className=" py-2 w-75"
                  style={{
                    fontWeight: 600,
                    fontSize: "14px",
                    border: "1px solid rgba(228, 228, 228, 1)",
                    borderRadius: "5px",
                    backgroundColor: "var(--primary-color)",
                    color: "white",
                  }}
                >
                  Create
                </button>
              </div>
            </Form>
          </>
        )}

        {active === 3 && (
          <>
            <div className="d-flex">
              <IoArrowBackCircleOutline
                color="rgba(92, 182, 249, 1)"
                cursor={"pointer"}
                size={28}
                onClick={() => hide(false)}
              />
              <div
                style={{
                  margin: "auto",
                  fontWeight: 600,
                  fontSize: "18px",
                  color: "rgba(55, 73, 87, 1)",
                }}
                className="text-center"
              >
                Payday
              </div>
            </div>

            <div
              style={{
                backgroundColor: "var(--primary-color)",
                color: "white",
                textAlign: "center",
              }}
            >
              <h2> 5 days </h2>
              <p>left for this week budget</p>
              <p>
                <span>Total Amount: </span> $50.00
              </p>
            </div>

            <div className="d-flex align-items-center justify-content-between mt-2">
              <div
                style={{
                  color: "var(--primary-color)",
                  fontSize: "14px",
                  fontWeight: 600,
                }}
              >
                Budget lists
              </div>

              <div>
                <Filter2SVG />
              </div>
            </div>

            <Card className="mt-3" style={{ borderRadius: "20px" }}>
              <Card.Body>
                <div
                  className="mt-2"
                  style={{
                    backgroundColor: "rgba(245, 247, 248, 1)",
                    padding: "8px",
                    borderRadius: "10px",
                  }}
                >
                  <div className=" d-flex justify-content-between align-items-center">
                    <div className="d-flex gap-2 align-items-center">
                      <Image src="/images/Rectangle 116.png" alt="..." />
                      <div>
                        <div
                          style={{
                            fontWeight: 600,
                            color: "rgba(55, 73, 87, 1)",
                            fontSize: "12px",
                          }}
                        >
                          Cafe & Coffee
                        </div>
                        <div
                          style={{
                            fontWeight: 400,
                            color: "rgba(159, 175, 198, 1)",
                            fontSize: "12px",
                          }}
                        >
                          $20 spent of 50
                        </div>
                      </div>
                    </div>

                    <div>
                      <div
                        style={{
                          color: "var(--primary-color)",
                          fontSize: "12px",
                          fontWeight: 600,
                        }}
                      >
                        $30.00
                      </div>
                      <div
                        style={{
                          fontWeight: 400,
                          color: "rgba(159, 175, 198, 1)",
                          fontSize: "12px",
                        }}
                      >
                        remaining
                      </div>
                    </div>
                  </div>
                  <div className="mt-1">
                    <ProgressBar now={40} label={`${100}%`} visuallyHidden />
                  </div>
                </div>

                <div
                  className="mt-2"
                  style={{
                    backgroundColor: "rgba(245, 247, 248, 1)",
                    padding: "8px",
                    borderRadius: "10px",
                  }}
                >
                  <div className=" d-flex justify-content-between align-items-center">
                    <div className="d-flex gap-2 align-items-center">
                      <Image src="/images/Rectangle 116.png" alt="..." />
                      <div>
                        <div
                          style={{
                            fontWeight: 600,
                            color: "rgba(55, 73, 87, 1)",
                            fontSize: "12px",
                          }}
                        >
                          Cafe & Coffee
                        </div>
                        <div
                          style={{
                            fontWeight: 400,
                            color: "rgba(159, 175, 198, 1)",
                            fontSize: "12px",
                          }}
                        >
                          $20 spent of 50
                        </div>
                      </div>
                    </div>

                    <div>
                      <div
                        style={{
                          color: "var(--primary-color)",
                          fontSize: "12px",
                          fontWeight: 600,
                        }}
                      >
                        $30.00
                      </div>
                      <div
                        style={{
                          fontWeight: 400,
                          color: "rgba(159, 175, 198, 1)",
                          fontSize: "12px",
                        }}
                      >
                        remaining
                      </div>
                    </div>
                  </div>
                  <div className="mt-1">
                    <ProgressBar now={40} label={`${100}%`} visuallyHidden />
                  </div>
                </div>

                <div
                  className="mt-2"
                  style={{
                    backgroundColor: "rgba(245, 247, 248, 1)",
                    padding: "8px",
                    borderRadius: "10px",
                  }}
                >
                  <div className=" d-flex justify-content-between align-items-center">
                    <div className="d-flex gap-2 align-items-center">
                      <Image src="/images/Rectangle 116.png" alt="..." />
                      <div>
                        <div
                          style={{
                            fontWeight: 600,
                            color: "rgba(55, 73, 87, 1)",
                            fontSize: "12px",
                          }}
                        >
                          Cafe & Coffee
                        </div>
                        <div
                          style={{
                            fontWeight: 400,
                            color: "rgba(159, 175, 198, 1)",
                            fontSize: "12px",
                          }}
                        >
                          $20 spent of 50
                        </div>
                      </div>
                    </div>

                    <div>
                      <div
                        style={{
                          color: "var(--primary-color)",
                          fontSize: "12px",
                          fontWeight: 600,
                        }}
                      >
                        $30.00
                      </div>
                      <div
                        style={{
                          fontWeight: 400,
                          color: "rgba(159, 175, 198, 1)",
                          fontSize: "12px",
                        }}
                      >
                        remaining
                      </div>
                    </div>
                  </div>
                  <div className="mt-1">
                    <ProgressBar now={40} label={`${100}%`} visuallyHidden />
                  </div>
                </div>
              </Card.Body>
            </Card>

            <div className="d-flex justify-content-center mt-3">
              <button
                onClick={() => activeLink(2)}
                className=" py-2 w-75"
                style={{
                  fontWeight: 600,
                  fontSize: "14px",
                  border: "1px solid rgba(228, 228, 228, 1)",
                  borderRadius: "5px",
                  backgroundColor: "var(--primary-color)",
                  color: "white",
                }}
              >
                Edit
              </button>
            </div>
          </>
        )}
      </ModalWindow>
    </>
  );
};

export default PayDayComponent;
