import React, { useEffect, useRef, useState } from "react";
import ModalWindow from "../modals/ModalWindow";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import {
  Card,
  Col,
  Form,
  Image,
  InputGroup,
  ProgressBar,
  Spinner,
} from "react-bootstrap";
import { FiUpload } from "react-icons/fi";
import FormField from "../layout/FormField";
import { RxCheck, RxCross2, RxCrossCircled } from "react-icons/rx";
import { CalendarSVG } from "../svg/CalendarSVG";
import Calendar from "../Calendar/Calendar";
import {
  useCreateGoalsMutation,
  useDeleteGoalMutation,
  useGetGoalMutation,
  useGetGoalsMutation,
  useUpdateBudgetMutation,
  useUpdateGoalMutation,
} from "../../features/apiSlice";
import { getError } from "../../utils/error";
import { getSuccess } from "../../utils/success";
import Skeleton from "react-loading-skeleton";
import { MdDelete } from "react-icons/md";

const GoalComponent = ({ show, hide, active, activeLink }) => {
  const fileRef = useRef(null);
  const [alreadyActiveCalendar, setAlreadyActiveCalendar] = useState(0);
  const [image, setImage] = useState("");
  const [isFileSelected, setIsFileSelected] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [goalDate, setGoalDate] = useState("");
  const [goalId, setGoalId] = useState("");
  const [goals, setGoals] = useState([]);
  const [createGoals, { isLoading }] = useCreateGoalsMutation();
  const [getGoals, { isLoading: goalsLoading }] = useGetGoalsMutation();
  const [getGoal, { isLoading: getGoalLoading }] = useGetGoalMutation();
  const [updateGoal, { isLoading: updateGoalLoading }] =
    useUpdateGoalMutation();
  const [deleteGoal, { isLoading: deleteGoalLoading }] =
    useDeleteGoalMutation();

  const savingFor = [
    "House Deposite",
    "Saving",
    "Car",
    "Investment",
    "Credite card",
    "Cash",
  ];

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setIsFileSelected(true); 
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => {
    if (fileRef.current) {
      fileRef.current.click(); 
    }
  };

  const handleSubmitGoals = async () => {
    if (!isFileSelected) {
      getError("Please select an image before submitting.");
    }

    const goalData = {
      description: category,
      amount,
      image,
      date: goalDate,
    };

    try {
      const data = await createGoals(goalData).unwrap();
      getSuccess(data?.message);
      activeLink(1);
      hide();
    } catch (error) {
      getError(error);
    }
  };

  useEffect(() => {
    if (show) {
      getAllGoals();
    }
  }, [show]);

  useEffect(() => {
    if (goalId) {
      handleGetGoal();
    } else {
      setAmount("");
      setImage("");
      setCategory("");
      setGoalDate("");
      setImagePreview("");
    }
  }, [goalId]);

  // ========= GET ALL GOALS =======
  const getAllGoals = async () => {
    try {
      const { goals } = await getGoals().unwrap();
      setGoals(goals);
    } catch (error) {
      getError(error);
    }
  };

  const handleGoalsListData = (goals) => {
    setGoalId(goals?._id);
    activeLink(6);
  };

  // ========= GET SINGLE GOAL =======
  const handleGetGoal = async () => {
    try {
      if (!goalId) {
        console.log("Goal ID is missing.");
      }
      const response = await getGoal(goalId).unwrap();

      const { goal } = response;
      setAmount(goal?.amount || "");
      setImage(goal?.image || "");
      setCategory(goal?.description || "");
      setGoalDate((goal?.date && goal?.date.split("T")[0]) || "");
    } catch (error) {
      console.error("Error fetching goal:", error);
      getError(error.message || "Error fetching goal details.");
    }
  };

  // ============ UPDATE GOAL ============

  const handleUpdateGoal = async (e) => {
    e.preventDefault();

    try {
      if (goalId) {
        const goalData = {
          image: image,
          description: category,
          amount: amount,
          date: goalDate,
        };

        const data = await updateGoal({ goalId, goalData }).unwrap();
        getSuccess(data?.message);
        getAllGoals();
        activeLink(1);
        // setGoalId('')
      }
    } catch (error) {
      getError(error);
    } finally {
      setGoalId("");
      setAmount("");
      setCategory("");
      setImage("");
      setImagePreview("");
      setGoalDate("");
    }
  };

  // ========= DELETE GOAL ========
  const handleDeleteGoal = async () => {
    try {
      const isDelete = window.confirm(
        "Are you sure you want to delete this Goal"
      );
      if (isDelete) {
        const data = await deleteGoal(goalId).unwrap();
        getSuccess(data?.message);
        getAllGoals();
        activeLink(1);
        setGoalId("");
      } else {
        return;
      }
    } catch (error) {
      getError(error);
    } finally {
      setGoalId("");
      setAmount("");
      setImage("");
      setCategory("");
      setGoalDate("");
      setImagePreview("");
    }
  };

  return (
    <ModalWindow show={show} onHide={hide}>
      {active === 1 && (
        <div>
          <div className="d-flex">
            <IoArrowBackCircleOutline
              color="rgba(92, 182, 249, 1)"
              cursor={"pointer"}
              size={26}
              onClick={() => hide(false)}
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
              Goals
            </div>
          </div>

          <div className="px-2">
            <p
              style={{
                color: "var(--primary-color)",
                fontWeight: 600,
                marginTop: "10px",
              }}
            >
              Goals
            </p>
            <Card
              style={{
                borderRadius: "10px",
                height: "250px",
                overflowY: "scroll",
              }}
            >
              <Card.Body>
                {goals?.length > 0 ? (
                  !goalsLoading ? (
                    goals?.map((data) => {
                      // console.log('data',data)
                      return (
                        <div
                          className="mt-2"
                          key={data?._id}
                          onClick={() => handleGoalsListData(data)}
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
                                src={"/images/Rectangle 116.png"}
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
                                  {data?.description}
                                </div>
                                <div
                                  style={{
                                    fontWeight: 600,
                                    color: "rgba(159, 175, 198, 1)",
                                    fontSize: "12px",
                                  }}
                                >
                                  ${data.amount} Collected
                                </div>
                              </div>
                            </div>

                            <div
                              style={{
                                color: "var(--primary-color)",
                                fontSize: "12px",
                                fontWeight: 600,
                                width: "auto",
                                display: "flex",
                                justifyContent: "center",
                                flexDirection: "column",
                                alignItems: "center",
                              }}
                            >
                              ${data?.amount}
                              <div
                                style={{
                                  color: "var(--primary-color)",
                                  fontSize: "12px",
                                  fontWeight: 600,
                                  // marginLeft: "8px",
                                }}
                              >
                                {data?.onTarget ? (
                                  <div
                                    className="d-flex align-items-center mt-1"
                                    style={{
                                      padding: "2px",
                                      backgroundColor: "rgba(235, 241, 248, 1)",
                                      height: "20px",
                                      width: "40px",
                                      borderRadius: "22px",
                                      fontSize: "12px",
                                      color: "green",
                                      fontWeight: 400,
                                    }}
                                  >
                                    <RxCheck /> <span>Yes</span>
                                  </div>
                                ) : (
                                  <div
                                    className="d-flex align-items-center mt-1"
                                    style={{
                                      padding: "2px",
                                      backgroundColor: "rgba(235, 241, 248, 1)",
                                      height: "20px",
                                      width: "40px",
                                      borderRadius: "22px",
                                      fontSize: "12px",
                                      color: "rgba(255, 1, 9, 1)",
                                      fontWeight: 400,
                                    }}
                                  >
                                    <RxCross2 /> <span>No</span>
                                  </div>
                                )}
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
                  <div className="text-center">No goals found!</div>
                )}
              </Card.Body>
            </Card>
          </div>

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
              Add Goals
            </button>
          </div>
        </div>
      )}

      {active === 2 && (
        <div>
          <div className="d-flex">
            <IoArrowBackCircleOutline
              color="rgba(92, 182, 249, 1)"
              cursor={"pointer"}
              size={23}
              onClick={() => activeLink(1)}
            />
            <div
              style={{
                margin: "auto",
                fontWeight: 600,
                fontSize: "14px",
                color: "rgba(55, 73, 87, 1)",
              }}
              className="text-center"
            >
              Goals
            </div>
          </div>

          <Form>
            <p
              style={{
                color: "var(--primary-color)",
                fontWeight: 600,
                marginTop: "10px",
              }}
            >
              Select Image
            </p>

            <div
              style={{
                border: "1px solid rgba(226, 242, 255, 1)",
                textAlign: "center",
                borderRadius: "10px",
              }}
            >
              <FiUpload className="icon-md" />
              <p
                style={{
                  color: "rgba(55, 73, 87, 1)",
                  fontWeight: 600,
                  fontSize: "14px",
                }}
              >
                Upload media
              </p>
              <p
                className="mt-2 px-4"
                style={{
                  color: "rgba(55, 73, 87, 0.7)",
                  fontWeight: 400,
                  fontSize: "12px",
                }}
              >
                Drag and drop your image file here or click to browse from your
                device
              </p>
              <input
                onChange={handleImageChange}
                style={{ display: "none" }}
                ref={fileRef}
                type="file"
                accept="image/*"
              />
              <button
                onClick={handleButtonClick}
                className="w-50 mb-2"
                style={{
                  padding: "6px",
                  border: "none",
                  backgroundColor: "var(--primary-color)",
                  color: "white",
                  fontWeight: 600,
                  borderRadius: "10px",
                }}
              >
                Select Image
              </button>
            </div>

            <div>
              <p
                style={{
                  color: "var(--primary-color)",
                  fontWeight: 600,
                  marginTop: "10px",
                }}
              >
                I'm saving for
              </p>
              <FormField
                placeholder={"Enter category"}
                type={"text"}
                onChange={(e) => setCategory(e.target.value)}
                value={category}
              />
            </div>

            <div
              style={{
                fontSize: "12px",
                fontWeight: 400,
                color: "rgba(55, 73, 87, 0.7)",
              }}
            >
              Quick start
            </div>
            <div className="d-flex justify-content-between flex-wrap">
              {savingFor?.map((data, idx) => {
                return (
                  <div
                    className="px-2 mt-2"
                    key={idx}
                    style={{
                      padding: "6px",
                      border: "1px solid rgba(92, 182, 249, 1)",
                      borderRadius: "15px",
                      backgroundColor: "rgba(250, 250, 250, 1)",
                      color: "var(--primary-color)",
                      fontSize: "10px",
                    }}
                  >
                    {data}
                  </div>
                );
              })}
            </div>

            <div>
              <p
                style={{
                  color: "var(--primary-color)",
                  fontWeight: 600,
                  marginTop: "10px",
                }}
              >
                I'd like to save
              </p>
              <FormField
                placeholder={"Enter amount"}
                type={"text"}
                onChange={(e) => setAmount(e.target.value)}
                value={amount}
              />
            </div>

            <div>
              <div
                className="my-3"
                style={{ fontWeight: 600, color: "var(--primary-color)" }}
              >
                Estimated Date
              </div>
              <InputGroup className="mb-3">
                <Form.Control
                  className="form-field"
                  style={{ borderRight: "none" }}
                  placeholder="Enter date"
                  value={goalDate}
                  aria-describedby="basic-addon1"
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
            </div>

            <div className="text-center">
              <button
                onClick={() => activeLink(3)}
                className="w-75 mt-3"
                style={{
                  backgroundColor: "var(--primary-color)",
                  padding: "10px",
                  color: "white",
                  border: "none",
                  borderRadius: "10px",
                }}
              >
                Next
              </button>
            </div>
          </Form>
        </div>
      )}

      {active === 3 && (
        <>
          <div className="d-flex">
            <div
              style={{
                margin: "auto",
                fontWeight: 600,
                fontSize: "14px",
                color: "rgba(55, 73, 87, 1)",
              }}
              className="text-center"
            >
              <img
                width={"30px"}
                height={"30px"}
                src="/icons/information.png"
                alt="..."
              />
            </div>

            <RxCrossCircled
              color="rgba(92, 182, 249, 1)"
              cursor={"pointer"}
              size={23}
              onClick={() => hide(false)}
            />
          </div>

          <p
            className="text-center"
            style={{
              color: "var(--primary-color)",
              fontWeight: 600,
              fontSize: "16px",
            }}
          >
            Please review your goal.
          </p>

          <div
            className="text-center"
            style={{
              color: "rgba(55, 73, 87, 1)",
              fontWeight: 400,
              fontSize: "12px",
            }}
          >
            $5,000.00 can’t be smaller than the account balance.
          </div>

          <div className="text-center">
            <button
              className="w-50 mt-3"
              onClick={() => activeLink(4)}
              style={{
                backgroundColor: "var(--primary-color)",
                padding: "10px",
                color: "white",
                border: "none",
                borderRadius: "10px",
              }}
            >
              Got it
            </button>
          </div>
        </>
      )}

      {active === 4 && (
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
              Goals
            </div>

            <div
              onClick={() => activeLink(2)}
              className="px-3 py-1"
              style={{
                fontWeight: 600,
                fontSize: "12px",
                color: "var(--primary-color)",
                border: "1px solid rgba(228, 228, 228, 1)",
                borderRadius: "20px",
                cursor: "pointer",
              }}
            >
              Edit
            </div>
          </div>

          <p
            className="mt-3"
            style={{
              color: "var(--primary-color)",
              fontWeight: 600,
              fontSize: "16px",
            }}
          >
            Goal details
          </p>

          <div
            className="text-center"
            style={{
              color: "rgba(55, 73, 87, 1)",
              fontWeight: 400,
              fontSize: "12px",
            }}
          >
            {imagePreview && (
              <img
                style={{
                  width: "100%",
                  height: "150px",
                  borderRadius: "10px",
                }}
                src={imagePreview}
                alt="..."
              />
            )}
          </div>

          <div className="mt-2">
            <div
              className="px-2 mt-2"
              style={{
                borderRadius: "5px",
                backgroundColor: "rgba(244, 243, 243, 1)",
                padding: "6px",
              }}
            >
              <div
                style={{
                  fontSize: "10px",
                  fontWeight: 400,
                  color: "rgba(55, 73, 87, 0.7)",
                }}
              >
                I'm saving for
              </div>
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "rgba(0, 39, 91, 1)",
                }}
              >
                {category}
              </div>
            </div>

            <div
              className="px-2 mt-2"
              style={{
                borderRadius: "5px",
                backgroundColor: "rgba(244, 243, 243, 1)",
                padding: "6px",
              }}
            >
              <div
                style={{
                  fontSize: "10px",
                  fontWeight: 400,
                  color: "rgba(55, 73, 87, 0.7)",
                }}
              >
                I’d like to Save
              </div>
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "rgba(0, 39, 91, 1)",
                }}
              >
                ${amount}
              </div>
            </div>

            <div
              className="px-2 mt-2"
              style={{
                borderRadius: "5px",
                backgroundColor: "rgba(244, 243, 243, 1)",
                padding: "6px",
              }}
            >
              <div
                style={{
                  fontSize: "10px",
                  fontWeight: 400,
                  color: "rgba(55, 73, 87, 0.7)",
                }}
              >
                Estimated date
              </div>
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "rgba(0, 39, 91, 1)",
                }}
              >
                {goalDate}
              </div>
            </div>
          </div>

          <div className="text-center">
            <button
              className="w-75 mt-3"
              onClick={handleSubmitGoals}
              style={{
                backgroundColor: "var(--primary-color)",
                padding: "10px",
                color: "white",
                border: "none",
                borderRadius: "10px",
              }}
            >
              {isLoading ? <Spinner size="sm" /> : "Next"}
            </button>
          </div>
        </>
      )}

      {active === 5 && (
        <Calendar
          already={alreadyActiveCalendar}
          activeLink={activeLink}
          active={active}
          date={goalDate}
          setDate={setGoalDate}
        />
      )}

      {/* ==== update Goal ====== */}
      {active === 6 && (
        <>
          <div className="d-flex align-items-center justify-content-between">
            <IoArrowBackCircleOutline
              color="rgba(92, 182, 249, 1)"
              cursor={"pointer"}
              size={28}
              onClick={() => {
                setGoalId("");
                activeLink(1);
              }}
            />
            <div
              style={{
                fontWeight: 600,
                fontSize: "16px",
                color: "rgba(55, 73, 87, 1)",
              }}
            >
              Goal
            </div>
            <MdDelete
              size={23}
              color="red"
              cursor={"pointer"}
              onClick={handleDeleteGoal}
            />
          </div>

          {!getGoalLoading && goalId ? (
            <Form onSubmit={handleUpdateGoal}>
              {/* <p
                style={{
                  color: "var(--primary-color)",
                  fontWeight: 600,
                  marginTop: "10px",
                }}
              >
                Select Image
              </p> */}

              {/* <div
                style={{
                  border: "1px solid rgba(226, 242, 255, 1)",
                  textAlign: "center",
                  borderRadius: "10px",
                }}
              >
                <FiUpload className="icon-md" />
                <p
                  style={{
                    color: "rgba(55, 73, 87, 1)",
                    fontWeight: 600,
                    fontSize: "14px",
                  }}
                >
                  Upload media
                </p>
                <p
                  className="mt-2 px-4"
                  style={{
                    color: "rgba(55, 73, 87, 0.7)",
                    fontWeight: 400,
                    fontSize: "12px",
                  }}
                >
                  Drag and drop your image file here or click to browse from
                  your device
                </p>
                <input
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                />
                <button
                  onClick={handleButtonClick}
                  className="w-50 mb-2"
                  style={{
                    padding: "6px",
                    border: "none",
                    backgroundColor: "var(--primary-color)",
                    color: "white",
                    fontWeight: 600,
                    borderRadius: "10px",
                  }}
                >
                  Select Image
                </button>
              </div> */}

              <div>
                <p
                  style={{
                    color: "var(--primary-color)",
                    fontWeight: 600,
                    marginTop: "10px",
                  }}
                >
                  Description
                </p>
                <FormField
                  placeholder={"Enter description"}
                  type={"text"}
                  onChange={(e) => setCategory(e.target.value)}
                  value={category}
                />
              </div>

              <div>
                <p
                  style={{
                    color: "var(--primary-color)",
                    fontWeight: 600,
                    marginTop: "10px",
                  }}
                >
                  Amount
                </p>
                <FormField
                  placeholder={"Enter amount"}
                  type={"text"}
                  onChange={(e) => setAmount(e.target.value)}
                  value={amount}
                />
              </div>

              <div>
                <div
                  className="my-3"
                  style={{ fontWeight: 600, color: "var(--primary-color)" }}
                >
                  Date
                </div>
                <InputGroup className="mb-3">
                  <Form.Control
                    className="form-field"
                    style={{ borderRight: "none" }}
                    placeholder="Enter date"
                    value={goalDate}
                    aria-describedby="basic-addon1"
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
                  {!updateGoalLoading ? "Update" : <Spinner size="sm" />}
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

export default GoalComponent;
