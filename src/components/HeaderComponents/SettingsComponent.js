import React, { useState } from "react";
import ModalWindow from "../modals/ModalWindow";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { FaRegCheckCircle } from "react-icons/fa";

const SettingsComponent = ({ show, hide }) => {
  const [selectActivePeriod, setSelectActivePeriod] = useState(0);

  const periods = [
    "Past fortnight",
    "Past months",
    "Past 3 months",
    "Past 6 months",
    "Past year",
    "Calendar week",
    "Calendar fortnight",
    "Calendar month",
    "Calendar month (last business day)",
    "Calendar year",
  ];

  const activePeriods = (index) => {
    setSelectActivePeriod(index);
  };

  return (
    <ModalWindow show={show} onHide={hide}>
      <div className="d-flex">
        <IoArrowBackCircleOutline
          color="rgba(92, 182, 249, 1)"
          cursor={"pointer"}
          size={28}
          onClick={() => hide(false)}
        />
        <div
          style={{
            margin: "auto 170px",
            fontWeight: 600,
            fontSize: "18px",
            color: "rgba(55, 73, 87, 1)",
          }}
          className="text-center"
        >
          Payday
        </div>
      </div>

      <div
        style={{
          fontSize: "14px",
          fontWeight: 600,
          color: "var(--primary-color)",
          textAlign: "center",
          marginTop: "10px",
        }}
      >
        Select period
      </div>

      <div className="mt-2">
        {periods?.map((prd, idx) => {
          return (
            <div key={idx}>
              <div className="d-flex align-items-center justify-content-between">
                <div
                  style={
                    selectActivePeriod === idx
                      ? {
                          color: "rgba(92, 182, 249, 1)",
                          fontWeight: 600,
                          cursor: "pointer",
                        }
                      : {
                          color: "var(--primary-color)",
                          fontWeight: 600,
                          cursor: "pointer",
                        }
                  }
                  onClick={() => activePeriods(idx)}
                >
                  {prd}
                </div>
                {selectActivePeriod === idx && (
                  <FaRegCheckCircle color="rgba(92, 182, 249, 1)" size={22} />
                )}
              </div>
              <hr />
            </div>
          );
        })}
      </div>
    </ModalWindow>
  );
};

export default SettingsComponent;
