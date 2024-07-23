import React, { useState } from "react";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import ModalWindow from "../../../../components/modals/ModalWindow";
import { IoIosArrowForward } from "react-icons/io";
import { Card } from "react-bootstrap";

const CashFlowSettings = ({ show, hide }) => {
  const [selectActivePeriod, setSelectActivePeriod] = useState(1);

  const popularCat = [
    {
      text: "Restaurants",
      subText: "Lifestyle",
    },
    {
      text: "Electricity",
      subText: "Home",
    },
    {
      text: "Restaurants",
      subText: "Lifestyle",
    },
  ];

  const allCat = [
    {
      text: "Restaurants",
      subText: "Lifestyle",
    },
    {
      text: "Restaurants",
      subText: "Lifestyle",
    },
    {
      text: "Restaurants",
      subText: "Lifestyle",
    },
    {
      text: "Restaurants",
      subText: "Lifestyle",
    },
    {
      text: "Restaurants",
      subText: "Lifestyle",
    },
    {
      text: "Restaurants",
      subText: "Lifestyle",
    },
    {
      text: "Restaurants",
      subText: "Lifestyle",
    },
  ];

  return (
    <ModalWindow show={show} onHide={hide}>
      {selectActivePeriod === 1 && (
        <>
          <div className="d-flex">
            <IoArrowBackCircleOutline
              color="rgba(92, 182, 249, 1)"
              cursor={"pointer"}
              size={28}
              onClick={() => hide(false)}
            />
            <div
              style={{
                margin: "auto",
                fontWeight: 600,
                fontSize: "18px",
                color: "rgba(55, 73, 87, 1)",
              }}
              className="text-center"
            >
              Fliters
            </div>
          </div>

          <div
            className="d-flex justify-content-between mt-3"
            onClick={() => setSelectActivePeriod(2)}
            style={{ cursor: "pointer" }}
          >
            <div
              style={{
                fontWeight: 600,
                color: "var(--primary-color)",
              }}
            >
              Accounts
            </div>
            <div>
              1/1 <IoIosArrowForward color="var(--primary-color)" />
            </div>
          </div>
          <hr />

          <div
            className="d-flex justify-content-between mt-3"
            onClick={() => setSelectActivePeriod(2)}
            style={{ cursor: "pointer" }}
          >
            <div
              style={{
                fontWeight: 600,
                color: "var(--primary-color)",
              }}
            >
              Categories
            </div>
            <div>
              0/84 Selected <IoIosArrowForward color="var(--primary-color)" />
            </div>
          </div>
          <hr />
        </>
      )}

      {selectActivePeriod === 2 && (
        <>
          <div className="d-flex">
            <IoArrowBackCircleOutline
              color="rgba(92, 182, 249, 1)"
              cursor={"pointer"}
              size={28}
              onClick={() => setSelectActivePeriod(1)}
            />
            <div
              style={{
                margin: "auto",
                fontWeight: 600,
                fontSize: "16px",
                color: "rgba(55, 73, 87, 1)",
              }}
              className="text-center"
            >
              Select a Category
            </div>
          </div>

          <div
            className="text-center mt-2 px-4"
            style={{
              fontSize: "12px",
              color: "rgba(55, 73, 87, 1)",
              fontWeight: 400,
            }}
          >
            Get the most appropriate dashboard insights for your needs. Add and
            organise widgets below.
          </div>

          <div>
            <div
              className="my-3"
              style={{ fontWeight: 600, color: "var(--primary-color)" }}
            >
              Popular Categories
            </div>
            <Card style={{ borderRadius: " 10px" }}>
              <Card.Body>
                {popularCat?.map((data, idx) => {
                  return (
                    <div
                      key={idx}
                      className="d-flex justify-content-between align-items-center mt-2"
                    >
                      <div>
                        <div style={{ fontSize: "14px", fontWeight: 600 }}>
                          {data?.text}
                        </div>
                        <div style={{ fontSize: "12px", fontWeight: 400 }}>
                          {data?.subText}
                        </div>
                      </div>
                      <div>
                        <input type="checkbox" />
                      </div>
                    </div>
                  );
                })}
              </Card.Body>
            </Card>
          </div>

          <div>
            <div
              className="my-3"
              style={{ fontWeight: 600, color: "var(--primary-color)" }}
            >
              Popular Categories
            </div>
            <Card
              style={{
                borderRadius: " 10px",
                overflowY: "scroll",
                height: "300px",
              }}
            >
              <Card.Body>
                {allCat?.map((data, idx) => {
                  return (
                    <div
                      key={idx}
                      className="d-flex justify-content-between align-items-center mt-2"
                    >
                      <div>
                        <div style={{ fontSize: "14px", fontWeight: 600 }}>
                          {data?.text}
                        </div>
                        <div style={{ fontSize: "12px", fontWeight: 400 }}>
                          {data?.subText}
                        </div>
                      </div>
                      <div>
                        <input type="checkbox" />
                      </div>
                    </div>
                  );
                })}
              </Card.Body>
            </Card>

            <div className="text-center">
              <button
                className="w-75 mt-3"
                onClick={() => hide(false)}
                style={{
                  backgroundColor: "var(--primary-color)",
                  padding: "10px",
                  color: "white",
                  border: "none",
                  borderRadius: "10px",
                }}
              >
                Continue
              </button>
            </div>
          </div>
        </>
      )}
    </ModalWindow>
  );
};

export default CashFlowSettings;
