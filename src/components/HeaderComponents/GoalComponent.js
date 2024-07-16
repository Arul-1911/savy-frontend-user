import React from "react";
import ModalWindow from "../modals/ModalWindow";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { Card, Image, ProgressBar } from "react-bootstrap";
import { FiUpload } from "react-icons/fi";
import FormField from "../layout/FormField";
import { RxCrossCircled } from "react-icons/rx";

const GoalComponent = ({ show, hide, active, activeLink }) => {
  const goals = [
    {
      icons: "/images/Rectangle 116.png",
      text: "Cars",
      subText: "$589 Collected",
      money: "$5,000.00",
    },
    {
      icons: "/images/Rectangle 116.png",
      text: "Cars",
      subText: "$589 Collected",
      money: "$5,000.00",
    },
    {
      icons: "/images/Rectangle 116.png",
      text: "Cars",
      subText: "$589 Collected",
      money: "$5,000.00",
    },
  ];

  const savingFor = [
    "House Deposite",
    "Saving",
    "Car",
    "Investment",
    "Credite card",
    "Cash",
  ];

  const goalDetails = [
    {
      subText: "I'm saving for",
      text: "Car",
    },
    {
      subText: "I'd like to save",
      text: "$5000",
    },
    {
      subText: "Estimated date",
      text: "30/07/2024",
    },
  ];

  const selectBank = [
    {
      icon: "/icons/image 3.png",
      text: "Bankwest",
      price: "$7,441.00",
    },
    {
      icon: "/icons/image 3.png",
      text: "Bankwest",
      price: "$7,441.00",
    },
  ];

  return (
    <ModalWindow show={show} onHide={hide}>
      {active === 1 && (
        <div>
          <div className="d-flex">
            <IoArrowBackCircleOutline
              color="rgba(92, 182, 249, 1)"
              cursor={"pointer"}
              size={23}
              onClick={() => hide(false)}
            />
            <div
              style={{
                margin: "auto",
                fontWeight: 600,
                fontSize: "14px",
                color: "rgba(55, 73, 87, 1)",
              }}
              className="text-center"
            >
              Goals
            </div>
          </div>

          <div className="px-2">
            <p
              style={{
                color: "var(--primary-color)",
                fontWeight: 600,
                marginTop: "10px",
              }}
            >
              Goals
            </p>
            <Card style={{ borderRadius: "20px" }}>
              <Card.Body>
                {goals?.map((data, idx) => {
                  return (
                    <div
                      className="mt-2"
                      key={idx}
                      style={{
                        backgroundColor: "rgba(245, 247, 248, 1)",
                        padding: "8px",
                        borderRadius: "10px",
                      }}
                    >
                      <div className=" d-flex justify-content-between align-items-center">
                        <div className="d-flex gap-2 align-items-center">
                          <Image src={data?.icons} alt="..." />
                          <div>
                            <div
                              style={{
                                fontWeight: 600,
                                color: "rgba(55, 73, 87, 1)",
                                fontSize: "12px",
                              }}
                            >
                              {data?.text}
                            </div>
                            <div
                              style={{
                                fontWeight: 600,
                                color: "rgba(159, 175, 198, 1)",
                                fontSize: "12px",
                              }}
                            >
                              {data.subText}
                            </div>
                          </div>
                        </div>

                        <div
                          style={{
                            color: "var(--primary-color)",
                            fontSize: "12px",
                            fontWeight: 600,
                          }}
                        >
                          {data?.money}
                        </div>
                      </div>
                      <div className="mt-1">
                        <ProgressBar
                          now={40}
                          label={`${100}%`}
                          visuallyHidden
                        />
                      </div>
                    </div>
                  );
                })}
              </Card.Body>
            </Card>
          </div>

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
              Add Goals
            </button>
          </div>
        </div>
      )}

      {active === 2 && (
        <div>
          <div className="d-flex">
            <IoArrowBackCircleOutline
              color="rgba(92, 182, 249, 1)"
              cursor={"pointer"}
              size={23}
              onClick={() => activeLink(1)}
            />
            <div
              style={{
                margin: "auto",
                fontWeight: 600,
                fontSize: "14px",
                color: "rgba(55, 73, 87, 1)",
              }}
              className="text-center"
            >
              Goals
            </div>
          </div>

          <p
            style={{
              color: "var(--primary-color)",
              fontWeight: 600,
              marginTop: "10px",
            }}
          >
            Select Image
          </p>

          <div
            style={{
              border: "1px solid rgba(226, 242, 255, 1)",
              textAlign: "center",
              borderRadius: "10px",
            }}
          >
            <FiUpload className="icon-md" />
            <p
              style={{
                color: "rgba(55, 73, 87, 1)",
                fontWeight: 600,
                fontSize: "14px",
              }}
            >
              Upload media
            </p>
            <p
              className="mt-2 px-4"
              style={{
                color: "rgba(55, 73, 87, 0.7)",
                fontWeight: 400,
                fontSize: "12px",
              }}
            >
              Drag and drop your image file here or click to browse from your
              device
            </p>
            <button
              className="w-50 mb-2"
              style={{
                padding: "6px",
                border: "none",
                backgroundColor: "var(--primary-color)",
                color: "white",
                fontWeight: 600,
                borderRadius: "10px",
              }}
            >
              Select Image
            </button>
          </div>

          <div>
            <p
              style={{
                color: "var(--primary-color)",
                fontWeight: 600,
                marginTop: "10px",
              }}
            >
              I'm saving for
            </p>
            <FormField
              placeholder={"Enter Category"}
              type={"text"}
              // onChange={(e) => setEmail(e.target.value)}
              // value={email}
            />
          </div>

          <div
            style={{
              fontSize: "12px",
              fontWeight: 400,
              color: "rgba(55, 73, 87, 0.7)",
            }}
          >
            Quick start
          </div>
          <div className="d-flex justify-content-between flex-wrap">
            {savingFor?.map((data, idx) => {
              return (
                <div
                  className="px-2 mt-2"
                  key={idx}
                  style={{
                    padding: "6px",
                    border: "1px solid rgba(92, 182, 249, 1)",
                    borderRadius: "15px",
                    backgroundColor: "rgba(250, 250, 250, 1)",
                    color: "var(--primary-color)",
                    fontSize: "10px",
                  }}
                >
                  {data}
                </div>
              );
            })}
          </div>

          <div>
            <p
              style={{
                color: "var(--primary-color)",
                fontWeight: 600,
                marginTop: "10px",
              }}
            >
              I'd like to save
            </p>
            <FormField
              placeholder={"Enter Category"}
              type={"text"}
              // onChange={(e) => setEmail(e.target.value)}
              // value={email}
            />
          </div>

          <div>
            <p
              style={{
                color: "var(--primary-color)",
                fontWeight: 600,
                marginTop: "10px",
              }}
            >
              Estimated Date
            </p>
            <FormField
              placeholder={"Enter Category"}
              type={"text"}
              // onChange={(e) => setEmail(e.target.value)}
              // value={email}
            />
          </div>

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
              Next
            </button>
          </div>
        </div>
      )}

      {active === 3 && (
        <>
          <div className="d-flex">
            <div
              style={{
                margin: "auto",
                fontWeight: 600,
                fontSize: "14px",
                color: "rgba(55, 73, 87, 1)",
              }}
              className="text-center"
            >
              <img
                width={"30px"}
                height={"30px"}
                src="/icons/information.png"
                alt="..."
              />
            </div>

            <RxCrossCircled
              color="rgba(92, 182, 249, 1)"
              cursor={"pointer"}
              size={23}
              onClick={() => hide(false)}
            />
          </div>

          <p
            className="text-center"
            style={{
              color: "var(--primary-color)",
              fontWeight: 600,
              fontSize: "16px",
            }}
          >
            Please review your goal.
          </p>

          <div
            className="text-center"
            style={{
              color: "rgba(55, 73, 87, 1)",
              fontWeight: 400,
              fontSize: "12px",
            }}
          >
            $5,000.00 can’t be smaller than the account balance.
          </div>

          <div className="text-center">
            <button
              className="w-50 mt-3"
              onClick={() => activeLink(4)}
              style={{
                backgroundColor: "var(--primary-color)",
                padding: "10px",
                color: "white",
                border: "none",
                borderRadius: "10px",
              }}
            >
              Got it
            </button>
          </div>
        </>
      )}

      {active === 4 && (
        <>
          <div className="d-flex align-items-center justify-content-between">
            <IoArrowBackCircleOutline
              color="rgba(92, 182, 249, 1)"
              cursor={"pointer"}
              size={28}
              onClick={() => activeLink(3)}
            />
            <div
              style={{
                fontWeight: 600,
                fontSize: "16px",
                color: "rgba(55, 73, 87, 1)",
              }}
              className="text-center"
            >
              Goals
            </div>

            <div
              className="px-3 py-1"
              style={{
                fontWeight: 600,
                fontSize: "12px",
                color: "var(--primary-color)",
                border: "1px solid rgba(228, 228, 228, 1)",
                borderRadius: "20px",
              }}
            >
              Edit
            </div>
          </div>

          <p
            className="mt-3"
            style={{
              color: "var(--primary-color)",
              fontWeight: 600,
              fontSize: "16px",
            }}
          >
            Goal details
          </p>

          <div
            className="text-center"
            style={{
              color: "rgba(55, 73, 87, 1)",
              fontWeight: 400,
              fontSize: "12px",
            }}
          >
            <img
              style={{
                width: "100%",
              }}
              src="/images/car.png"
              alt="..."
            />
          </div>

          <div className="mt-2">
            {goalDetails?.map((data, idx) => {
              return (
                <div
                  className="px-2 mt-2"
                  style={{
                    borderRadius: "5px",
                    backgroundColor: "rgba(244, 243, 243, 1)",
                    padding: "6px",
                  }}
                  key={idx}
                >
                  <div
                    style={{
                      fontSize: "10px",
                      fontWeight: 400,
                      color: "rgba(55, 73, 87, 0.7)",
                    }}
                  >
                    {data?.subText}
                  </div>
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "rgba(0, 39, 91, 1)",
                    }}
                  >
                    {data?.text}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-2">
            <div
              style={{
                color: "var(--primary-color)",
                fontWeight: 600,
              }}
            >
              Select bank
            </div>
            <div
              style={{
                fontWeight: 400,
                color: "rgba(55, 73, 87, 0.7)",
                fontSize: "10px",
              }}
            >
              I’d like to use my account to track this goal
            </div>
            {selectBank?.map((data, idx) => {
              return (
                <div
                  className="px-2 mt-2 d-flex justify-content-between align-items-center"
                  style={{
                    borderRadius: "5px",
                    backgroundColor: "rgba(244, 243, 243, 1)",
                    padding: "6px",
                  }}
                  key={idx}
                >
                  <div className="d-flex align-items-center gap-2">
                    <img
                      width={"30px"}
                      height={"30px"}
                      src={data.icon}
                      alt="..."
                    />
                    <div
                      style={{
                        fontSize: "14px",
                        fontWeight: 600,
                        color: "rgba(0, 39, 91, 1)",
                      }}
                    >
                      {data?.text}
                    </div>
                  </div>
                  <div
                    style={{
                      fontWeight: 600,
                      fontSize: "14px",
                      color: "var(--primary-color)",
                    }}
                  >
                    {data?.price}
                  </div>
                </div>
              );
            })}
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
              Next
            </button>
          </div>
        </>
      )}
    </ModalWindow>
  );
};

export default GoalComponent;
