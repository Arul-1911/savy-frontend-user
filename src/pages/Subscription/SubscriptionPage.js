import React, { useEffect, useState } from "react";
import { Button, Col, Row, Spinner } from "react-bootstrap";
import PlanCard from "./Components/PlanCard";
import { MotionDiv } from "../../components";
import { Link } from "react-router-dom";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import GradientText from "../../components/layout/GradientText";
import { getError } from "../../utils/error";
import { useGetSubscriptionsMutation } from "../../features/apiSlice";
import Skeleton from "react-loading-skeleton";

function SubscriptionPage() {
  const [selectedCard, setSelectedCard] = useState(null);
  const [subscriptions, setSubscriptions] = useState([]);

  const [getSubscriptions, { isLoading }] = useGetSubscriptionsMutation();

  useEffect(() => {
    if (selectedCard !== null) {
      const nonSelectedCards = document.querySelectorAll(
        ".non-selected-card-div"
      );
      nonSelectedCards.forEach((card) => {
        card.addEventListener(
          "transitionend",
          () => {
            card.classList.add("position-absolute");
          },
          { once: true }
        );
      });
    }
  }, [selectedCard]);

  useEffect(() => {
    getAllPlans();
  }, []);

  const getAllPlans = async () => {
    try {
      const { data } = await getSubscriptions();
      setSubscriptions(data?.plans);
    } catch (error) {
      getError(error);
    }
  };

  const colorData = {
    RetireSmart: {
      bgColor: "linear-gradient(180deg, #5CB6F9 0%, #004AAD 100%)",
    },
    RewardSmart: { bgColor: "rgba(0, 74, 173, 1)" },
    Rudimentary: { bgColor: "rgba(55, 73, 87, 1)" },
    SayvFree: {
      textColor: "var(--primary-color)",
      bgColor: "rgba(217, 217, 217, 1)",
    },
  };

  return (
    <MotionDiv>
      <div className="d-flex">
        <Link to={-1}>
          <IoArrowBackCircleOutline
            color="rgba(92, 182, 249, 1)"
            className="text-start mb-1 me-1"
            size={30}
          />
        </Link>
        <h4>
          <GradientText
            text={"Subscription Plan"}
            color={"linear-gradient(270deg, #5CB6F9 0%, #004AAD 100%)"}
          />
        </h4>
      </div>

      <Row className="pt-3">
        <Col className="text-center">
          {selectedCard === null ? (
            <>
              <h5 style={{ color: "#374957", fontWeight: "600" }}>
                Saving smarter is 30 seconds away
              </h5>
              <p style={{ color: "var(--primary-color)", fontWeight: "600" }}>
                Find the plan that's right for you
              </p>
            </>
          ) : (
            <>
              <h5 style={{ color: "#374957", fontWeight: "600" }}>
                Subscription Plan
              </h5>
              <p style={{ color: "var(--primary-color)", fontWeight: "600" }}>
                Selected Subscription Plan
              </p>
            </>
          )}
        </Col>
      </Row>
      <Row
        className="justify-content-center p-3"
        style={{ overflow: "hidden", position: "relative" }}
      >
        {!isLoading
          ? subscriptions?.map((plan, i) => (
              <Col
                lg={3}
                md={4}
                sm={12}
                className={`p-2 ${
                  selectedCard != null
                    ? selectedCard === i
                      ? "selected-card-div"
                      : "non-selected-card-div"
                    : "plan-card-div"
                }`}
              >
                <PlanCard
                  id={i}
                  setSelectedCard={setSelectedCard}
                  title={plan?.plan_name}
                  save={33}
                  textColor={colorData[plan?.plan_name].textColor}
                  bgColor={colorData[plan?.plan_name].bgColor}
                  annualPrice={plan?.annual_price}
                  monthlyPrice={plan?.monthly_price}
                  tagline={plan?.tag_line}
                  featureTitle={plan?.features?.title}
                  features={plan?.features?.available_features}
                />
              </Col>
            ))
          : [1, 2, 3, 4].map((_, i) => (
              <Col key={i} lg={3} md={4} sm={12} className={`p-2`}>
                <Skeleton
                  className="rounded-4"
                  height={"450px"}
                  width={"100%"}
                />
              </Col>
            ))}
      </Row>

      {selectedCard === null ? null : (
        <Row>
          <Col className="text-center">
            <Button
              className="border-0 px-4"
              onClick={() => setSelectedCard(null)}
              style={{
                fontWeight: 600,
                backgroundColor: "var(--primary-color)",
              }}
            >
              Change Subscription Plan
            </Button>
          </Col>
        </Row>
      )}
    </MotionDiv>
  );
}

export default SubscriptionPage;
