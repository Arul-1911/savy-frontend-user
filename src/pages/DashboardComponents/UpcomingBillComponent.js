import React, { useState } from "react";
import ModalWindow from "../../components/modals/ModalWindow";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { Card, Form, Image, InputGroup, ProgressBar } from "react-bootstrap";
import { CalendarSVG } from "../../components/svg/CalendarSVG";
import FormField from "../../components/layout/FormField";
import { IoIosArrowDown } from "react-icons/io";
import { FaRegCheckCircle } from "react-icons/fa";
import "../Dashboard.css";
import Calendar from "../../components/Calendar/Calendar";

const UpcomingBillComponents = ({ show, hide, active, activeLink }) => {
  const [selectActivePeriod, setSelectActivePeriod] = useState(0);
  const [activePopularCat, setActivePopularCat] = useState(0);

  const [openCalendar, setOpenCalendar] = useState(false);

  const periods = [
    "Next 7 days",
    "Next 14 days",
    "Next 30 days",
    "This month",
    "This pay cycle",
    "Next pay cycle",
    "Calendar fortnight",
  ];

  const activePeriods = (index) => {
    setSelectActivePeriod(index);
  };

  const popularCat = [
    {
      text: "Restaurants",
      subText: "Lifestyle",
    },
    {
      text: "Electricity",
      subText: "Home",
    },
    {
      text: "Restaurants",
      subText: "Lifestyle",
    },
  ];

  const allCat = [
    {
      text: "Restaurants",
      subText: "Lifestyle",
    },
    {
      text: "Restaurants",
      subText: "Lifestyle",
    },
    {
      text: "Restaurants",
      subText: "Lifestyle",
    },
    {
      text: "Restaurants",
      subText: "Lifestyle",
    },
    {
      text: "Restaurants",
      subText: "Lifestyle",
    },
    {
      text: "Restaurants",
      subText: "Lifestyle",
    },
    {
      text: "Restaurants",
      subText: "Lifestyle",
    },
  ];

  return (
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
              Bills
            </div>
          </div>

          <div
            className="payday-list"
            style={{
              color: "rgba(254, 254, 254, 1)",
              textAlign: "center",
              padding: "10px",
              borderRadius: "20px",
              marginTop: "10px",
            }}
          >
            <h2
              style={{
                fontWeight: 700,
              }}
            >
              $-
            </h2>
            <p
              style={{
                fontWeight: 700,
                padding: 0,
                margin: 0,
                fontSize: "12px",
                color: "rgba(255, 255, 255, 0.89)",
              }}
            >
              Total bills due
            </p>

            <button
              onClick={() => activeLink(2)}
              className="w-50 py-1 mt-2"
              style={{
                backgroundColor: "rgba(255, 255, 255, 1)",
                color: "var(--primary-color)",
                borderRadius: "20px",
                outline: "none",
                border: "none",
              }}
            >
              All Bills <IoIosArrowDown />
            </button>
          </div>

          <div className="mt-2 text-center">
            <div
              style={{
                color: "var(--primary-color)",
                fontSize: "14px",
                fontWeight: 600,
              }}
            >
              We didn’t find any bills
            </div>

            <div
              style={{
                cursor: "pointer",
                fontSize: "12px",
                color: "rgba(55, 73, 87, 1)",
              }}
            >
              Track recurring transactions and we’ll remind you before they’re
              next due
            </div>

            <div
              style={{
                cursor: "pointer",
                fontSize: "10px",
                color: "rgba(191, 191, 191, 1)",
              }}
            >
              E.g. Rent, utilities, subscriptions, insurance.
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

          <div className="text-center">
            <button
              className="w-75 mt-3"
              onClick={() => activeLink(3)}
              style={{
                backgroundColor: "var(--primary-color)",
                padding: "10px",
                color: "white",
                border: "none",
                borderRadius: "10px",
              }}
            >
              Add Bills
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

          <div
            style={{
              fontSize: "14px",
              fontWeight: 600,
              color: "var(--primary-color)",
              textAlign: "center",
              marginTop: "10px",
            }}
          >
            Select period
          </div>

          <div className="mt-2">
            {periods?.map((prd, idx) => {
              return (
                <div key={idx}>
                  <div className="d-flex align-items-center justify-content-between">
                    <div
                      style={
                        selectActivePeriod === idx
                          ? {
                              color: "rgba(92, 182, 249, 1)",
                              fontWeight: 600,
                              cursor: "pointer",
                            }
                          : {
                              color: "var(--primary-color)",
                              fontWeight: 600,
                              cursor: "pointer",
                            }
                      }
                      onClick={() => activePeriods(idx)}
                    >
                      {prd}
                    </div>
                    {selectActivePeriod === idx && (
                      <FaRegCheckCircle
                        color="rgba(92, 182, 249, 1)"
                        size={22}
                      />
                    )}
                  </div>
                  <hr />
                </div>
              );
            })}
          </div>
        </>
      )}

      {active === 3 && (
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
                fontSize: "16px",
                color: "rgba(55, 73, 87, 1)",
              }}
              className="text-center"
            >
              Add bills
            </div>
          </div>

          <div
            className="text-center mt-2 px-4"
            style={{
              fontSize: "12px",
              color: "rgba(55, 73, 87, 1)",
              fontWeight: 400,
            }}
          >
            Get the most appropriate dashboard insights for your needs. Add and
            organise widgets below.
          </div>

          <div>
            <div
              className="my-3"
              style={{ fontWeight: 600, color: "var(--primary-color)" }}
            >
              Popular Categories
            </div>
            <Card style={{ borderRadius: " 10px" }}>
              <Card.Body>
                {popularCat?.map((data, idx) => {
                  return (
                    <div
                      key={idx}
                      className="d-flex justify-content-between align-items-center mt-2"
                    >
                      <div
                        className="w-100"
                        style={
                          activePopularCat === idx
                            ? {
                                backgroundColor: "rgba(233, 246, 252, 1)",
                                cursor: "pointer",
                              }
                            : { backgroundColor: "white", cursor: "pointer" }
                        }
                        onMouseEnter={() => setActivePopularCat(idx)}
                        onMouseLeave={() => setActivePopularCat(null)}
                      >
                        <div style={{ fontSize: "14px", fontWeight: 600 }}>
                          {data?.text}
                        </div>
                        <div style={{ fontSize: "12px", fontWeight: 400 }}>
                          {data?.subText}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </Card.Body>
            </Card>
          </div>

          <div>
            <div
              className="my-3"
              style={{ fontWeight: 600, color: "var(--primary-color)" }}
            >
              All Categories
            </div>
            <Card
              style={{
                borderRadius: " 10px",
                overflowY: "scroll",
                height: "300px",
              }}
            >
              <Card.Body>
                {allCat?.map((data, idx) => {
                  return (
                    <div
                      key={idx}
                      className="d-flex justify-content-between align-items-center mt-2"
                    >
                      <div>
                        <div style={{ fontSize: "14px", fontWeight: 600 }}>
                          {data?.text}
                        </div>
                        <div style={{ fontSize: "12px", fontWeight: 400 }}>
                          {data?.subText}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </Card.Body>
            </Card>

            <div className="text-center">
              <button
                className="w-75 mt-3"
                onClick={() => activeLink(4)}
                style={{
                  backgroundColor: "var(--primary-color)",
                  padding: "10px",
                  color: "white",
                  border: "none",
                  borderRadius: "10px",
                }}
              >
                Continue
              </button>
            </div>
          </div>
        </>
      )}

      {active === 4 && (
        <>
          <div className="d-flex">
            <IoArrowBackCircleOutline
              color="rgba(92, 182, 249, 1)"
              cursor={"pointer"}
              size={28}
              onClick={() => activeLink(2)}
            />
            <div
              style={{
                margin: "auto",
                fontWeight: 600,
                fontSize: "16px",
                color: "rgba(55, 73, 87, 1)",
              }}
              className="text-center"
            >
              Add bills
            </div>
          </div>

          <div>
            <div
              className="my-3"
              style={{ fontWeight: 600, color: "var(--primary-color)" }}
            >
              Selected Category
            </div>
            <Card style={{ borderRadius: " 10px" }}>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center mt-2">
                  <div className="d-flex gap-2">
                    <div>
                      <input type="checkbox" />
                    </div>
                    <div>
                      <div style={{ fontSize: "14px", fontWeight: 600 }}>
                        Cafes & Coffee
                      </div>
                      <div style={{ fontSize: "12px", fontWeight: 400 }}>
                        Lifestyle
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "var(--primary-color)",
                    }}
                  >
                    Changes
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>

          <div>
            <div
              className="mt-1"
              style={{ fontWeight: 600, color: "var(--primary-color)" }}
            >
              Selected Budget
            </div>

            <div style={{ fontSize: "12px", fontWeight: 400 }}>
              Select your budget to link your bills
            </div>
            <Card
              style={{
                borderRadius: " 10px",
                overflowY: "scroll",
                height: "300px",
              }}
            >
              <Card.Body>
                {allCat?.map((data, idx) => {
                  return (
                    <div
                      key={idx}
                      className="d-flex justify-content-between align-items-center mt-2"
                    >
                      <div className="d-flex gap-2">
                        <div>
                          <div style={{ fontSize: "14px", fontWeight: 600 }}>
                            {data?.text}
                          </div>
                          <div style={{ fontSize: "12px", fontWeight: 400 }}>
                            $7,441.00
                          </div>
                        </div>
                      </div>

                      <div
                        style={{
                          fontSize: "12px",
                          fontWeight: 600,
                          color: "var(--primary-color)",
                        }}
                      >
                        $7,441.00
                      </div>
                    </div>
                  );
                })}
              </Card.Body>
            </Card>

            <div className="text-center">
              <button
                className="w-75 mt-3"
                onClick={() => activeLink(5)}
                style={{
                  backgroundColor: "var(--primary-color)",
                  padding: "10px",
                  color: "white",
                  border: "none",
                  borderRadius: "10px",
                }}
              >
                Continue
              </button>

              <button
                className="w-75 mt-3"
                onClick={() => activeLink(6)}
                style={{
                  color: "var(--primary-color)",
                  backgroundColor: "white",
                  padding: "10px",
                  border: "none",
                  borderRadius: "10px",
                }}
              >
                Skip
              </button>
            </div>
          </div>
        </>
      )}

      {active === 5 && (
        <>
          <div className="d-flex">
            <IoArrowBackCircleOutline
              color="rgba(92, 182, 249, 1)"
              cursor={"pointer"}
              size={28}
              onClick={() => activeLink(4)}
            />
            <div
              style={{
                margin: "auto",
                fontWeight: 600,
                fontSize: "16px",
                color: "rgba(55, 73, 87, 1)",
              }}
              className="text-center"
            >
              Add bills
            </div>
          </div>

          <Card style={{ borderRadius: "10px" }} className="mt-4">
            <div className="text-center">
              <Image
                style={{ marginTop: "-30px" }}
                width={"45px"}
                height={"45px"}
                src="/icons/Merchent 3.png"
                alt="..."
              />
              <div style={{ color: "var(--primary-color)", fontWeight: 600 }}>
                Electricity
              </div>
              <div
                style={{
                  fontSize: "12px",
                  fontWeight: 400,
                  color: "rgba(191, 191, 191, 1)",
                }}
              >
                Recommended: $29.49
              </div>
            </div>

            <div className="px-3">
              <FormField type={"text"} placeholder={"Enter budget"} />
            </div>
          </Card>

          <div>
            <div
              className="my-3"
              style={{ fontWeight: 600, color: "var(--primary-color)" }}
            >
              Selected Category
            </div>
            <Card style={{ borderRadius: " 10px" }}>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center mt-2">
                  <div className="d-flex gap-2">
                    <div>
                      <input type="checkbox" />
                    </div>
                    <div>
                      <div style={{ fontSize: "14px", fontWeight: 600 }}>
                        Cafes & Coffee
                      </div>
                      <div style={{ fontSize: "12px", fontWeight: 400 }}>
                        Lifestyle
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "var(--primary-color)",
                    }}
                  >
                    Changes
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>

          <div>
            <div
              className="my-3"
              style={{ fontWeight: 600, color: "var(--primary-color)" }}
            >
              Selected payday
            </div>
            <Card style={{ borderRadius: " 10px" }}>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center mt-2">
                  <div className="d-flex gap-2">
                    <div>
                      <input type="checkbox" />
                    </div>
                    <div>
                      <div style={{ fontSize: "14px", fontWeight: 600 }}>
                        30 days salary
                      </div>
                      <div style={{ fontSize: "12px", fontWeight: 400 }}>
                        June 30
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "var(--primary-color)",
                    }}
                  >
                    Changes
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>

          <div className="text-center">
            <button
              className="w-75 mt-3"
              onClick={() => activeLink(7)}
              style={{
                backgroundColor: "var(--primary-color)",
                padding: "10px",
                color: "white",
                border: "none",
                borderRadius: "10px",
              }}
            >
              Confirm
            </button>
          </div>
        </>
      )}

      {active === 6 && (
        <>
          <div className="d-flex">
            <IoArrowBackCircleOutline
              color="rgba(92, 182, 249, 1)"
              cursor={"pointer"}
              size={28}
              onClick={() => activeLink(4)}
            />
            <div
              style={{
                margin: "auto",
                fontWeight: 600,
                fontSize: "16px",
                color: "rgba(55, 73, 87, 1)",
              }}
              className="text-center"
            >
              Add bills
            </div>
          </div>

          <Card style={{ borderRadius: "10px" }} className="mt-4">
            <div className="text-center">
              <Image
                style={{ marginTop: "-30px" }}
                width={"45px"}
                height={"45px"}
                src="/icons/Merchent 3.png"
                alt="..."
              />
              <div style={{ color: "var(--primary-color)", fontWeight: 600 }}>
                Electricity
              </div>
              <div
                style={{
                  fontSize: "12px",
                  fontWeight: 400,
                  color: "rgba(191, 191, 191, 1)",
                }}
              >
                Recommended: $29.49
              </div>
            </div>

            <div className="px-3">
              <FormField type={"text"} placeholder={"Enter budget"} />
            </div>
          </Card>

          <div>
            <div
              className="my-3"
              style={{ fontWeight: 600, color: "var(--primary-color)" }}
            >
              Select date
            </div>
            <InputGroup className="mb-3">
              <Form.Control
                className="form-field"
                style={{ borderRight: "none" }}
                placeholder="Select period"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
              <InputGroup.Text
                onClick={() => setOpenCalendar(false)}
                style={{ cursor: "pointer" }}
                id="basic-addon1"
                className="grp_input"
              >
                <CalendarSVG />
              </InputGroup.Text>
            </InputGroup>
          </div>

          <div>
            <div
              className="my-3"
              style={{ fontWeight: 600, color: "var(--primary-color)" }}
            >
              Selected Category
            </div>
            <Card style={{ borderRadius: " 10px" }}>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center mt-2">
                  <div className="d-flex gap-2">
                    <div>
                      <input type="checkbox" />
                    </div>
                    <div>
                      <div style={{ fontSize: "14px", fontWeight: 600 }}>
                        Cafes & Coffee
                      </div>
                      <div style={{ fontSize: "12px", fontWeight: 400 }}>
                        Lifestyle
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "var(--primary-color)",
                    }}
                  >
                    Changes
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>

          <div className="text-center">
            <button
              className="w-75 mt-3"
              onClick={() => hide(false)}
              style={{
                backgroundColor: "var(--primary-color)",
                padding: "10px",
                color: "white",
                border: "none",
                borderRadius: "10px",
              }}
            >
              Confirm
            </button>
          </div>
        </>
      )}

      {active === 7 && (
        <>
          <div className="d-flex">
            <IoArrowBackCircleOutline
              color="rgba(92, 182, 249, 1)"
              cursor={"pointer"}
              size={28}
              onClick={() => activeLink(5)}
            />
            <div
              style={{
                margin: "auto 180px",
                fontWeight: 600,
                fontSize: "18px",
                color: "rgba(55, 73, 87, 1)",
              }}
              className="text-center"
            >
              Bills
            </div>
          </div>

          <div
            className="payday-list"
            style={{
              color: "rgba(254, 254, 254, 1)",
              textAlign: "center",
              padding: "10px",
              borderRadius: "20px",
              marginTop: "10px",
            }}
          >
            <h2
              style={{
                fontWeight: 700,
              }}
            >
              $-
            </h2>
            <p
              style={{
                fontWeight: 700,
                padding: 0,
                margin: 0,
                fontSize: "12px",
                color: "rgba(255, 255, 255, 0.89)",
              }}
            >
              Total bills due
            </p>

            <button
              onClick={() => activeLink(2)}
              className="w-50 py-1 mt-2"
              style={{
                backgroundColor: "rgba(255, 255, 255, 1)",
                color: "var(--primary-color)",
                borderRadius: "20px",
                outline: "none",
                border: "none",
              }}
            >
              All Bills <IoIosArrowDown />
            </button>
          </div>

          <div className="mt-2 text-center">
            <div
              style={{
                color: "var(--primary-color)",
                fontSize: "14px",
                fontWeight: 600,
              }}
            >
              We didn’t find any bills
            </div>

            <div
              style={{
                cursor: "pointer",
                fontSize: "12px",
                color: "rgba(55, 73, 87, 1)",
              }}
            >
              Track recurring transactions and we’ll remind you before they’re
              next due
            </div>

            <div
              style={{
                cursor: "pointer",
                fontSize: "10px",
                color: "rgba(191, 191, 191, 1)",
              }}
            >
              E.g. Rent, utilities, subscriptions, insurance.
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

          <div className="text-center">
            <button
              className="w-75 mt-3"
              onClick={() => hide(false)}
              style={{
                backgroundColor: "var(--primary-color)",
                padding: "10px",
                color: "white",
                border: "none",
                borderRadius: "10px",
              }}
            >
              Add Bills
            </button>
          </div>
        </>
      )}

      <Calendar show={openCalendar} hide={setOpenCalendar} />
    </ModalWindow>
  );
};

export default UpcomingBillComponents;
