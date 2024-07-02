import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Form, Image, Row } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import LoginCard from "../../components/layout/LoginCard";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { RxCrossCircled } from "react-icons/rx";
import SearchField from "../../components/layout/SearchField";

export default function ChooseBank() {
  const navigate = useNavigate();

  const banks = [
    { name: "ANZ", img: "/banks/ANZ.png" },
    { name: "Swiss", img: "/banks/ING.png" },
    { name: "Bank of America", img: "/banks/Melbourne.png" },
    { name: "Bankwest", img: "/banks/Bankwest.png" },
    { name: "Westpac", img: "/banks/ING.png" },
    { name: "Bank of Melbourne", img: "/banks/Melbourne.png" },
  ];

  return (
    <LoginCard height={"500px"} width={"450px"} bankDetails={true}>
      <div className="d-flex align-items-center justify-content-between">
        <div>
          <IoArrowBackCircleOutline
            color="rgba(92, 182, 249, 1)"
            cursor={"pointer"}
            size={23}
            onClick={() => navigate("/user/financial-policy")}
          />
        </div>

        <div>
          <Image
            height={"35px"}
            width={"35px"}
            src="/logo/LoginLogo.png"
            alt="..."
          />
        </div>

        <div>
          <RxCrossCircled
            color="rgba(92, 182, 249, 1)"
            cursor={"pointer"}
            size={23}
            onClick={() => navigate("/")}
          />
        </div>
      </div>

      <div className="d-flex align-items-center flex-column mt-3">
        <Image
          height={"35px"}
          width={"35px"}
          src="/images/BankLogo.png"
          alt="..."
        />
        <div
          style={{
            color: "var(--primary-color)",
            fontWeight: 800,
            fontSize: "16px",
          }}
        >
          Choose your bank
        </div>
      </div>

      <div className="px-4 mt-2">
        <SearchField />
      </div>
      <div
        className="mt-2 px-4"
        style={{
          fontSize: "12px",
          fontWeight: 700,
          color: "rgba(0, 74, 173, 1)",
        }}
      >
        Select from the list
      </div>

      <div className="bank-list px-4">
        <ul className="p-0">
          {banks?.map((bank) => {
            return (
              <div className="d-flex align-items-center gap-2 banks-name">
                <img
                  style={{ width: "30px", height: "30px" }}
                  src={bank?.img}
                  alt="..."
                />
                <li>{bank?.name}</li>
              </div>
            );
          })}
        </ul>
      </div>

      <Row className="mt-3">
        <Col>
          <Button
            className="float-sm-end w-100 "
            style={{
              background: "var(--primary-color)",
              fontWeight: 700,
              fontSize: "12px",
              padding: "10px",
            }}
            onClick={() => navigate("/user/internet-banking")}
          >
            Select
          </Button>
        </Col>
      </Row>
      <ToastContainer />
    </LoginCard>
  );
}
