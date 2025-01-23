import React, { useEffect, useState } from "react";
import { MotionDiv } from "../../../components";
import { Card, Container, Image } from "react-bootstrap";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { getError } from "../../../utils/error";
import {
  imgAddr,
  useGetCashflowListDataMutation,
} from "../../../features/apiSlice";
import { useLocation, useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { useSelector } from "react-redux";
import { getDateRanges } from "../../../components/DateRange/DateRange";
import { selectAccountId } from "../../../features/authSlice";

const TopTransaction = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const q = queryParams.get("q");
  const { period } = useSelector((state) => state.period);
  const [getCashflowListData, { isLoading }] = useGetCashflowListDataMutation();

  const [topTransactions, setTopTransactions] = useState([]);
  const skeletonArray = [1, 2, 3, 4, 5, 6, 7];

   const accountID = useSelector(selectAccountId);

  const dateRange = getDateRanges(period);

  useEffect(() => {
    getAllTopCategory();
  }, [period, accountID]);

  const getAllTopCategory = async () => {
    try {
      const { data } = await getCashflowListData({
        currentStart: dateRange?.currentStart,
        currentEnd: dateRange?.currentEnd,
        from: q,
        account_id: accountID,
      }).unwrap();
      setTopTransactions(data);
    } catch (error) {
      getError(error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const options = { day: "2-digit", month: "short", year: "numeric" };
    return new Intl.DateTimeFormat("en-GB", options).format(date);
  };

  return (
    <MotionDiv>
      <Container>
        <div className="d-flex align-items-center gap-3">
          <IoArrowBackCircleOutline
            color="rgba(92, 182, 249, 1)"
            className="text-start"
            style={{ cursor: "pointer" }}
            size={30}
            onClick={() => navigate("/user/cashflow")}
          />
          <h3
            style={{
              fontWeight: 500,
            }}
          >
            Recent Larget Transactions
          </h3>
        </div>

        <Card style={{ border: "none", borderRadius: "10px", width:'auto' }}>
          <Card.Body>
            <ul className="market mt-2">
              {topTransactions?.length > 0 ? (
                !isLoading ? (
                  topTransactions?.map((data) => {
                    return (
                      <li
                        key={data?._id}
                        className="d-flex gap-3 justify-content-between align-items-center "
                      >
                        <div className="d-flex align-items-center gap-2">
                          <Image
                            width={"50px"}
                            height={"50px"}
                            style={{ borderRadius: "50%", objectFit: "cover" }}
                            src={
                              data?.image
                                ? imgAddr + data?.image
                                : "/icons/Merchant 1.png"
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
                              {data?.description}
                            </div>
                            <div
                            className="text-truncate"
                              style={{
                                fontSize: "rgba(55, 73, 87, 0.7)",
                                fontSize: "12px",
                                fontWeight: 400,
                              }}
                            >
                              {data?.bucket?.name}
                            </div>
                          </div>
                        </div>

                        <div>
                          <div
                            // className="text-end"
                            style={{
                              color: "var(--primary-color)",
                              fontSize: "20px",
                              fontWeight: 800,
                            }}
                          >
                            {data?.amount} $
                          </div>
                          <div
                            style={{
                              color: "rgba(55, 73, 87, 0.7)",
                              fontWeight: 400,
                              fontSize: "12px",
                            }}
                          >
                            {formatDate(data?.date)}
                          </div>
                        </div>
                      </li>
                    );
                  })
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
                )
              ) : (
                <div className="text-center">No transactions found!</div>
              )}
            </ul>
          </Card.Body>
        </Card>
      </Container>
    </MotionDiv>
  );
};

export default TopTransaction;
