import React, { useState } from "react";
import ModalWindow from "../modals/ModalWindow";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { FaRegCheckCircle } from "react-icons/fa";

const Filter = ({ show, hide, already, activeLink, data, selectedPeriod }) => {
  const [selectActivePeriod, setSelectActivePeriod] = useState(0);

  const activePeriods = (index, value) => {
    setSelectActivePeriod(index);
    selectedPeriod(value);
    activeLink(already);
  };

  return (
    <>
      {!already ? (
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
                margin: "auto 180px",
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
            className="my-3"
            style={{
              fontSize: "14px",
              fontWeight: 600,
              color: "var(--primary-color)",
              textAlign: "center",
              margin: "auto 20px",
            }}
          >
            Select period
          </div>

          <div className="mt-2">
            {data?.map((prd, idx) => {
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
                      {prd?.text}
                    </div>
                    {selectActivePeriod === idx && (
                      <FaRegCheckCircle
                        color="rgba(92, 182, 249, 1)"
                        size={22}
                      />
                    )}
                  </div>
                  <hr />
                </div>
              );
            })}
          </div>
        </ModalWindow>
      ) : (
        <>
          <div className="d-flex">
            <IoArrowBackCircleOutline
              color="rgba(92, 182, 249, 1)"
              cursor={"pointer"}
              size={28}
              onClick={() => activeLink(already)}
            />
            <div
              style={{
                margin: "auto 180px",
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
            className="my-3"
            style={{
              fontSize: "14px",
              fontWeight: 600,
              color: "var(--primary-color)",
              textAlign: "center",
              marginLeft: "20px",
            }}
          >
            Select period
          </div>

          <div className="mt-2">
            {data?.map((prd, idx) => {
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
                      onClick={() => activePeriods(idx, prd?.value)}
                    >
                      {prd?.text}
                    </div>
                    {selectActivePeriod === idx && (
                      <FaRegCheckCircle
                        color="rgba(92, 182, 249, 1)"
                        size={22}
                      />
                    )}
                  </div>
                  <hr />
                </div>
              );
            })}
          </div>
        </>
      )}
    </>
  );
};

export default Filter;
