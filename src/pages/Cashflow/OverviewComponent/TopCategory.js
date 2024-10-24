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
import { getDateRanges } from "../../../components/DateRange/DateRange";
import { useSelector } from "react-redux";

const TopCategory = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const q = queryParams.get("q");
  const { period } = useSelector((state) => state.period);
  const [getCashflowListData, { isLoading }] = useGetCashflowListDataMutation();
  const [topCategory, setTopCategory] = useState([]);
  const skeletonArray = [1, 2, 3, 4, 5, 6, 7];

  const dateRange = getDateRanges(period);

  useEffect(() => {
    getAllTopCategory();
  }, [period]);

  const getAllTopCategory = async () => {
    try {
      const { data } = await getCashflowListData({
        currentStart: dateRange?.currentStart,
        currentEnd: dateRange?.currentEnd,
        from: q,
      }).unwrap();
      setTopCategory(data);
    } catch (error) {
      getError(error);
    }
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
            Top Category
          </h3>
        </div>

        <Card style={{ border: "none", borderRadius: "10px" }}>
          <Card.Body>
            <ul className="market mt-2">
              {topCategory?.length > 0 ? (
                !isLoading ? (
                  topCategory?.map((data, idx) => {
                    return (
                      <li
                        key={idx}
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
                              {data?.category}
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
                          {data?.value} $
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
                <div className="text-center">No category found!</div>
              )}
            </ul>
          </Card.Body>
        </Card>
      </Container>
    </MotionDiv>
  );
};

export default TopCategory;
