import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import FormField from "../../components/layout/FormField";
import SearchField from "../../components/layout/SearchField";
import CustomTable, {
  AddButton,
  DeleteButton,
  EditButton,
  ViewButton,
} from "../../components/layout/CustomTable";
import { MotionDiv } from "../../components";
import { FiTrash } from "react-icons/fi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { CiSquarePlus } from "react-icons/ci";
import { FaRegQuestionCircle, FaRegSave, FaSave } from "react-icons/fa";
import UploadImages from "../../components/layout/UploadImages";
import ModalTemplate from "../../components/modals/ModalTemplate";
import { useNavigate, useParams } from "react-router-dom";
import References from "../../components/layout/References";
import { FaRegRectangleXmark } from "react-icons/fa6";
import {
  useCreateQuestionMutation,
  useGetDomainsMutation,
  useGetQuestionByIdMutation,
  useGetSubTopicsMutation,
  useGetSubdomainsMutation,
  useGetTopicsMutation,
  useUpdateQuestionByIdMutation,
} from "../../features/apiSlice";
import {
  fetchDomains,
  fetchSubdomains,
  fetchSubtopics,
  fetchTopics,
} from "../../utils/apis";
import { getError } from "../../utils/error";
import { toast } from "react-toastify";

function AddEditQuestion() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [curPage, setCurPage] = useState(1);
  const [resultPerPage, setResultPerPage] = useState(10);
  const { id } = useParams();
  const [getTopics, { isLoading: topicLoading }] = useGetTopicsMutation();
  const [getSubtopics, { isLoading: subtopicLoading }] =
    useGetSubTopicsMutation();
  const [getDomains, { data: domainData }] = useGetDomainsMutation();
  const [getSubdomains, { data: subdomainLoading }] =
    useGetSubdomainsMutation();
  const [createQuestion] = useCreateQuestionMutation();
  const [getQuestionById] = useGetQuestionByIdMutation();
  const [updateQuestionById] = useUpdateQuestionByIdMutation();

  const [topics, setTopics] = useState([]);
  const [subtopics, setSubtopics] = useState([]);
  const [domains, setDomains] = useState([]);
  const [subdomains, setSubdomains] = useState([]);

  const [queImages, setQueImages] = useState([]);
  const [exImages, setExImages] = useState([]);
  const [preExImages, setPreExImages] = useState([]);
  const [preQueImages, setPreQueImages] = useState([]);
  const [references, setReferences] = useState([]);

  const [form, setForm] = useState({
    questionType: 'Select Best Option',
    difficultyLevel: 'Basic'
  });

  useEffect(() => {
    if (id) {
      fetchQuestionById();
    }
  }, [id]);

  const fetchQuestionById = async () => {
    try {
      const data = await getQuestionById(id).unwrap();
      console.log(data);
      const que = data?.question;

      setForm({
        question: que?.question,
        difficultyLevel: que?.difficulty_level,
        questionType: que?.question_type,
        explanation: que?.explanation?.description,
        correctAns: que?.correct_option,
        subtopic: que?.sub_topic_reference?._id,
        topic: que?.sub_topic_reference?.topic_reference?._id,
        subdomain:
          que?.sub_topic_reference?.topic_reference?.sub_domain_reference?._id,
        domain:
          que?.sub_topic_reference?.topic_reference?.sub_domain_reference
            ?.domain_reference?._id,
      });
      if (que?.options && Array.isArray(que?.options)) {
        const options = que?.options.map((option, index) => ({
          option: String.fromCharCode(65 + index),
          content: option,
        }));
        setAnswerOptions(options);
      }

      setReferences(que?.explanation?.references);
      setPreQueImages(que?.images);
      setPreExImages(que?.explanation?.images);
    } catch (error) {
      getError(error);
    }
  };

  useEffect(() => {
    fetchDomains({ getDomains, setDomains });
  }, []);

  useEffect(() => {
    if (form?.domain) {
      fetchSubdomains({ getSubdomains, setSubdomains, id: form?.domain });
    }
  }, [form?.domain]);

  useEffect(() => {
    if (form?.subdomain) {
      fetchTopics({ getTopics, setTopics, id: form?.subdomain });
    }
  }, [form?.subdomain]);

  useEffect(() => {
    if (form?.topic) {
      fetchSubtopics({ getSubtopics, setSubtopics, id: form?.topic });
    }
  }, [form?.topic]);

  const curPageHandler = (p) => setCurPage(p);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const handleShowAddModal = () => setShowAddModal(true);
  const handleHideAddModal = () => setShowAddModal(false);
  const handleShowCancelModal = () => setShowCancelModal(true);
  const handleHideCancelModal = () => setShowCancelModal(false);

  const [showCreatedModal, setShowCreatedModal] = useState(false);
  const handleShowCreatedModal = () => setShowCreatedModal(true);
  const handleHideCreatedModal = () => {
    setShowCreatedModal(false);
    navigate("/admin/questions");
  };
  const handleCancelConfirm = () => {
    handleHideCancelModal();
    navigate("/admin/questions");
  };

  const handleConfirmBtn = async ({ status = "Completed" }) => {
    try {
      console.log(form);
     

        
      const formData = new FormData();

      formData.append("sub_topic_reference", form?.subtopic);
      formData.append("question", form?.question);
      formData.append("difficulty_level", form?.difficultyLevel);

      if (id) {
        formData.append(`explanation_description `, form?.explanation);

        references.forEach((reference, index) => {
          formData.append(`explanation_reference[]`, reference);
        });
        // formData.append(`explanation_references `, "");

        preExImages.forEach((image, index) => {
          formData.append(`explanation_images[]`, image);
        });
      
        // formData.append(`explanation_images `, "");


      } else {
        formData.append("explanation[description]", form?.explanation);

        references.forEach((reference, index) => {
          formData.append(`explanation[references]`, reference);
        });
      }
      //  formData.append('explanation', JSON.stringify({
      //   description: form?.explanation,
      //   references: references.map(reference => JSON.stringify(reference)),
      //   images: preExImages.map(images=>JSON.stringify(images))
      // }));

      queImages.forEach((image, index) => {
        formData.append(`image`, image);
      });

      exImages.forEach((image, index) => {
        formData.append(`image`, image);
      });

      preQueImages.forEach((image, index) => {
        formData.append(`images[]`, image);
      });

      // preExImages.forEach((image, index) => {
      //   formData.append(`images`, image);
      // });

      // formData.append(`images`, "");

      formData.append("status", status);

      if(form?.questionType==='Select Best Option'){

        answerOptions.forEach((option, index) => {
          formData.append(`options`, option?.content);
        });
      }

      formData.append("question_type", form?.questionType);
      formData.append("images_count", queImages?.length);
      formData.append("correct_option", form?.correctAns);

      const data = id
        ? await updateQuestionById({ id, data: formData }).unwrap()
        : await createQuestion(formData).unwrap();

      console.log(data);
      handleHideAddModal();
      handleShowCreatedModal();

         if(status === 'Pending'){
          toast.success(data?.message)
         }

     

    } catch (error) {
      getError(error);
    }
  };
  // const domains = [{ name: "Engineering" }, { name: "Medical" }];
  // const subDomains = [
  //   { name: "Mechanical Engineering" },
  //   { name: "Civil Engineering" },
  // ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

