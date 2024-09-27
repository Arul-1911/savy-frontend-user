import React, { useEffect, useState } from "react";
import ModalWindow from "../modals/ModalWindow";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import {
  Card,
  Form,
  Image,
  InputGroup,
  ProgressBar,
  Spinner,
} from "react-bootstrap";
import FormField from "../layout/FormField";
import { CalendarSVG } from "../svg/CalendarSVG";
import { FilterSVG } from "../svg/FilterSVG";
import { Filter2SVG } from "../svg/Filter2SVG";
import Calendar from "../Calendar/Calendar";
import Filter from "../Filter/Filter";
import { getError } from "../../utils/error";
import { getSuccess } from "../../utils/success";
import {
  useCreatePaydayMutation,
  useGetPaydaysMutation,
} from "../../features/apiSlice";
import Skeleton from "react-loading-skeleton";

const PayDayComponent = ({ show, hide, active, activeLink }) => {
  const [getPaydays, { isLoading: getPaydayLoading }] = useGetPaydaysMutation();
  const [createPayday, { isLoading }] = useCreatePaydayMutation();

  const [alreadyActiveFilter, setAlreadyActiveFilter] = useState(0);
  const [alreadyActiveCalendar, setAlreadyActiveCalendar] = useState(0);

  const [paydayName, setPaydayName] = useState("");
  const [payDayDate, setPaydayDate] = useState(null);
  const [selectPayDayPeriod, setSelectPayDayPeriod] = useState("");
  const [amount, setAmount] = useState("");
  const [paydays, setPaydays] = useState([]);

  const paydayPeriod = [
    {
      text: "Next 7 days",
      value: 7,
    },
    {
      text: "Next 14 days",
      value: 14,
    },
    {
      text: "Next 30 days",
      value: 30,
    },
    {
      text: "This Month",
      value: 30,
    },
  ];

  useEffect(() => {
    if (active === 3) getAllPadays();
  }, [active]);

  // ========= get paydays ===========
  const getAllPadays = async () => {
    try {
      const { paydays } = await getPaydays().unwrap();
      setPaydays(paydays);
    } catch (error) {
      getError(error);
    }
  };

  // ========= create payday ===========
  const handleSubmit = async (e) => {
    e.preventDefault();

    const paydayData = {
      source: paydayName,
      pay_date: payDayDate,
      pay_period: selectPayDayPeriod,
      amount: amount,
    };

    try {
      if (!payDayDate || !selectPayDayPeriod) {
        throw new Error("All fields are required!");
      }
      const data = await createPayday(paydayData).unwrap();
      getSuccess(data?.message);
      setPaydayName("");
      setPaydayDate(null);
      setSelectPayDayPeriod("");
      setAmount("");
      hide(false);
      activeLink(1);
    } catch (error) {
      getError(error);
    }
  };

  // ========= edit payday ===========
  // const handleEditPayday = async (e) => {
  //   e.preventDefault();

  //   const paydayData = {
  //     source: paydayName,
  //     pay_date: payDayDate,
  //     pay_period: selectPayDayPeriod,
  //     amount: amount,
  //   };

  //   try {
  //     await createPayday(paydayData).unwrap();
  //     // setEditPaydayName("");
  //     // setEditPaydayDate(null);
  //     // setEditSelectPayDayPeriod("");
  //     // setEditAmount("");
  //     hide(false);
  //     activeLink(1);
  //   } catch (error) {
  //     getError(error);
  //   }
  // };

  return (
    <>
      <ModalWindow show={show} onHide={hide}>
        {active === 1 && (
          <>
            <div className="d-flex align-items-center">
              <IoArrowBackCircleOutline
                color="rgba(92, 182, 249, 1)"
                cursor={"pointer"}
                size={28}
                onClick={() => hide(false)}
              />
              <div
                style={{
                  margin: "auto 170px",
                  fontWeight: 600,
                  fontSize: "18px",
                  color: "rgba(55, 73, 87, 1)",
                }}
                className="text-center"
              >
                Payday
              </div>
            </div>

            <Card className="mt-3" style={{ borderRadius: "10px" }}>
              <Card.Body>
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <h2
                      style={{ color: "var(--primary-color)", fontWeight: 600 }}
                    >
                      5 days
                    </h2>
                    <div
                      style={{
                        color: "rgba(159, 175, 198, 1)",
                        fontSize: "10px",
                      }}
                    >
                      Left for this week's budget
                    </div>
                  </div>

                  <div>
                    <div
                      className="text-center"
                      style={{
                        backgroundColor: "rgba(92, 182, 249, 0.08)",
                        fontSize: "12px",
                        color: "rgba(92, 182, 249, 1)",
                        fontWeight: 500,
                        borderRadius: "15px",
                        padding: "6px",
                      }}
                    >
                      1 active budget
                    </div>
                    <div
                      className="mt-2"
                      style={{
                        color: "rgba(55, 73, 87, 1)",
                        fontSize: "10px",
                        fontWeight: 500,
                      }}
                    >
                      Weekly on wednesday
                    </div>
                  </div>
                </div>

                <div className="mt-3 mb-3">
                  <ProgressBar now={40} label={`${100}%`} visuallyHidden />
                </div>

                <div
                  className="mt-2"
                  style={{
                    backgroundColor: "rgba(245, 247, 248, 1)",
                    padding: "8px",
                    borderRadius: "10px",
                  }}
                >
                  <div className=" d-flex justify-content-between align-items-center">
                    <div className="d-flex gap-2 align-items-center">
                      <Image src="/images/Rectangle 116.png" alt="..." />
                      <div>
                        <div
                          style={{
                            fontWeight: 500,
                            color: "rgba(55, 73, 87, 1)",
                            fontSize: "12px",
                          }}
                        >
                          Cafe & Coffee
                        </div>
                        <div
                          style={{
                            fontWeight: 400,
                            color: "rgba(159, 175, 198, 1)",
                            fontSize: "10px",
                          }}
                        >
                          $20 spent of 50
                        </div>
                      </div>
                    </div>

                    <div>
                      <div
                        style={{
                          color: "var(--primary-color)",
                          fontSize: "12px",
                          fontWeight: 600,
                        }}
                      >
                        $30.00
                      </div>
                      <div
                        style={{
                          fontWeight: 400,
                          color: "rgba(159, 175, 198, 1)",
                          fontSize: "10px",
                        }}
                      >
                        remaining
                      </div>
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-center gap-3 mt-3">
                  <button
                    onClick={() => activeLink(2)}
                    className="px-2 py-2"
                    style={{
                      fontWeight: 600,
                      fontSize: "12px",
                      border: "1px solid rgba(228, 228, 228, 1)",
                      borderRadius: "20px",
                      backgroundColor: "white",
                      color: "var(--primary-color)",
                    }}
                  >
                    Edit payday
                  </button>
                  <button
                    onClick={() => activeLink(3)}
                    className="px-2 py-2"
                    style={{
                      fontWeight: 600,
                      fontSize: "12px",
                      border: "1px solid rgba(228, 228, 228, 1)",
                      borderRadius: "20px",
                      backgroundColor: "var(--primary-color)",
                      color: "white",
                    }}
                  >
                    View payday
                  </button>
                </div>
              </Card.Body>
            </Card>

            <div className="d-flex justify-content-center mt-3">
              <button
                onClick={() => activeLink(2)}
                className="w-75"
                style={{
                  fontWeight: 600,
                  fontSize: "14px",
                  border: "1px solid rgba(228, 228, 228, 1)",
                  borderRadius: "10px",
                  backgroundColor: "var(--primary-color)",
                  color: "white",
                  padding: "10px",
                }}
              >
                Create payday
              </button>
            </div>
          </>
        )}

        {active === 2 && (
          <>
            <div className="d-flex">
              <IoArrowBackCircleOutline
                color="rgba(92, 182, 249, 1)"
                cursor={"pointer"}
                size={28}
                onClick={() => activeLink(1)}
              />
              <div
                style={{
                  margin: "auto",
                  fontWeight: 600,
                  fontSize: "18px",
                  color: "rgba(55, 73, 87, 1)",
                }}
                className="text-center"
              >
                Payday
              </div>
            </div>

            <Form onSubmit={handleSubmit} className="mt-3">
              <Form.Label
                style={{
                  fontSize: "18px",
                  fontWeight: 600,
                  color: "var(--primary-color)",
                }}
              >
                Name
              </Form.Label>
              <FormField
                type={"text"}
                placeholder={"Enter name"}
                value={paydayName}
                required
                onChange={(e) => setPaydayName(e.target.value)}
              />

              <Form.Label
                style={{
                  fontSize: "18px",
                  fontWeight: 600,
                  color: "var(--primary-color)",
                }}
              >
                Payday
              </Form.Label>
              <InputGroup className="mb-3">
                <Form.Control
                  className="form-field"
                  style={{ borderRight: "none" }}
                  placeholder="Payday"
                  aria-describedby="basic-addon1"
                  value={payDayDate}
                />
                <InputGroup.Text
                  onClick={() => {
                    activeLink(5);
                    setAlreadyActiveCalendar(2);
                  }}
                  style={{ cursor: "pointer" }}
                  id="basic-addon1"
                  className="grp_input"
                >
                  <CalendarSVG />
                </InputGroup.Text>
              </InputGroup>

              <Form.Label
                style={{
                  fontSize: "18px",
                  fontWeight: 600,
                  color: "var(--primary-color)",
                }}
              >
                Payday Period
              </Form.Label>
              <InputGroup className="mb-3">
                <Form.Control
                  className="form-field"
                  style={{ borderRight: "none" }}
                  placeholder="Select period"
                  onChange={(e) => selectPayDayPeriod(e.target.value)}
                  aria-describedby="basic-addon1"
                  value={selectPayDayPeriod}
                />
                <InputGroup.Text
                  onClick={() => {
                    activeLink(4);
                    setAlreadyActiveFilter(2);
                  }}
                  style={{ cursor: "pointer" }}
                  id="basic-addon1"
                  className="grp_input"
                >
                  <FilterSVG />
                </InputGroup.Text>
              </InputGroup>

              <Form.Label
                style={{
                  fontSize: "18px",
                  fontWeight: 600,
                  color: "var(--primary-color)",
                }}
              >
                Amount
              </Form.Label>
              <FormField
                type={"text"}
                placeholder={"Enter amount"}
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />

              <div className="d-flex justify-content-center mt-3">
                {isLoading ? (
                  <button
                    className="w-75"
                    style={{
                      fontWeight: 600,
                      fontSize: "14px",
                      border: "1px solid rgba(228, 228, 228, 1)",
                      borderRadius: "10px",
                      backgroundColor: "var(--primary-color)",
                      color: "white",
                      padding: "10px",
                    }}
                  >
                    <Spinner size="sm" />
                  </button>
                ) : (
                  <button
                    className="w-75"
                    style={{
                      fontWeight: 600,
                      fontSize: "14px",
                      border: "1px solid rgba(228, 228, 228, 1)",
                      borderRadius: "10px",
                      backgroundColor: "var(--primary-color)",
                      color: "white",
                      padding: "10px",
                    }}
                  >
                    Confirm
                  </button>
                )}
              </div>
            </Form>
          </>
        )}

        {active === 3 && (
          <>
            <div className="d-flex align-items-center">
              <IoArrowBackCircleOutline
                color="rgba(92, 182, 249, 1)"
                cursor={"pointer"}
                size={28}
                onClick={() => activeLink(1)}
              />
              <div
                style={{
                  margin: "auto 180px",
                  fontWeight: 600,
                  fontSize: "18px",
                  color: "rgba(55, 73, 87, 1)",
                }}
                className="text-center"
              >
                Payday
              </div>
            </div>

            <div
              className="payday-list"
              style={{
                color: "rgba(254, 254, 254, 1)",
                textAlign: "center",
                padding: "10px",
                borderRadius: "20px",
                marginTop: "10px",
              }}
            >
              <h2
                style={{
                  fontWeight: 700,
                }}
              >
                5 days
              </h2>
              <p
                style={{
                  fontWeight: 700,
                  padding: 0,
                  margin: 0,
                  fontSize: "12px",
                }}
              >
                left for this week budget
              </p>
              <p className="payday-list-amount">
                <span style={{ color: "rgba(255, 255, 255, 0.7)" }}>
                  Total Amount:{" "}
                </span>{" "}
                $50.00
              </p>
            </div>

            <div className="d-flex align-items-center justify-content-between mt-2">
              <div
                style={{
                  color: "var(--primary-color)",
                  fontSize: "14px",
                  fontWeight: 600,
                }}
              >
                Budget lists
              </div>

              <div
                style={{ cursor: "pointer" }}
                onClick={() => {
                  activeLink(4);
                  setAlreadyActiveFilter(3);
                }}
              >
                <Filter2SVG />
              </div>
            </div>

            <Card className="mt-3" style={{ borderRadius: "10px" }}>
              <Card.Body>
                {paydays?.length > 0 ? (
                  !getPaydayLoading ? (
                    paydays?.map((data) => {
                      return (
                        <div
                          key={data?._id}
                          className="mt-2"
                          style={{
                            backgroundColor: "rgba(245, 247, 248, 1)",
                            padding: "8px",
                            borderRadius: "10px",
                          }}
                        >
                          <div className=" d-flex justify-content-between align-items-center">
                            <div className="d-flex gap-2 align-items-center">
                              <Image
                                src="/images/Rectangle 116.png"
                                alt="..."
                              />
                              <div>
                                <div
                                  style={{
                                    fontWeight: 600,
                                    color: "rgba(55, 73, 87, 1)",
                                    fontSize: "12px",
                                  }}
                                >
                                  {data?.source}
                                </div>
                                <div
                                  style={{
                                    fontWeight: 400,
                                    color: "rgba(159, 175, 198, 1)",
                                    fontSize: "12px",
                                  }}
                                >
                                  $20 spent of 50
                                </div>
                              </div>
                            </div>

                            <div>
                              <div
                                className="text-end"
                                style={{
                                  color: "var(--primary-color)",
                                  fontSize: "12px",
                                  fontWeight: 600,
                                }}
                              >
                                ${data?.amount}
                              </div>
                              <div
                                style={{
                                  fontWeight: 400,
                                  color: "rgba(159, 175, 198, 1)",
                                  fontSize: "12px",
                                }}
                              >
                                remaining
                              </div>
                            </div>
                          </div>
                          <div className="mt-1">
                            <ProgressBar
                              now={40}
                              label={`${100}%`}
                              visuallyHidden
                            />
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    [1, 2, 3].map((_, idx) => {
                      return (
                        <div key={idx}>
                          <Skeleton
                            className="rounded-2"
                            height={"40px"}
                            width={"100%"}
                          />
                        </div>
                      );
                    })
                  )
                ) : (
                  <div className="text-center">No paydays found</div>
                )}
              </Card.Body>
            </Card>

            {/* <div className="d-flex justify-content-center mt-3">
              <button
                onClick={() => activeLink(2)}
                className="w-75"
                style={{
                  fontWeight: 600,
                  fontSize: "14px",
                  border: "1px solid rgba(228, 228, 228, 1)",
                  borderRadius: "10px",
                  backgroundColor: "var(--primary-color)",
                  color: "white",
                  padding: "10px",
                }}
              >
                Edit
              </button>
            </div> */}
          </>
        )}

        {active === 4 && (
          <Filter
            already={alreadyActiveFilter}
            activeLink={activeLink}
            active={active}
            data={paydayPeriod}
            selectedPeriod={setSelectPayDayPeriod}
          />
        )}

        {active === 5 && (
          <Calendar
            already={alreadyActiveCalendar}
            activeLink={activeLink}
            active={active}
            date={payDayDate}
            setDate={setPaydayDate}
          />
        )}
      </ModalWindow>
    </>
  );
};

export default PayDayComponent;
