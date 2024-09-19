import React, { useEffect, useState } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import DashboardCard from "../../components/layout/DasboardCard";
import SearchField from "../../components/layout/SearchField";
import { MotionDiv } from "../../components";
import TransactionComponents from "./TransationComponents/TransactionComponents";
import Calendar from "../../components/Calendar/Calendar";
import Filter from "../../components/Filter/Filter";
import { getError } from "../../utils/error";
import { useGetTransactionsMutation } from "../../features/apiSlice";
import { formatDate } from "../../components/FormateDateTime/FormatDateTime";
import Skeleton from "react-loading-skeleton";

const Transactions = () => {
  const [transactionModal, setTransactionModal] = useState(false);
  const [activeTransaction, setActiveTransaction] = useState(1);
  const [openCalendar, setOpenCalendar] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [getTransactions, { isLoading }] = useGetTransactionsMutation();
  const [transactions, setTransactions] = useState([]);
  const [transactionId, setTransactionId] = useState("");
  const [date, setDate] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    getAllTransactions();
  }, [date, query]);

  const getAllTransactions = async () => {
    try {
      const { transactions } = await getTransactions({ query, date }).unwrap();
      setTransactions(transactions);
    } catch (error) {
      getError(error);
    }
  };

  const handleTransaction = (tranId) => {
    setTransactionModal(true);
    setTransactionId(tranId);
  };

  const skeletonArray = [1, 2, 3, 4, 5, 6, 7];

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
                  <SearchField placeholder="Search" onSearch={setQuery} />
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

              <ul className="market mt-2">
                {!isLoading
                  ? transactions?.map((tran, idx) => {
                      return (
                        <li
                          style={{ cursor: "pointer" }}
                          onClick={() => handleTransaction(tran._id)}
                          key={tran?._id}
                          className="d-flex justify-content-between align-items-center "
                        >
                          <div className="d-flex align-items-center gap-2">
                            <Image
                              width={"50px"}
                              height={"50px"}
                              style={{ borderRadius: "50%" }}
                              src={"/icons/Rectangle 116.png"}
                              alt="..."
                            />
                            <div>
                              <div
                                style={{
                                  fontSize: "rgba(55, 73, 87, 1)",
                                  fontSize: "16px",
                                }}
                              >
                                {tran?.description}
                              </div>
                              <div
                                style={{
                                  fontSize: "rgba(55, 73, 87, 0.7)",
                                  fontSize: "12px",
                                  fontWeight: 400,
                                }}
                              >
                                at {formatDate(tran?.date)}
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
                            {tran?.amount}
                          </div>
                        </li>
                      );
                    })
                  : skeletonArray?.map((_, i) => (
                      <li key={i} className={`p-2 `}>
                        <Skeleton
                          className="rounded-1"
                          height={"40px"}
                          width={"100%"}
                        />
                      </li>
                    ))}
              </ul>
            </DashboardCard>
          </Col>
        </Row>

        <TransactionComponents
          show={transactionModal}
          hide={setTransactionModal}
          active={activeTransaction}
          activeLink={setActiveTransaction}
          transactionId={transactionId}
        />

        <Calendar
          show={openCalendar}
          hide={setOpenCalendar}
          date={date}
          setDate={setDate}
        />
        <Filter show={openFilter} hide={setOpenFilter} />
      </Container>
    </MotionDiv>
  );
};

export default Transactions;
