import React, { useState } from "react";
import ModalWindow from "../modals/ModalWindow";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import {
  Accordion,
  Card,
  Col,
  Form,
  Image,
  InputGroup,
  ProgressBar,
  Row,
} from "react-bootstrap";
import FormField from "../layout/FormField";
import { CalendarSVG } from "../svg/CalendarSVG";
import { FilterSVG } from "../svg/FilterSVG";
import { Filter2SVG } from "../svg/Filter2SVG";
import { FaRegCheckCircle } from "react-icons/fa";
import { RxCrossCircled } from "react-icons/rx";
import { FaRegCircleCheck } from "react-icons/fa6";
import SearchField from "../layout/SearchField";
import { Link } from "react-router-dom";

const BucketCategory = ({ show, hide, active, activeLink }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    hide(false);
  };

  const accordionItems = [
    {
      header: "Livings",
      body: [{ label: "Sample" }, { label: "Sample2" }],
    },
    {
      header: "Lifestyle",
      body: [{ label: "Sample" }, { label: "Sample2" }],
    },
    {
      header: "Income",
      body: [{ label: "Sample" }, { label: "Sample2" }],
    },
    {
      header: "Savings",
      body: [{ label: "Sample" }, { label: "Sample2" }],
    },
  ];

  return (
    <>
      <ModalWindow show={show} onHide={hide}>
        {active === 1 && (
          <>
            <div className="d-flex justify-content-between">
              <IoArrowBackCircleOutline
                color="rgba(92, 182, 249, 1)"
                cursor={"pointer"}
                size={28}
                onClick={() => hide(false)}
              />
              <h6 style={{ color: "rgba(0, 74, 173, 1)" }}>
                Buckets & Categories
              </h6>
              <RxCrossCircled
                color="rgba(92, 182, 249, 1)"
                cursor={"pointer"}
                size={23}
                onClick={() => hide(false)}
              />
            </div>

            <div className="px-4 mt-3 main-offcanvas-body">
              <div className="mb-2">
                <SearchField />
              </div>

              <Accordion alwaysOpen className="border-0 ">
                {accordionItems?.map((item, index) => (
                  <Accordion.Item eventKey={index} className="border-0">
                    <Accordion.Header
                      className="border-0"
                      style={{ backgroundColor: "#E2F2FF" }}
                    >
                      <span style={{ color: "#004AAD", fontWeight: "600" }}>
                        {item?.header}
                      </span>
                    </Accordion.Header>
                    <Accordion.Body className=" border-0 py-0">
                      {item?.body?.map((link, i) => (
                        <p
                          className="my-0 py-1"
                          style={{
                            borderBottom: "1px solid #E2F2FF",
                            fontWeight: "500",
                          }}
                        >
                          <Link className="" style={{ color: "#374957" }}>
                            {link?.label}
                          </Link>
                        </p>
                      ))}
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            </div>
          </>
        )}
      </ModalWindow>
    </>
  );
};

export default BucketCategory;
