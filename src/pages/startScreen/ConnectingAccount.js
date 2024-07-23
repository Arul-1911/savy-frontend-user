import React, { useEffect } from "react";
import { CardBody, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import LoginCard from "../../components/layout/LoginCard";

export default function ConnectingAccount({containerDiv,next,goBack}) {
  const navigate = useNavigate();

  useEffect(() => {
    const intervalId = setInterval(() => {
     next?next(): navigate("/user/account-successfully-connected");
    }, 4000);

    // Cleanup function to clear the interval
    return () => clearInterval(intervalId);
  }, [navigate]);

  return (
    <LoginCard height={"450px"} width={"450px"} containerDiv={containerDiv}>
      <CardBody>
        <div className="d-flex align-items-center flex-column mb-2 mt-5">
          <Image className="mt-4" src="/images/PFM.png" alt="..." />
          <div
            className="mt-3"
            style={{
              color: "var(--primary-color)",
              fontWeight: 600,
              fontSize: "12px",
            }}
          >
            Connecting to bank
          </div>
        </div>
      </CardBody>
    </LoginCard>
  );
}
