import React, { useState } from "react";
import ModalWindow from "../../components/modals/ModalWindow";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { Filter2SVG } from "../../components/svg/Filter2SVG";
import { Card, Form, Image, InputGroup, ProgressBar } from "react-bootstrap";
import { FaRegCheckCircle } from "react-icons/fa";
import { FilterSVG } from "../../components/svg/FilterSVG";
import { CalendarSVG } from "../../components/svg/CalendarSVG";
import FormField from "../../components/layout/FormField";

const BudgetComponents = ({ show, hide, active, activeLink }) => {
  //   const [selectActivePeriod, setSelectActivePeriod] = useState(1);

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
              Payday
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
              15 days
            </h2>
            <p
              style={{
                fontWeight: 700,
                padding: 0,
                margin: 0,
                fontSize: "12px",
              }}
            >
              left for this week budget
            </p>
            <p className="payday-list-amount">
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

            <div style={{ cursor: "pointer" }} onClick={() => activeLink(4)}>
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

          <div className="text-center">
            <button
              className="w-75 mt-3"
              onClick={() => activeLink(2)}
              style={{
                backgroundColor: "var(--primary-color)",
                padding: "10px",
                color: "white",
                border: "none",
                borderRadius: "10px",
              }}
            >
              Edit
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
                fontSize: "16px",
                color: "rgba(55, 73, 87, 1)",
              }}
              className="text-center"
            >
              Select a Category
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
                      <div>
                        <div style={{ fontSize: "14px", fontWeight: 600 }}>
                          {data?.text}
                        </div>
                        <div style={{ fontSize: "12px", fontWeight: 400 }}>
                          {data?.subText}
                        </div>
                      </div>
                      <div>
                        <input type="checkbox" />
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
              Popular Categories
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
                      <div>
                        <input type="checkbox" />
                      </div>
                    </div>
                  );
                })}
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
                Continue
              </button>
            </div>
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
              Budget Setup
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
              Selected Payday
            </div>

            <div style={{ fontSize: "12px", fontWeight: 400 }}>
              Select your payday cycle for to Avoid confusion
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
                          <input type="checkbox" />
                        </div>
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
                onClick={() => activeLink(4)}
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

      {active === 4 && (
        <>
          <div className="d-flex">
            <IoArrowBackCircleOutline
              color="rgba(92, 182, 249, 1)"
              cursor={"pointer"}
              size={28}
              onClick={() => activeLink(3)}
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
              Budget Setup
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
                Cafes & Coffee
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
                //   onClick={() => activeLink(4)}
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
              Is this a bill ?
            </div>
            <Card style={{ borderRadius: " 10px" }}>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center mt-2">
                  <div>
                    <div style={{ fontSize: "14px", fontWeight: 600 }}>
                      Bills
                    </div>
                    <div style={{ fontSize: "12px", fontWeight: 400 }}>
                      Shall we consider these as bills?
                    </div>
                  </div>

                  <div>
                    <Form>
                      <Form.Check type="switch" id="custom-switch" />
                    </Form>
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
              Create
            </button>
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
              onClick={() => activeLink(3)}
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
              Budget Setup
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
                Cafes & Coffee
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
              Is this a bill ?
            </div>
            <Card style={{ borderRadius: " 10px" }}>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center mt-2">
                  <div>
                    <div style={{ fontSize: "14px", fontWeight: 600 }}>
                      Bills
                    </div>
                    <div style={{ fontSize: "12px", fontWeight: 400 }}>
                      Shall we consider these as bills?
                    </div>
                  </div>

                  <div>
                    <Form>
                      <Form.Check type="switch" id="custom-switch" />
                    </Form>
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
              onClick={() => activeLink(6)}
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
              onClick={() => activeLink(5)}
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
              Budget Setup
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
                Cafes & Coffee
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
              <FormField
                type={"text"}
                value={"$500"}
                placeholder={"Enter budget"}
              />
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

      {active === 7 && (
        <>
          <div className="d-flex align-items-center justify-content-between">
            <IoArrowBackCircleOutline
              color="rgba(92, 182, 249, 1)"
              cursor={"pointer"}
              size={28}
              onClick={() => activeLink(6)}
            />
            <div
              style={{
                fontWeight: 600,
                fontSize: "16px",
                color: "rgba(55, 73, 87, 1)",
              }}
              className="text-center"
            >
              Budget
            </div>

            <button
              className="px-3 py-1"
              onClick={() => activeLink(6)}
              style={{
                border: "1px solid rgba(226, 242, 255, 1)",
                backgroundColor: "transparent",
                fontWeight: 600,
                borderRadius: "20px",
                color: "var(--primary-color)",
              }}
            >
              Edit
            </button>
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
                Cafes & Coffee
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

            <div className="d-flex justify-content-between px-3 mb-2">
              <div>
                <div
                  style={{ fontSize: "10px", color: "rgba(55, 73, 87, 0.7)" }}
                >
                  Last Week
                </div>
                <div
                  className="text-center"
                  style={{ fontSize: "18px", color: "rgba(55, 73, 87, 1)" }}
                >
                  $0.00
                </div>
              </div>

              <div>
                <div
                  style={{ fontSize: "10px", color: "rgba(55, 73, 87, 0.7)" }}
                >
                  Average (last 6 week)
                </div>
                <div
                  className="text-center"
                  style={{ fontSize: "18px", color: "rgba(55, 73, 87, 1)" }}
                >
                  $0.00
                </div>
              </div>
            </div>

            <div className="px-3">
              <FormField
                type={"text"}
                value={"$500"}
                placeholder={"Enter budget"}
              />
            </div>
          </Card>

          <div>
            <div
              className="my-3"
              style={{ fontWeight: 600, color: "var(--primary-color)" }}
            >
              View spending history
            </div>
            <Card style={{ borderRadius: " 10px" }}>
              <Card.Body>
                <div
                  style={{
                    color: "var(--primary-color)",
                    fontWeight: 600,
                    fontSize: "14px",
                  }}
                >
                  Mon 11 Mar 2024{" "}
                </div>

                <div
                  style={{
                    backgroundColor: "rgba(245, 247, 248, 1)",
                    padding: "10px",
                  }}
                  className="d-flex justify-content-between align-items-center mt-2"
                >
                  <div className="d-flex gap-2 justify-content-between align-items-center">
                    <Image
                      width={"30px"}
                      height={"30px"}
                      src="/icons/Merchent 3.png"
                      alt="..."
                    />
                    <div>
                      <div
                        style={{
                          fontSize: "14px",
                          color: "rgba(55, 73, 87, 1)",
                        }}
                      >
                        A.J Patel & P. A Patel
                      </div>
                      <div
                        style={{
                          fontSize: "12px",
                          color: "rgba(55, 73, 87, 0.8)",
                        }}
                      >
                        Hotel and Restaurant
                      </div>
                    </div>
                  </div>

                  <div>
                    <div
                      style={{
                        fontSize: "14px",
                        color: "var(--primary-color)",
                        fontWeight: 600,
                      }}
                    >
                      $30.00
                    </div>
                    <div
                      style={{
                        fontSize: "12px",
                        color: "rgba(55, 73, 87, 0.8)",
                      }}
                    >
                      Lifestyle
                    </div>
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
    </ModalWindow>
  );
};

export default BudgetComponents;
