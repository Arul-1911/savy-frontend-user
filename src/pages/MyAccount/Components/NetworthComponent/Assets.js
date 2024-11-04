import React, { useEffect, useState } from "react";
import ModalWindow from "../../../../components/modals/ModalWindow";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { Card } from "react-bootstrap";
import { imgAddr, useGetAssetsMutation } from "../../../../features/apiSlice";
import { getError } from "../../../../utils/error";
import Skeleton from "react-loading-skeleton";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const Assets = ({ show, hide, active, activeLink }) => {
  const [getAssets, { isLoading: assetLoading }] = useGetAssetsMutation();
  const [assetsLv1, setAssetLv1] = useState([]);

  useEffect(() => {
    if (active === 1) {
      getAllAssets();
    }
  }, [active]);

  const getAllAssets = async () => {
    try {
      const { assets } = await getAssets().unwrap();
      setAssetLv1(assets);
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
              Add Assets
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
            To add a Assets, please select the Assets first.
          </div>

          <div className="px-3 mt-2">
            <div
              style={{
                color: "var(--primary-color)",
                fontSize: "18px",
                fontWeight: 600,
              }}
            >
              Assets
            </div>

            <Card className="mt-2">
              <Card.Body>
                {!assetLoading
                  ? assetsLv1?.map((data) => {
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
    </ModalWindow>
  );
};

export default Assets;
