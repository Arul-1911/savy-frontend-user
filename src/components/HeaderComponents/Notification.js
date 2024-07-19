import React from "react";
import ModalWindow from "../modals/ModalWindow";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { IoIosSettings } from "react-icons/io";
import { Card } from "react-bootstrap";
import { InfoSVG } from "../svg/InfoSVG";

const Notification = ({ show, hide }) => {
  const notifications = [
    {
      text: "Your grocery expenses are increasing ",
      subText:
        "Your grocery expenses are increasing 30% from last month. You have to reduce it to achieve your goal",
      time: "9:52Am",
      info: <InfoSVG />,
    },
    {
      text: "Your grocery expenses are increasing ",
      subText:
        "Your grocery expenses are increasing 30% from last month. You have to reduce it to achieve your goal",
      time: "9:52Am",
      info: <InfoSVG />,
    },
    {
      text: "Your grocery expenses are increasing ",
      subText:
        "Your grocery expenses are increasing 30% from last month. You have to reduce it to achieve your goal",
      time: "9:52Am",
      info: <InfoSVG />,
    },
    {
      text: "Your grocery expenses are increasing ",
      subText:
        "Your grocery expenses are increasing 30% from last month. You have to reduce it to achieve your goal",
      time: "9:52Am",
      info: <InfoSVG />,
    },
    {
      text: "Your grocery expenses are increasing ",
      subText:
        "Your grocery expenses are increasing 30% from last month. You have to reduce it to achieve your goal",
      time: "9:52Am",
      info: <InfoSVG />,
    },
    {
      text: "Your grocery expenses are increasing ",
      subText:
        "Your grocery expenses are increasing 30% from last month. You have to reduce it to achieve your goal",
      time: "9:52Am",
      info: <InfoSVG />,
    },
  ];

  return (
    <ModalWindow show={show} onHide={hide}>
      <div className="d-flex justify-content-between align-items-center">
        <IoArrowBackCircleOutline
          color="rgba(92, 182, 249, 1)"
          cursor={"pointer"}
          size={27}
          onClick={() => hide(false)}
        />
        <div
          style={{
            fontWeight: 600,
            fontSize: "16px",
            color: "rgba(55, 73, 87, 1)",
          }}
          className="text-center"
        >
          Notifications
        </div>

        <div
          style={{
            borderRadius: "100%",
            padding: "5px",
            backgroundColor: "rgba(92, 182, 249, 0.08)",
          }}
        >
          <IoIosSettings
            color="rgba(92, 182, 249, 1)"
            cursor={"pointer"}
            size={23}
            onClick={() => hide(false)}
          />
        </div>
      </div>

      <Card style={{ borderRadius: "20px" }} className="mt-3">
        <Card.Body>
          {notifications?.map((notification, idx) => {
            return (
              <div key={idx}>
                <div className="d-flex justify-content-between">
                  <div className="d-flex gap-2 align-items-center">
                    <div>{notification?.info}</div>
                    <div>
                      <div
                        style={{
                          fontSize: "12px",
                          fontWeight: 600,
                          color: "rgba(55, 73, 87, 1)",
                        }}
                      >
                        {notification?.text}
                      </div>
                      <div
                        style={{
                          fontSize: "10px",
                          fontWeight: 400,
                          color: "rgba(55, 73, 87, 1)",
                        }}
                      >
                        {notification?.subText}
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: "10px",
                      fontWeight: 400,
                      color: "rgba(55, 73, 87, 1)",
                    }}
                  >
                    {notification?.time}
                  </div>
                </div>
                <hr />
              </div>
            );
          })}
        </Card.Body>
      </Card>
    </ModalWindow>
  );
};

export default Notification;