if(form.correctAns !== null){
  handleShowAddModal();

  }else{
    toast.warn('Please Select Correct Answer Option')
  }

    
  };

  const [answerOptions, setAnswerOptions] = useState([
    { option: "A", content: "" },
  ]);

  const handleAddNewOption = () => {
    const nextOption = String.fromCharCode(answerOptions.length + 65);
    setAnswerOptions([...answerOptions, { option: nextOption, content: "" }]);
  };

  const handleDeleteOption = (index) => {
    const updatedOptions = [...answerOptions];
    updatedOptions.splice(index, 1);
    updatedOptions.forEach((option, i) => {
      option.option = String.fromCharCode(i + 65);
    });
    setAnswerOptions(updatedOptions);
  };

  const handleContentChange = (index, value) => {
    const updatedOptions = [...answerOptions];
    updatedOptions[index].content = value;
    setAnswerOptions(updatedOptions);
  };

  const answerDiv = (option, index) => {
    return (
      <Row key={index}>
        <Col xs={1} className=" m-0">
        <Form.Check
          type="radio"
          name="correctAns"
          id={`option-${index}`}
          
          checked={form?.correctAns == option?.content}
          // value={form?.correctAns === option?.content}
          onChange={()=>setForm({ ...form, correctAns: option?.content })}
        />
        </Col>
        <Col className="p-0 m-0">
          <Row>
            <Col>
              <p
                style={{ color: "rgba(0, 0, 139, 1)" }}
                className="fw-bold"
              >{`${option?.option}]`}</p>
            </Col>
            <Col className="text-end">
              <FiTrash
                color="rgba(249, 84, 40, 1)"
                style={{ cursor: "pointer" }}
                onClick={() => handleDeleteOption(index)}
              />
              <BsThreeDotsVertical color="rgba(45, 44, 44, 1)" />
            </Col>
          </Row>
          <Row>
            <Col>
              <textarea
                className=" rounded"
                style={{
                  width: "100%",
                  minHeight: "100px",
                  maxHeight: "100px",
                  padding: "10px",
                }}
                value={option?.content}
                onChange={(e) => handleContentChange(index, e.target.value)}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    );
  };

  console.log(form)

  return (
    <MotionDiv>
      <Row>
        <Col>
          <FormField
            label={"Search & Select Domain:"}
            type={"select"}
            name={"domain"}
            value={form?.domain}
            onChange={handleChange}
            options={domains?.map((item) => ({
              label: item?.domain_name,
              value: item?._id,
            }))}
          />
        </Col>
        <Col>
          <FormField
            label={"Search & Select Speciality Area:"}
            type={"select"}
            name={"subdomain"}
            value={form?.subdomain}
            onChange={handleChange}
            options={subdomains?.map((item) => ({
              label: item?.sub_domain_name,
              value: item?._id,
            }))}
          />
        </Col>
        <Col>
          <FormField
            label={"Search & Select Topic:"}
            type={"select"}
            name={"topic"}
            value={form?.topic}
            onChange={handleChange}
            options={topics?.map((item) => ({
              label: item?.topic_name,
              value: item?._id,
            }))}
          />
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <FormField
            label={"Search & Select Subtopic:"}
            type={"select"}
            name={"subtopic"}
            value={form?.subtopic}
            onChange={handleChange}
            options={subtopics?.map((item) => ({
              label: item?.sub_topic_name,
              value: item?._id,
            }))}
          />
        </Col>
        <Col md={4}>
          <FormField
            label={"Select Question Type:"}
            type={"dropdown"}
            name={"questionType"}
            value={form?.questionType}
            onChange={handleChange}
            options={[
              { label: "Select Best Answer", value: "Select Best Option" },
              { label: "True Or False", value: "True/False" },
            ]}
          />
        </Col>
      </Row>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Card
              className="border-0 shadow custom-card"
              style={{ height: "100%" }}
            >
              <Card.Header
                style={{ color: "rgba(97, 114, 243, 1)" }}
                className="bg-white"
              >
                <h6>
                  <FaRegQuestionCircle /> Question:
                </h6>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col>Select Difficulty Level:</Col>
                  <Col>
                    <FormField
                      type={"dropdown"}
                      name={"difficultyLevel"}
                      value={form?.difficultyLevel}
                      onChange={handleChange}
                      options={[
                        { value: "Basic", label: "Basic" },
                        { value: "Medium", label: "Medium" },
                        { value: "Advanced", label: "Advanced" },
                      ]}
                    />
                  </Col>
                  <Col></Col>
                </Row>
                <div>
                  <textarea
                    required
                    className="custom-scroll  rounded"
                    style={{
                      minHeight: "25vh",
                      maxHeight: "30vh",
                      width: "100%",
                      overflowY: "scroll",
                      padding: "10px",
                    }}
                    // onInput={handleChange}
                    onChange={handleChange}
                    name="question"
                    value={form?.question}
                  />
                </div>

                <UploadImages
                  setImages={setQueImages}
                  images={queImages}
                  preImages={preQueImages}
                  setPreImages={setPreQueImages}
                />
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card
              className="border-0 shadow custom-card"
              style={{ height: "100%" }}
            >
                {form?.questionType === 'True/False'?
                <>
                <Card.Header className="bg-white ">
                <Row>
                  <Col style={{ color: "rgba(97, 114, 243, 1)" }} md={4}>
                    <h6>Answer:</h6>
                  </Col>
                  
                </Row>
              </Card.Header>
              <Card.Body>
                <p>Select Correct Answer</p>
              <Form.Check
          type="radio"
          name="correctAns"
          id={`true`}
          label={'True'}
          checked={form?.correctAns === "true"}
          // value={form?.correctAns === true}
          onChange={()=>setForm({ ...form, correctAns: "true" })}
        />
              <Form.Check
          type="radio"
          name="correctAns"
          id={`false`}
          label={'False'}
          checked={form?.correctAns === "false"}
          // value={form?.correctAns === option?.content}
          onChange={()=>setForm({ ...form, correctAns: "false" })}
        />
</Card.Body>
                </>
             

                
                
                
                :
                <>
                 <Card.Header className="bg-white ">
                <Row>
                  <Col style={{ color: "rgba(97, 114, 243, 1)" }} md={4}>
                    <h6>Answer:</h6>
                  </Col>
                  <Col className="text-end ">
                    <u
                      style={{ color: "rgba(0, 0, 139, 1)", cursor: "pointer" }}
                      onClick={handleAddNewOption}
                    >
                      Add New Option <CiSquarePlus />
                    </u>
                  </Col>
                </Row>
              </Card.Header>

              <Card.Body
                style={{ overflowY: "scroll", overflowX: "hidden" }}
                className="custom-scroll"
              >
                {/* {answerDiv({option:'A'})}
               {answerDiv({option:'B'})}
               {answerDiv({option:'C'})} */}
                {answerOptions.map((option, index) => answerDiv(option, index))}
              </Card.Body>
                </>
              }

              


            </Card>
          </Col>
        </Row>
        <Row className="my-2">
          <Col>
            <Card className="border-0 shadow">
              <Card.Body>
                <Row>
                  <Col className="blue">
                    <h6>Explanation:</h6>
                  </Col>

                  <Col></Col>
                </Row>
                <Row>
                  <Col>
                    <textarea
                      required
                      style={{
                        width: "100%",
                        minHeight: "100px",
                        maxHeight: "100px",
                        padding: "10px",
                      }}
                      name="explanation"
                      value={form?.explanation}
                      onChange={handleChange}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <UploadImages
                      setImages={setExImages}
                      images={exImages}
                      preImages={preExImages}
                      setPreImages={setPreExImages}
                    />
                  </Col>
                  <Col>
                    <References
                      setReferences={setReferences}
                      references={references}
                    />
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="my-3">
          <Col>
            <Button
              variant="transparent"
              className="del-btn"
              onClick={handleShowCancelModal}
            >
              Cancel <FaRegRectangleXmark />
            </Button>
          </Col>
          <Col className="text-end">
            <Button variant="transparent" className="add-btn m-1" onClick={()=>handleConfirmBtn({status:'Pending'})}>
              Save as Draft <FaRegSave />
            </Button>
            <Button
              variant="transparent"
              type="submit"
              className="blue-btn m-1"
            >
              Save Question
            </Button>
          </Col>
        </Row>
      </Form>

      <ModalTemplate
        title={"Are you sure you want to eliminate this question?"}
        description={
          "Lorem ipsum dolor sit amet consectetur. Suscipit nunc tincidunt iaculis sit feugiat platea. Aliquet amet cras amet mauris neque facilisi. Scelerisque interdum elit maecenas."
        }
        src={"/icons/question-red.png"}
        onDiscard={handleHideCancelModal}
        show={showCancelModal}
        onHide={handleHideCancelModal}
        onConfirm={handleCancelConfirm}
      />
      <ModalTemplate
        title={"Are you sure you want to save this question?"}
        description={
          "Lorem ipsum dolor sit amet consectetur. Suscipit nunc tincidunt iaculis sit feugiat platea. Aliquet amet cras amet mauris neque facilisi. Scelerisque interdum elit maecenas."
        }
        src={"/icons/question-green.png"}
        onDiscard={handleHideAddModal}
        show={showAddModal}
        onHide={handleHideAddModal}
        onConfirm={handleConfirmBtn}
      />
      <ModalTemplate
        title={`You have successfully ${
          id ? "updated the question" : "created a new question"
        }`}
        src={"/icons/tick.png"}
        show={showCreatedModal}
        onHide={handleHideCreatedModal}
      />
    </MotionDiv>
  );
}

export default AddEditQuestion;
