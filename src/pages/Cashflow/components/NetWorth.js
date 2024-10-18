import React, { useEffect, useState } from "react";
import DashboardCard from "../../../components/layout/DasboardCard";
import { IoIosArrowUp } from "react-icons/io";
import { Col, Row, Image } from "react-bootstrap";
// import { CiCalendar } from "react-icons/ci";
import { IoInformationCircleOutline } from "react-icons/io5";
// import SearchField from "../../../components/layout/SearchField";
import ExcludeTransaction from "./SubComponents/ExcludeTransaction";
// import { ResponsiveContainer } from "recharts";
import BarsChart from "../../../components/Charts/BarsChart";
import { getError } from "../../../utils/error";
import { imgAddr, useGetCashflowNetMutation } from "../../../features/apiSlice";
import BucketComponet from "./SubComponents/BucketComponet";
import PieCharts from "../../../components/Charts/PieChart";
import Skeleton from "react-loading-skeleton";
import { useSelector } from "react-redux";
import { getDateRanges } from "../../../components/DateRange/DateRange";

const data = [
  {
    name: "02 Dec - 01 Jan",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "02 Jan - 01 Feb",
    uv: -3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "02 Feb - 01 Mar",
    uv: -2000,
    pv: -9800,
    amt: 2290,
  },
  {
    name: "02 Mar - Today",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
];

const COLORS = [
  { start: "rgba(36, 204, 167, 1)", end: "rgba(74, 86, 226, 1)" },
  { start: "rgba(36, 204, 167, 1)", end: "rgba(36, 204, 167, 1)" },
  { start: "rgba(36, 204, 167, 0.7)", end: "rgba(36, 204, 167, 0.7)" },
  { start: "rgba(36, 204, 167, 0.4)", end: "rgba(36, 204, 167, 0.4)" },
  { start: "rgba(36, 204, 167, 0.2)", end: "rgba(36, 204, 167, 0.2)" },
];

const NetWorth = ({ accountPortfolioActive }) => {
  const { period } = useSelector((state) => state.period);
  const [getCashflowNet, { isLoading }] = useGetCashflowNetMutation();
  const [excludeTransactionModal, setExcludeTransactionModal] = useState(false);
  const [selectBucketName, setSelectBucketName] = useState("Bucket");
  const [bucketOpen, setBucketOpen] = useState(false);
  const [net, setNet] = useState([]);

  useEffect(() => {
    if (accountPortfolioActive) {
      getNetData();
    }
  }, [accountPortfolioActive, selectBucketName, period]);

  const dateRange = getDateRanges(period);

  const getNetData = async () => {
    try {
      const { net } = await getCashflowNet({
        currentStart: dateRange?.currentStart,
        currentEnd: dateRange?.currentEnd,
        previousStart: dateRange?.previousStart,
        previousEnd: dateRange?.previousEnd,
        filter: selectBucketName.toLowerCase(),
      }).unwrap();
      setNet(net);
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

          <Row className="d-flex flex-wrap gap-4 px-2 mt-3">
            <Col>
              <div
                style={{
                  color: "rgba(55, 73, 87, 1)",
                  fontSize: "12px",
                }}
              >
                Total
              </div>
              {!isLoading ? (
                <h3
                  className="mt-2"
                  style={{ fontWeight: 600, color: "rgba(0, 74, 173, 1)" }}
                >
                  ${net?.total}
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
                  !isLoading &&
                  "d-flex justify-content-between align-items-center"
                }
              >
                {!isLoading ? (
                  <>
                    <div
                      style={{
                        color: "rgba(55, 73, 87, 0.7)",
                        fontSize: "12px",
                      }}
                    >
                      {net?.last_period?.key}
                    </div>
                    <div
                      style={{
                        color: "rgba(55, 73, 87, 1)",
                        fontSize: "14px",
                        fontWeight: 600,
                      }}
                    >
                      ${net?.last_period?.amount}
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
                  !isLoading &&
                  "mt-3 d-flex justify-content-between align-items-center"
                }
              >
                {!isLoading ? (
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
                      ${net?.last}
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
              {!isLoading ? (
                <>
                  {selectBucketName === "Bucket" && (
                    <div className="d-flex justify-content-center mt-2">
                      <PieCharts
                        COLORS={COLORS}
                        data={net?.graphData}
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
                        data={net?.graphData}
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
                        data={data}
                        barWidth={50}
                        width={"100%"}
                        height={220}
                        gradient={true}
                        gradientNumber={12}
                        cashFlowBar={true}
                        netWorth={true}
                        barGrad1={"#E2F2FF"}
                        barGrad2={"#E2F2FF"}
                        barGrad3={"#E2F2FF"}
                        barGrad4={"#004AAD"}
                      />
                    </div>
                  )}

                  {selectBucketName === "Merchant" && (
                    <div className="d-flex justify-content-center mt-2">
                      <PieCharts
                        COLORS={COLORS}
                        data={net?.graphData}
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
                        data={net?.graphData}
                        cornerRadius={2}
                        In={true}
                        width={420}
                        height={200}
                      />
                    </div>
                  )}

                  {/* <ResponsiveContainer width="100%" height="100%">
                <BarsChart
                  data={data}
                  barWidth={50}
                  width={"100%"}
                  height={220}
                  gradient={true}
                  gradientNumber={12}
                  cashFlowBar={true}
                  netWorth={true}
                  barGrad1={"#E2F2FF"}
                  barGrad2={"#E2F2FF"}
                  barGrad3={"#E2F2FF"}
                  barGrad4={"#004AAD"}
                />
              </ResponsiveContainer> */}
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
              </div> */}
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
              {!isLoading ? (
                net?.data?.map((data, idx) => {
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
                All internal transfers between your accounts have been excluded
                from your Cashflow.
              </div>
              <div
                onClick={() => setExcludeTransactionModal(true)}
                className="mt-4"
                style={{
                  cursor: "pointer",
                  color: "rgba(92, 182, 249, 1)",
                  fontSize: "12px",
                  fontWeight: 600,
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

export default NetWorth;
