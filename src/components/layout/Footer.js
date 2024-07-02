import React from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";

export default function Footer() {
  const { isLoggedIn } = useSelector((state)=>state.user);

  const d = new Date();
  return (
    <>
      {isLoggedIn ? (
        <Container fluid className="p-0 mt-auto">
          <footer className="text-center">
            <strong>
              Copyright © 2014-{`${d.getFullYear()} `}
              <a href="https://quantumitinnovation.com">Quantum It</a>.{" "}
            </strong>
            All rights reserved.
          </footer>
        </Container>
      ) : (
        <></>
      )}
    </>
  );
}
