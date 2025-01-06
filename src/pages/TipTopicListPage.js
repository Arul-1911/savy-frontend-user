import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetTipTopicsQuery } from "../features/apiSlice";
import { Button, Card, Table } from "react-bootstrap";
import { IoEyeOutline } from "react-icons/io5";
import ModalWindow from "../components/modals/ModalWindow";
import Skeleton from "react-loading-skeleton";

const TipTopicListPage = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [tiptopics, setTiptopics] = useState();
  const [isTipTopicLoading, setIsTipTopicLoading] = useState(false);
  const [showTiptopicModal, setShowTiptopicModal] = useState(false);
  const [selectedTiptopic, setSelectedTiptopic] = useState(null);

  const { data: tipTopicData, isLoading: isTiptopicFetching } =
    useGetTipTopicsQuery({ categoryId: categoryId });

  useEffect(() => {
    if (tipTopicData?.tipTopicModels) {
      setTiptopics(tipTopicData?.tipTopicModels);
    } else {
      setTiptopics([]);
    }
  }, [tipTopicData, isTiptopicFetching]);

  const handleViewTipTopic = (tiptopic) => {
    setSelectedTiptopic(tiptopic);
    setShowTiptopicModal(true);
  };

  const handleCloseModal = () => {
    setShowTiptopicModal(false);
    setSelectedTiptopic(null);
  };

  const handleGoBack = () => {
    navigate("/user/dashboard");
  };

  return (
    <>
      <div className="container mt-4 mb-3">
        {/* <Button variant="secondary" className="mb-3" onClick={handleGoBack}>
          Back
        </Button> */}
        {isTiptopicFetching ? (
          <Card className="m-2" style={{ border: "none" }}>
            <Card.Body>
              {[1, 2, 3, 4,5,6,7].map((_, index) => (
                <div
                  key={index}
                  className="d-flex justify-content-between align-items-center"
                  style={{
                    borderBottom: "1px solid rgba(0,0,0,.125)",
                    marginBottom: "5px",
                    paddingBottom: "5px",
                  }}
                >
                  <div style={{ width: "100%" }}>
                    <Skeleton height={30} />
                  </div>
                </div>
              ))}
            </Card.Body>
          </Card>
        ) : (
          <Card className="m-2" style={{ border: "none" }}>
            <Card.Body>
              {tiptopics?.map((tiptopic) => (
                <div
                  key={tiptopic._id}
                  className="d-flex justify-content-between align-items-center"
                  style={{
                    borderBottom: "1px solid rgba(0,0,0,.125)",
                    marginBottom: "5px",
                    paddingBottom: "5px",
                  }}
                >
                  <div style={{ width: "100%" }}>{tiptopic?.question}</div>
                  <Button
                    size="sm"
                    onClick={() => handleViewTipTopic(tiptopic)}
                    style={{
                      backgroundColor: " rgba(0, 74, 173, 1)",
                      color: "white",
                      border: "1px solid rgba(0, 74, 173, 1)",
                    }}
                  >
                    <IoEyeOutline style={{ border: "none" }} />
                  </Button>
                </div>
              ))}
            </Card.Body>
          </Card>
        )}

        <ModalWindow show={showTiptopicModal} onHide={handleCloseModal}>
          {selectedTiptopic && (
            <>
              <p>
                <div>
                  <strong>Question:</strong>
                </div>
                {selectedTiptopic?.question}
              </p>
              <p>
                <div>
                  <strong>Answer:</strong>
                </div>
                {selectedTiptopic?.answer}
              </p>
            </>
          )}
        </ModalWindow>
      </div>
    </>
  );
};

export default TipTopicListPage;
