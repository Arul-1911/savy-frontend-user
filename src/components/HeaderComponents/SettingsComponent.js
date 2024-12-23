import React, { useState } from "react";
import ModalWindow from "../modals/ModalWindow";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { FaRegCheckCircle } from "react-icons/fa";
import { setPeriod } from "../../features/periodSlice";
import { useDispatch } from "react-redux";

const SettingsComponent = ({ show, hide }) => {
  const dispatch = useDispatch();
  const [selectActivePeriod, setSelectActivePeriod] = useState(0);
  // const [selectPeriod, setSelectPeriod] = useState("");

  const periods = [
    "All Data",
    "Past week",
    "Past months",
    "Past 3 months",
    "Past 6 months",
    "Past 12 months",
    // "Calendar fortnight",
    // "Calendar month",
    // "Calendar month (last business day)",
    // "Calendar year",
  ];

  const handlePeriods = (index, prd) => {
    setSelectActivePeriod(index);
    dispatch(setPeriod(prd));
    hide();
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
            // margin: "auto 170px",
            fontWeight: 600,
            fontSize: "18px",
            color: "rgba(55, 73, 87, 1)",
            width:'90%'
          }}
          className="text-center"
        >
          Global Filter
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
                  onClick={() => handlePeriods(idx, prd)}
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
