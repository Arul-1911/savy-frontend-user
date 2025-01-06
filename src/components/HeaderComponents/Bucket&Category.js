import React, { useState, useEffect } from "react";
import ModalWindow from "../modals/ModalWindow";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { Accordion } from "react-bootstrap";
import { RxCrossCircled } from "react-icons/rx";
import { Link } from "react-router-dom";
import {
  useGetbucketCategoriesQuery,
  useGetBucketsQuery,
} from "../../features/apiSlice";
import Skeleton from "react-loading-skeleton";

const BucketCategory = ({ show, hide, active }) => {
  const [buckets, setBuckets] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedBucketId, setSelectedBucketId] = useState(null);
  const [isCategoryLoading, setIsCategoryLoading] = useState(false);
  const { data: bucketData, isLoading: isBucketLoading } = useGetBucketsQuery();
  const { data: categoryData, isFetching: isCategoryFetching } =
    useGetbucketCategoriesQuery(
      { bucketId: selectedBucketId },
      { skip: !selectedBucketId }
    );

  useEffect(() => {
    if (bucketData?.buckets && Array.isArray(bucketData.buckets)) {
      setBuckets(bucketData?.buckets);
    } else {
      setBuckets([]);
    }
  }, [bucketData]);

  useEffect(() => {
    if (categoryData?.categorys && Array.isArray(categoryData?.categorys)) {
      setCategories(categoryData?.categorys);
    } else {
      setCategories([]);
    }
    setIsCategoryLoading(isCategoryFetching);
  }, [categoryData, isCategoryFetching, selectedBucketId]);

  const handleBucketClick = (bucketId) => {
    if (bucketId === selectedBucketId) {
      setSelectedBucketId(null);
      setCategories([]);
      setIsCategoryLoading(false);
    } else {
      setSelectedBucketId(bucketId);
      setCategories([]);
      setIsCategoryLoading(true);
    }
  };

  return (
    <>
      <ModalWindow show={show} onHide={hide}>
        {active === 1 && (
          <>
            <div className="d-flex justify-content-between">
              <IoArrowBackCircleOutline
                color="rgba(92, 182, 249, 1)"
                cursor={"pointer"}
                size={28}
              />
              <h6 style={{ color: "rgba(0, 74, 173, 1)" }}>
                Buckets & Categories
              </h6>
              <RxCrossCircled
                color="rgba(92, 182, 249, 1)"
                cursor={"pointer"}
                size={23}
                onClick={() => hide(false)}
              />
            </div>

            <div className="px-4 mt-3 main-offcanvas-body">
              {isBucketLoading ? (
                [1, 2].map((_, idx) => {
                  return (
                    <div key={idx}>
                      <Skeleton
                        className="rounded-2"
                        height={"30px"}
                        width={"100%"}
                      />
                    </div>
                  );
                })
              ) : (
                <Accordion
                  activeKey={selectedBucketId}
                  alwaysOpen
                  className="border-0"
                >
                  {buckets?.map((bucket) => (
                    <Accordion.Item
                      eventKey={bucket._id}
                      key={bucket._id}
                      className="border-0"
                    >
                      <Accordion.Header
                        className="border-0"
                        style={{ backgroundColor: "#E2F2FF" }}
                        onClick={() => handleBucketClick(bucket._id)}
                      >
                        <span style={{ color: "#004AAD", fontWeight: "600" }}>
                          {bucket.name}
                        </span>
                      </Accordion.Header>
                      <Accordion.Body className="border-0 py-0">
                        {selectedBucketId === bucket._id && isCategoryLoading
                          ? [1, 2].map((_, idx) => {
                              return (
                                <div key={idx}>
                                  <Skeleton
                                    className="rounded-2"
                                    height={"30px"}
                                    width={"100%"}
                                  />
                                </div>
                              );
                            })
                          : selectedBucketId === bucket._id &&
                            categories?.map((category) => (
                              <p
                                key={category._id}
                                className="my-0 py-1"
                                style={{
                                  borderBottom: "1px solid #E2F2FF",
                                  fontWeight: "500",
                                }}
                              >
                                <Link
                                  to={`/user/dashboard/tiptopics/${category._id}`}
                                  style={{ color: "#374957" }}
                                  onClick={() => hide(false)}
                                >
                                  {category.name}
                                </Link>
                              </p>
                            ))}
                      </Accordion.Body>
                    </Accordion.Item>
                  ))}
                </Accordion>
              )}
            </div>
          </>
        )}
      </ModalWindow>
    </>
  );
};

export default BucketCategory;
