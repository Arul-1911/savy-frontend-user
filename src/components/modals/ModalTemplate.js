import React from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";

function ModalTemplate({ children, show, onHide, onConfirm }) {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Body className="px-5">
        {children}
        <Row className="px-5 text-center">
          <Col>
            {onConfirm && (
              <Button
                style={{
                  backgroundColor: "var(--primary-color)",
                }}
                className="w-75 m-1"
                // disabled={loading}
                onClick={onConfirm}
              >
                I Understand
              </Button>
            )}
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
}

export default ModalTemplate;
