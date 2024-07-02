import React, { useEffect, useState } from "react";
import { MotionDiv } from "../../components";
import DomainHeader from "../../components/layout/DomainHeader";
import { Card, Col, Container, Row } from "react-bootstrap";
import SearchField from "../../components/layout/SearchField";
import { AddButton } from "../../components/layout/CustomTable";
import { FiEdit } from "react-icons/fi";
import AddTopicSubtopicModal from "../../components/modals/AddTopicSubtopicModal";
import {
  useCreateTopicMutation,
  useGetTopicByIdMutation,
  useGetTopicsMutation,
  useUpdateTopicByIdMutation,
} from "../../features/apiSlice";
import { getError } from "../../utils/error";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchTopics } from "../../utils/apis";
import Skeleton from 'react-loading-skeleton'

function ListOfTopics() {
  const [createTopic, { isLoading: createLoading }] = useCreateTopicMutation();
  const [getTopicById, { isLoading: getByIdLoading }] =
    useGetTopicByIdMutation();
  const [updateTopicById, { isLoading: updateLoading }] =
    useUpdateTopicByIdMutation();
  const [getTopics,{isLoading}] = useGetTopicsMutation();

  const [topics, setTopics] = useState([]);
  const { id } = useParams();
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [references, setReferences] = useState([]);
  const [images, setImages] = useState([]);
  const [preImages, setPreImages] = useState([]);
  const [topicId, setTopicId] = useState(null);
  const [query,setQuery] = useState('')
  const [showAddModal, setShowModal] = useState(false);
  const handleShowAddModal = () => setShowModal(true);
  const handleHideAddModal = () => {
    setShowModal(false);
    setTopicId(null);
    setTitle(null);
    setDescription(null);
    setReferences([]);
    setImages([]);
    setPreImages([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("topic_name", title);
      formData.append("description", description);
      formData.append("sub_domain_reference", id);

      // formData.append('references', references);
      references.forEach((ref, index) => {
        formData.append(`references[]`, ref);
      });

      preImages.forEach((image, index) => {
        formData.append(`images`, image);
      });
      formData.append(`images`, '');

      images.forEach((image, index) => {
        formData.append(`image`, image);
      });


      console.log(images);

      const data = topicId
        ? await updateTopicById({ id: topicId, data: formData }).unwrap()
        : await createTopic(formData).unwrap();

      console.log(data);
      toast.success(data?.message);
      handleHideAddModal();
      fetchTopics();
    } catch (error) {
      getError(error);
    }
  };

  const fetchTopicById = async (id) => {
    setTopicId(id);
    try {
      const data = await getTopicById(id).unwrap();
      console.log(data);
      setTitle(data?.topic?.topic_name);
      setDescription(data?.topic?.description);
      setReferences(data?.topic?.references);
      setPreImages(data?.topic?.images);
      handleShowAddModal();
    } catch (error) {
      getError(error);
    }
  };



  useEffect(()=>{
    fetchTopics({setTopics,id,getTopics,params:`key=${query}`});
},[query])

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

  return (
    <MotionDiv>
      <DomainHeader />
      <h5 className="my-3">
        Edit/Remove topics from selected area of speciality
      </h5>
      <Row>
        <Col md={6}>
          <h4 className="mb-3">List of Topics</h4>
        </Col>

        <Col>
          <SearchField placeholder="Search Topic" query={query} setQuery={setQuery}/>
        </Col>
        <Col md={3}>
          <AddButton func={handleShowAddModal} title={"Add New Topic"} />
        </Col>
      </Row>

    
        <Row sm={2} className="my-3 px-md-5">
        {isLoading ?
            [...Array(6)].map((_, index) => (
                <Col >
                <Skeleton height={'3rem'} className='mb-2' key={index} />
                </Col>
              ))
          : topics.length >0 ? topics?.map((item, i) => (
            <Col className="p-1">
              <Card className="p-2 w-100 ">
                <Row className="align-items-center">
                  <Col>{item?.topic_name}</Col>
                  <Col xs={2}>
                    <FiEdit
                      className="ms-left"
                      color="rgba(0, 0, 139, 1)"
                      style={{ cursor: "pointer" }}
                      size={20}
                      onClick={() => fetchTopicById(item?._id)}
                    />
                  </Col>
                </Row>
              </Card>
            </Col>
          ))
          :
          <p>No data</p>
          
          }
        </Row>
 

<AddTopicSubtopicModal
        heading={"Topic"}
        loading={createLoading || updateLoading}
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        onSubmit={handleSubmit}
        show={showAddModal}
        onHide={handleHideAddModal}
        references={references}
        setReferences={setReferences}
        images={images}
        setImages={setImages}
        preImages={preImages}
        setPreImages={setPreImages}
      />
    </MotionDiv>
  );
}

export default ListOfTopics;
