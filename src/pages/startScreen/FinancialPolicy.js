import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Form, Image, Row } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import LoginCard from "../../components/layout/LoginCard";
import {
  IoArrowBackCircleOutline,
  IoInformationCircleOutline,
} from "react-icons/io5";
import ModalTemplate from "../../components/modals/ModalTemplate";
import { getError } from "../../utils/error";
import { RxCrossCircled } from "react-icons/rx";

export default function FinancialPolicy({
  goBack,
  containerDiv,
  infoNext,
  next,
  bankDetails,
}) {
  const navigate = useNavigate();
  const [showSecure, setSecureModal] = useState(false);
  const [showSupportParties, setSupportPartiesModal] = useState(false);
  const [showGoal, setGoalModal] = useState(false);

  const handleSecureShowCancelModal = () => setSecureModal(true);
  const handleSecureCloseCancelModal = () => setSecureModal(false);

  const handleSupportParties = () => setSupportPartiesModal(true);
  const handleCloseSupportParties = () => setSupportPartiesModal(false);

  const handleGoal = () => setGoalModal(true);
  const handleCloseGoal = () => setGoalModal(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      next ? next() : navigate("/user/choose-bank");
    } catch (error) {
      getError(error);
    }
  };

  const handleCancel = () => {
    if (infoNext) {
      infoNext();
    } else {
      navigate("/");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      localStorage.removeItem("bankToken");
    }
  };

  return (
    <LoginCard
      height={"500px"}
      width={"450px"}
      bankDetails={true}
      containerDiv={containerDiv}
    >
      {!containerDiv ? (
        <div className="d-flex align-items-center flex-column">
          <Image
            height={"50px"}
            width={"50px"}
            src="/logo/LoginLogo.png"
            alt="..."
          />
          <div
            style={{
              color: "var(--primary-color)",
              fontWeight: 800,
              fontSize: "16px",
            }}
          >
            Share your financial data
          </div>
          <div
            className="mt-2"
            style={{
              color: "rgba(55, 73, 87, 1)",
              fontWeight: 600,
              fontSize: "10px",
            }}
          >
            We need to connect to your bank to collect some information about
            your finances
          </div>
        </div>
      ) : (
        <div className="d-flex align-items-center justify-content-between mb-5">
          <div>
            <IoArrowBackCircleOutline
              color="rgba(92, 182, 249, 1)"
              cursor={"pointer"}
              size={23}
              onClick={() =>
                goBack ? goBack() : navigate("/user/connect-bank")
              }
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
              onClick={() => (goBack ? goBack() : navigate("/"))}
            />
          </div>
        </div>
      )}

      <div className="mt-2 ">
        <div className="d-flex align-items-center justify-content-between">
          <div
            className="px-4"
            style={{
              fontSize: "14px",
              fontWeight: 700,
              color: "rgba(0, 74, 173, 1)",
            }}
          >
            Data we need to collect
          </div>
          <div className="px-4">
            <IoInformationCircleOutline
              color="rgba(0, 74, 173, 1)"
              cursor={"pointer"}
              onClick={handleGoal}
            />
          </div>
        </div>
        <ul
          style={{
            fontSize: "12px",
            fontWeight: 400,
            color: "rgba(55, 73, 87, 1)",
          }}
        >
          <li>Your Details</li>
          <li>Account name, type and balance</li>
          <li>Account numbers and features</li>
          <li>Transaction details</li>
        </ul>
      </div>

      <div className="d-flex align-items-center justify-content-between px-4">
        <div
          style={{
            fontSize: "14px",
            fontWeight: 700,
            color: "rgba(0, 74, 173, 1)",
          }}
        >
          Your Data is Secure
        </div>
        <div>
          <IoInformationCircleOutline
            color="rgba(0, 74, 173, 1)"
            cursor={"pointer"}
            onClick={handleSecureShowCancelModal}
          />
        </div>
      </div>

      <div className="d-flex align-items-center justify-content-between mt-2 px-4">
        <div
          style={{
            fontSize: "14px",
            fontWeight: 700,
            color: "rgba(0, 74, 173, 1)",
          }}
        >
          Supporting parties
        </div>
        <div>
          <IoInformationCircleOutline
            color="rgba(0, 74, 173, 1)"
            cursor={"pointer"}
            onClick={handleSupportParties}
          />
        </div>
      </div>

      <div
        className="d-flex align-items-center justify-content-center gap-1 mt-2 py-2"
        style={{
          backgroundColor: "rgba(226, 242, 255, 1)",
          borderRadius: "5px",
        }}
      >
        <div>
          <Image
            height={"25px"}
            width={"25px"}
            src="/images/PFM.png"
            alt="..."
          />
        </div>
        <div
          style={{
            fontSize: "10px",
            fontWeight: 600,
            color: "rgba(0, 74, 173, 1)",
          }}
        >
          PFM Pty Ltd <br />
          Accredited Data Recipient: 003932
        </div>
      </div>

      <p
        className="px-5 text-center mt-3"
        style={{
          fontSize: "10px",
          fontWeight: 400,
          color: "rgba(55, 73, 87, 1)",
        }}
      >
        PFM is an accredited Consumer Data Right Recipient that is bound by
        rules set by the Australian Government.
      </p>

      <Row className="mt-2 px-4">
        <Col>
          <Button
            className="float-sm-end w-100 "
            style={{
              background: "var(--primary-color)",
              fontWeight: 700,
              fontSize: "12px",
              padding: "10px",
            }}
            onClick={handleSubmit}
          >
            Continue
          </Button>
        </Col>
      </Row>

      <Row>
        <Col>
          <Button
            className="float-sm-end w-100 "
            style={{
              background: "white",
              color: "var(--primary-color)",
              border: "none",
              fontWeight: 700,
              fontSize: "12px",
            }}
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </Col>
      </Row>

      <ModalTemplate
        show={showGoal}
        onHide={handleCloseGoal}
        onDiscard={handleCloseGoal}
        onConfirm={handleCloseGoal}
      >
        <div className="text-center">
          <Image src="/icons/information.png" alt="..." />
          <div
            style={{
              color: "rgba(55, 73, 87, 1)",
              fontSize: "14px",
              fontWeight: 600,
            }}
          >
            Please review your goal.
          </div>
        </div>
        <div className="mt-2 mb-2 bank-list">
          <div
            style={{
              color: "rgba(0, 74, 173, 1)",
              fontSize: "14px",
              fontWeight: 600,
            }}
          >
            Name, occupation, contact details
          </div>
          <div
            style={{
              color: "rgba(55, 73, 87, 1)",
              fontSize: "12px",
              fontWeight: 400,
            }}
          >
            This allows access to personally identifiable information.
            Specifically your name, occupation, address(es) and contact details.
            <ul>
              <li>Name</li>
              <li>Email address</li>
              <li>Phone</li>
              <li>Residential address</li>
            </ul>
          </div>

          <div
            style={{
              color: "rgba(0, 74, 173, 1)",
              fontSize: "14px",
              fontWeight: 600,
            }}
          >
            Account name, type and balance
          </div>
          <div
            style={{
              color: "rgba(55, 73, 87, 1)",
              fontSize: "12px",
              fontWeight: 400,
            }}
          >
            This allows access to a list of your accounts and their current
            balance.
            <ul>
              <li>Name of account</li>
              <li>Account number</li>
              <li>Type of account</li>
              <li>Account balance</li>
            </ul>
          </div>
        </div>
      </ModalTemplate>

      <ModalTemplate
        show={showSecure}
        onHide={handleSecureCloseCancelModal}
        onDiscard={handleSecureCloseCancelModal}
        onConfirm={handleSecureCloseCancelModal}
      >
        <div className="text-center">
          <div
            style={{
              color: "rgba(55, 73, 87, 1)",
              fontSize: "14px",
              fontWeight: 600,
            }}
          >
            Deleting and managing data
          </div>

          <div
            className="mt-2"
            style={{
              color: "rgba(55, 73, 87, 1)",
              fontSize: "12px",
              fontWeight: 400,
            }}
          >
            When your data sharing period ends we will de-identify it so there
            is no record of you left.
          </div>

          <div className="d-flex justify-content-between mt-2">
            <div
              style={{
                color: "rgba(55, 73, 87, 1)",
                fontSize: "12px",
                fontWeight: 600,
              }}
            >
              Delete my data instead
            </div>
            <Form>
              <Form.Check type="switch" id="custom-switch" />
            </Form>
          </div>

          <div
            className="mb-3"
            style={{
              color: "rgba(0, 74, 173, 1)",
              fontSize: "12px",
              fontWeight: 400,
            }}
          >
            Consumer Data Right Policy
          </div>
        </div>
      </ModalTemplate>

      <ModalTemplate
        show={showSupportParties}
        onHide={handleCloseSupportParties}
        onDiscard={handleCloseSupportParties}
        onConfirm={handleCloseSupportParties}
      >
        <div className="text-center">
          <div
            style={{
              color: "rgba(55, 73, 87, 1)",
              fontSize: "14px",
              fontWeight: 600,
            }}
          >
            Basiq Pty Ltd
          </div>
          <div
            className="mt-2"
            style={{
              color: "rgba(55, 73, 87, 1)",
              fontSize: "12px",
              fontWeight: 400,
            }}
          >
            Accreditation ID: ADRBNK000208
          </div>
          <div
            className="mt-2"
            style={{
              color: "rgba(55, 73, 87, 1)",
              fontSize: "12px",
              fontWeight: 400,
            }}
          >
            Supporting parties help operate this service. They can access the
            data you have agreed to share with us.
          </div>
        </div>
      </ModalTemplate>

      <ToastContainer />
    </LoginCard>
  );
}
