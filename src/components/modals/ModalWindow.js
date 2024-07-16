import React from "react";
import { Modal } from "react-bootstrap";

function ModalWindow({ children, show, onHide }) {
  return (
    <Modal
      // aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
      onHide={onHide}
    >
      <Modal.Body className="">{children}</Modal.Body>
    </Modal>
  );
}

export default ModalWindow;
