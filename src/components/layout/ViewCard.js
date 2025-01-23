import React, { useEffect } from 'react'
import Skeleton from 'react-loading-skeleton';
import { Card, Col, Row } from 'react-bootstrap'
import { FaEdit, FaCheck } from 'react-icons/fa';
import { ImCross } from "react-icons/im";
import { toast } from 'react-toastify';
import { getDateTime } from '../../utils/function';
import { toastOptions } from '../../utils/error';
import MotionDiv from './MotionDiv';
import MessageBox from './MessageBox';

/**
 * Renders a card component to display details with optional loading state and edit functionality.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.loading - Specifies whether the component is in a loading state.
 * @param {function} props.setModalShow - Function to toggle the modal show state.
 * @param {Object} props.data - The data object containing the details to display.
 * @param {Object} props.keyProps - An object containing key-value pairs for mapping keys to attribute names.
 * @returns {JSX.Element} The rendered card component.
 * 
 * @example
 * // Example usage of the ViewCard component
 * <ViewCard
 *   loading={false}
 *   setModalShow={handleModalToggle}
 *   data={{
 *     fullname: 'John Doe',
 *     createdAt: '2022-05-15T10:30:00Z',
 *     updatedAt: '2022-05-20T14:45:00Z',
 *   }}
 *   keyProps={{
 *     name: 'fullname',
 *     created: 'createdAt',
 *     updated: 'updatedAt',
 *   }}
 * >
 *   <CustomComponent />
 * </ViewCard>
 **/

const boolComp = (val) => {
  return val ? <FaCheck className="green" /> : <ImCross className="red" />;
}

const isDate = (date) => {
  return (new Date(date) !== "Invalid Date") && !isNaN(new Date(date));
}

const dynamicComp = (val) => {
  const dataType = typeof val;
  // console.log({ dataType })
  switch (dataType) {
    case "number": return val;
    case "boolean": return boolComp(val);
    default:
      // console.log({ val });
      const res = val ? (isDate(val) ? getDateTime(val) : val) : "---";
      // console.log({ res });
      return res;
  }
};

export default function ViewCard(props) {
  // console.log({ props })
  const {
    setModalShow,
    data,
    keyProps,
    title,
    isImage,
    image_url,
    successMsg,
    reducerProps,
  } = props;

  const { loading, error, dispatch, success } = reducerProps;

  // console.log({error});
  // useEffect(() => {
  //   if (error) {
  //     toast.error(error, toastOptions);
      
  //   }

  //   if (success) {
  //     toast.success(successMsg, toastOptions);
  //   }
  // }, [error, success]);

  // console.log("data in card: ",data);

  const fields = Object.entries(keyProps);
  return (
    <MotionDiv initial={{ x: "100%" }}>
      {/* {error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : ( */}
        <Card>
          <Card.Header>
            {title
              ? <Card.Title>{title}</Card.Title>
              : <Skeleton count={1} height={35} width={200} baseColor='#afafaf' />
            }
            <div className="card-tools">
              <FaEdit
                style={{ color: "blue" }}
                onClick={() => setModalShow(true)}
              />
            </div>
          </Card.Header>
          <Card.Body>
            {isImage
              ?
              <Row>
                <Col md={4}>
                  {loading ? <Skeleton height={200} /> :
                    <img
                      className="img-fluid"
                      src={image_url}
                      alt=""
                      width={"200px"}
                      height={"200px"}
                    />}
                </Col>
                <Col>
                  <Row>
                    {fields && fields.map(([k, attr]) => {
                      // console.log({ k, attr })
                      return (
                        <Col key={k} md={4}>
                          <p className="mb-0">
                            <strong>{k}</strong>
                          </p>
                          <p>{loading ? <Skeleton /> : dynamicComp(data[attr])}</p>
                        </Col>
                      )
                    })}
                  </Row>
                </Col>
              </Row>
              :
              <Row>
                {fields && fields.map(([k, attr]) => {
                  // console.log({ k, attr })
                  return (
                    <Col key={k} md={4}>
                      <p className="mb-0">
                        <strong>{k}</strong>
                      </p>
                      <p>{loading ? <Skeleton /> : dynamicComp(data[attr])}</p>
                    </Col>
                  )
                })}
              </Row>
            }
            {props.children}
          </Card.Body>
        </Card>
      {/* )} */}
    </MotionDiv>
  )
}
