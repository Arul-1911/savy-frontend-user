import React, { useEffect, useState } from "react";
import { FormControl, Image, InputGroup } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import Filter from "../../../components/Filter/Filter";
import DashboardCard from "../../../components/layout/DasboardCard";
// import { MotionDiv } from "../../../components";
import TransactionComponents from "../../Transactions/TransationComponents/TransactionComponents";
import Calendar from "../../../components/Calendar/Calendar";
import { formatDate } from "../../../components/FormateDateTime/FormatDateTime";
import {
  imgAddr,
  useGetTransactionsMutation,
} from "../../../features/apiSlice";
import { getError } from "../../../utils/error";
import { getDateRanges } from "../../../components/DateRange/DateRange";
import { useSelector } from "react-redux";
import { selectAccountId } from "../../../features/authSlice";

const Transactions = () => {
  const { period } = useSelector((state) => state.period);
  const [transactionModal, setTransactionModal] = useState(false);
  const [activeTransaction, setActiveTransaction] = useState(1);
  const [openCalendar, setOpenCalendar] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [getTransactions, { isLoading }] = useGetTransactionsMutation();
  const [transactions, setTransactions] = useState([]);
  const [transactionId, setTransactionId] = useState("");
  const [date, setDate] = useState("");
  const [query, setQuery] = useState("");
  const [debounceQuery, setDebounceQuery] = useState("");
  const skeletonArray = [1, 2, 3, 4, 5, 6, 7];

  const dateRange = getDateRanges(period);

  const accountID = useSelector(selectAccountId);
  

  useEffect(() => {
    getAllTransactions();
  }, [date, debounceQuery, period, accountID]);

  const getAllTransactions = async () => {
    try {
      const { transactions } = await getTransactions({
        query: debounceQuery,
        date,
        currentStart: dateRange?.currentStart,
        currentEnd: dateRange?.currentEnd,
        account_id: accountID,
      }).unwrap();
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

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceQuery(query);
    }, 450);

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  return (
    <>
      <h3
        style={{
          fontWeight: 600,
        }}
        className="mt-4 mb-3"
      >
        Transactions
      </h3>

      <DashboardCard>
        <div className="d-flex align-items-center flex-wrap gap-3">
          <div>
            {/* <SearchField placeholder="Search" onSearch={setQuery} value={query} /> */}
            <InputGroup>
              <FormControl
                style={{
                  backgroundColor: "rgba(245, 247, 248, 1)",
                  borderTopLeftRadius: "20px",
                  borderBottomLeftRadius: "20px",
                }}
                type="text"
                placeholder="Search"
                className="border-0"
                value={query}
                // disabled={disabled}
                onChange={(e) => setQuery(e.target.value)}
              />
              <InputGroup.Text
                style={{
                  borderTopRightRadius: "20px",
                  borderBottomRightRadius: "20px",
                  backgroundColor: "rgba(245, 247, 248, 1)",
                }}
                className="border-0"
              ></InputGroup.Text>
            </InputGroup>
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
        </div>

        <ul className="market mt-3">
          {!isLoading ? (
            transactions && transactions.length > 0 ? (
              transactions?.map((tran) => {
                return (
                  <li
                    style={{ cursor: "pointer" }}
                    onClick={() => handleTransaction(tran._id)}
                    key={tran?._id}
                    className="d-flex justify-content-between align-items-center"
                  >
                    <div className="d-flex  gap-4">
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
            ) : (
              <h6 className="text-center p-5">No Transactions Found..</h6>
            )
          ) : (
            skeletonArray?.map((_, i) => (
              <li key={i} className={`p-2 `}>
                <Skeleton
                  className="rounded-1"
                  height={"40px"}
                  width={"100%"}
                />
              </li>
            ))
          )}
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
    </>
  );
};

export default Transactions;
