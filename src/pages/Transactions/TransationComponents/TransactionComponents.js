import React, { useState } from "react";
import ModalWindow from "../../../components/modals/ModalWindow";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { Card, Col, Form, Image, InputGroup, Row } from "react-bootstrap";
import { GiPalmTree } from "react-icons/gi";
import { FaAngleRight } from "react-icons/fa6";
import { MdOutlineCalendarMonth, MdAddPhotoAlternate } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import { MdTrackChanges } from "react-icons/md";
import { IoPricetagsOutline } from "react-icons/io5";
import FormField from "../../../components/layout/FormField";
import { GrCircleInformation } from "react-icons/gr";
import SearchField from "../../../components/layout/SearchField";

const TransactionComponents = ({ show, hide, active, activeLink }) => {
  const [tagRes, setTagRes] = useState("");
  const tags = [
    "Restaurants",
    "Restaurants",
    "Restaurants",
    "Restaurants",
    "Restaurants",
    "Restaurants",
    "Restaurants",
    "Restaurants",
    "Restaurants",
  ];

  const handleTagChange = (tag) => {
    setTagRes(tag);
    activeLink(1);
  };

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
              2 Mar 2024
            </div>
          </div>

          <Card style={{ borderRadius: "10px" }} className="mt-4">
            <Card.Body>
              <div className="text-center">
                <div style={{ marginTop: "-45px" }}>
                  <Image src="/icons/Rectangle 116.png" alt="..." />
                </div>
                <h3 style={{ fontWeight: 700, color: "var(--primary-color)" }}>
                  -$38.00
                </h3>
                <p
                  style={{
                    color: "#374957",
                    fontSize: "12px",
                    fontWeight: 600,
                  }}
                >
                  Mojos In The Marketplace
                </p>
                <hr />
                <p
                  style={{
                    color: "#5CB6F9",
                    fontSize: "12px",
                    fontWeight: 400,
                  }}
                >
                  SQ*MOJOS IN THE MARKEPLACE Bridge FFTPOS Purchase * Receipt
                  580495 Date 02 Mar 2024 Time 9:50 Card 4444********2616
                </p>
                <hr />

                <div>
                  <div
                    style={{
                      color: "#374957",
                      fontSize: "12px",
                      fontWeight: 600,
                    }}
                  >
                    ING Australia Orange Everyday
                  </div>
                  <div
                    style={{
                      color: "#374957",
                      fontSize: "10px",
                      fontWeight: 400,
                    }}
                  >
                    BSB: 923100 | Acc: X XXX 0853
                  </div>
                  <p
                    className="mt-2"
                    style={{
                      color: "#374957",
                      fontSize: "10px",
                      fontWeight: 400,
                    }}
                  >
                    Receipt Number:{" "}
                    <span
                      style={{
                        color: "#374957",
                        fontSize: "12px",
                        fontWeight: 600,
                      }}
                    >
                      580495
                    </span>
                  </p>
                </div>
              </div>
            </Card.Body>
          </Card>

          <div className="mt-3">
            <div
              style={{
                fontSize: "16px",
                color: "var(--primary-color)",
                fontWeight: 600,
              }}
            >
              Manage
            </div>

            <div className="px-4 d-flex justify-content-between align-items-center my-2">
              <div className="d-flex align-items-center gap-2">
                <div>
                  <GiPalmTree color="#004AAD" />{" "}
                </div>
                <div style={{ fontWeight: 600, fontSize: "12px" }}>
                  <span style={{ color: "rgba(92, 182, 249, 1)" }}>
                    Lifestyle:
                  </span>{" "}
                  Cafes & Coffee
                </div>
              </div>
              <div>
                <FaAngleRight />
              </div>
            </div>

            <div className="px-3 d-flex justify-content-between align-items-center my-2">
              <div className="d-flex align-items-center gap-2">
                <div>
                  <IoPricetagsOutline color="#004AAD" />{" "}
                </div>
                <div style={{ fontWeight: 600, fontSize: "12px" }}>
                  Tag Transaction
                </div>
              </div>
              <div className="d-flex align-items-center gap-2">
                <div
                  className="p-1"
                  style={{
                    color: "var(--primary-color)",
                    fontSize: "12px",
                    borderRadius: "10px",
                    backgroundColor: "#004AAD14",
                  }}
                >
                  {tagRes}
                </div>
                <button
                  onClick={() => activeLink(3)}
                  style={{
                    backgroundColor: "white",
                    border: "1px solid var(--primary-color)",
                    color: "var(--primary-color)",
                    borderRadius: "5px",
                  }}
                >
                  +
                </button>
              </div>
            </div>

            <div className="px-3 d-flex justify-content-between align-items-center my-2">
              <div className="d-flex align-items-center gap-2">
                <div>
                  <MdTrackChanges color="#004AAD" />
                </div>
                <div style={{ fontWeight: 600, fontSize: "12px" }}>
                  Exclude from tracking
                </div>
              </div>
              <div>
                <Form.Check type="switch" />
              </div>
            </div>

            <div className="px-3 d-flex justify-content-between align-items-center my-2">
              <div className="d-flex align-items-center gap-2">
                <div>
                  <AiOutlineEdit color="#004AAD" />{" "}
                </div>
                <div style={{ fontWeight: 600, fontSize: "12px" }}>
                  Add a note
                </div>
              </div>
              <div>
                <FaAngleRight />
              </div>
            </div>

            <div className="px-3 d-flex justify-content-between align-items-center my-2">
              <div className="d-flex align-items-center gap-2">
                <div>
                  <MdOutlineCalendarMonth color="#004AAD" />{" "}
                </div>
                <div style={{ fontWeight: 600, fontSize: "12px" }}>
                  Is this a bill?
                </div>
              </div>
              <div>
                <button
                  className="px-3 py-1"
                  style={{
                    borderRadius: "20px",
                    backgroundColor: "white",
                    border: "1px solid #5CB6F9",
                    color: "#5CB6F9",
                    fontSize: "12px",
                  }}
                >
                  + Add to bill
                </button>
              </div>
            </div>

            <Row className="gap-3 px-4">
              <Col
                style={{
                  border: "1px solid #E2F2FF",
                  padding: "10px",
                  borderRadius: "10px",
                }}
              >
                <h4
                  className="text-center"
                  style={{ fontWeight: 700, color: "var(--primary-color)" }}
                >
                  -$350.00
                </h4>
                <div
                  style={{
                    fontSize: "10px",
                    color: "rgba(55, 73, 87, 0.7)",
                    textAlign: "center",
                    fontWeight: 500,
                  }}
                >
                  Total spend this year
                </div>
                <hr />

                <div className="d-flex justify-content-between">
                  <div
                    style={{
                      fontSize: "10px",
                      fontWeight: 600,
                      color: "#374957",
                      textAlign: "center",
                    }}
                  >
                    How many times
                  </div>
                  <div
                    style={{
                      fontSize: "10px",
                      fontWeight: 600,
                    }}
                  >
                    26
                  </div>
                </div>

                <div className="d-flex justify-content-between mt-2">
                  <div
                    style={{
                      fontSize: "10px",
                      fontWeight: 600,
                      color: "#374957",
                      textAlign: "center",
                    }}
                  >
                    Average cost
                  </div>
                  <div
                    style={{
                      fontSize: "10px",
                      fontWeight: 600,
                    }}
                  >
                    -$36
                  </div>
                </div>

                <div
                  className="text-center mt-2"
                  style={{
                    fontSize: "12px",
                    color: "rgba(92, 182, 249, 1)",
                    fontWeight: "600",
                  }}
                >
                  View History
                </div>
              </Col>

              <Col
                className="d-flex justify-content-center align-items-center flex-column"
                onClick={() => activeLink(2)}
                style={{
                  border: "1px solid #E2F2FF",
                  padding: "10px",
                  borderRadius: "10px",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    color: "rgba(55, 73, 87, 1)",
                    fontSize: "12px",
                    fontWeight: 400,
                  }}
                >
                  Something doesn't look right?
                </div>

                <div
                  className="mt-2"
                  style={{
                    fontSize: "12px",
                    color: "rgba(92, 182, 249, 1)",
                    fontWeight: 600,
                  }}
                >
                  Improve Transaction
                </div>
              </Col>
            </Row>
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
              Improve Transaction
            </div>
          </div>

          <Form>
            <Card style={{ borderRadius: "10px" }} className="mt-2">
              <Card.Body>
                <div className="d-flex align-items-center gap-2">
                  <div style={{ backgroundColor: "" }}>
                    <AiOutlineEdit size={23} color="#004AAD" />
                  </div>
                  <div
                    style={{
                      color: "#374957",
                      fontWeight: 600,
                      fontSize: "14px",
                    }}
                  >
                    What’s the correct name?
                  </div>
                </div>
                <div
                  className="mt-2"
                  style={{
                    color: "#374957",
                    fontWeight: 400,
                    fontSize: "12px",
                  }}
                >
                  Please be as specific as you can. The full name of the
                  merchant or company is preferred.
                </div>

                <div className="mt-2">
                  <FormField
                    type={"text"}
                    placeholder={"Name of the Merchant or Company "}
                  />
                </div>
                <hr />

                <div className="d-flex align-items-center gap-2">
                  <div style={{ backgroundColor: "" }}>
                    <MdAddPhotoAlternate size={23} color="#004AAD" />
                  </div>
                  <div
                    style={{
                      color: "#374957",
                      fontWeight: 600,
                      fontSize: "14px",
                    }}
                  >
                    Where can we find the correct logo?
                  </div>
                </div>
                <div
                  className="mt-2"
                  style={{
                    color: "#374957",
                    fontWeight: 400,
                    fontSize: "12px",
                  }}
                >
                  Please be as specific as you can. The full name of the
                  merchant or company is preferred.
                </div>

                <div className="mt-2">
                  <FormField type={"text"} placeholder={"URL or Website "} />
                </div>
                <hr />

                <div className="d-flex align-items-center gap-2">
                  <div style={{ backgroundColor: "" }}>
                    <GrCircleInformation size={23} color="#004AAD" />
                  </div>
                  <div
                    style={{
                      color: "#374957",
                      fontWeight: 600,
                      fontSize: "14px",
                    }}
                  >
                    Something else doesn't look right?
                  </div>
                </div>
                <div
                  className="mt-2"
                  style={{
                    color: "#374957",
                    fontWeight: 400,
                    fontSize: "12px",
                  }}
                >
                  Please be as specific as you can. The full name of the
                  merchant or company is preferred.
                </div>

                <div className="mt-2">
                  <FormField type={"text"} placeholder={"URL or Website "} />
                </div>
                <hr />
              </Card.Body>
            </Card>

            <div className="d-flex justify-content-center mt-2">
              <button
                className="w-75"
                style={{
                  backgroundColor: "white",
                  boxShadow: "0px 1px 3px 0px #0000001A",
                  padding: "10px",
                  borderRadius: "10px",
                  border: "none",
                  outline: "none",
                  color: "var(--primary-color)",
                }}
              >
                Send Feedback
              </button>
            </div>
          </Form>
        </>
      )}

      {active === 3 && (
        <>
          <div className="d-flex justify-content-between align-items-center">
            <IoArrowBackCircleOutline
              color="rgba(92, 182, 249, 1)"
              cursor={"pointer"}
              size={28}
              onClick={() => activeLink(1)}
            />
            <div
              style={{
                fontWeight: 600,
                fontSize: "16px",
                color: "rgba(55, 73, 87, 1)",
              }}
              className="text-center"
            >
              Tags transaction
            </div>

            <button
              onClick={() => activeLink(4)}
              className="px-3 py-1"
              style={{
                backgroundColor: "white",
                color: "var(--primary-color)",
                border: "1px solid #D2EBFD",
                borderRadius: "18px",
                fontSize: "12px",
                fontWeight: 600,
              }}
            >
              Create
            </button>
          </div>

          <div className="mt-3">
            <div className="px-2">
              <SearchField />
            </div>

            <div
              className="mt-3"
              style={{
                fontSize: "18px",
                color: "var(--primary-color)",
                fontWeight: 600,
              }}
            >
              Recent tags
            </div>
            <Card className="mt-2" style={{ borderRadius: "10px" }}>
              <Card.Body>
                {tags?.map((tag, idx) => {
                  return (
                    <div
                      onClick={() => handleTagChange(tag)}
                      className="mb-2"
                      style={{
                        fontWeight: 600,
                        cursor: "pointer",
                        fontSize: "12px",
                        color: "#374957",
                      }}
                      key={idx}
                    >
                      {tag}
                    </div>
                  );
                })}
              </Card.Body>
            </Card>
          </div>
        </>
      )}

      {active === 4 && (
        <>
          <div className="d-flex align-items-center">
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
                fontSize: "18px",
                color: "rgba(55, 73, 87, 1)",
              }}
              className="text-center"
            >
              Create tag
            </div>
          </div>

          <Form className="mt-3">
            <Form.Label
              style={{ color: "var(--primary-color)", fontWeight: 600 }}
            >
              Name
            </Form.Label>
            <FormField type={"text"} placeholder={"Enter name"} />

            <Form.Label
              style={{ color: "var(--primary-color)", fontWeight: 600 }}
            >
              Category name
            </Form.Label>
            <FormField type={"text"} placeholder={"Enter name"} />

            <div className="d-flex justify-content-center mt-2">
              <button
                onClick={() => hide(false)}
                className="w-75"
                style={{
                  backgroundColor: "var(--primary-color)",
                  boxShadow: "0px 1px 3px 0px #0000001A",
                  padding: "10px",
                  borderRadius: "10px",
                  border: "none",
                  outline: "none",
                  color: "white",
                }}
              >
                Create
              </button>
            </div>
          </Form>
        </>
      )}
    </ModalWindow>
  );
};

export default TransactionComponents;
