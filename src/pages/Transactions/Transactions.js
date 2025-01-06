import React, { useEffect, useState } from "react";
import { FormControl, Image, InputGroup, Spinner } from "react-bootstrap";
import DashboardCard from "../../components/layout/DasboardCard";
import { MotionDiv } from "../../components";
import TransactionComponents from "./TransationComponents/TransactionComponents";
import Calendar from "../../components/Calendar/Calendar";
import Filter from "../../components/Filter/Filter";
import { getError } from "../../utils/error";
import {
  imgAddr,
  useGetDownloadTransactionMutation,
  useGetDownloadTransactionQuery,
  useGetTransactionsMutation,
} from "../../features/apiSlice";
import { formatDate } from "../../components/FormateDateTime/FormatDateTime";
import Skeleton from "react-loading-skeleton";
import { getDateRanges } from "../../components/DateRange/DateRange";
import { useSelector } from "react-redux";
import { BiExport } from "react-icons/bi";
import { toast } from "react-toastify";

const Transactions = () => {
  const { period } = useSelector((state) => state.period);
  const [transactionModal, setTransactionModal] = useState(false);
  const [activeTransaction, setActiveTransaction] = useState(1);
  const [openCalendar, setOpenCalendar] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [getTransactions, { isLoading }] = useGetTransactionsMutation();
  const [exportTransaction, { isLoading: ExportLoading }] =
    useGetDownloadTransactionMutation();
  const [transactions, setTransactions] = useState([]);
  const [transactionId, setTransactionId] = useState("");
  const [date, setDate] = useState("");
  const [query, setQuery] = useState("");
  const [debounceQuery, setDebounceQuery] = useState("");
  const skeletonArray = [1, 2, 3, 4, 5, 6, 7];

  useEffect(() => {
    getAllTransactions();
  }, [date, debounceQuery, period]);

  const dateRange = getDateRanges(period);

  //get All transactions
  const getAllTransactions = async () => {
    try {
      const { transactions } = await getTransactions({
        query: debounceQuery,
        date,
        currentStart: dateRange?.currentStart,
        currentEnd: dateRange?.currentEnd,
      }).unwrap();
      setTransactions(transactions);
    } catch (error) {
      getError(error);
    }
  };

  // Export transactions
  const getExportTransaction = async () => {
    try {
      const response = await exportTransaction({
        currentStart: dateRange?.currentStart,
        currentEnd: dateRange?.currentEnd,
      }).unwrap();

      if (!response) {
        toast.error(" No data");
        return;
      }
      const blob = response instanceof Blob ? response : new Blob([response]);

      try {
        const responseText = await blob.text();
        const rows = responseText.split("\n");

        // If no rows found
        if (rows.length <= 1) {
          toast.error("No transaction to export");
          return;
        }

        const header = rows[0].split(",");
        const cleanedHeader = header.map((col) => col.replace(/"/g, "").trim());
        const transactionIdIndex = cleanedHeader.indexOf("Transaction ID");

        if (transactionIdIndex !== -1) {
          cleanedHeader.splice(transactionIdIndex, 1);

          const modifiedRows = rows.map((row, index) => {
            if (index === 0) {
              return cleanedHeader.join(",");
            }

            const columns = row.split(",");
            if (columns.length > transactionIdIndex) {
              columns.splice(transactionIdIndex, 1);
            }
            return columns.join(",");
          });

          const modifiedCsv = modifiedRows.join("\n");
          const modifiedBlob = new Blob([modifiedCsv], { type: "text/csv" });
          const filename = "Transactions.csv";
          const link = document.createElement("a");
          const url = window.URL.createObjectURL(modifiedBlob);
          link.href = url;
          link.setAttribute("download", filename);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
        } else {
          toast.error("Transaction ID column not found in CSV.");
        }
      } catch (error) {
        toast.error("Error processing CSV data.");
      }
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
    <MotionDiv>
      <div className="transaction-header mb-4 d-flex align-items-center flex-wrap justify-between w-100">
        <h3 className="transaction-title">Transactions</h3>
        <button
          className="export-button"
          onClick={getExportTransaction}
          style={{
            // paddingLeft: "30px",
            backgroundColor: "var(--primary-color)",
            height: "50px",
            width: "200px",
            borderRadius: "22px",
            fontSize: "14px",
            color: "white",
            fontWeight: 600,
            cursor: "pointer",
            border: "none",
            // padding:'10px'
          }}
        >
          {ExportLoading ? (
            <Spinner size="sm" />
          ) : (
            <>
              <span style={{ marginRight: "4px", fontSize: "16px" }}>
                <BiExport />
              </span>
              <span>Export Transactions</span>
            </>
          )}
        </button>
      </div>
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
              >
                {/* <button
                  style={{
                    backgroundColor: "rgba(92, 182, 249, 1)",
                    color: "white",
                    borderRadius: "50%",
                    border: "none",
                    outline: "none",
                    background: "transparent",
                  }}
                  type="submit"
                >
                  <FaSearch color="rgba(0, 74, 173, 1)" size={14} />
                </button> */}
              </InputGroup.Text>
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

          {/* <button
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
          </button> */}
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
    </MotionDiv>
  );
};

export default Transactions;
