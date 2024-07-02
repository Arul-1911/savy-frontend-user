import React from 'react'
import { Col, Modal, Row } from 'react-bootstrap'
import { FiEdit } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

function QuestionModal({show,onHide}) {

    const navigate = useNavigate();


  return (
    <Modal show={show} onHide={onHide} size='lg'>
    <Modal.Body>
      <Row>
        <Col>
        <h6 className='blue'>Question No. 1</h6>
        
        </Col>
        <Col className='text-end'>
        <FiEdit color='rgba(71, 84, 103, 1)' style={{cursor:'pointer'}}  onClick={()=>navigate('/admin/questions/edit-question')}/>
        </Col>
      </Row>
      <div>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eget elementum mi, at iaculis leo. Nullam sit amet viverra quam. Integer gravida sit amet dui quis porttitor. Sed ullamcorper libero a ex mattis ultrices. Proin venenatis enim felis, nec vulputate quam vehicula quis. Cras posuere et orci non posuere. Nullam.
      </div>
      <Row className='blue my-3'>
        <Col><p> Question Type: <span className='border px-3 text-nowrap'>Select Best Answer</span></p></Col>
        <Col className='text-end'><p>Difficulty Level: <span className='border px-3 text-nowrap'>Medium</span></p></Col>
      </Row>
  
      <Row>
        <Col>
        <p> <span style={{color:'rgba(0, 0, 139, 1)'}} className="fw-bold">{`A]`}</span> Dashboard Builder </p>
        <p> <span style={{color:'rgba(0, 0, 139, 1)'}} className="fw-bold">{`B]`}</span>  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eget elementum mi, at iaculis leo. Nullam sit amet viverra quam. </p>
        <p> <span style={{color:'rgba(0, 0, 139, 1)'}} className="fw-bold">{`C]`}</span>  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eget elementum mi, at iaculis leo. Nullam sit amet viverra quam. </p>
        <p> <span style={{color:'rgba(0, 0, 139, 1)'}} className="fw-bold">{`D]`}</span>  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eget elementum mi, at iaculis leo. Nullam sit amet viverra quam. </p>
        
        </Col>
      </Row>
    </Modal.Body>
  </Modal>
  )
}

export default QuestionModal