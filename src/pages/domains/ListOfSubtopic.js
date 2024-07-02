import React, { useEffect, useState } from "react";
import { MotionDiv } from "../../components";
import DomainHeader from "../../components/layout/DomainHeader";
import { Card, Col, Container, Row } from "react-bootstrap";
import SearchField from "../../components/layout/SearchField";
import { AddButton } from "../../components/layout/CustomTable";
import { FiEdit } from "react-icons/fi";
import AddTopicSubtopicModal from "../../components/modals/AddTopicSubtopicModal";
import { useParams } from "react-router-dom";
import {
  useCreateSubTopicMutation,
  useGetSubTopicByIdMutation,
  useGetSubTopicsMutation,
  useGetTopicsMutation,
  useUpdateSubTopicByIdMutation,
} from "../../features/apiSlice";
import { getError } from "../../utils/error";
import { toast } from "react-toastify";
import Skeleton from 'react-loading-skeleton'
import { fetchSubtopics } from "../../utils/apis";

function ListOfSubtopics() {
  const [createSubtopic, { isLoading: createLoading }] =
    useCreateSubTopicMutation();
  const [getSubtopics,{isLoading}] = useGetSubTopicsMutation();
  const [getSubTopicsById, { isLoading: getByIdLoading }] = useGetSubTopicByIdMutation();
  const [updateSubTopicById, { isLoading: updateLoading }] = useUpdateSubTopicByIdMutation();
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [subtopics, setSubtopics] = useState([]);
  const [references, setReferences] = useState([]);
  const [images, setImages] = useState([]);
  const [preImages, setPreImages] = useState([]);
  const [subtopicId, setSubtopicId] = useState(null);
  const { id } = useParams();
  const [query,setQuery] = useState('');
  const [showAddModal, setShowModal] = useState(false);
  const handleShowAddModal = () => setShowModal(true);
  const handleHideAddModal = () => {
    setShowModal(false);
    setSubtopicId(null);
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
      formData.append("sub_topic_name", title);
      formData.append("description", description);
      formData.append("topic_reference", id);

      // formData.append('references', references);
      references.forEach((ref, index) => {
        formData.append(`references[]`, ref);
      });
     
      preImages.forEach((image, index) => {
        formData.append(`images`, image);
      });

      images.forEach((image, index) => {
        formData.append(`image`, image);
      });

      formData.append(`images`, '');

      console.log(images);

      const data = subtopicId
        ? await updateSubTopicById({ id: subtopicId, data: formData }).unwrap()
        : await createSubtopic(formData).unwrap();

      console.log(data);
      toast.success(data?.message);
      handleHideAddModal();
      fetchSubtopics();
    } catch (error) {
      getError(error);
    }
  };

  const fetchSubtopicById = async (id) => {
    setSubtopicId(id);
    try {
      const data = await getSubTopicsById(id).unwrap();
      console.log(data);
      setTitle(data?.subTopic?.sub_topic_name);
      setDescription(data?.subTopic?.description);
      setReferences(data?.subTopic?.references);
      setPreImages(data?.subTopic?.images);
      handleShowAddModal();
    } catch (error) {
      getError(error);
    }
  };

  

  useEffect(() => {
    fetchSubtopics({setSubtopics,id,getSubtopics,params:`key=${query}`});
  }, [query]);

  // const subtopicsTest = [
  //     {sub_topic_name:'Subtopic 1'},
  //     {sub_topic_name:'Subtopic 2'},
  //     {sub_topic_name:'Subtopic 3'},
  //     {sub_topic_name:'Subtopic 4'},
  //     {sub_topic_name:'Subtopic 5'},
  //     {sub_topic_name:'Subtopic 6'},
  //     {sub_topic_name:'Subtopic 7'},
  //     {sub_topic_name:'Subtopic 8'},

  // ]

  return (
    <MotionDiv>
      <DomainHeader />
      <Row className="my-3">
        <Col>
          <h5>Edit/Remove subtopics from selected topic</h5>
        </Col>
        <Col className="text-end">Selected Topic: Control Engineering</Col>
      </Row>
      <Row>
        <Col md={5}>
          <h4 className="mb-3">List of Subtopics</h4>
        </Col>

        <Col>
          <SearchField placeholder="Search Subtopic" query={query} setQuery={setQuery}/>
        </Col>
        <Col md={3} className="text-end">
          <AddButton func={handleShowAddModal} title={"Add New Subtopic"} />
        </Col>
      </Row>


        <Row sm={2} className="my-3 px-md-5">
          {isLoading ?
            [...Array(6)].map((_, index) => (
                <Col >
                <Skeleton height={'3rem'} className='mb-2' key={index} />
                </Col>
              ))
          :
          subtopics.length > 0 ? subtopics?.map((data, i) => (
            <Col className="p-1" key={data?._id}>
              <Card className="p-2 w-100 ">
                <Row className="align-items-center">
                  <Col>{data?.sub_topic_name}</Col>
                  <Col xs={2}>
                    <FiEdit
                      className="ms-left"
                      color="rgba(0, 0, 139, 1)"
                      style={{ cursor: "pointer" }}
                      size={20}
                      onClick={() => fetchSubtopicById(data?._id)}
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
        heading={"Subtopic"}
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

export default ListOfSubtopics;
