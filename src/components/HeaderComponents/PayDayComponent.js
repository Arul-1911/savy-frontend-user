import React, { useEffect, useState } from "react";
import ModalWindow from "../modals/ModalWindow";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { Card, Form, Image, InputGroup, Spinner } from "react-bootstrap";
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
  useDeletePaydayMutation,
  useGetPaydayMutation,
  useGetPaydaysMutation,
  useUpdatePaydayMutation,
} from "../../features/apiSlice";
import Skeleton from "react-loading-skeleton";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import { getDateRanges } from "../DateRange/DateRange";
import { current } from "@reduxjs/toolkit";

const PayDayComponent = ({ show, hide, active, activeLink }) => {
  const [getPaydays, { isLoading: getPaydayLoading }] = useGetPaydaysMutation();
  const [getPayday, { isLoading: paydayLoading }] = useGetPaydayMutation();
  const [updatePayday, { isLoading: updatePaydayLoading }] =
    useUpdatePaydayMutation();
  const [createPayday, { isLoading }] = useCreatePaydayMutation();
  const [deletePayday] = useDeletePaydayMutation();

  const { period } = useSelector((state) => state.period);

  const [alreadyActiveFilter, setAlreadyActiveFilter] = useState(0);
  const [alreadyActiveCalendar, setAlreadyActiveCalendar] = useState(0);

  const [paydayName, setPaydayName] = useState("");
  const [payDayDate, setPaydayDate] = useState(null);
  const [selectPayDayPeriod, setSelectPayDayPeriod] = useState("");
  const [amount, setAmount] = useState("");
  const [paydays, setPaydays] = useState([]);
  const [paydayId, setPaydayId] = useState("");

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
    if (active === 3 || period) {
      getAllPadays();
    }
  }, [active, period]);

  useEffect(() => {
    if (paydayId) {
      getSinglePayday();
    }
  }, [paydayId]);

  useEffect(() => {
    if (active === 6 && paydayId) {
      getSinglePayday();
    }
  }, [active]);

  const dateRange = getDateRanges(period);

  // ========= get paydays ===========
  const getAllPadays = async () => {
    try {
      const data = await getPaydays({
        currentStart: dateRange?.currentStart,
        currentEnd: dateRange?.currentEnd,
      }).unwrap();
      setPaydays(data);
    } catch (error) {
      getError(error);
    }
  };

  // ======= get payday =========
  const getSinglePayday = async () => {
    try {
      const { payday } = await getPayday(paydayId).unwrap();
      setPaydayName(payday?.source || "");
      setPaydayDate(payday?.pay_date?.split("T")[0] || null);
      setSelectPayDayPeriod(payday?.pay_period || "");
      setAmount(payday?.amount || "");
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

  const handlePaydayList = (paydayData) => {
    setPaydayId(paydayData?._id);
    activeLink(6);
  };

  // ========= update payday ===========
  const handleUpdatePayday = async (e) => {
    e.preventDefault();
    const paydayData = {
      source: paydayName,
      pay_date: payDayDate,
      pay_period: selectPayDayPeriod,
      amount: amount,
    };
    try {
      const data = await updatePayday({ paydayId, paydayData }).unwrap();
      getSuccess(data?.message);
      activeLink(3);
      setPaydayName("");
      setPaydayDate(null);
      setSelectPayDayPeriod("");
      setAmount("");
    } catch (error) {
      getError(error);
    }
  };

  // ============ DELETE PAYDAY ===========

  const handleDeletePayDay = async () => {
    try {
      const isDelete = window.confirm(
        "Are you sure you want to delete this PayDay"
      );
      if (isDelete) {
        const data = await deletePayday(paydayId).unwrap();
        getSuccess(data?.message);
        activeLink(1);
      } else {
        return;
      }
    } catch (error) {
      getError(error);
    } finally {
    }
  };

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
                {paydays?.paydays?.length > 0 ? (
                  !getPaydayLoading ? (
                    paydays?.paydays?.map((data) => {
                      return (
                        <div
                          onClick={() => handlePaydayList(data)}
                          key={data?._id}
                          className="mt-2"
                          style={{
                            backgroundColor: "rgba(245, 247, 248, 1)",
                            padding: "8px",
                            borderRadius: "10px",
                            cursor: "pointer",
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
                                  $20 spent of {data?.amount}
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
                                $ {data?.amount}
                              </div>
                              <div
                                className="text-end"
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
                        </div>
                      );
                    })
                  ) : (
                    [1, 2, 3, 4, 5].map((_, idx) => {
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
                  <div className="text-center">No paydays found!</div>
                )}

                <div className="d-flex justify-content-center mt-3">
                  {/* <button
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
                  </button> */}
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
                  fontSize: "16px",
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
                  fontSize: "16px",
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
                  fontSize: "16px",
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
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "var(--primary-color)",
                }}
              >
                Amount
              </Form.Label>
              <FormField
                type={"number"}
                maxLength={5}
                placeholder={"Enter amount"}
                required
                value={amount}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  const isValidNumber = /^\d{0,6}$/.test(inputValue);
                  if (isValidNumber) {
                    setAmount(e.target.value);
                  }
                }}
              />

              <div className="d-flex justify-content-center mt-3">
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
                  {!isLoading ? "Create" : <Spinner size="sm" />}
                </button>
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
                  fontSize: "16px",
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
                borderRadius: "10px",
                marginTop: "10px",
              }}
            >
              <h4
                style={{
                  fontWeight: 600,
                  fontSize: "16px",
                }}
              >
                <span style={{ color: "rgba(255, 255, 255, 0.7)" }}>
                  Total Amount:
                </span>{" "}
                ${paydays?.total}
              </h4>
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

            <Card
              className="mt-3"
              style={{
                borderRadius: "10px",
                overflowY: "scroll",
                height: "250px",
              }}
            >
              <Card.Body>
                {paydays?.paydays?.length > 0 ? (
                  !getPaydayLoading ? (
                    paydays?.paydays?.map((data) => {
                      return (
                        <div
                          onClick={() => handlePaydayList(data)}
                          key={data?._id}
                          className="mt-2"
                          style={{
                            backgroundColor: "rgba(245, 247, 248, 1)",
                            padding: "8px",
                            borderRadius: "10px",
                            cursor: "pointer",
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
                                  $20 spent of {data?.amount}
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
                                $ {data?.amount}
                              </div>
                              <div
                                className="text-end"
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
                        </div>
                      );
                    })
                  ) : (
                    [1, 2, 3, 4, 5].map((_, idx) => {
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
                  <div className="text-center">No paydays found!</div>
                )}
              </Card.Body>
            </Card>
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
            heading={"Payday"}
          />
        )}

        {active === 6 && (
          <>
            <div className="d-flex align-items-center justify-content-between">
              <IoArrowBackCircleOutline
                color="rgba(92, 182, 249, 1)"
                cursor={"pointer"}
                size={28}
                onClick={() => activeLink(3)}
              />
              <div
                style={{
                  fontWeight: 600,
                  fontSize: "16px",
                  color: "rgba(55, 73, 87, 1)",
                }}
                className="text-center"
              >
                Payday
              </div>

              <MdDelete
                size={23}
                color="red"
                cursor={"pointer"}
                onClick={handleDeletePayDay}
              />
            </div>

            {!paydayLoading ? (
              <Form onSubmit={handleUpdatePayday} className="mt-3">
                <Form.Label
                  style={{
                    fontSize: "16px",
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
                    fontSize: "16px",
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
                      setAlreadyActiveCalendar(6);
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
                    fontSize: "16px",
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
                      setAlreadyActiveFilter(6);
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
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "var(--primary-color)",
                  }}
                >
                  Amount
                </Form.Label>
                <FormField
                  type={"number"}
                  placeholder={"Enter amount"}
                  maxLength={5}
                  required
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />

                <div className="d-flex justify-content-center mt-3">
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
                    {!updatePaydayLoading ? "Confirm" : <Spinner size="sm" />}
                  </button>
                </div>
              </Form>
            ) : (
              [1, 2, 3, 4].map((_, idx) => {
                return (
                  <div key={idx}>
                    <Skeleton
                      className="rounded-2 mt-5"
                      height={"40px"}
                      width={"100%"}
                    />
                  </div>
                );
              })
            )}
          </>
        )}
      </ModalWindow>
    </>
  );
};

export default PayDayComponent;
