import React, { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import DashboardCard from "../../components/layout/DasboardCard";
import SearchField from "../../components/layout/SearchField";
import { MotionDiv } from "../../components";
import TransactionComponents from "./TransationComponents/TransactionComponents";
import Calendar from "../../components/Calendar/Calendar";
import Filter from "../../components/Filter/Filter";
import { getError } from "../../utils/error";
import { imgAddr, useGetTransactionsMutation } from "../../features/apiSlice";
import { formatDate } from "../../components/FormateDateTime/FormatDateTime";
import Skeleton from "react-loading-skeleton";
import { IoMdRefresh } from "react-icons/io";

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
  const skeletonArray = [1, 2, 3, 4, 5, 6, 7];

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

  const clearAllFilter = () => {
    setQuery("");
    setDate("");
  };

  return (
    <MotionDiv>
      <h3
        style={{
          fontWeight: 600,
        }}
      >
        Transactions
      </h3>
      <DashboardCard>
        <div className="d-flex align-items-center flex-wrap gap-3">
          <div>
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
          {/* <Image
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
          /> */}

          <button
            className="px-3 py-1"
            style={{
              backgroundColor: "white",
              color: "var(--primary-color)",
              border: "1px solid #D2EBFD",
              borderRadius: "18px",
              fontSize: "12px",
              fontWeight: 600,
            }}
            onClick={clearAllFilter}
          >
            Clear All
          </button>

          <button
            className="px-3 py-1"
            style={{
              backgroundColor: "white",
              color: "var(--primary-color)",
              border: "1px solid #D2EBFD",
              borderRadius: "18px",
              fontSize: "12px",
              fontWeight: 600,
            }}
          >
            Refresh <IoMdRefresh />
          </button>
        </div>

        <ul className="market mt-2">
          {!isLoading
            ? transactions?.map((tran) => {
                return (
                  <li
                    style={{ cursor: "pointer" }}
                    onClick={() => handleTransaction(tran._id)}
                    key={tran?._id}
                    className="d-flex justify-content-between align-items-center "
                  >
                    <div className="d-flex  gap-2">
                      <Image
                        width={"35px"}
                        height={"35px"}
                        style={{ borderRadius: "50%", objectFit: "cover" }}
                        src={
                          tran?.category?.image
                            ? imgAddr + tran?.category?.image
                            : "/icons/Rectangle 116.png"
                        }
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
                      {tran?.amount} $
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
    </MotionDiv>
  );
};

export default Transactions;
