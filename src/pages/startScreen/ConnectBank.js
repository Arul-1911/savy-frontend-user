import React, { useState } from "react"; // Import useState
import { useNavigate } from "react-router-dom";
import { Button, Col, Image, Row, Spinner } from "react-bootstrap"; // Import Spinner
import { ToastContainer, toast } from "react-toastify";
import LoginCard from "../../components/layout/LoginCard";
import { getError } from "../../utils/error";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { RxCrossCircled } from "react-icons/rx";
import { useGetAddNewBankAccountMutation } from "../../features/apiSlice";


export default function ConnectBank({
  startScreen,
  goBack,
  containerDiv,
  infoNext,
  bankDetails,
}) {
  const navigate = useNavigate();
  const [getAddNewBankAccount] = useGetAddNewBankAccountMutation();
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 
    try {
      const response = await getAddNewBankAccount();

      if (response?.data?.success) {
        window.location.href = response?.data?.consentUrl;
      } else {
        toast.error(response?.data?.message || "Failed to get consent URL");
      }
    } catch (error) {
      getError(error);
    } finally {
      setLoading(false); 
    }
  };

  const handleCancel = () => {
    if (infoNext) {
      infoNext();
    } else {
      navigate("/");
      // localStorage.removeItem("accessToken");
      // localStorage.removeItem("user");
      // localStorage.removeItem("bankToken");
    }
  };

  return (
    <LoginCard
      height={"500px"}
      width={"450px"}
      containerDiv={containerDiv}
      bankDetails={bankDetails}
    >
      {startScreen && (
        <div className="d-flex align-items-center justify-content-between mb-3">
          {/* <div>
            <IoArrowBackCircleOutline
              color="rgba(92, 182, 249, 1)"
              cursor={"pointer"}
              size={23}
              onClick={() =>
                goBack ? goBack() : navigate("/user/choose-bank")
              }
            />
          </div> */}

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

      <div className="d-flex align-items-center flex-column">
        <Image
          height={"35px"}
          width={"35px"}
          src="/images/AddAccount.png"
          alt="..."
        />
        <div
          className="my-2"
          style={{
            color: "var(--primary-color)",
            fontWeight: 800,
            fontSize: "16px",
          }}
        >
          Let’s connect your bank account
        </div>
        <Image
          height={"170px"}
          width={"300px"}
          src="/images/accountProtectionDetails.png"
          alt="..."
        />
        <p
          className="mt-3 px-5 text-center"
          style={{
            fontSize: "12px",
            fontWeight: 400,
            color: "rgba(55, 73, 87, 1)",
          }}
        >
          Powered by open data platform{" "}
          <span
            style={{
              textDecoration: "underline",
              color: "rgba(92, 182, 249, 1)",
            }}
          >
            basiq.io
          </span>{" "}
          to securely connect your bank account.
        </p>
      </div>

      <Row className="px-5">
        <Col>
          <Button
            className="float-sm-end w-100 "
            style={{
              background: "var(--primary-color)",
              fontWeight: 700,
              fontSize: "12px",
              padding: "10px",
              opacity: loading ? 0.7 : 1, // Add opacity during loading
            }}
            disabled={loading} // Disable button during loading
            onClick={handleSubmit}
          >
            {loading ? <Spinner animation="border" size="sm" /> : "Continue"}
          </Button>
        </Col>
      </Row>

      <Row className="mt-2 px-5">
        <Col>
          {/* <Button
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
          </Button> */}
        </Col>
      </Row>

      <ToastContainer />
    </LoginCard>
  );
}
