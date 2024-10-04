import React, { useEffect, useState } from "react";
import DashboardCard from "../../../components/layout/DasboardCard";
import { IoIosArrowUp } from "react-icons/io";
import { Col, Row, Image } from "react-bootstrap";
// import { CiCalendar } from "react-icons/ci";
import { IoInformationCircleOutline } from "react-icons/io5";
// import SearchField from "../../../components/layout/SearchField";
import BucketComponet from "./SubComponents/BucketComponet";
import ExcludeTransaction from "./SubComponents/ExcludeTransaction";
import PieCharts from "../../../components/Charts/PieChart";
import BarsChart from "../../../components/Charts/BarsChart";
import {
  imgAddr,
  useGetCashflowMoneyInMutation,
} from "../../../features/apiSlice";
import { getError } from "../../../utils/error";
import Skeleton from "react-loading-skeleton";

const COLORS = [
  { start: "rgba(36, 204, 167, 1)", end: "rgba(74, 86, 226, 1)" },
  { start: "rgba(36, 204, 167, 1)", end: "rgba(36, 204, 167, 1)" },
  { start: "rgba(36, 204, 167, 0.7)", end: "rgba(36, 204, 167, 0.7)" },
  { start: "rgba(36, 204, 167, 0.4)", end: "rgba(36, 204, 167, 0.4)" },
  { start: "rgba(36, 204, 167, 0.2)", end: "rgba(36, 204, 167, 0.2)" },
];

