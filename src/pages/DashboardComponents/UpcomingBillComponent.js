import React, { useEffect, useState } from "react";
import ModalWindow from "../../components/modals/ModalWindow";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import {
  Card,
  Form,
  Image,
  InputGroup,
  ProgressBar,
  Spinner,
} from "react-bootstrap";
import { CalendarSVG } from "../../components/svg/CalendarSVG";
import FormField from "../../components/layout/FormField";
import { IoIosArrowDown } from "react-icons/io";
import { FaRegCheckCircle } from "react-icons/fa";
import "../Dashboard.css";
import Calendar from "../../components/Calendar/Calendar";
import { CiSquareMinus } from "react-icons/ci";
import {
  imgAddr,
  useCreateBillMutation,
  useGetBillsMutation,
  useGetBudgetsMutation,
  useGetCategoriesMutation,
} from "../../features/apiSlice";
import { getError } from "../../utils/error";
import { LuMinusSquare } from "react-icons/lu";
import Skeleton from "react-loading-skeleton";
import { getSuccess } from "../../utils/success";

const UpcomingBillComponents = ({ show, hide, active, activeLink }) => {
  const [getCategories, { isLoading }] = useGetCategoriesMutation();
  const [getBudgets, { isLoading: budgetLoading }] = useGetBudgetsMutation();
  const [createBill, { isLoading: billLoading }] = useCreateBillMutation();
  const [getBills, { isLoading: getBillsLoading }] = useGetBillsMutation();

  const [selectActivePeriod, setSelectActivePeriod] = useState(0);
  const [activePopularCat, setActivePopularCat] = useState(0);
  const [activeCat, setActiveCat] = useState(null);
  const [activeBudget, setActiveBudget] = useState(null);

  const [openCalendar, setOpenCalendar] = useState(false);

  const [categories, setCategories] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [selectCategory, setSelectCategory] = useState("");
  const [selectBudget, setSelectBudget] = useState("");
  const [amount, setAmount] = useState("");
  const [bills, setBills] = useState([]);

  const periods = [
    "Next 7 days",
    "Next 14 days",
    "Next 30 days",
    "This month",
    "This pay cycle",
    "Next pay cycle",
    "Calendar fortnight",
  ];

  const activePeriods = (index) => {
    setSelectActivePeriod(index);
  };

  const popularCat = [
    {
      text: "Restaurants",
      subText: "Lifestyle",
    },
    {
      text: "Electricity",
      subText: "Home",
    },
    {
      text: "Restaurants",
      subText: "Lifestyle",
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

  // Function to handle mouse enter (hover)
  const activeBudgets = (index) => {
    setActiveBudget((prev) => ({ ...prev, hoverIndex: index }));
  };

  // Function to handle mouse leave (remove hover effect)
  const notActiveBudgets = () => {
    setActiveBudget((prev) => ({ ...prev, hoverIndex: null }));
  };

  // Function to handle budget click
  const handleBudgetClick = (index, value) => {
    setActiveBudget({ selectedIndex: index, selectedValue: value });
    setSelectBudget(value);
  };

  // required category
  const handleChangeCategory = () => {
    try {
      if (!selectCategory) {
        throw new Error("Category is required");
      } else {
        activeLink(4);
      }
    } catch (error) {
      getError(error);
    }
  };

  // required budget
  const handleChangeBudget = () => {
    try {
      if (!selectBudget) {
        throw new Error("Budget is required");
      } else {
        activeLink(5);
      }
    } catch (error) {
      getError(error);
    }
  };

  useEffect(() => {
    if (active === 1) {
      getAllBills();
    } else if (active === 3) {
      getAllCategories();
    } else if (active === 4) {
      getAllBudget();
    }
  }, [active]);

  const getAllBills = async () => {
    try {
      const { bills } = await getBills().unwrap();
      setBills(bills);
    } catch (error) {
      getError(error);
    }
  };

  // ======= Getting all categories =======
  const getAllCategories = async () => {
    try {
      const { categorys } = await getCategories().unwrap();
      setCategories(categorys);
    } catch (error) {
      getError(error);
    }
  };

  // ======= Getting all budget =======
  const getAllBudget = async () => {
    try {
      const { budgets } = await getBudgets().unwrap();
      setBudgets(budgets);
    } catch (error) {
      getError(error);
    }
  };

  const handleCreateBill = async (e) => {
    e.preventDefault();
    try {
      const budgetData = {
        category: selectCategory._id,
        budget: selectBudget._id,
        budget_amount: amount,
      };
      const data = await createBill(budgetData).unwrap();
      getSuccess(data?.message);
      hide(true);
      activeLink(1);
      setActiveCat(null);
      setActiveBudget(null);
      setSelectBudget("");
      setSelectCategory("");
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
                margin: "auto 180px",
                fontWeight: 600,
                fontSize: "18px",
                color: "rgba(55, 73, 87, 1)",
              }}
              className="text-center"
            >
              Bills
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
              $-
            </h2>
            <p
              style={{
                fontWeight: 700,
                padding: 0,
                margin: 0,
                fontSize: "12px",
                color: "rgba(255, 255, 255, 0.89)",
              }}
            >
              Total bills due
            </p>

            <button
              onClick={() => activeLink(2)}
              className="w-50 py-1 mt-2"
              style={{
                backgroundColor: "rgba(255, 255, 255, 1)",
                color: "var(--primary-color)",
                borderRadius: "20px",
                outline: "none",
                border: "none",
              }}
            >
              All Bills <IoIosArrowDown />
            </button>
          </div>

          <div className="mt-2 text-center">
            <div
              style={{
                color: "var(--primary-color)",
                fontSize: "14px",
                fontWeight: 600,
              }}
            >
              We didn’t find any bills
            </div>

            <div
              style={{
                cursor: "pointer",
                fontSize: "12px",
                color: "rgba(55, 73, 87, 1)",
              }}
            >
              Track recurring transactions and we’ll remind you before they’re
              next due
            </div>

            <div
              style={{
                cursor: "pointer",
                fontSize: "10px",
                color: "rgba(191, 191, 191, 1)",
              }}
            >
              E.g. Rent, utilities, subscriptions, insurance.
            </div>
          </div>

          <Card className="mt-3" style={{ borderRadius: "10px" }}>
            <Card.Body>
              {bills?.length > 0 ? (
                !getBillsLoading ? (
                  bills?.map((data) => {
                    return (
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
                                  fontWeight: 600,
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
                <div className="text-center">No bills found</div>
              )}
            </Card.Body>
          </Card>

          <div className="text-center">
            <button
              className="w-75 mt-3"
              onClick={() => activeLink(3)}
              style={{
                backgroundColor: "var(--primary-color)",
                padding: "10px",
                color: "white",
                border: "none",
                borderRadius: "10px",
              }}
            >
              Add Bills
            </button>
          </div>
        </>
      )}

      {active === 2 && (
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
                fontSize: "16px",
                fontWeight: 600,
                textAlign: "center",
                margin: "auto 150px",
              }}
            >
              Select period
            </div>
          </div>

          <div className="mt-2">
            {periods?.map((prd, idx) => {
              return (
                <div key={idx}>
                  <div className="d-flex align-items-center justify-content-between">
                    <div
                      style={
                        selectActivePeriod === idx
                          ? {
                              color: "rgba(92, 182, 249, 1)",
                              fontWeight: 600,
                              cursor: "pointer",
                            }
                          : {
                              color: "var(--primary-color)",
                              fontWeight: 600,
                              cursor: "pointer",
                            }
                      }
                      onClick={() => activePeriods(idx)}
                    >
                      {prd}
                    </div>
                    {selectActivePeriod === idx && (
                      <FaRegCheckCircle
                        color="rgba(92, 182, 249, 1)"
                        size={22}
                      />
                    )}
                  </div>
                  <hr />
                </div>
              );
            })}
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
              onClick={() => activeLink(1)}
            />
            <div
              style={{
                margin: "auto 170px",
                fontWeight: 600,
                fontSize: "16px",
                color: "rgba(55, 73, 87, 1)",
              }}
              className="text-center"
            >
              Add bills
            </div>
          </div>

          <div
            className="text-center  px-4"
            style={{
              fontSize: "12px",
              color: "rgba(55, 73, 87, 1)",
              fontWeight: 400,
            }}
          >
            Get the most appropriate dashboard insights for your needs. Add and
            organise widgets below.
          </div>

          <div>
            <div
              className=""
              style={{ fontWeight: 600, color: "var(--primary-color)" }}
            >
              Popular Categories
            </div>
            <Card style={{ borderRadius: " 10px" }}>
              <Card.Body>
                {popularCat?.map((data, idx) => {
                  return (
                    <div
                      key={idx}
                      className="d-flex justify-content-between align-items-center mt-1"
                    >
                      <div
                        className="w-100"
                        style={
                          activePopularCat === idx
                            ? {
                                backgroundColor: "rgba(233, 246, 252, 1)",
                                cursor: "pointer",
                              }
                            : { backgroundColor: "white", cursor: "pointer" }
                        }
                        onMouseEnter={() => setActivePopularCat(idx)}
                        onMouseLeave={() => setActivePopularCat(null)}
                      >
                        <div style={{ fontSize: "12px", fontWeight: 600 }}>
                          {data?.text}
                        </div>
                        <div style={{ fontSize: "10px", fontWeight: 400 }}>
                          {data?.subText}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </Card.Body>
            </Card>
          </div>

          <div>
            <div
              className="my-1"
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
                          key={idx}
                          className="d-flex justify-content-between align-items-center mt-2"
                        >
                          <div
                            className="w-100 py-1 px-1"
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
                                  objectFit: "contain",
                                  width: "25px",
                                  height: "25px",
                                  borderRadius: "50%",
                                }}
                                src={imgAddr + data?.image}
                                alt="..."
                              />
                              <div>
                                <div
                                  style={{ fontSize: "12px", fontWeight: 600 }}
                                >
                                  {data?.name}
                                </div>
                                <div
                                  style={{ fontSize: "10px", fontWeight: 400 }}
                                >
                                  Lifestyle
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
                  <div className="text-center">No category found</div>
                )}
              </Card.Body>
            </Card>

            <div className="text-center">
              <button
                className="w-75 mt-3"
                onClick={handleChangeCategory}
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

      {active === 4 && (
        <>
          <div className="d-flex">
            <IoArrowBackCircleOutline
              color="rgba(92, 182, 249, 1)"
              cursor={"pointer"}
              size={28}
              onClick={() => activeLink(3)}
            />
            <div
              style={{
                margin: "auto 170px",
                fontWeight: 600,
                fontSize: "16px",
                color: "rgba(55, 73, 87, 1)",
              }}
              className="text-center"
            >
              Add bills
            </div>
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
                <div className="d-flex justify-content-between align-items-center mt-2">
                  <div className="d-flex gap-2">
                    <div>
                      <CiSquareMinus size={20} color="var(--primary-color)" />
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

          <div>
            <div
              className="mt-1"
              style={{ fontWeight: 600, color: "var(--primary-color)" }}
            >
              Selected Budget
            </div>

            <div style={{ fontSize: "12px", fontWeight: 400 }}>
              Select your budget to link your bills
            </div>
            <Card
              style={{
                borderRadius: " 10px",
                overflowY: "scroll",
                height: "300px",
              }}
            >
              <Card.Body>
                {!budgetLoading
                  ? budgets?.map((data, idx) => {
                      return (
                        <div
                          key={idx}
                          className="d-flex justify-content-between align-items-center mt-2 w-100 py-2 px-1"
                          style={{
                            backgroundColor:
                              activeBudget?.selectedIndex === idx
                                ? "rgba(233, 246, 252, 1)"
                                : activeBudget?.hoverIndex === idx
                                ? "rgba(233, 246, 252, 0.5)"
                                : "white",
                            cursor: "pointer",
                            borderRadius: "5px",
                          }}
                          onMouseEnter={() => activeBudgets(idx)}
                          onMouseLeave={notActiveBudgets}
                          onClick={() => handleBudgetClick(idx, data)}
                        >
                          <div className="d-flex gap-2">
                            <div>
                              <div
                                style={{ fontSize: "12px", fontWeight: 600 }}
                              >
                                Restaurant
                              </div>
                              <div
                                style={{ fontSize: "10px", fontWeight: 400 }}
                              >
                                ${data?.budget_amount}
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
                            ${data?.budget_amount}
                          </div>
                        </div>
                      );
                    })
                  : [1, 2, 3, 4, 5, 6].map((_, idx) => {
                      return (
                        <div key={idx}>
                          <Skeleton
                            className="rounded-2"
                            height={"40px"}
                            width={"100%"}
                          />
                        </div>
                      );
                    })}
              </Card.Body>
            </Card>

            <div className="text-center">
              <button
                className="w-75 mt-3"
                onClick={handleChangeBudget}
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
                onClick={() => activeLink(6)}
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

      {active === 5 && (
        <Form onSubmit={handleCreateBill}>
          <div className="d-flex">
            <IoArrowBackCircleOutline
              color="rgba(92, 182, 249, 1)"
              cursor={"pointer"}
              size={28}
              onClick={() => activeLink(4)}
            />
            <div
              style={{
                margin: "auto 170px",
                fontWeight: 600,
                fontSize: "16px",
                color: "rgba(55, 73, 87, 1)",
              }}
              className="text-center"
            >
              Add bills
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
                Electricity
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

            <div className="px-3">
              <FormField
                required
                type={"text"}
                placeholder={"Enter bill amount"}
                onChange={(e) => setAmount(e.target.value)}
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
                      <div style={{ fontSize: "12px", fontWeight: 400 }}>
                        Lifestyle
                      </div>
                    </div>
                  </div>
                  <div
                    onClick={() => activeLink(3)}
                    style={{
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "var(--primary-color)",
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
              Selected Budget
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
                        ${selectBudget?.budget_amount}
                      </div>
                      <div style={{ fontSize: "12px", fontWeight: 400 }}>
                        June 30
                      </div>
                    </div>
                  </div>
                  <div
                    onClick={() => activeLink(4)}
                    style={{
                      cursor: "pointer",
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "var(--primary-color)",
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
              style={{
                backgroundColor: "var(--primary-color)",
                padding: "10px",
                color: "white",
                border: "none",
                borderRadius: "10px",
              }}
            >
              {billLoading ? <Spinner size="sm" /> : "Confirm"}
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
              onClick={() => activeLink(4)}
            />
            <div
              style={{
                margin: "auto 170px",
                fontWeight: 600,
                fontSize: "16px",
                color: "rgba(55, 73, 87, 1)",
              }}
              className="text-center"
            >
              Add bills
            </div>
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
                Electricity
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

            <div className="px-3">
              <FormField type={"text"} placeholder={"Enter budget"} />
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
                placeholder="Select period"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
              <InputGroup.Text
                onClick={() => setOpenCalendar(false)}
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
              Selected Category
            </div>
            <Card style={{ borderRadius: " 10px" }}>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center mt-2">
                  <div className="d-flex gap-2">
                    <div>
                      <input type="checkbox" />
                    </div>
                    <div>
                      <div style={{ fontSize: "14px", fontWeight: 600 }}>
                        Cafes & Coffee
                      </div>
                      <div style={{ fontSize: "12px", fontWeight: 400 }}>
                        Lifestyle
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "var(--primary-color)",
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
              onClick={() => hide(false)}
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
        </>
      )}

      {active === 7 && (
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
                margin: "auto 180px",
                fontWeight: 600,
                fontSize: "18px",
                color: "rgba(55, 73, 87, 1)",
              }}
              className="text-center"
            >
              Bills
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
              $-
            </h2>
            <p
              style={{
                fontWeight: 700,
                padding: 0,
                margin: 0,
                fontSize: "12px",
                color: "rgba(255, 255, 255, 0.89)",
              }}
            >
              Total bills due
            </p>

            <button
              onClick={() => activeLink(2)}
              className="w-50 py-1 mt-2"
              style={{
                backgroundColor: "rgba(255, 255, 255, 1)",
                color: "var(--primary-color)",
                borderRadius: "20px",
                outline: "none",
                border: "none",
              }}
            >
              All Bills <IoIosArrowDown />
            </button>
          </div>

          <div className="mt-2 text-center">
            <div
              style={{
                color: "var(--primary-color)",
                fontSize: "14px",
                fontWeight: 600,
              }}
            >
              We didn’t find any bills
            </div>

            <div
              style={{
                cursor: "pointer",
                fontSize: "12px",
                color: "rgba(55, 73, 87, 1)",
              }}
            >
              Track recurring transactions and we’ll remind you before they’re
              next due
            </div>

            <div
              style={{
                cursor: "pointer",
                fontSize: "10px",
                color: "rgba(191, 191, 191, 1)",
              }}
            >
              E.g. Rent, utilities, subscriptions, insurance.
            </div>
          </div>

          <Card className="mt-3" style={{ borderRadius: "20px" }}>
            <Card.Body>
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
                          fontWeight: 600,
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
                          fontSize: "12px",
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
                        fontSize: "12px",
                      }}
                    >
                      remaining
                    </div>
                  </div>
                </div>
                <div className="mt-1">
                  <ProgressBar now={40} label={`${100}%`} visuallyHidden />
                </div>
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
                          fontWeight: 600,
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
                          fontSize: "12px",
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
                        fontSize: "12px",
                      }}
                    >
                      remaining
                    </div>
                  </div>
                </div>
                <div className="mt-1">
                  <ProgressBar now={40} label={`${100}%`} visuallyHidden />
                </div>
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
                          fontWeight: 600,
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
                          fontSize: "12px",
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
                        fontSize: "12px",
                      }}
                    >
                      remaining
                    </div>
                  </div>
                </div>
                <div className="mt-1">
                  <ProgressBar now={40} label={`${100}%`} visuallyHidden />
                </div>
              </div>
            </Card.Body>
          </Card>

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
              Add Bills
            </button>
          </div>
        </>
      )}

      <Calendar show={openCalendar} hide={setOpenCalendar} />
    </ModalWindow>
  );
};

export default UpcomingBillComponents;
