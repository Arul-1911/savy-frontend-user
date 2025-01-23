import React, { useEffect, useState } from "react";
import ModalWindow from "../../components/modals/ModalWindow";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { Filter2SVG } from "../../components/svg/Filter2SVG";
import {
  Card,
  Col,
  Form,
  Image,
  InputGroup,
  ProgressBar,
  Row,
  Spinner,
} from "react-bootstrap";
import { CalendarSVG } from "../../components/svg/CalendarSVG";
import Calendar from "../../components/Calendar/Calendar";
import Filter from "../../components/Filter/Filter";
// import { IoIosSettings } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { getError } from "../../utils/error";
import {
  imgAddr,
  useDeleteBudgetMutation,
  useGetBudgetMutation,
  useGetBudgetsMutation,
  useGetCategoriesMutation,
  useGetPaydaysMutation,
  useSaveBudgetMutation,
  useUpdateBudgetMutation,
} from "../../features/apiSlice";
import { LuMinusSquare } from "react-icons/lu";
import Skeleton from "react-loading-skeleton";
import { getSuccess } from "../../utils/success";
import FormField from "../../components/layout/FormField";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import { getDateRanges } from "../../components/DateRange/DateRange";

const BudgetComponents = ({ show, hide, active, activeLink }) => {
  const [alreadyActiveFilter, setAlreadyActiveFilter] = useState(0);
  const [alreadyActiveCalendar, setAlreadyActiveCalendar] = useState(0);
  const [selectBudgetPeriod, setSelectbudgetPeriod] = useState("");

  const { period } = useSelector((state) => state.period);
  const [getCategories, { isLoading }] = useGetCategoriesMutation();
  const [getPaydays, { isLoading: paydayLoading }] = useGetPaydaysMutation();

  const [saveBudget, { isLoading: budgetLoading }] = useSaveBudgetMutation();
  const [getBudgets, { isLoading: getBudgetLoading }] = useGetBudgetsMutation();
  const [getBudget, { isLoading: getBudgetListLoading }] =
    useGetBudgetMutation();
  const [updateBudget, { isLoading: updateBudgetListLoading }] =
    useUpdateBudgetMutation();
  const [deleteBudget] = useDeleteBudgetMutation();

  const [categories, setCategories] = useState([]);
  const [paydays, setPaydays] = useState([]);
  const [budgets, setBudgets] = useState([]);

  const [activeCat, setActiveCat] = useState(null);
  const [selectCategory, setSelectCategory] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [categoryImg, setCategoryImg] = useState("");

  const [selectPayday, setSelectPayday] = useState("");
  const [skipPayday, setSkipPaydays] = useState(false);

  const [budget, setBudget] = useState("");
  const [budgetId, setBudgetId] = useState("");

  const [bill, setBill] = useState(null);
  const [date, setDate] = useState(null);

  const budgetPeriod = [
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

  // Function to handle mouse enter (hover)
  const activeCategory = (index) => {
    setActiveCat((prev) => ({ ...prev, hoverIndex: index }));
  };

  // Function to handle mouse leave (remove hover effect)
  const notActiveCategory = () => {
    setActiveCat((prev) => ({ ...prev, hoverIndex: null }));
  };

  // Function to handle category click
  const handleCategoryClick = (index, value) => {
    setActiveCat({ selectedIndex: index, selectedValue: value });
    setSelectCategory(value);
  };

  useEffect(() => {
    if (active === 1) {
      getAllBudget();
    } else if (active === 2) {
      getAllCategories();
    } else if (active === 3) {
      getAllPaydays();
    }
  }, [active, period]);

  useEffect(() => {
    if (budgetId) {
      getAllPaydays();
      handleBudgetList();
      getAllCategories();
    }
  }, [budgetId]);

  // ======= Getting all categories =======
  const getAllCategories = async () => {
    try {
      const { data } = await getCategories();
      setCategories(data?.categorys);
    } catch (error) {
      getError(error);
    }
  };

  // ======= Getting all paydays =======
  const getAllPaydays = async () => {
    try {
      const data = await getPaydays({
        currentStart: dateRange?.currentStart,
        currentEnd: dateRange?.currentEnd,
      }).unwrap();
      // console.log("Payday API response:", data?.paydays);
      setPaydays(data?.paydays);
    } catch (error) {
      getError(error);
    }
  };

  const dateRange = getDateRanges(period);

  // ======= Getting all budget =======
  const getAllBudget = async () => {
    try {
      const data = await getBudgets({
        currentStart: dateRange?.currentStart,
        currentEnd: dateRange?.currentEnd,
      }).unwrap();
      setBudgets(data);
    } catch (error) {
      getError(error);
    }
  };

  const handleCheckCat = () => {
    try {
      if (!selectCategory) {
        throw new Error("Category is required!");
      } else {
        activeLink(3);
      }
    } catch (error) {
      getError(error);
    }
  };

  const handleCheckPayday = () => {
    try {
      if (!selectPayday) {
        throw new Error("Payday is required!");
      } else {
        activeLink(5);
      }
    } catch (error) {
      getError(error);
    }
  };

  // ======= Format date =======
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
    });
  };

  const createBudget = async () => {
    if (selectCategory && budget && selectPayday) activeLink(6);
  };

  // ======= Create budget =======
  const handleCreateBudget = async (e) => {
    e.preventDefault();
    const budgetData = {
      category: selectCategory?._id,
      payday: selectPayday ? selectPayday?._id : "",
      budget_amount: budget,
      date: date ? date : "",
      is_bill: bill === "on" ? true : false,
    };
    try {
      const data = await saveBudget(budgetData).unwrap();
      getSuccess(data?.message);
      activeLink(1);
      setActiveCat(null);
      setSelectCategory("");
      setSelectPayday("");
    } catch (error) {
      getError(error);
    }
  };

  // ======== Create category ======
  const handleCreateCategory = (e) => {
    e.preventDefault();
    try {
    } catch (error) {
      getError(error);
    }
  };

  const handleBudgetListData = (budgetData) => {
    setBudgetId(budgetData?._id);
    activeLink(11);
  };

  // ======== Get Single budget ===========
  const handleBudgetList = async () => {
    try {
      const { budget } = await getBudget(budgetId).unwrap();
      setBudget(budget?.budget_amount || "");
      setCategoryImg(budget?.category?.image ? budget?.category?.image : "");
      setSelectCategory(budget?.category || "");
      setSelectPayday(budget?.payday?._id || "");
      setDate((budget?.date && budget?.date.split("T")[0]) || "");
    } catch (error) {
      getError(error);
    }
  };

  // ======== update budget ===========
  const handleBudgetupdate = async (e) => {
    e.preventDefault();

    try {
      if (date) {
        const budgetData = {
          category: selectCategory,
          date: date ? date : "",
          budget_amount: budget,
        };

        const data = await updateBudget({ budgetId, budgetData }).unwrap();
        getSuccess(data?.message);
        activeLink(1);
      } else {
        const budgetData = {
          category: selectCategory,
          payday: selectPayday,
          budget_amount: budget,
        };
        const data = await updateBudget({ budgetId, budgetData }).unwrap();
        getSuccess(data?.message);
        activeLink(1);
      }
    } catch (error) {
      getError(error);
    }
  };

  // ======== delete budget ===========
  const handleDeleteBudget = async () => {
    try {
      const deleted = window.confirm(
        "Are you sure you want to delete this Budget"
      );
      if (deleted) {
        const data = await deleteBudget(budgetId).unwrap();
        getSuccess(data?.message);
        activeLink(1);
      } else return;
    } catch (error) {
      getError(error);
    }
  };

  return (
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
                margin: "auto 150px",
                fontWeight: 600,
                fontSize: "18px",
                color: "rgba(55, 73, 87, 1)",
              }}
              className="text-center"
            >
              Budget Setup
            </div>
          </div>

          <div
            className="payday-list py-1"
            style={{
              color: "rgba(254, 254, 254, 1)",
              textAlign: "center",
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
              ${budgets?.total}
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
              onClick={() => {
                activeLink(8);
                setAlreadyActiveFilter(1);
              }}
              style={{ cursor: "pointer" }}
            >
              <Filter2SVG />
            </div>
          </div>

          <Card
            className="mt-3"
            style={{
              borderRadius: "10px",
              height: "250px",
              overflowY: "scroll",
            }}
          >
            <Card.Body>
              {budgets?.budgets?.length > 0 ? (
                !getBudgetLoading ? (
                  budgets?.budgets?.map((data) => {
                    return (
                      <div
                        key={data?._id}
                        className="mt-2"
                        onClick={() => handleBudgetListData(data)}
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
                              style={{
                                width: "35px",
                                height: "35px",
                                borderRadius: "50%",
                                objectFit: "cover",
                              }}
                              src={imgAddr + data?.category?.image}
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
                                {data?.category?.name}
                              </div>
                              <div
                                style={{
                                  fontWeight: 400,
                                  color: "rgba(159, 175, 198, 1)",
                                  fontSize: "12px",
                                }}
                              >
                                {/* $20 spent of {data?.budget_amount} */}
                                {data?.budget_amount}
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
                              ${data?.budget_amount}
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
                <div className="text-center">No budget found!</div>
              )}
            </Card.Body>
          </Card>

          <div className="text-center">
            <button
              className="w-75 mt-3"
              onClick={() => activeLink(2)}
              style={{
                backgroundColor: "var(--primary-color)",
                padding: "10px",
                color: "white",
                border: "none",
                borderRadius: "10px",
              }}
            >
              Add budget
            </button>
          </div>
        </>
      )}

      {active === 2 && (
        <>
          <Row>
            <Col>
              <IoArrowBackCircleOutline
                color="rgba(92, 182, 249, 1)"
                cursor={"pointer"}
                size={28}
                onClick={() => activeLink(1)}
              />
            </Col>

            <Col>
              <div
                style={{
                  fontWeight: 600,
                  fontSize: "16px",
                  color: "rgba(55, 73, 87, 1)",
                }}
                className="text-center"
              >
                Budget Setup
              </div>
            </Col>

            <Col className="text-end">
              <button
                onClick={() => activeLink(10)}
                style={{
                  fontSize: "14px",
                  backgroundColor: "white",
                  color: "var(--primary-color)",
                  border: "1px solid rgba(226, 242, 255, 1)",
                  borderRadius: "20px",
                }}
              >
                Create
              </button>
            </Col>
          </Row>

          <div
            className="text-center mt-2 px-4"
            style={{
              fontSize: "12px",
              color: "rgba(55, 73, 87, 1)",
              fontWeight: 400,
            }}
          >
            Get the most appropriate dashboard insights for your needs. Add and
            organise widgets below.
          </div>

          {/* <div>
            <div
              className="my-3"
              style={{ fontWeight: 600, color: "var(--primary-color)" }}
            >
              Popular Categories
            </div>
            <Card style={{ borderRadius: " 10px" }}>
              <Card.Body>
                {categories.slice(0, 3)?.map((data, idx) => {
                  return (
                    <div
                      key={idx}
                      className="d-flex justify-content-between align-items-center mt-2"
                    >
                      <div
                        className="w-100 px-2"
                        style={
                          activeCat === data?.name
                            ? {
                                backgroundColor: "rgba(233, 246, 252, 1)",
                                borderRadius: "10px",
                              }
                            : { backgroundColor: "none" }
                        }
                      >
                        <div className="d-flex align-items-center gap-3">
                          <img
                            style={{
                              width: "25px",
                              height: "25px",
                              borderRadius: "50%",
                              objectFit: "contain",
                            }}
                            src={imgAddr + data?.image}
                            alt="..."
                          />
                          <div>
                            <div style={{ fontSize: "14px", fontWeight: 600 }}>
                              {data?.name}
                            </div>
                            <div style={{ fontSize: "12px", fontWeight: 400 }}>
                              {data?.bucket?.name}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </Card.Body>
            </Card>
          </div> */}

          <div>
            <div
              className="my-3"
              style={{ fontWeight: 600, color: "var(--primary-color)" }}
            >
              All Categories
            </div>
            <Card
              style={{
                borderRadius: " 10px",
                overflowY: "scroll",
                height: "300px",
              }}
            >
              <Card.Body>
                {categories?.length > 0 ? (
                  !isLoading ? (
                    categories?.map((data, idx) => {
                      return (
                        <div
                          key={data?._id}
                          className="d-flex justify-content-between align-items-center mt-2"
                        >
                          <div
                            className="w-100 py-2 px-1"
                            style={{
                              backgroundColor:
                                activeCat?.selectedIndex === idx
                                  ? "rgba(233, 246, 252, 1)"
                                  : activeCat?.hoverIndex === idx
                                  ? "rgba(233, 246, 252, 0.5)"
                                  : "white",
                              cursor: "pointer",
                              borderRadius: "5px",
                            }}
                            onMouseEnter={() => activeCategory(idx)}
                            onMouseLeave={notActiveCategory}
                            onClick={() => handleCategoryClick(idx, data)}
                          >
                            <div className="d-flex align-items-center gap-3">
                              <img
                                style={{
                                  width: "35px",
                                  height: "35px",
                                  borderRadius: "50%",
                                  objectFit: "cover",
                                }}
                                src={
                                  data?.image
                                    ? imgAddr + data?.image
                                    : "/images/Rectangle 116.png"
                                }
                                alt="..."
                              />
                              <div>
                                <div
                                  style={{ fontSize: "14px", fontWeight: 600 }}
                                >
                                  {data?.name}
                                </div>
                                <div
                                  style={{ fontSize: "10px", fontWeight: 400 }}
                                >
                                  {data?.bucket?.name}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    [1, 2, 3, 4, 5, 6].map((_, idx) => {
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
                  <div className="text-center">No categories found</div>
                )}
              </Card.Body>
            </Card>

            <div className="text-center">
              <button
                className="w-75 mt-3"
                onClick={handleCheckCat}
                style={{
                  backgroundColor: "var(--primary-color)",
                  padding: "10px",
                  color: "white",
                  border: "none",
                  borderRadius: "10px",
                }}
              >
                Continue
              </button>
            </div>
          </div>
        </>
      )}

      {active === 3 && (
        <>
          <div className="d-flex">
            <IoArrowBackCircleOutline
              color="rgba(92, 182, 249, 1)"
              cursor={"pointer"}
              size={28}
              onClick={() => activeLink(2)}
            />
            <div
              style={{
                margin: "auto",
                fontWeight: 600,
                fontSize: "16px",
                color: "rgba(55, 73, 87, 1)",
              }}
              className="text-center"
            >
              Budget Setup
            </div>
          </div>

          <div>
            <div
              className="m-2"
              style={{ fontWeight: 600, color: "var(--primary-color)" }}
            >
              Selected Category
            </div>
            <Card style={{ borderRadius: " 10px" }}>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex gap-2">
                    <div>
                      <LuMinusSquare color="var(--primary-color)" />
                    </div>
                    <div>
                      <div style={{ fontSize: "14px", fontWeight: 600 }}>
                        {selectCategory?.name}
                      </div>
                      <div style={{ fontSize: "12px", fontWeight: 400 }}>
                        {selectCategory?.bucket?.name}
                      </div>
                    </div>
                  </div>
                  <div
                    onClick={() => activeLink(2)}
                    style={{
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "var(--primary-color)",
                      cursor: "pointer",
                    }}
                  >
                    Changes
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>

          <div>
            <div
              className="m-2"
              style={{ fontWeight: 600, color: "var(--primary-color)" }}
            >
              Select Payday
            </div>

            <div className="m-2" style={{ fontSize: "12px", fontWeight: 400 }}>
              Select your payday cycle for to Avoid confusion
            </div>
            <Card
              style={{
                borderRadius: " 10px",
                overflowY: "scroll",
                height: "200px",
              }}
            >
              <Card.Body>
                {paydays?.length > 0 ? (
                  !paydayLoading ? (
                    paydays?.map((data) => {
                      return (
                        <div
                          key={data?._id}
                          className="d-flex justify-content-between align-items-center mt-2"
                        >
                          <div className="d-flex gap-2">
                            <div>
                              <input
                                type="radio"
                                checked={selectPayday?._id === data?._id}
                                onChange={() => setSelectPayday(data)}
                              />
                            </div>
                            <div>
                              <div
                                style={{ fontSize: "14px", fontWeight: 600 }}
                              >
                                {data?.source}
                              </div>
                              <div
                                style={{ fontSize: "12px", fontWeight: 400 }}
                              >
                                {data?.pay_period} days salary
                              </div>
                            </div>
                          </div>

                          <div
                            style={{
                              fontSize: "12px",
                              fontWeight: 600,
                              color: "var(--primary-color)",
                            }}
                          >
                            ${data?.amount}
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    [1, 2, 3, 4].map((_, idx) => {
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

            <div className="text-center">
              <button
                className="w-75 mt-3"
                onClick={handleCheckPayday}
                style={{
                  backgroundColor: "var(--primary-color)",
                  padding: "10px",
                  color: "white",
                  border: "none",
                  borderRadius: "10px",
                }}
              >
                Continue
              </button>

              <button
                className="w-75 mt-3"
                disabled={selectPayday && true}
                onClick={() => activeLink(4)}
                style={{
                  color: "var(--primary-color)",
                  backgroundColor: "white",
                  padding: "10px",
                  border: "none",
                  borderRadius: "10px",
                }}
              >
                Skip
              </button>
            </div>
          </div>
        </>
      )}

      {active === 4 && (
        <>
          <Form onSubmit={handleCreateBudget}>
            <div className="d-flex">
              <IoArrowBackCircleOutline
                color="rgba(92, 182, 249, 1)"
                cursor={"pointer"}
                size={28}
                onClick={() => activeLink(3)}
              />
              <div
                style={{
                  margin: "auto 160px",
                  fontWeight: 600,
                  fontSize: "16px",
                  color: "rgba(55, 73, 87, 1)",
                }}
                className="text-center"
              >
                Budget Setup
              </div>
            </div>

            <Card style={{ borderRadius: "10px" }} className="mt-4">
              <div className="text-center">
                <Image
                  style={{
                    marginTop: "-30px",
                    backgroundColor: "white",
                    objectFit: "cover",
                    borderRadius: "50%",
                  }}
                  width={"45px"}
                  height={"45px"}
                  src={imgAddr + selectCategory?.image}
                  alt="..."
                />
                <div style={{ color: "var(--primary-color)", fontWeight: 600 }}>
                  {selectCategory?.name}
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    fontWeight: 400,
                    color: "rgba(191, 191, 191, 1)",
                  }}
                >
                  Recommended: ${budget}
                </div>
              </div>

              <div className="px-3 mt-3 mb-2">
                <Form.Control
                  className="form-field budget-field py-3"
                  style={{
                    backgroundColor: "rgba(245, 247, 248, 1)",
                    fontSize: "12px",
                  }}
                  required
                  value={budget}
                  placeholder="Enter budget"
                  onChange={(e) => setBudget(e.target.value)}
                  aria-describedby="basic-addon1"
                />
              </div>
            </Card>

            <div>
              <div
                className="my-3"
                style={{ fontWeight: 600, color: "var(--primary-color)" }}
              >
                Select date
              </div>
              <InputGroup className="mb-3">
                <Form.Control
                  className="form-field"
                  style={{ borderRight: "none" }}
                  placeholder="Select Date"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  value={date}
                  required
                />
                <InputGroup.Text
                  onClick={() => {
                    activeLink(9);
                    setAlreadyActiveCalendar(4);
                  }}
                  style={{ cursor: "pointer" }}
                  id="basic-addon1"
                  className="grp_input"
                >
                  <CalendarSVG />
                </InputGroup.Text>
              </InputGroup>
            </div>

            <div>
              <div
                className="my-3"
                style={{ fontWeight: 600, color: "var(--primary-color)" }}
              >
                Is this a bill ?
              </div>
              <Card style={{ borderRadius: " 10px" }}>
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <div style={{ fontSize: "14px", fontWeight: 600 }}>
                        Bills
                      </div>
                      <div style={{ fontSize: "12px", fontWeight: 600 }}>
                        Shall we consider these as bills?
                      </div>
                    </div>

                    <div>
                      <Form.Check
                        className="custom-switch"
                        type="switch"
                        id="custom-switch"
                        onChange={(e) => setBill(e.target.value)}
                      />
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </div>

            <div>
              <div
                className="my-3"
                style={{ fontWeight: 600, color: "var(--primary-color)" }}
              >
                Selected Category
              </div>
              <Card style={{ borderRadius: " 10px" }}>
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex gap-2">
                      <div>
                        <LuMinusSquare color="var(--primary-color)" />
                      </div>
                      <div>
                        <div style={{ fontSize: "14px", fontWeight: 600 }}>
                          {selectCategory?.name}
                        </div>
                        <div style={{ fontSize: "12px", fontWeight: 400 }}>
                          Lifestyle
                        </div>
                      </div>
                    </div>
                    <div
                      onClick={() => activeLink(2)}
                      style={{
                        fontSize: "14px",
                        fontWeight: 600,
                        color: "var(--primary-color)",
                        cursor: "pointer",
                      }}
                    >
                      Changes
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </div>

            <div className="text-center">
              <button
                className="w-75 mt-3"
                type="submit"
                style={{
                  backgroundColor: "var(--primary-color)",
                  padding: "10px",
                  color: "white",
                  border: "none",
                  borderRadius: "10px",
                }}
              >
                Create
              </button>
            </div>
          </Form>
        </>
      )}

      {active === 5 && (
        <Form onSubmit={createBudget}>
          <div className="d-flex">
            <IoArrowBackCircleOutline
              color="rgba(92, 182, 249, 1)"
              cursor={"pointer"}
              size={28}
              onClick={() => activeLink(3)}
            />
            <div
              style={{
                margin: "auto 160px",
                fontWeight: 600,
                fontSize: "16px",
                color: "rgba(55, 73, 87, 1)",
              }}
              className="text-center"
            >
              Budget Setup
            </div>
          </div>

          <Card style={{ borderRadius: "10px" }} className="mt-4">
            <div className="text-center">
              <Image
                style={{
                  marginTop: "-30px",
                  backgroundColor: "white",
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
                width={"45px"}
                height={"45px"}
                src={imgAddr + selectCategory?.image}
                alt="..."
              />
              <div style={{ color: "var(--primary-color)", fontWeight: 600 }}>
                {selectCategory?.name}
              </div>
              <div
                style={{
                  fontSize: "12px",
                  fontWeight: 400,
                  color: "rgba(191, 191, 191, 1)",
                }}
              >
                Recommended: ${budget}
              </div>
            </div>

            <div className="px-3 mt-3 mb-2">
              <Form.Control
                className="form-field budget-field py-3"
                style={{
                  backgroundColor: "rgba(245, 247, 248, 1)",
                  fontSize: "12px",
                }}
                required
                value={budget}
                placeholder="Enter budget"
                onChange={(e) => setBudget(e.target.value)}
                aria-describedby="basic-addon1"
              />
            </div>
          </Card>

          <div>
            <div
              className="my-3"
              style={{ fontWeight: 600, color: "var(--primary-color)" }}
            >
              Is this a bill ?
            </div>
            <Card style={{ borderRadius: " 10px" }}>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <div style={{ fontSize: "14px", fontWeight: 600 }}>
                      Bills
                    </div>
                    <div style={{ fontSize: "12px", fontWeight: 600 }}>
                      Shall we consider these as bills?
                    </div>
                  </div>

                  <div>
                    <Form.Check
                      onChange={(e) => setBill(e.target.value)}
                      type="switch"
                      id="custom-switch"
                    />
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>

          <div>
            <div
              className="my-3"
              style={{ fontWeight: 600, color: "var(--primary-color)" }}
            >
              Selected Category
            </div>
            <Card style={{ borderRadius: " 10px" }}>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex gap-2">
                    <div>
                      <LuMinusSquare color="var(--primary-color)" />
                    </div>
                    <div>
                      <div style={{ fontSize: "14px", fontWeight: 600 }}>
                        {selectCategory?.name}
                      </div>
                      <div style={{ fontSize: "12px", fontWeight: 400 }}>
                        {selectCategory?.bucket?.name}
                      </div>
                    </div>
                  </div>
                  <div
                    onClick={() => activeLink(2)}
                    style={{
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "var(--primary-color)",
                      cursor: "pointer",
                    }}
                  >
                    Changes
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>

          <div>
            <div
              className="my-3"
              style={{ fontWeight: 600, color: "var(--primary-color)" }}
            >
              Selected payday
            </div>
            <Card style={{ borderRadius: " 10px" }}>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex gap-2">
                    <div>
                      <LuMinusSquare color="var(--primary-color)" />
                    </div>
                    <div>
                      <div style={{ fontSize: "14px", fontWeight: 600 }}>
                        {selectPayday?.source}
                      </div>
                      <div style={{ fontSize: "12px", fontWeight: 400 }}>
                        {selectPayday?.pay_period} days salary
                      </div>
                    </div>
                  </div>
                  <div
                    onClick={() => activeLink(3)}
                    style={{
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "var(--primary-color)",
                      cursor: "pointer",
                    }}
                  >
                    Changes
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>

          <div className="text-center">
            <button
              className="w-75 mt-3"
              type="submit"
              style={{
                backgroundColor: "var(--primary-color)",
                padding: "10px",
                color: "white",
                border: "none",
                borderRadius: "10px",
              }}
            >
              Confirm
            </button>
          </div>
        </Form>
      )}

      {active === 6 && (
        <>
          <div className="d-flex">
            <IoArrowBackCircleOutline
              color="rgba(92, 182, 249, 1)"
              cursor={"pointer"}
              size={28}
              onClick={() => activeLink(5)}
            />
            <div
              style={{
                margin: "auto 160px",
                fontWeight: 600,
                fontSize: "16px",
                color: "rgba(55, 73, 87, 1)",
              }}
              className="text-center"
            >
              Budget Setup
            </div>
          </div>

          <Card style={{ borderRadius: "10px" }} className="mt-4">
            <div className="text-center">
              <Image
                style={{
                  marginTop: "-30px",
                  backgroundColor: "white",
                  objectFit: "contain",
                }}
                width={"45px"}
                height={"45px"}
                src={imgAddr + selectCategory?.image}
                alt="..."
              />
              <div style={{ color: "var(--primary-color)", fontWeight: 600 }}>
                {selectCategory?.name}
              </div>
              <div
                style={{
                  fontSize: "12px",
                  fontWeight: 400,
                  color: "rgba(191, 191, 191, 1)",
                }}
              >
                Recommended: $29.49
              </div>
            </div>

            <div className="px-3 mt-3 mb-2">
              <Form.Control
                className="form-field budget-field-price py-3"
                style={{
                  backgroundColor: "rgba(245, 247, 248, 1)",
                  fontSize: "12px",
                }}
                disabled
                placeholder={`$${budget}`}
                aria-describedby="basic-addon1"
              />
            </div>
          </Card>

          <div>
            <div
              className="my-3"
              style={{ fontWeight: 600, color: "var(--primary-color)" }}
            >
              Selected Category
            </div>
            <Card style={{ borderRadius: " 10px" }}>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center mt-2">
                  <div className="d-flex gap-2">
                    <div>
                      <LuMinusSquare color="var(--primary-color)" />
                    </div>
                    <div>
                      <div style={{ fontSize: "14px", fontWeight: 600 }}>
                        {selectCategory?.name}
                      </div>
                      {/* <div style={{ fontSize: "12px", fontWeight: 400 }}>
                        Lifestyle
                      </div> */}
                    </div>
                  </div>
                  <div
                    onClick={() => activeLink(2)}
                    style={{
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "var(--primary-color)",
                      cursor: "pointer",
                    }}
                  >
                    Changes
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>

          <div>
            <div
              className="my-3"
              style={{ fontWeight: 600, color: "var(--primary-color)" }}
            >
              Selected payday
            </div>
            <Card style={{ borderRadius: " 10px" }}>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center mt-2">
                  <div className="d-flex gap-2">
                    <div>
                      <LuMinusSquare color="var(--primary-color)" />
                    </div>
                    <div>
                      <div style={{ fontSize: "14px", fontWeight: 600 }}>
                        {selectPayday?.pay_period} days salary
                      </div>
                      <div style={{ fontSize: "12px", fontWeight: 400 }}>
                        {formatDate(selectPayday?.pay_date)}
                      </div>
                    </div>
                  </div>
                  <div
                    onClick={() => activeLink(3)}
                    style={{
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "var(--primary-color)",
                      cursor: "pointer",
                    }}
                  >
                    Changes
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>

          <div className="text-center">
            <button
              className="w-75 mt-3"
              onClick={handleCreateBudget}
              style={{
                backgroundColor: "var(--primary-color)",
                padding: "10px",
                color: "white",
                border: "none",
                borderRadius: "10px",
              }}
            >
              {budgetLoading ? <Spinner size="sm" /> : "Create"}
            </button>
          </div>
        </>
      )}

      {active === 7 && (
        <>
          <div className="d-flex align-items-center justify-content-between">
            <IoArrowBackCircleOutline
              color="rgba(92, 182, 249, 1)"
              cursor={"pointer"}
              size={28}
              onClick={() => activeLink(6)}
            />
            <div
              style={{
                fontWeight: 600,
                fontSize: "16px",
                color: "rgba(55, 73, 87, 1)",
              }}
              className="text-center"
            >
              Budget
            </div>

            <button
              className="px-3 py-1"
              onClick={() => activeLink(6)}
              style={{
                border: "1px solid rgba(226, 242, 255, 1)",
                backgroundColor: "transparent",
                fontWeight: 600,
                borderRadius: "20px",
                color: "var(--primary-color)",
              }}
            >
              Edit
            </button>
          </div>

          <Card style={{ borderRadius: "10px" }} className="mt-4">
            <div className="text-center">
              <Image
                style={{ marginTop: "-30px" }}
                width={"45px"}
                height={"45px"}
                src="/icons/Merchent 3.png"
                alt="..."
              />
              <div style={{ color: "var(--primary-color)", fontWeight: 600 }}>
                Cafes & Coffee
              </div>
              <div
                style={{
                  fontSize: "12px",
                  fontWeight: 400,
                  color: "rgba(191, 191, 191, 1)",
                }}
              >
                Recommended: $29.49
              </div>
            </div>

            <div className="d-flex justify-content-between px-3 mb-2">
              <div>
                <div
                  style={{ fontSize: "10px", color: "rgba(55, 73, 87, 0.7)" }}
                >
                  Last Week
                </div>
                <div
                  className="text-center"
                  style={{ fontSize: "30px", color: "rgba(55, 73, 87, 1)" }}
                >
                  $0.00
                </div>
              </div>

              <div
                style={{
                  border: "1px solid rgba(0, 0, 0, 0.15)",
                  marginLeft: "40px",
                }}
              />

              <div>
                <div
                  style={{ fontSize: "10px", color: "rgba(55, 73, 87, 0.7)" }}
                >
                  Average (last 6 week)
                </div>
                <div
                  className="text-center"
                  style={{ fontSize: "30px", color: "rgba(55, 73, 87, 1)" }}
                >
                  $0.00
                </div>
              </div>
            </div>

            <div
              className="px-3 d-flex align-items-center justify-content-between"
              style={{
                backgroundColor: "rgba(251, 251, 251, 1)",
                borderRadius: "10px",
                padding: "10px",
              }}
            >
              <div>
                <div
                  style={{ color: "rgba(55, 73, 87, 0.7)", fontSize: "14px" }}
                >
                  Budget
                </div>
                <div
                  style={{ fontSize: "18px", color: "var(--primary-color)" }}
                >
                  $50.00
                </div>
              </div>
              <FiEdit color="var(--primary-color)" />
            </div>
          </Card>

          <div>
            <div
              className="my-3"
              style={{ fontWeight: 600, color: "var(--primary-color)" }}
            >
              View spending history
            </div>
            <Card style={{ borderRadius: " 10px" }}>
              <Card.Body>
                <div
                  style={{
                    color: "var(--primary-color)",
                    fontWeight: 600,
                    fontSize: "14px",
                  }}
                >
                  Mon 11 Mar 2024{" "}
                </div>

                <div
                  style={{
                    backgroundColor: "rgba(245, 247, 248, 1)",
                    padding: "10px",
                  }}
                  className="d-flex justify-content-between align-items-center mt-2"
                >
                  <div className="d-flex gap-2 justify-content-between align-items-center">
                    <Image
                      width={"30px"}
                      height={"30px"}
                      src="/icons/Merchent 3.png"
                      alt="..."
                    />
                    <div>
                      <div
                        style={{
                          fontSize: "14px",
                          color: "rgba(55, 73, 87, 1)",
                        }}
                      >
                        A.J Patel & P. A Patel
                      </div>
                      <div
                        style={{
                          fontSize: "12px",
                          color: "rgba(55, 73, 87, 0.8)",
                        }}
                      >
                        Hotel and Restaurant
                      </div>
                    </div>
                  </div>

                  <div>
                    <div
                      style={{
                        fontSize: "14px",
                        color: "var(--primary-color)",
                        fontWeight: 600,
                      }}
                    >
                      $30.00
                    </div>
                    <div
                      style={{
                        fontSize: "12px",
                        color: "rgba(55, 73, 87, 0.8)",
                      }}
                    >
                      Lifestyle
                    </div>
                  </div>
                </div>

                <div
                  className="text-center mt-2"
                  style={{ color: "rgba(191, 191, 191, 1)", fontSize: "12px" }}
                >
                  No more transactions
                </div>
              </Card.Body>
            </Card>
          </div>

          <div className="text-center">
            <button
              className="w-75 mt-3"
              onClick={() => hide(false)}
              style={{
                backgroundColor: "var(--primary-color)",
                padding: "10px",
                color: "white",
                border: "none",
                borderRadius: "10px",
              }}
            >
              Save
            </button>
          </div>
        </>
      )}

      {active === 8 && (
        <Filter
          already={alreadyActiveFilter}
          activeLink={activeLink}
          active={active}
          data={budgetPeriod}
          selectedPeriod={setSelectbudgetPeriod}
        />
      )}

      {active === 9 && (
        <Calendar
          already={alreadyActiveCalendar}
          activeLink={activeLink}
          active={active}
          setDate={setDate}
          date={date}
          hide={true}
        />
      )}

      {active === 10 && (
        <>
          <div className="d-flex">
            <div>
              <IoArrowBackCircleOutline
                color="rgba(92, 182, 249, 1)"
                cursor={"pointer"}
                size={28}
                onClick={() => activeLink(2)}
              />
            </div>

            <div
              style={{
                margin: "auto 160px",
                fontWeight: 600,
                fontSize: "16px",
                color: "rgba(55, 73, 87, 1)",
              }}
              className="text-center"
            >
              Budget Setup
            </div>
          </div>

          <Form className="mt-2" onSubmit={handleCreateCategory}>
            <Form.Label
              style={{ color: "var(--primary-color)", fontWeight: 600 }}
            >
              Name
            </Form.Label>
            <FormField
              type={"text"}
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder={"Enter name"}
              required
            />
            <div className="text-center">
              <button
                className="w-75 mt-3"
                onClick={() => hide(false)}
                style={{
                  backgroundColor: "var(--primary-color)",
                  padding: "10px",
                  color: "white",
                  border: "none",
                  borderRadius: "10px",
                }}
              >
                Add category
              </button>
            </div>
          </Form>
        </>
      )}

      {active === 11 && (
        <>
          <div className="d-flex align-items-center ">
            <IoArrowBackCircleOutline
              color="rgba(92, 182, 249, 1)"
              cursor={"pointer"}
              size={28}
              onClick={() => activeLink(1)}
            />
            <div
              style={{
                margin: "auto 175px",
                fontWeight: 600,
                fontSize: "16px",
                color: "rgba(55, 73, 87, 1)",
              }}
            >
              Budget
            </div>
            <MdDelete
              size={23}
              color="red"
              cursor={"pointer"}
              onClick={handleDeleteBudget}
            />
          </div>

          {!getBudgetListLoading ? (
            <Card style={{ borderRadius: "10px" }} className="mt-4">
              <Card.Body>
                <div className="text-center">
                  <div style={{ marginTop: "-40px" }}>
                    <Image
                      width={"50px"}
                      height={"50px"}
                      style={{ objectFit: "cover", borderRadius: "50%" }}
                      src={
                        categoryImg
                          ? imgAddr + categoryImg
                          : "/icons/Rectangle 116.png"
                      }
                      alt="..."
                    />
                  </div>
                  <div
                    className="mt-1"
                    style={{
                      fontWeight: 700,
                      color: "var(--primary-color)",
                      fontSize: "14px",
                    }}
                  >
                    $ {budget}
                  </div>
                </div>
              </Card.Body>
            </Card>
          ) : (
            <Skeleton
              className="rounded-2 mt-2"
              height={"100px"}
              width={"100%"}
            />
          )}

          {!getBudgetListLoading ? (
            <Form className="mt-2" onSubmit={handleBudgetupdate}>
              <Form.Label
                style={{
                  color: "var(--primary-color)",
                  fontWeight: 600,
                  fontSize: "14px",
                }}
              >
                Category
              </Form.Label>
              <FormField
                type={"dropdown"}
                options={categories}
                onChange={(e) => setSelectCategory(e.target.value)}
                required
              />

              {selectPayday ? (
                <>
                  <Form.Label
                    className="my-3"
                    style={{
                      color: "var(--primary-color)",
                      fontWeight: 600,
                      fontSize: "14px",
                    }}
                  >
                    Payday
                  </Form.Label>
                  <FormField
                    type={"dropdown"}
                    options={paydays}
                    onChange={(e) => setSelectPayday(e.target.value)}
                    required
                  />
                </>
              ) : (
                <div>
                  <div
                    className="my-3"
                    style={{
                      fontWeight: 600,
                      color: "var(--primary-color)",
                      fontSize: "14px",
                    }}
                  >
                    Select date
                  </div>
                  <InputGroup className="mb-3">
                    <Form.Control
                      className="form-field"
                      style={{ borderRight: "none" }}
                      placeholder="Select Date"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      value={date}
                      required
                    />
                    <InputGroup.Text
                      onClick={() => {
                        activeLink(9);
                        setAlreadyActiveCalendar(11);
                      }}
                      style={{ cursor: "pointer" }}
                      id="basic-addon1"
                      className="grp_input"
                    >
                      <CalendarSVG />
                    </InputGroup.Text>
                  </InputGroup>
                </div>
              )}

              <Form.Label
                style={{
                  color: "var(--primary-color)",
                  fontWeight: 600,
                  fontSize: "14px",
                }}
              >
                Amount
              </Form.Label>
              <FormField
                maxLength={5}
                type={"number"}
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                required
              />

              <div className="text-center">
                <button
                  className="w-75 mt-3"
                  style={{
                    backgroundColor: "var(--primary-color)",
                    padding: "10px",
                    color: "white",
                    border: "none",
                    borderRadius: "10px",
                  }}
                >
                  {!updateBudgetListLoading ? "Update" : <Spinner size="sm" />}
                </button>
              </div>
            </Form>
          ) : (
            [1, 2, 3].map((_, idx) => {
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
  );
};

export default BudgetComponents;
