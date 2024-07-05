import React, { useEffect } from "react";
import { CardBody } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import LoginCard from "../../components/layout/LoginCard";

export default function AccountConnected() {
  const navigate = useNavigate();

  useEffect(() => {
    const intervalId = setInterval(() => {
      localStorage.setItem("bankToken", true);
      navigate("/user/dashboard");
    }, 4000);

    // Cleanup function to clear the interval
    return () => clearInterval(intervalId);
  }, [navigate]);

  return (
    <LoginCard height={"450px"} width={"450px"}>
      <CardBody>
        <div className="d-flex align-items-center flex-column mb-2 mt-5">
          <div
            className="mt-5"
            style={{
              fontWeight: 600,
              fontSize: "14px",
            }}
          >
            Bank of Melbourne
          </div>
          <div
            style={{
              color: "rgba(36, 204, 167, 1)",
              fontWeight: 600,
              fontSize: "16px",
            }}
          >
            successfully connected
          </div>
        </div>
      </CardBody>
    </LoginCard>
  );
}
