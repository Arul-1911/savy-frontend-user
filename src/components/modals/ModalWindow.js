import React from "react";
import { Modal } from "react-bootstrap";

function ModalWindow({ children, show, onHide, mainClass, bodyClass }) {
  return (
    <Modal centered show={show} onHide={onHide} className={mainClass}>
      <Modal.Header closeButton style={{borderBottom:'none', marginBottom:'-3px'}}>
      </Modal.Header>
      <Modal.Body className={bodyClass}>{children}</Modal.Body>
    </Modal>
  );
}

export default ModalWindow;
