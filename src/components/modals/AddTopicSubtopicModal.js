import React, { useState } from "react";
import FormField from "../layout/FormField";
import { Modal, Button, Row, Col, Card, Spinner, Form } from "react-bootstrap";
import { HiOutlineTrash } from "react-icons/hi";
import UploadImages from "../layout/UploadImages";
import References from "../layout/References";
import { useCreateDomainMutation } from "../../features/apiSlice";

function AddTopicSubtopicModal({
  show,
  onHide,
  heading,
  title,
  description,
  setTitle,
  setDescription,
  onSubmit,
  loading = false,
  references,
  setReferences,
  images,
  setImages,
  preImages,
  setPreImages,
}) {
  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Body>
        <Form onSubmit={onSubmit}>
          <Row>
            <p>Enter {heading} Name:</p>

            <Col>
              <FormField
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Col>
            <Col sm={5}>
              <Button variant="transparent" className="mb-3 delete-btn">
                Delete {heading} <HiOutlineTrash size={20} />
              </Button>
            </Col>
          </Row>

          <Card.Body className="border-top border-bottom">
            <Row>
              <Col>Description:</Col>

              <Col></Col>
            </Row>
            <FormField
              type={"text"}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              as={"textarea"}
              rows={4}
            />
            <Row className="my-2">
              <Col sm={7}>
                <UploadImages images={images} setImages={setImages} preImages={preImages} setPreImages={setPreImages}/>
              </Col>
              <Col>
                <References
                  references={references}
                  setReferences={setReferences}
                />
              </Col>
            </Row>
          </Card.Body>
          <Row className="my-3">
            <Col className="text-center ">
              <Button
                variant="transparent"
                className="add-btn m-1 px-3"
                onClick={onHide}
              >
                Cancel
              </Button>
              <Button
                variant="transparent"
                type="submit"
                disabled={loading}
                className="add-btn m-1 px-3"
              >
                
                {loading ? <Spinner size="sm" /> : "Save Details"}
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default AddTopicSubtopicModal;
