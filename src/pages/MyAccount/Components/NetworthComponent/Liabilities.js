import React, { useEffect, useState } from "react";
import ModalWindow from "../../../../components/modals/ModalWindow";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { Button, Card, Form, Spinner } from "react-bootstrap";
import {
  imgAddr,
  useCreateAssetLiabilityMutation,
  useGetAssetsLv2Mutation,
  useGetAssetsLv3Mutation,
  useGetAssetsMutation,
} from "../../../../features/apiSlice";
import { getError } from "../../../../utils/error";
import { getSuccess } from "../../../../utils/success";
import Skeleton from "react-loading-skeleton";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import FormField from "../../../../components/layout/FormField";

const Liabilities = ({ show, hide, active, activeLink }) => {
  const [getAssets, { isLoading: liabilityLoading }] =
    useGetAssetsMutation();
  const [getAssetsLv2, { isLoading: liabilityLv2Loading }] =
    useGetAssetsLv2Mutation();
  const [getAssetsLv3, { isLoading: liabilityLv3Loading }] =
    useGetAssetsLv3Mutation();
  const [createAssetLiability, { isLoading: createAssetLiabilityLoading }] =
    useCreateAssetLiabilityMutation();

  const [liabilityLv1, setLiabilityLv1] = useState([]);
  const [liabilityLv2, setLiabilityLv2] = useState([]);
  const [liabilityLv3, setLiabilityLv3] = useState([]);

  const [selectLiabilityLv1, setSelectLiabilityLv1] = useState("");
  const [selectLiabilityLv2, setSelectLiabilityLv2] = useState("");
  const [selectLiabilityLv3, setSelectLiabilityLv3] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    if (active === 1) {
      getAllLiabilities();
    } else if (active === 2) {
      getLiabilitiesLv2();
    } else if (active === 3) {
      getLiabilitiesLv3();
    }
  }, [active]);

  useEffect(() => {
    if (active === 1) {
      setSelectLiabilityLv1("");
      setSelectLiabilityLv2("");
      setSelectLiabilityLv3("");
    }
  }, [active]);

  // ======= Select Liability Lv1 ========
  const handleSelectLiabilityLv1 = (data) => {
    setSelectLiabilityLv1(data);
    if (data?._id) {
      activeLink(2);
    }
  };

  // ======= Select Liability Lv2 ========
  const handleSelectLiabilityLv2 = (data) => {
    setSelectLiabilityLv2(data);
    if (data?._id) {
      activeLink(3);
    }
  };

  // ======= Select Liability Lv3 ========
  const handleSelectLiabilityLv3 = (data) => {
    setSelectLiabilityLv3(data);
    activeLink(4);
  };

  // ======= get Liability Lv1 ========
  const getAllLiabilities = async () => {
    try {
      const { assets } = await getAssets("Liability").unwrap();
      if (assets?.length > 0) {
        setLiabilityLv1(assets);
      }
    } catch (error) {
      getError(error);
    }
  };

  // ======= get Liability Lv2 ========
  const getLiabilitiesLv2 = async () => {
    try {
      const { assets } = await getAssetsLv2({
        assetLv1Id: selectLiabilityLv1?._id,
      }).unwrap();

      if (assets?.length > 0) {
        setLiabilityLv2(assets);
      } else {
        activeLink(4);
      }
    } catch (error) {
      getError(error);
    }
  };

  // ======= get Liability Lv3 ========
  const getLiabilitiesLv3 = async () => {
    try {
      const { assets } = await getAssetsLv3({
        assetLv2Id: selectLiabilityLv2?._id,
      }).unwrap();
      if (assets?.length > 0) {
        setLiabilityLv3(assets);
      } else {
        activeLink(4);
      }
    } catch (error) {
      getError(error);
    }
  };

  // ======= Add Asset Liability =========
  const handleSubmitLiability = async (e) => {
    e.preventDefault();
    const assteLiability = {
      type: "Liability",
      name,
      price,
      asset_liabilty_lv1: selectLiabilityLv1?._id,
      asset_liabilty_lv2: selectLiabilityLv2?._id,
      asset_liabilty_lv3: selectLiabilityLv3?._id,
    };
    try {
      const { asset } = await createAssetLiability(assteLiability).unwrap();
      setName("");
      setPrice("");
      setSelectLiabilityLv1("");
      setSelectLiabilityLv2("");
      setSelectLiabilityLv3("");
      hide();
      activeLink(1);
      if (asset?.type === "Asset") {
        getSuccess("Asset added successfully");
      } else {
        getSuccess("Liability added successfully");
      }
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
              Add Liability
            </div>
          </div>

          <div
            className="text-center mt-2"
            style={{
              fontSize: "14px",
              fontWeight: 500,
              color: "#374957",
            }}
          >
            To add a Liability, please select the Liability first.
          </div>

          <div className="px-3 mt-2">
            <div
              style={{
                color: "var(--primary-color)",
                fontSize: "18px",
                fontWeight: 600,
              }}
            >
              Liability
            </div>

            <Card className="mt-2">
              <Card.Body>
                {!liabilityLoading
                  ? liabilityLv1?.map((data) => {
                      return (
                        <div
                          key={data?._id}
                          className="d-flex align-items-center justify-content-between mt-2"
                        >
                          <div className="d-flex gap-3">
                            <img
                              style={{
                                width: "35px",
                                height: "35px",
                                borderRadius: "50%",
                                objectFit: "cover",
                              }}
                              src={imgAddr + data?.image}
                              alt="..."
                            />
                            <div>
                              <div
                                style={{ fontSize: "14px", fontWeight: 500 }}
                              >
                                {data?.title}
                              </div>
                              <div
                                style={{ fontSize: "12px", color: "#374957CC" }}
                              >
                                {data?.type}
                              </div>
                            </div>
                          </div>
                          <MdOutlineKeyboardArrowRight
                            cursor={"pointer"}
                            size={23}
                            onClick={() => handleSelectLiabilityLv1(data)}
                          />
                        </div>
                      );
                    })
                  : [1, 2, 3]?.map((_, idx) => {
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
          </div>
        </>
      )}

      {active === 2 && (
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
                margin: "auto 150px",
                fontWeight: 600,
                fontSize: "18px",
                color: "rgba(55, 73, 87, 1)",
              }}
              className="text-center"
            >
              Add Property
            </div>
          </div>

          <div
            className="text-center mt-2"
            style={{
              fontSize: "14px",
              fontWeight: 500,
              color: "#374957",
            }}
          >
            To add a Property, please select the Property first.
          </div>

          <div className="px-3 mt-2">
            <div
              style={{
                color: "var(--primary-color)",
                fontSize: "18px",
                fontWeight: 600,
              }}
            >
              All property
            </div>

            <Card className="mt-2">
              <Card.Body>
                {!liabilityLv2Loading
                  ? liabilityLv2?.map((data) => {
                      return (
                        <div
                          key={data?._id}
                          className="d-flex align-items-center justify-content-between mt-2"
                        >
                          <div className="d-flex align-items-center gap-3">
                            <img
                              style={{
                                width: "35px",
                                height: "35px",
                                borderRadius: "50%",
                                objectFit: "cover",
                              }}
                              src={imgAddr + data?.image}
                              alt="..."
                            />
                            <div style={{ fontSize: "14px", fontWeight: 500 }}>
                              {data?.title}
                            </div>
                          </div>
                          <MdOutlineKeyboardArrowRight
                            cursor={"pointer"}
                            size={23}
                            onClick={() => handleSelectLiabilityLv2(data)}
                          />
                        </div>
                      );
                    })
                  : [1, 2, 3]?.map((_, idx) => {
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
          </div>
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
                margin: "auto 150px",
                fontWeight: 600,
                fontSize: "18px",
                color: "rgba(55, 73, 87, 1)",
              }}
              className="text-center"
            >
              Add Property
            </div>
          </div>

          <div
            className="text-center mt-2"
            style={{
              fontSize: "14px",
              fontWeight: 500,
              color: "#374957",
            }}
          >
            To add a property, please select the Residential category.
          </div>

          <div className="px-3 mt-2">
            <div
              style={{
                color: "var(--primary-color)",
                fontSize: "18px",
                fontWeight: 600,
              }}
            >
              Residential
            </div>
            <Card className="mt-2">
              <Card.Body>
                {!liabilityLv3Loading
                  ? liabilityLv3?.map((data) => {
                      return (
                        <div
                          key={data?._id}
                          className="d-flex align-items-center justify-content-between mt-2"
                        >
                          <div className="d-flex align-items-center gap-3">
                            <img
                              style={{
                                width: "35px",
                                height: "35px",
                                borderRadius: "50%",
                                objectFit: "cover",
                              }}
                              src={imgAddr + data?.image}
                              alt="..."
                            />

                            <div style={{ fontSize: "14px", fontWeight: 500 }}>
                              {data?.title}
                            </div>
                          </div>
                          <MdOutlineKeyboardArrowRight
                            cursor={"pointer"}
                            size={23}
                            onClick={() => handleSelectLiabilityLv3(data)}
                          />
                        </div>
                      );
                    })
                  : [1, 2, 3]?.map((_, idx) => {
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
              onClick={() => activeLink(1)}
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
              Add Property
            </div>
          </div>

          <div
            className="text-center mt-2"
            style={{
              fontSize: "14px",
              fontWeight: 500,
              color: "#374957",
            }}
          >
            To add a property, please select the Residential category.
          </div>

          <div className="px-3 mt-2">
            <Card className="mt-4">
              <div className="text-center" style={{ marginTop: "-15px" }}>
                <img
                  style={{
                    width: "35px",
                    height: "35px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    backgroundColor: "white",
                  }}
                  src={
                    selectLiabilityLv1?.image &&
                    imgAddr + selectLiabilityLv1?.image
                  }
                  alt="..."
                />
                <div
                  style={{
                    color: "var(--primary-color)",
                    fontSize: "16px",
                    fontWeight: 600,
                  }}
                >
                  {selectLiabilityLv1?.title} Property
                </div>
                <div
                  style={{
                    color: "#8B949C",
                    fontSize: "12px",
                    fontWeight: 500,
                  }}
                >
                  {selectLiabilityLv2?.title}
                </div>
              </div>
              <Card.Body>
                <Form onSubmit={handleSubmitLiability}>
                  <Form.Label>Name</Form.Label>
                  <FormField
                    type={"text"}
                    placeholder={"Enter Name"}
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <Form.Label>Price</Form.Label>
                  <FormField
                    type={"number"}
                    placeholder={"Enter Value"}
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                  <Button
                    type="submit"
                    className="float-sm-end w-100 "
                    style={{
                      background: "var(--primary-color)",
                      fontWeight: 700,
                      fontSize: "12px",
                      padding: "10px",
                    }}
                  >
                    {!createAssetLiabilityLoading ? (
                      "save"
                    ) : (
                      <Spinner animation="border" size="sm" />
                    )}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </div>
        </>
      )}
    </ModalWindow>
  );
};

export default Liabilities;
