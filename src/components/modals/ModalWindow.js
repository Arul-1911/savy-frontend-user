import React from "react";
import { Modal } from "react-bootstrap";

function ModalWindow({ children, show, onHide ,mainClass,bodyClass}) {
  return (
    <Modal
      // aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
      onHide={onHide}
      className={mainClass}
    >
      <Modal.Body className={bodyClass}>{children}</Modal.Body>
    </Modal>
  );
}

export default ModalWindow;
