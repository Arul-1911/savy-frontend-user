import React from "react";
import { Card, CardBody, Container, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

const LoginCard = ({ children, height, width, bankDetails,containerDiv=true}) => {
  return (
<>
    {containerDiv ?

    <Container
      fluid
      className="p-0 vh-100 f-center flex-column login-page background-planet-img"
    >
    
      <Card
        style={
          { height: height, width: width, borderRadius: "20px" }
          // height
          //   ? { height: "580px", width: "450px", borderRadius: "20px" }
          //   : { width: "500px", height: "500px", borderRadius: "20px" }
        }
        className="shadow "
      >
        {!bankDetails && (
          <div className="mt-4 d-flex align-items-center gap-3 px-3">
            <Link to="/">
              <Image src="/logo/LoginLogo.png" height={"50px"} width={"50px"} />{" "}
            </Link>
            <b
              className="fs-3 text-center"
              style={{ color: "var(--primary-color)", fontWeight: 800 }}
            >
              $ayv
            </b>
          </div>
        )}
        <CardBody className="">{children}</CardBody>
      </Card>
        

    </Container>
    :
    <Card
    style={
      { height: height, width: width, borderRadius: "20px" }
      // height
      //   ? { height: "580px", width: "450px", borderRadius: "20px" }
      //   : { width: "500px", height: "500px", borderRadius: "20px" }
    }
    className="shadow "
  >
    {!bankDetails && (
      <div className="mt-4 d-flex align-items-center gap-3 px-3">
        <Link to="/">
          <Image src="/logo/LoginLogo.png" height={"50px"} width={"50px"} />{" "}
        </Link>
        <b
          className="fs-3 text-center"
          style={{ color: "var(--primary-color)", fontWeight: 800 }}
        >
          $ayv
        </b>
      </div>
    )}
    <CardBody className="">{children}</CardBody>
  </Card>
    }
         </> 
  );
};

export default LoginCard;
