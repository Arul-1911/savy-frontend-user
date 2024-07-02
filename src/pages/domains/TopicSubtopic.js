import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import SearchField from "../../components/layout/SearchField";
import { IoAddCircleSharp } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import { FaAngleRight, FaArrowRight, FaChevronRight } from "react-icons/fa";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { AddButton } from "../../components/layout/CustomTable";
import { MotionDiv } from "../../components";
import DomainHeader from "../../components/layout/DomainHeader";
import {
  useGetSubTopicsMutation,
  useGetTopicsMutation,
} from "../../features/apiSlice";
import { getError } from "../../utils/error";
import Skeleton from "react-loading-skeleton";
import { fetchSubtopics, fetchTopics } from "../../utils/apis";

function TopicSubtopic() {
  const [getTopics, { isLoading: topicLoading }] = useGetTopicsMutation();
  const [getSubtopics, { isLoading: subtopicLoading }] =
    useGetSubTopicsMutation();
  const [topics, setTopics] = useState([]);
  const [subtopics, setSubtopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [topicQuery, setTopicQuery] = useState("");
  const [subTopicQuery, setSubTopicQuery] = useState("");

  const { id } = useParams();

  // const fetchTopics = async()=>{
  //     try {
  //       const data = await getTopics(id).unwrap();
  //       console.log(data);
  //       setTopics(data?.topics);
  //     } catch (error) {
  //       getError(error)
  //     }
  //   }

  // const fetchSubtopics = async()=>{
  //     try {
  //       const data = await getSubtopics(selectedTopic).unwrap();
  //       console.log(data);
  //       setSubtopics(data?.subTopics);
  //     } catch (error) {
  //       getError(error)
  //     }
  //   }

  useEffect(() => {
    fetchTopics({ setTopics, id, getTopics, params: `key=${topicQuery}` });
  }, [topicQuery]);

  useEffect(() => {
    if (selectedTopic) {
      fetchSubtopics({
        setSubtopics,
        id: selectedTopic,
        getSubtopics,
        params: `key=${subTopicQuery}`,
      });
    }
  }, [selectedTopic, subTopicQuery]);

  useEffect(() => {
    if (topics.length > 0) {
      setSelectedTopic(topics[0]?._id);
    }
  }, [topics]);

  // const topicsTest = [
  //     {topic_name:'Control Engineering'},
  //     {topic_name:'Workshop 1'},
  //     {topic_name:'Fluid Mechanics'},
  //     {topic_name:'Mathematics 1'},
  //     {topic_name:'FMC'},
  //     {topic_name:'Thermal Engineering'},
  //     {topic_name:'Mathematics 2'},
  //     {topic_name:'Physics'},
  // ]

  // const subtopicsTest = [
  //     {sub_topic_name: 'Subtopic 1'},
  //     {sub_topic_name: 'Subtopic 2'},
  //     {sub_topic_name: 'Subtopic 3'},
  //     {sub_topic_name: 'Subtopic 4'},
  //     {sub_topic_name: 'Subtopic 5'},
  //     {sub_topic_name: 'Subtopic 6'},
  //     {sub_topic_name: 'Subtopic 7'},
  //     {sub_topic_name: 'Subtopic 8'},

  // ];

  return (
    <MotionDiv>
      <DomainHeader />
      <Row className="my-3">
        <Col className="text-end">
          Exam/Certification By:{" "}
          <u style={{ color: "rgba(128, 152, 249, 1)" }}>Edicexam.com</u>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card className="p-3 border-0 shadow ">
            <p>
              Selected Area of Speciality: <span>Mechanical Engineering</span>
            </p>
            <Row>
              <Col sm={7}>
                <SearchField
                  query={topicQuery}
                  setQuery={setTopicQuery}
                  placeholder="Search Topic"
                />
              </Col>
              <Col className="justify-content-end d-flex align-items-center">
                {topics?.length > 0 && (
                  <Link
                    to={`/admin/domains/all-topics/${id}`}
                    style={{ color: "rgba(0, 0, 155, 1)" }}
                  >
                    <u>
                      View All <FaChevronRight />
                    </u>
                  </Link>
                )}
              </Col>
            </Row>
            <h6 className="mt-3">Topics included in it:</h6>
            {topicLoading ? (
              [...Array(8)].map((_, index) => (
                <Skeleton height={"2rem"} className="mb-2" key={index} />
              ))
            ) : topics?.length > 0 ? (
              topics?.map((item, index) => (
                <Col className="p-1" key={item?._id}>
                  <div
                    className={`d-flex justify-content-between align-items-center border rounded p-2  ${
                      selectedTopic === item?._id ? "selected-topic" : ""
                    }`}
                    onClick={() => setSelectedTopic(item?._id)}
                    style={{ maxWidth: "500px", cursor: "pointer" }}
                  >
                    <span>{item?.topic_name}</span>
                    <FaAngleRight />
                  </div>
                </Col>
              ))
            ) : (
              <p>No topics</p>
            )}
          </Card>
        </Col>
        <Col>
          <Card className="p-3 border-0 shadow">
            <p>
              Selected Topic: <span>Control Engineering</span>
            </p>
            <Row>
              <Col sm={7}>
                <SearchField
                  placeholder="Search Subtopic"
                  query={subTopicQuery}
                  setQuery={setSubTopicQuery}
                />
              </Col>
              <Col className="justify-content-end d-flex align-items-center">
                {subtopics?.length > 0 && topics.length > 0 && (
                  <Link
                    to={`/admin/domains/all-subtopics/${selectedTopic}`}
                    style={{ color: "rgba(0, 0, 155, 1)" }}
                  >
                    <u>
                      View All <FaChevronRight />
                    </u>
                  </Link>
                )}
              </Col>
            </Row>
            <h6 className="mt-3">Subtopics included in it:</h6>
            {subtopicLoading ? (
              [...Array(8)].map((_, index) => (
                <Skeleton height={"2rem"} className="mb-2" key={index} />
              ))
            ) : subtopics?.length > 0 ? (
              subtopics?.map((item, index) => (
                <Col className="p-1" key={item?._id}>
                  <div
                    className="d-flex justify-content-between align-items-center   p-2 "
                    style={{
                      borderLeft: "1px solid rgba(45, 50, 130, 1)",
                      color: "rgba(45, 50, 130, 1)",
                      maxWidth: "500px",
                      cursor: "pointer",
                    }}
                  >
                    <span>{item?.sub_topic_name}</span>
                    <FaAngleRight />
                  </div>
                </Col>
              ))
            ) : (
              <p>No Subtopics</p>
            )}
          </Card>
        </Col>
      </Row>
    </MotionDiv>
  );
}

export default TopicSubtopic;
