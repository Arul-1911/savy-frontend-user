import React, { useState } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import DashboardCard from "../../components/layout/DasboardCard";
import SearchField from "../../components/layout/SearchField";
import { MotionDiv } from "../../components";
import TransactionComponents from "./TransationComponents/TransactionComponents";
import Calendar from "../../components/Calendar/Calendar";
import Filter from "../../components/Filter/Filter";

const Transactions = () => {
  const [transactionModal, setTransactionModal] = useState(false);
  const [activeTransaction, setActiveTransaction] = useState(1);
  const [openCalendar, setOpenCalendar] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);

  const todayTransaction = [
    {
      icons: "/icons/Rectangle 116.png",
      text: "Trader Jane’s market",
      time: "at 14:30",
      price: "-20.00 $",
    },
    {
      icons: "/icons/Airbnb.png",
      text: "C&C partners",
      time: "at 14:30",
      price: "-20.00 $",
    },
    {
      icons: "/icons/Rectangle 117.png",
      text: "OW finance office",
      time: "at 14:30",
      price: "-20.00 $",
    },
    {
      icons: "/icons/Better Stack.png",
      text: "Artsy Coffee Shop",
      time: "at 14:30",
      price: "-20.00 $",
    },
  ];

  return (
    <MotionDiv>
      <Container>
        <h3
          style={{
            fontWeight: 600,
          }}
        >
          Transactions
        </h3>

        <Row className="mt-4">
          <Col>
            <DashboardCard>
              <div className="d-flex align-items-cente gap-3">
                <div className="w-25">
                  <SearchField />
                </div>
                <Image
                  onClick={() => setOpenCalendar(true)}
                  style={{
                    color: "rgba(92, 182, 249, 1)",
                    fontWeight: 600,
                    fontSize: "16px",
                    backgroundColor: "rgba(242, 249, 255, 1)",
                    padding: "10px",
                    borderRadius: "20px",
                    cursor: "pointer",
                  }}
                  src="/icons/calendar.png"
                  alt="..."
                />
                <Image
                  onClick={() => setOpenFilter(true)}
                  style={{
                    color: "rgba(92, 182, 249, 1)",
                    fontWeight: 600,
                    fontSize: "16px",
                    backgroundColor: "rgba(242, 249, 255, 1)",
                    padding: "10px",
                    borderRadius: "20px",
                    cursor: "pointer",
                  }}
                  src="/icons/Filter.png"
                  alt="..."
                />
              </div>

              <div
                className="mt-4"
                style={{
                  color: "var(--primary-color)",
                  fontWeight: 600,
                  fontSize: "16px",
                }}
              >
                Today
              </div>

              <ul className="market mt-2">
                {todayTransaction?.map((tran, idx) => {
                  return (
                    <li
                      style={{ cursor: "pointer" }}
                      onClick={() => setTransactionModal(true)}
                      key={idx}
                      className="d-flex justify-content-between align-items-center "
                    >
                      <div className="d-flex align-items-center gap-2">
                        <Image
                          width={"50px"}
                          height={"50px"}
                          style={{ borderRadius: "50%" }}
                          src={tran?.icons}
                          alt="..."
                        />
                        <div>
                          <div
                            style={{
                              fontSize: "rgba(55, 73, 87, 1)",
                              fontSize: "16px",
                            }}
                          >
                            {tran?.text}
                          </div>
                          <div
                            style={{
                              fontSize: "rgba(55, 73, 87, 0.7)",
                              fontSize: "12px",
                              fontWeight: 400,
                            }}
                          >
                            {tran?.time}
                          </div>
                        </div>
                      </div>

                      <div
                        style={{
                          color: "var(--primary-color)",
                          fontSize: "20px",
                          fontWeight: 800,
                        }}
                      >
                        {tran?.price}
                      </div>
                    </li>
                  );
                })}
              </ul>

              <div
                className="mt-4"
                style={{
                  color: "var(--primary-color)",
                  fontWeight: 600,
                  fontSize: "16px",
                }}
              >
                Yesterday
              </div>

              <ul className="market mt-2">
                {todayTransaction?.map((tran, idx) => {
                  return (
                    <li
                      style={{ cursor: "pointer" }}
                      onClick={() => setTransactionModal(true)}
                      key={idx}
                      className="d-flex justify-content-between align-items-center "
                    >
                      <div className="d-flex align-items-center gap-2">
                        <Image
                          width={"50px"}
                          height={"50px"}
                          style={{ borderRadius: "50%" }}
                          src={tran?.icons}
                          alt="..."
                        />
                        <div>
                          <div
                            style={{
                              fontSize: "rgba(55, 73, 87, 1)",
                              fontSize: "16px",
                            }}
                          >
                            {tran?.text}
                          </div>
                          <div
                            style={{
                              fontSize: "rgba(55, 73, 87, 0.7)",
                              fontSize: "12px",
                              fontWeight: 400,
                            }}
                          >
                            {tran?.time}
                          </div>
                        </div>
                      </div>

                      <div
                        style={{
                          color: "var(--primary-color)",
                          fontSize: "20px",
                          fontWeight: 800,
                        }}
                      >
                        {tran?.price}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </DashboardCard>
          </Col>
        </Row>

        <TransactionComponents
          show={transactionModal}
          hide={setTransactionModal}
          active={activeTransaction}
          activeLink={setActiveTransaction}
        />

        <Calendar show={openCalendar} hide={setOpenCalendar} />
        <Filter show={openFilter} hide={setOpenFilter} />
      </Container>
    </MotionDiv>
  );
};

export default Transactions;