const MoneyIn = ({ accountPortfolioActive }) => {
  const [getCashflowMoneyIn, { isLoading: inLoading }] =
    useGetCashflowMoneyInMutation();
  const [bucketOpen, setBucketOpen] = useState(false);
  const [selectBucketName, setSelectBucketName] = useState("Bucket");
  const [moneyIn, setMoneyIn] = useState({});
  const [excludeTransactionModal, setExcludeTransactionModal] = useState(false);

  useEffect(() => {
    if (accountPortfolioActive === 2) {
      getMoneyInData();
    }
  }, [accountPortfolioActive, selectBucketName]);

  const getMoneyInData = async () => {
    try {
      const { moneyIn } = await getCashflowMoneyIn({
        date: "last_month",
        filter: selectBucketName.toLowerCase(),
      }).unwrap();
      setMoneyIn(moneyIn);
    } catch (error) {
      getError(error);
    }
  };

  return (
    <div>
      <div className="mt-4">
        <DashboardCard>
          <div className="d-flex align-items-center flex-wrap gap-3">
            <h3
              style={{
                fontWeight: 600,
              }}
            >
              Statistics /{" "}
              <span style={{ color: "rgba(0, 39, 91, 0.6)" }}>
                {selectBucketName}
              </span>
            </h3>
            <button
              className="d-flex gap-2 align-items-center"
              onClick={() => setBucketOpen(true)}
              style={{
                padding: "8px",
                backgroundColor: "rgba(242, 249, 255, 1)",
                borderRadius: "22px",
                fontSize: "12px",
                color: "rgba(92, 182, 249, 1)",
                fontWeight: 600,
                cursor: "pointer",
                border: "1px solid rgba(92, 182, 249, 1)",
              }}
            >
              {selectBucketName} <IoIosArrowUp size={18} />
            </button>

            {/* <button
              className="d-flex gap-2 align-items-center"
              style={{
                padding: "8px",
                backgroundColor: "rgba(242, 249, 255, 1)",
                borderRadius: "22px",
                fontSize: "12px",
                color: "rgba(92, 182, 249, 1)",
                fontWeight: 600,
                cursor: "pointer",
                border: "1px solid rgba(92, 182, 249, 1)",
              }}
            >
              Past month <IoIosArrowUp size={18} />
            </button> */}
          </div>

          <Row className="d-flex gap-4 px-2 mt-3">
            <Col>
              <div
                style={{
                  color: "rgba(55, 73, 87, 1)",
                  fontSize: "12px",
                }}
              >
                Total
              </div>
              {!inLoading ? (
                <h3
                  className="mt-2"
                  style={{ fontWeight: 600, color: "rgba(0, 74, 173, 1)" }}
                >
                  ${moneyIn?.total}
                </h3>
              ) : (
                <Skeleton
                  className="rounded-2"
                  height={"40px"}
                  width={"100%"}
                />
              )}
              <hr />

              <div
                className={
                  !inLoading
                    ? "d-flex justify-content-between align-items-center"
                    : ""
                }
              >
                {!inLoading ? (
                  <>
                    <div
                      style={{
                        color: "rgba(55, 73, 87, 0.7)",
                        fontSize: "12px",
                      }}
                    >
                      {moneyIn?.last_period?.key}
                    </div>
                    <div
                      style={{
                        color: "rgba(55, 73, 87, 1)",
                        fontSize: "14px",
                        fontWeight: 600,
                      }}
                    >
                      ${moneyIn?.last_period?.amount}
                    </div>
                  </>
                ) : (
                  <Skeleton
                    className="rounded-2"
                    height={"40px"}
                    width={"100%"}
                  />
                )}
              </div>

              <div
                className={
                  !inLoading
                    ? "mt-3 d-flex justify-content-between align-items-center"
                    : ""
                }
              >
                {!inLoading ? (
                  <>
                    <div
                      style={{
                        color: "rgba(55, 73, 87, 0.7)",
                        fontSize: "12px",
                      }}
                    >
                      Last period
                    </div>
                    <div
                      style={{
                        color: "rgba(55, 73, 87, 1)",
                        fontSize: "14px",
                        fontWeight: 600,
                      }}
                    >
                      ${moneyIn?.last}
                    </div>
                  </>
                ) : (
                  <Skeleton
                    className="rounded-2"
                    height={"40px"}
                    width={"100%"}
                  />
                )}
              </div>
            </Col>

            <Col>
              {!inLoading ? (
                <>
                  {selectBucketName === "Bucket" && (
                    <div className="d-flex justify-content-center mt-2">
                      <PieCharts
                        COLORS={COLORS}
                        data={moneyIn?.graphData}
                        cornerRadius={2}
                        In={true}
                        width={420}
                        height={200}
                      />
                    </div>
                  )}

                  {selectBucketName === "Category" && (
                    <div className="d-flex justify-content-center mt-2">
                      <PieCharts
                        COLORS={COLORS}
                        data={moneyIn?.graphData}
                        cornerRadius={2}
                        In={true}
                        width={420}
                        height={200}
                      />
                    </div>
                  )}

                  {selectBucketName === "Transaction" && (
                    <div className="d-flex justify-content-center">
                      <BarsChart
                        data={moneyIn?.graphData}
                        width={450}
                        height={220}
                        barWidth={50}
                        gradient={true}
                        gradientNumber={4}
                        cashFlow={true}
                        barGrad1={"#3AC3AC"}
                        barGrad2={"#3AC3AC"}
                        barGrad3={"#374957"}
                        barGrad4={"#374957"}
                      />
                    </div>
                  )}

                  {selectBucketName === "Merchant" && (
                    <div className="d-flex justify-content-center mt-2">
                      <PieCharts
                        COLORS={COLORS}
                        data={moneyIn?.graphData}
                        cornerRadius={2}
                        In={true}
                        width={420}
                        height={200}
                      />
                    </div>
                  )}

                  {selectBucketName === "Tag" && (
                    <div className="d-flex justify-content-center mt-2">
                      <PieCharts
                        COLORS={COLORS}
                        data={moneyIn?.graphData}
                        cornerRadius={2}
                        In={true}
                        width={420}
                        height={200}
                      />
                    </div>
                  )}
                </>
              ) : (
                <Skeleton
                  className="rounded-2"
                  height={"200px"}
                  width={"100%"}
                />
              )}
            </Col>
          </Row>
        </DashboardCard>
      </div>

      <Row className="mt-3 ">
        <Col>
          <DashboardCard>
            <div className="d-flex align-items-center gap-3">
              <div
                style={{
                  color: "rgba(0, 39, 91, 1)",
                  fontWeight: 600,
                  fontSize: "18px",
                  cursor: "pointer",
                }}
              >
                {selectBucketName}
              </div>
              {/* <div className="w-25">
                <SearchField />
              </div>
              <button
                className="d-flex gap-2 align-items-center"
                style={{
                  padding: "8px",
                  backgroundColor: "rgba(242, 249, 255, 1)",
                  borderRadius: "22px",
                  fontSize: "12px",
                  color: "rgba(92, 182, 249, 1)",
                  fontWeight: 600,
                  cursor: "pointer",
                  border: "1px solid rgba(92, 182, 249, 1)",
                }}
              >
                <CiCalendar size={18} /> 8 feb today
              </button> */}

              <button
                className="d-flex gap-2 align-items-center"
                style={{
                  padding: "8px",
                  backgroundColor: "rgba(242, 249, 255, 1)",
                  borderRadius: "22px",
                  fontSize: "12px",
                  color: "rgba(92, 182, 249, 1)",
                  fontWeight: 600,
                  cursor: "pointer",
                  border: "1px solid rgba(92, 182, 249, 1)",
                }}
              >
                Amount <IoIosArrowUp size={18} />
              </button>
            </div>

            <ul className="market mt-2">
              {!inLoading ? (
                moneyIn?.data?.map((data, idx) => {
                  return (
                    <li
                      key={idx}
                      className="d-flex justify-content-between align-items-center "
                    >
                      <div className="d-flex align-items-center gap-2 w-50 text-truncate">
                        <Image
                          width={"35px"}
                          height={"35px"}
                          style={{ borderRadius: "50%", objectFit: "cover" }}
                          src={
                            data?.image
                              ? imgAddr + data?.image
                              : "/icons/Merchant 1.png"
                          }
                          alt="..."
                        />

                        <div
                          style={{
                            fontSize: "rgba(55, 73, 87, 1)",
                            fontSize: "16px",
                          }}
                        >
                          {selectBucketName !== "Transaction"
                            ? data?.name
                            : data?.description}
                        </div>
                      </div>

                      {selectBucketName !== "Transaction" && (
                        <div>{data?.percent}%</div>
                      )}

                      <div
                        style={{
                          color: "var(--primary-color)",
                          fontSize: "20px",
                          fontWeight: 800,
                        }}
                      >
                        {selectBucketName !== "Transaction"
                          ? data?.value
                          : data?.amount}{" "}
                        $
                      </div>
                    </li>
                  );
                })
              ) : (
                <li>
                  <Skeleton
                    className="rounded-2 mb-2"
                    height={"40px"}
                    width={"100%"}
                  />
                </li>
              )}
            </ul>
          </DashboardCard>
        </Col>
      </Row>

      {selectBucketName !== "Tags" && (
        <Row className="mt-3">
          <Col>
            <DashboardCard>
              <div className="text-center">
                <div
                  style={{
                    color: "rgba(0, 39, 91, 1)",
                    fontWeight: 600,
                    fontSize: "18px",
                    cursor: "pointer",
                  }}
                >
                  All internal transfers between your accounts have been
                  excluded from your Cashflow.
                </div>
                <div
                  className="mt-4"
                  onClick={() => setExcludeTransactionModal(true)}
                  style={{
                    color: "rgba(92, 182, 249, 1)",
                    fontSize: "12px",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  <IoInformationCircleOutline
                    color="rgba(0, 74, 173, 1)"
                    cursor={"pointer"}
                  />{" "}
                  How do excluded transactions work?
                </div>
              </div>
            </DashboardCard>
          </Col>
        </Row>
      )}

      {/* Bucket  */}
      <BucketComponet
        onChange={setSelectBucketName}
        show={bucketOpen}
        hide={setBucketOpen}
      />

      {/* Bucket  */}
      <ExcludeTransaction
        show={excludeTransactionModal}
        hide={setExcludeTransactionModal}
      />
    </div>
  );
};

export default MoneyIn;
