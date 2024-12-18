import React, { useEffect, useState } from "react";
import ModalWindow from "../../../components/modals/ModalWindow";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import {
  Card,
  Col,
  Form,
  Image,
  InputGroup,
  Row,
  Spinner,
} from "react-bootstrap";
import { GiPalmTree } from "react-icons/gi";
import { FaAngleRight } from "react-icons/fa6";
import { MdOutlineCalendarMonth, MdAddPhotoAlternate } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import { IoPricetagsOutline } from "react-icons/io5";
import FormField from "../../../components/layout/FormField";
import { GrCircleInformation } from "react-icons/gr";
// import SearchField from "../../../components/layout/SearchField";
import {
  imgAddr,
  useCreateTagMutation,
  useGetCategoriesMutation,
  useGetTagsMutation,
  useGetTransactionMutation,
  useUpdateTransactionMutation,
} from "../../../features/apiSlice";
import { getError } from "../../../utils/error";
import Skeleton from "react-loading-skeleton";
import { LuMinusSquare } from "react-icons/lu";
import { formatDate } from "../../../components/FormateDateTime/FormatDateTime";
import { getSuccess } from "../../../utils/success";
  const skeletonArray = [1, 2, 3, 4, 5, 6, 7];


const TransactionComponents = ({
  show,
  hide,
  active,
  activeLink,
  transactionId,
}) => {
  const [
    getCategories,
    {
      isLoading: { categoriesLoading },
    },
  ] = useGetCategoriesMutation();
  const [
    getTags,
    {
      isLoading: { tagsLoading },
    },
  ] = useGetTagsMutation();
  const [
    updateTransaction,
    {
      isLoading: { transactionLoading },
    },
  ] = useUpdateTransactionMutation();
  const [
    getTransaction,
    {
      isLoading: { getTransactionLoading },
    },
  ] = useGetTransactionMutation();
  const [
    createTag,
    {
      isLoading: { tagLoading },
    },
  ] = useCreateTagMutation();

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCategoryName, setSelectedCategoryName] = useState("");
  const [selectedCategoryImage, setSelectedCategoryImage] = useState("");

  const [selectedBucket, setSelectedBucket] = useState(null);
  const [selectedBucketName, setSelectedBucketName] = useState("");
  const [selectedBucketImage, setSelectedBucketImage] = useState("");

  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);
  const [selectedTagName, setSelectedTagName] = useState("");

  const [addNote, setAddNote] = useState("");
  const [isBill, setIsBill] = useState(false);

  const [transaction, setTransaction] = useState({});
  const [tagName, setTagName] = useState("");

  useEffect(() => {
    if (active === 5) {
      getAllCategories();
    }
  }, [active]);

  useEffect(() => {
    if (active === 3) {
      getAllTags();
    }
  }, [active]);

  useEffect(() => {
    if (transactionId) {
      getSingleTransation();
    }
  }, [transactionId]);

  // console.log('transaction', transaction)

  useEffect(() => {
    if (transaction) {
      setSelectedTag(transaction?.tag?._id || null);
      setSelectedTagName(transaction?.tag?.tag_name || "");
      setSelectedCategory(transaction?.category?._id || null);
      setSelectedCategoryName(transaction?.category?.name || "");
      setSelectedBucket(transaction?.bucket?._id || null);
      setSelectedBucketName(transaction?.bucket?.name || "");
      setIsBill((transaction?.bill && true) || "");
      setAddNote(transaction?.notes || "");
    }
  }, [transaction]);

  const handleTagChange = (tagId, tagName) => {
    setSelectedTag(tagId);
    setSelectedTagName(tagName);
    activeLink(1);
  };

  // ======== select category and bucket with id, image and name ========
  const handleSelectCategoryBucket = (
    categoryId,
    categoryName,
    bucketId,
    bucketName,
    bucketImg,
    categoryImg
  ) => {
    setSelectedCategory(categoryId);
    setSelectedCategoryName(categoryName);
    setSelectedBucket(bucketId);
    setSelectedBucketName(bucketName);
    setSelectedBucketImage(bucketImg);
    setSelectedCategoryImage(categoryImg);
  };

  // ======== get categories ========
  const getAllCategories = async () => {
    try {
      const { categorys } = await getCategories().unwrap();
      setCategories(categorys);
    } catch (error) {
      getError(error);
    }
  };

  // ======== get tags ========
  const getAllTags = async () => {
    try {
      const { tags } = await getTags().unwrap();
      setTags(tags);
    } catch (error) {
      getError(error);
    }
  };

  // ======== get tags ========
  const getSingleTransation = async () => {
    try {
      const { transaction } = await getTransaction(transactionId).unwrap();
      setTransaction(transaction);
    } catch (error) {
      getError(error);
    }
  };

  // ======== category required ========
  const handleCategory = (e) => {
    e.preventDefault();
    try {
      if (selectedCategory === null) {
        throw new Error("Please select category");
      } else {
        activeLink(6);
      }
    } catch (error) {
      getError(error);
    }
  };

  // ======== update transaction ========
  const handleUpdateTransaction = async () => {
    const transData = {
      category: selectedCategory,
      tag: selectedTag,
      bucket: selectedBucket,
      notes: addNote,
      bill: isBill ? "true" : "",
    };
    try {
      const data = await updateTransaction({
        transactionId,
        transData: transData,
      }).unwrap();
      getSuccess(data?.message);
      hide(false);
    } catch (error) {
      getError(error);
    }
  };

  // ======== create tags ========
  const handleCreateTag = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("tag_name", tagName);
    try {
      const data = await createTag(formData).unwrap();
      getSuccess(data?.message);
      activeLink(3);
      setTagName("");
    } catch (error) {
      getError(error);
    }
  };

  return (
    <ModalWindow show={show} onHide={hide}>
      {active === 1 && (
        <>
          {/* <div className="d-flex align-items-center flex-wrap justify-content-between"> */}
          <Row>
            <Col>
              <IoArrowBackCircleOutline
                color="rgba(92, 182, 249, 1)"
                cursor={"pointer"}
                size={28}
                onClick={() => hide(false)}
              />
            </Col>
            <Col
              className="text-center"
              style={{
                fontWeight: 600,
                fontSize: "16px",
                color: "rgba(55, 73, 87, 1)",
              }}
            >
              {formatDate(transaction?.date)}
            </Col>

            <Col className="text-end">
              <button
                style={{
                  backgroundColor: "white",
                  color: "var(--primary-color)",
                  border: "1px solid #D2EBFD",
                  borderRadius: "18px",
                  fontSize: "12px",
                  fontWeight: 600,
                }}
                onClick={handleUpdateTransaction}
              >
                {!transactionLoading ? "update" : <Spinner size="sm" />}
              </button>
            </Col>
          </Row>
          {/* </div> */}

          {!getTransactionLoading ? (
            <Card style={{ borderRadius: "15px" }} className="mt-4">
              <Card.Body>
                <div className="text-center">
                  <div style={{ marginTop: "-45px" }}>
                    <Image
                      width={"50px"}
                      height={"50px"}
                      style={{ objectFit: "cover", borderRadius: "50%" }}
                      src={
                        transaction?.category?.image
                          ? imgAddr + transaction?.category?.image
                          : "/icons/Rectangle 116.png"
                      }
                      alt="..."
                    />
                  </div>
                  <h3
                    className="mt-1"
                    style={{ fontWeight: 700, color: "var(--primary-color)" }}
                  >
                    ${transaction?.amount}
                  </h3>

                  <hr />
                  <p
                    style={{
                      color: "#5CB6F9",
                      fontSize: "12px",
                      fontWeight: 400,
                    }}
                  >
                    {transaction?.description}
                  </p>
                  <hr />
                </div>
              </Card.Body>
            </Card>
          ) : (
            <Skeleton className="rounded-1" height={"150px"} width={"100%"} />
          )}

          <div className="mt-3">
            <div
              style={{
                fontSize: "16px",
                color: "var(--primary-color)",
                fontWeight: 600,
              }}
            >
              Manage
            </div>

            <div className="px-4 d-flex justify-content-between align-items-center my-2">
              <div className="d-flex align-items-center gap-2">
                <div>
                  <GiPalmTree color="#004AAD" />{" "}
                </div>
                <div style={{ fontWeight: 600, fontSize: "12px" }}>
                  <span style={{ color: "rgba(92, 182, 249, 1)" }}>
                    {selectedBucketName && selectedBucketName}
                  </span>{" "}
                  {selectedCategoryName
                    ? selectedCategoryName
                    : "No category selected"}
                </div>
              </div>
              <div style={{ cursor: "pointer" }} onClick={() => activeLink(5)}>
                <FaAngleRight />
              </div>
            </div>

            <div className="px-3 d-flex justify-content-between align-items-center my-2">
              <div className="d-flex align-items-center gap-2">
                <div>
                  <IoPricetagsOutline color="#004AAD" />{" "}
                </div>
                <div style={{ fontWeight: 600, fontSize: "12px" }}>
                  Tag Transaction
                </div>
              </div>
              <div className="d-flex align-items-center gap-2">
                <div
                  className="py-1 px-2"
                  style={
                    selectedTagName
                      ? {
                          color: "var(--primary-color)",
                          fontSize: "12px",
                          borderRadius: "10px",
                          backgroundColor: "#004AAD14",
                        }
                      : {}
                  }
                >
                  {selectedTagName && selectedTagName}
                </div>
                <button
                  onClick={() => activeLink(3)}
                  style={{
                    backgroundColor: "white",
                    border: "1px solid var(--primary-color)",
                    color: "var(--primary-color)",
                    borderRadius: "5px",
                  }}
                >
                  +
                </button>
              </div>
            </div>

            <div className="px-1 d-flex justify-content-between align-items-center py-1">
              <InputGroup>
                <InputGroup.Text id="basic-addon1">
                  <AiOutlineEdit color="#004AAD" />
                </InputGroup.Text>
                <Form.Control
                  placeholder="Add note"
                  type="text"
                  aria-describedby="basic-addon1"
                  value={addNote}
                  onChange={(e) => setAddNote(e.target.value)}
                />
              </InputGroup>
            </div>

            <div className="px-3 d-flex justify-content-between align-items-center mb-2">
              <div className="d-flex align-items-center gap-2">
                <div>
                  <MdOutlineCalendarMonth color="#004AAD" />{" "}
                </div>
                <div style={{ fontWeight: 600, fontSize: "12px" }}>
                  Is this a bill?
                </div>
              </div>
              <div>
                <Form.Check
                  onChange={(e) => setIsBill(e.target.checked)}
                  value={isBill}
                  type="switch"
                />
              </div>
            </div>

            <Row className="gap-3 px-4">
              <Col
                style={{
                  border: "1px solid #E2F2FF",
                  padding: "10px",
                  borderRadius: "10px",
                }}
              >
                <h4
                  className="text-center"
                  style={{ fontWeight: 700, color: "var(--primary-color)" }}
                >
                  ${transaction?.spend}
                </h4>
                <div
                  style={{
                    fontSize: "10px",
                    color: "rgba(55, 73, 87, 0.7)",
                    textAlign: "center",
                    fontWeight: 500,
                  }}
                >
                  Total spend this year
                </div>
                <hr />

                <div className="d-flex justify-content-between">
                  <div
                    style={{
                      fontSize: "10px",
                      fontWeight: 600,
                      color: "#374957",
                      textAlign: "center",
                    }}
                  >
                    How many times
                  </div>
                  <div
                    style={{
                      fontSize: "10px",
                      fontWeight: 600,
                    }}
                  >
                    {transaction?.total}
                  </div>
                </div>

                <div className="d-flex justify-content-between mt-2">
                  <div
                    style={{
                      fontSize: "10px",
                      fontWeight: 600,
                      color: "#374957",
                      textAlign: "center",
                    }}
                  >
                    Average cost
                  </div>
                  <div
                    style={{
                      fontSize: "10px",
                      fontWeight: 600,
                    }}
                  >
                    ${transaction?.average}
                  </div>
                </div>

                <button
                  className="text-center mt-2"
                  style={{
                    fontSize: "12px",
                    color: "rgba(92, 182, 249, 1)",
                    fontWeight: "600",
                    border: "none",
                    background: "transparent",
                  }}
                  onClick={() => activeLink(7)}
                >
                  View History
                </button>
              </Col>

              <Col
                className="d-flex justify-content-center align-items-center flex-column"
                onClick={() => activeLink(2)}
                style={{
                  border: "1px solid #E2F2FF",
                  padding: "10px",
                  borderRadius: "10px",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    color: "rgba(55, 73, 87, 1)",
                    fontSize: "12px",
                    fontWeight: 400,
                  }}
                >
                  Something doesn't look right?
                </div>

                <div
                  className="mt-2"
                  style={{
                    fontSize: "12px",
                    color: "rgba(92, 182, 249, 1)",
                    fontWeight: 600,
                  }}
                >
                  Improve Transaction
                </div>
              </Col>
            </Row>
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
              Improve Transaction
            </div>
          </div>

          <Form>
            <Card style={{ borderRadius: "10px" }} className="mt-2">
              <Card.Body>
                <div className="d-flex align-items-center gap-2">
                  <div style={{ backgroundColor: "" }}>
                    <AiOutlineEdit size={23} color="#004AAD" />
                  </div>
                  <div
                    style={{
                      color: "#374957",
                      fontWeight: 600,
                      fontSize: "14px",
                    }}
                  >
                    What’s the correct name?
                  </div>
                </div>
                <div
                  className="mt-2"
                  style={{
                    color: "#374957",
                    fontWeight: 400,
                    fontSize: "12px",
                  }}
                >
                  Please be as specific as you can. The full name of the
                  merchant or company is preferred.
                </div>

                <div className="mt-2">
                  <FormField
                    type={"text"}
                    placeholder={"Name of the Merchant or Company "}
                  />
                </div>
                <hr />

                <div className="d-flex align-items-center gap-2">
                  <div style={{ backgroundColor: "" }}>
                    <MdAddPhotoAlternate size={23} color="#004AAD" />
                  </div>
                  <div
                    style={{
                      color: "#374957",
                      fontWeight: 600,
                      fontSize: "14px",
                    }}
                  >
                    Where can we find the correct logo?
                  </div>
                </div>
                <div
                  className="mt-2"
                  style={{
                    color: "#374957",
                    fontWeight: 400,
                    fontSize: "12px",
                  }}
                >
                  Please be as specific as you can. The full name of the
                  merchant or company is preferred.
                </div>

                <div className="mt-2">
                  <FormField type={"text"} placeholder={"URL or Website "} />
                </div>
                <hr />

                <div className="d-flex align-items-center gap-2">
                  <div style={{ backgroundColor: "" }}>
                    <GrCircleInformation size={23} color="#004AAD" />
                  </div>
                  <div
                    style={{
                      color: "#374957",
                      fontWeight: 600,
                      fontSize: "14px",
                    }}
                  >
                    Something else doesn't look right?
                  </div>
                </div>
                <div
                  className="mt-2"
                  style={{
                    color: "#374957",
                    fontWeight: 400,
                    fontSize: "12px",
                  }}
                >
                  Please be as specific as you can. The full name of the
                  merchant or company is preferred.
                </div>

                <div className="mt-2">
                  <FormField type={"text"} placeholder={"URL or Website "} />
                </div>
                <hr />
              </Card.Body>
            </Card>

            <div className="d-flex justify-content-center mt-2">
              <button
                className="w-75"
                style={{
                  backgroundColor: "white",
                  boxShadow: "0px 1px 3px 0px #0000001A",
                  padding: "10px",
                  borderRadius: "10px",
                  border: "none",
                  outline: "none",
                  color: "var(--primary-color)",
                  fontWeight: 600,
                }}
              >
                Send Feedback
              </button>
            </div>
          </Form>
        </>
      )}

      {active === 3 && (
        <>
          <div className="d-flex justify-content-between align-items-center">
            <IoArrowBackCircleOutline
              color="rgba(92, 182, 249, 1)"
              cursor={"pointer"}
              size={28}
              onClick={() => activeLink(1)}
            />
            <div
              style={{
                fontWeight: 600,
                fontSize: "16px",
                color: "rgba(55, 73, 87, 1)",
              }}
              className="text-center"
            >
              Tags transaction
            </div>

            <button
              onClick={() => activeLink(4)}
              className="px-3 py-1"
              style={{
                backgroundColor: "white",
                color: "var(--primary-color)",
                border: "1px solid #D2EBFD",
                borderRadius: "18px",
                fontSize: "12px",
                fontWeight: 600,
              }}
            >
              Create
            </button>
          </div>

          <div className="mt-3">
            {/* <div className="px-2">
              <SearchField />
            </div> */}

            <div
              className="my-1"
              style={{
                fontSize: "14px",
                color: "var(--primary-color)",
                fontWeight: 600,
              }}
            >
              Select tags
            </div>
            <Card style={{ borderRadius: "10px" }}>
              <Card.Body>
                {tags?.length > 0 ? (
                  !tagsLoading ? (
                    tags?.map((data) => {
                      return (
                        <div
                          onClick={() =>
                            handleTagChange(data?._id, data?.tag_name)
                          }
                          className="mb-2 d-flex align-items-center gap-3"
                          key={data?._id}
                        >
                          <img
                            style={{
                              width: "20px",
                              height: "20px",
                              borderRadius: "50%",
                              objectFit: "contain",
                            }}
                            src={data?.image && imgAddr + data?.image}
                            alt="..."
                          />
                          <div
                            style={{
                              fontWeight: 600,
                              cursor: "pointer",
                              fontSize: "12px",
                              color: "#374957",
                            }}
                          >
                            {data?.tag_name}
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    [1, 2, 3, 4, 5].map((_, i) => (
                      <div key={i} className={`p-2`}>
                        <Skeleton
                          className="rounded-1"
                          height={"40px"}
                          width={"100%"}
                        />
                      </div>
                    ))
                  )
                ) : (
                  <div className="text-center">No tags found</div>
                )}
              </Card.Body>
            </Card>
          </div>
        </>
      )}

      {active === 4 && (
        <>
          <div className="d-flex align-items-center">
            <IoArrowBackCircleOutline
              color="rgba(92, 182, 249, 1)"
              cursor={"pointer"}
              size={28}
              onClick={() => activeLink(3)}
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
              Create tag
            </div>
          </div>

          <Form className="mt-3" onSubmit={handleCreateTag}>
            <Form.Label
              style={{ color: "var(--primary-color)", fontWeight: 600 }}
            >
              Name
            </Form.Label>
            <FormField
              onChange={(e) => setTagName(e.target.value)}
              type={"text"}
              required
              placeholder={"Enter name"}
            />

            <div className="d-flex justify-content-center mt-2">
              <button
                className="w-75"
                style={{
                  backgroundColor: "var(--primary-color)",
                  boxShadow: "0px 1px 3px 0px #0000001A",
                  padding: "10px",
                  borderRadius: "10px",
                  border: "none",
                  outline: "none",
                  color: "white",
                }}
              >
                {!tagLoading ? "Create" : <Spinner size="sm" />}
              </button>
            </div>
          </Form>
        </>
      )}

      {/* ========== Select Category =========== */}
      {active === 5 && (
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
                margin: "auto",
                fontWeight: 600,
                fontSize: "16px",
                color: "rgba(55, 73, 87, 1)",
              }}
              className="text-center"
            >
              Select a Category
            </div>
          </div>

          <div
            style={{ fontSize: "12px", padding: "0px 100px 0px 100px" }}
            className="text-center"
          >
            To add a Category, please select the Category to continue.
          </div>

          <p
            className="text-primary my-1"
            style={{ fontSize: "14px", fontWeight: 600 }}
          >
            Category
          </p>

          {/* <SearchField /> */}
          <Form onSubmit={handleCategory}>
            <Card
              style={
                categories.length > 5
                  ? { height: "300px", overflowY: "scroll" }
                  : {}
              }
            >
              <Card.Body>
                {categories.length > 0 ? (
                  <>
                    {!categoriesLoading
                      ? categories?.map((data) => {
                          return (
                            <div
                              key={data?._id}
                              className="d-flex justify-content-between align-items-center mt-2"
                            >
                              <div className="d-flex align-items-center gap-2">
                                <img
                                  style={{
                                    width: "35px",
                                    height: "35px",
                                    borderRadius: "50%",
                                    objectFit: "cover",
                                    color: "var(--primary-color)",
                                  }}
                                  src={data?.image && imgAddr + data?.image}
                                  alt="..."
                                />
                                <div style={{ fontSize: "14px" }}>
                                  {data?.name}
                                </div>
                              </div>
                              <input
                                type="checkbox"
                                checked={selectedCategory === data?._id}
                                onChange={() =>
                                  handleSelectCategoryBucket(
                                    data?._id,
                                    data?.name,
                                    data?.bucket?._id,
                                    data?.bucket?.name,
                                    data?.bucket?.image,
                                    data?.image
                                  )
                                }
                              />
                            </div>
                          );
                        })
                      : [1, 2, 3, 4, 5].map((_, i) => (
                          <div key={i} className={`p-2`}>
                            <Skeleton
                              className="rounded-1"
                              height={"40px"}
                              width={"100%"}
                            />
                          </div>
                        ))}
                  </>
                ) : (
                  <div className="text-center">
                    <p>No categories found!</p>
                  </div>
                )}
              </Card.Body>
            </Card>
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
                Next
              </button>
            </div>
          </Form>
        </>
      )}

      {/* ========== Selected Bucket =========== */}
      {active === 6 && (
        <>
          <div className="d-flex align-items-center">
            <IoArrowBackCircleOutline
              color="rgba(92, 182, 249, 1)"
              cursor={"pointer"}
              size={28}
              onClick={() => activeLink(5)}
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
              Select a Bucket
            </div>
          </div>

          <div
            style={{ fontSize: "12px", padding: "0px 130px 0px 130px" }}
            className="text-center text-12 "
          >
            To add a Bucket, please select the Bucket to continue.
          </div>

          <div
            style={{ fontSize: "14px", fontWeight: 600, color: "#004AAD" }}
            className="mt-3 mb-1"
          >
            Selected Transaction
          </div>

          <Card>
            <div className="d-flex justify-content-between align-items-center p-1">
              <div className="w-75">
                <div className="d-flex gap-2">
                  <img
                    style={{
                      width: "35px",
                      height: "35px",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                    src={
                      selectedCategoryImage
                        ? imgAddr + selectedCategoryImage
                        : "/icons/Rectangle 116.png"
                    }
                    alt="..."
                  />
                  <div>
                    <div style={{ fontSize: "12px", fontWeight: 500 }}>
                      {transaction?.description}
                    </div>
                    <div
                      style={{
                        fontSize: "12px",
                        fontWeight: 500,
                        color: "var(--primary-color)",
                      }}
                    >
                      {selectedCategoryName && selectedCategoryName}{" "}
                      <span style={{ color: "black" }}>
                        {selectedBucketName && selectedBucketName}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-primary text-end font-bold">
                <div className="text-primary" style={{ fontWeight: 600 }}>
                  ${transaction?.amount}
                </div>
                <div style={{ fontSize: "12px", fontWeight: 500 }}>
                  {formatDate(transaction?.date)}
                </div>
              </div>
            </div>
          </Card>

          <div
            style={{ fontSize: "14px", fontWeight: 600, color: "#004AAD" }}
            className="mt-3 mt-1"
          >
            Bucket
          </div>

          <Card>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-2">
                  <img
                    style={{
                      width: "35px",
                      height: "35px",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                    src={
                      selectedBucketImage
                        ? imgAddr + selectedBucketImage
                        : "/icons/Rectangle 116.png"
                    }
                    alt="..."
                  />
                  <div style={{ fontSize: "14px" }}>{selectedBucketName}</div>
                </div>
                <LuMinusSquare color="var(--main-blue)" />
              </div>
            </Card.Body>
          </Card>
          <div className="text-center">
            <button
              onClick={() => activeLink(1)}
              className="w-75 mt-3"
              style={{
                backgroundColor: "var(--primary-color)",
                padding: "10px",
                color: "white",
                border: "none",
                borderRadius: "10px",
              }}
            >
              Done
            </button>
          </div>
        </>
      )}

      {/* ======== View History =============  */}
      {active === 7 && (
        <>
          <div className="d-flex w-100 align-items-center">
            <div>
              <IoArrowBackCircleOutline
                color="rgba(92, 182, 249, 1)"
                cursor="pointer"
                size={28}
                onClick={() => {
                  activeLink(1);
                  // hide(false);
                }}
              />
            </div>
            <div
              className="text-center w-100"
              style={{
                fontWeight: 600,
                fontSize: "16px",
                color: "rgba(55, 73, 87, 1)",
                paddingRight: "10px",
                fontFamily:'Inter'
              }}
            >
              Transaction History
            </div>
          </div>
          <p
            className="text-center mt-1"
            style={{ fontSize: "14px", color: "#374957B2", fontWeight:600 }}
          >
            {transaction?.description}
          </p>

          {!getTransactionLoading ? (
            <Card
              style={{ borderRadius: "5px", borderColor: "#E2F2FF" }}
              className="mt-4"
            >
              <div className="d-flex justify-content-between align-items-center px-3 py-2">
                <div style={{ color: "#374957B2", fontWeight:600, fontSize:'20px' }}>Total</div>
                <div style={{ color: "#5CB6F9", fontWeight:600, fontSize:'20px' }}>{`$ ${transaction?.spend}`}</div>
              </div>
            </Card>
          ) : (
            <Skeleton className="rounded-1" height={"150px"} width={"100%"} />
          )}

          <ul className="market mt-4 mb-3">
            {!getTransactionLoading ? (
              transaction ? (
                transaction?.history?.map((tran) => {
                  return (
                    <li
                      style={{ cursor: "pointer" }}
                      // onClick={() => handleTransaction(tran._id)}
                      key={tran?._id}
                      className="d-flex justify-content-between align-items-center"
                    >
                      <div className="d-flex  gap-4">
                        <Image
                          width={"35px"}
                          height={"35px"}
                          style={{ borderRadius: "50%", objectFit: "cover" }}
                          src={
                            tran?.category?.image
                              ? imgAddr + tran?.category?.image
                              : "/icons/Rectangle 116.png"
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
                            {tran?.description}
                          </div>
                          <div
                            style={{
                              fontSize: "rgba(55, 73, 87, 0.7)",
                              fontSize: "12px",
                              fontWeight: 400,
                            }}
                          >
                            at {formatDate(tran?.date)}
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
                        {tran?.amount} $
                      </div>
                    </li>
                  );
                })
              ) : (
                <h6 className="text-center p-5">No Transactions Found..</h6>
              )
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
            )}
          </ul>
        </>
      )}
    </ModalWindow>
  );
};

export default TransactionComponents;
