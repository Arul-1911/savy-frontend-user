import React, { useEffect, useState } from 'react'
import { Col, Container, Form, Row,Button } from 'react-bootstrap'
import FormField from '../../components/layout/FormField'
import SearchField from '../../components/layout/SearchField'
import CustomTable, { AddButton, DeleteButton, EditButton, ViewButton } from '../../components/layout/CustomTable'
import { MotionDiv } from '../../components'
import QuestionModal from '../../components/modals/QuestionModal'
import { useNavigate, useParams } from 'react-router-dom'
import ViewTestModal from '../../components/modals/ViewTestModal'
import { FaRegSave } from 'react-icons/fa'
import ModalTemplate from '../../components/modals/ModalTemplate'
import { useCreateTestMutation, useGetDomainsMutation, useGetQuestionsMutation, useGetSubTopicsMutation, useGetSubdomainsMutation, useGetTestByIdMutation,useUpdateTestMutation, useGetTopicsMutation } from '../../features/apiSlice'
import { fetchDomains, fetchQuestions, fetchSubdomains, fetchSubtopics, fetchTopics } from '../../utils/apis'
import { getError } from '../../utils/error'


function CreateTest() {

  const [getTopics,{isLoading:topicLoading}] = useGetTopicsMutation();
  const [getSubtopics,{isLoading:subtopicLoading}] = useGetSubTopicsMutation();
  const [getDomains,{isLoading:domainLoading}] = useGetDomainsMutation();
  const [getSubdomains,{isLoading:subdomainLoading}] = useGetSubdomainsMutation();
  const [getQuestions,{isLoading:questionLoading}] = useGetQuestionsMutation();
  const [createTest,{isLoading:createTestLoading}] = useCreateTestMutation();
  const [getTestById,{isLoading:getTestLoading}] = useGetTestByIdMutation();
  const [updateTest,{isLoading:updateTestLoading}] = useUpdateTestMutation();

  const {id} = useParams();

  const [topics,setTopics] = useState([]);
  const [subtopics,setSubtopics] = useState([]);
  const [domains,setDomains] = useState([]);
   const [subdomains,setSubdomains] = useState([]);

   const [questions,setQuestions] = useState([]);
   const [selectedQuestions,setSelectedQuestions] = useState([]);
  const [firstRender,setFirstRender] = useState(false);
    const [isLoading,setIsLoading] = useState(false); 
    const [curPage, setCurPage] = useState(1);
    const [resultPerPage, setResultPerPage] = useState(10);
    const curPageHandler = (p) => setCurPage(p);
    const [searchInput, setSearchInput] = useState("");
    const [showQueModal, SetShowQueModal] = useState(false);
    const handleShowQueModal = ()=>SetShowQueModal(true);
    const handleHideQueModal = ()=>SetShowQueModal(false);

    const [showCancelModal,setShowCancelModal] = useState(false);
    const handleShowCancelModal = ()=>setShowCancelModal(true);
    const handleHideCancelModal = ()=>setShowCancelModal(false);

    const [showTestModal, SetShowTestModal] = useState(false);
    const handleShowTestModal = ()=>SetShowTestModal(true);
    const handleHideTestModal = ()=>SetShowTestModal(false);
    const [showCreatedModal,setShowCreatedModal] = useState(false);
    const handleShowCreatedModal = ()=>setShowCreatedModal(true);
  const [query, setQuery] = useState("");

  const navigate = useNavigate();
  const handleHideCreatedModal = ()=>{
    setShowCreatedModal(false);
    navigate(-1)
  }

  
  const [form,setForm] = useState({
     testType: 'Quiz',
     noOfQue: 50,
     timeAlloted: 30,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
   
    setForm({ ...form, [name]: value });
  };

  
  const fetchTest = async()=>{
    try {
      setFirstRender(true);
      const data = await getTestById(id).unwrap();
      console.log(data);
        const {test} = data;
      console.log(test)
        setForm({
          testName: test?.test_name,
          noOfQue: test?.number_of_questions,
          timeAlloted: test?.duration_in_mins,
          testType: test?.test_type,
          subdomain: test?.subdomain_reference?._id,
          domain: test?.subdomain_reference?.domain_reference,
        })

        setSelectedQuestions(test?.questions_reference)
       setFirstRender(false);
    } catch (error) {
      getError(error)
    }
  }



  useEffect(()=>{
     console.log(selectedQuestions);
  },[selectedQuestions])
  useEffect(()=>{
     if(id){
      fetchTest();
     }
  },[id])


  useEffect(()=>{
   fetchDomains({getDomains,setDomains})
  },[])

  useEffect(()=>{
   if(form?.domain){

     fetchSubdomains({getSubdomains,setSubdomains,id:form?.domain})
   }
  },[form?.domain])

  useEffect(()=>{
   if(form?.subdomain){
    if(!firstRender){

      setSelectedQuestions([]);
    }

     fetchTopics({getTopics,setTopics,id:form?.subdomain})
   }
  },[form?.subdomain])

  useEffect(()=>{
   if(form?.topic){

     fetchSubtopics({getSubtopics,setSubtopics,id:form?.topic})
   }
  },[form?.topic])

  useEffect(()=>{
    if(form?.subtopic){
        fetchQuestions({getQuestions,setQuestions,id:form?.subtopic,query})
    }
},[form?.subtopic,query])

const handleCheckboxChange = (isChecked, question) => {
  if (isChecked) {
      setSelectedQuestions(prev => [...prev, question]);
  } else {
      setSelectedQuestions(prev => prev.filter(q => q !== question));
  }
};


const handleSubmit = async()=>{
   try {
    const ques = selectedQuestions.map(que => que?._id); 
    const subtopics = selectedQuestions.map(que => que?.sub_topic_reference?._id);
    const uniqueSubtopics = [...new Set(subtopics)];
    
    const topicReferences = selectedQuestions.map(question => question?.sub_topic_reference?.topic_reference);
    const uniqueTopics = [...new Set(topicReferences?.map(topic => topic?._id))];
    
      const data = id? await updateTest({id},{data:{
        test_name: form?.testName,
        number_of_questions: form?.noOfQue,
        questions_reference: ques,
        duration_in_mins: form?.timeAlloted,
        test_type: form?.testType,
        subdomain_reference: form?.subdomain,
        subtopic_reference: uniqueSubtopics,
        topic_reference: uniqueTopics,
      }}).unwrap()
     :
      await createTest({
        test_name: form?.testName,
        number_of_questions: form?.noOfQue,
        questions_reference: ques,
        duration_in_mins: form?.timeAlloted,
        test_type: form?.testType,
        subdomain_reference: form?.subdomain ,
        subtopic_reference: uniqueSubtopics,
        topic_reference: uniqueTopics,

      }).unwrap();

      console.log(data);

      handleShowCreatedModal();

   } catch (error) {
    getError(error)
   }
}



//     const domains = [
//         {name:'Engineering'},
//         {name:'Medical'},
// ]
// const subDomains = [
//         {name:'Mechanical Engineering'},
//         {name:'Civil Engineering'},
// ]

const sampleTestData = [
  {
    question: " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut pretium.",
    difficultyLevel: "Medium",
    questionType: 'True or False',
   
  },
  {
    question: " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut pretium.",
    difficultyLevel: "Basic",
    questionType: 'Select Best Answer',
   
  },
  {
    question: " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut pretium.",
    difficultyLevel: "Basic",
    questionType: 'True or False',
   
  },
  {
    question: " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut pretium.",
    difficultyLevel: "Advanced",
    questionType: 'Select Best Answer',
   
  },
 
 
 
];

const numOfPages = Math.ceil(sampleTestData.length / resultPerPage);
const skip = resultPerPage * (curPage - 1);
console.log("no of Page", numOfPages, resultPerPage,sampleTestData.length);

const column = [
  "S.No.",
  "Select Question",
  "Question",
  "Difficulty Level",
  "Question Type",
  "Action"
];


  return (
    <MotionDiv>
        <Row>
        <Col sm={4}>
            <FormField
            label={"Search & Select Domain:"}
            type={"select"}
            name={'domain'}
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
            name={'subdomain'}
            disabled={!form?.domain}
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
            name={'topic'}
            disabled={!form?.subdomain}
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
         
        <Col sm={4}>
        <FormField
            label={"Search & Select Subtopic:"}
            type={"select"}
            name={'subtopic'}
            disabled={!form?.topic}
            value={form?.subtopic}
            onChange={handleChange}
            options={subtopics?.map((item) => ({
              label: item?.sub_topic_name,
              value: item?._id,
            }))}
          />
       
            </Col>
            <Col>
            <FormField
             type={'text'}
             label={'Enter Test Name:'}
             placeholder={'Test Name'}
             name={'testName'}
             value={form?.testName}
             onChange={handleChange}
            />
            
            </Col>
            <Col>
            <FormField
              label={"Type of Test:"}
              type={"dropdown"}
              name={'testType'}
              value={form?.testType}
              onChange={handleChange}
              options={[
                { label: "Quiz", value: "Quiz" },
                { label: "Exam", value: "Exam" },
              ]}

            />
            
            </Col>
        </Row>
        <Row>
            <Col sm={4}>
                    <FormField
              label={"Select No of Questions:"}
              type={"dropdown"}
              name={'noOfQue'}
              onChange={handleChange}
              value={form?.noOfQue}
              options={[{name:'25'},{name:'50'}].map((item) => ({
                  label: item.name,
                  value: item.name,
                }))}

            />
            
            </Col>
            <Col sm={4}>
                    <FormField
              label={"Time Alloted:"}
              type={"dropdown"}
              name={'timeAlloted'}
              onChange={handleChange}
              value={form?.timeAlloted}
              options={[{name:'30'},{name:'25'}].map((item) => ({
                  label: `${item.name} minutes`,
                  value: item.name,
                }))}
    
            />
            
            </Col>
        </Row>

        <CustomTable
          loading={questionLoading}
          column={column}
          rowNo={resultPerPage}
          rowProps={{ setResultPerPage }}
          paging={numOfPages > 0}
          pageProps={{ numOfPages, curPage }}
          pageHandler={curPageHandler}
           search={true}
           searchProps={{ searchInput, setSearchInput, setQuery }}
            isTitle ='true'
            title={<p style={{fontSize:'1rem'}}>{`Selected Questions: ${selectedQuestions?.length}`}</p>}
        //   isCreateBtn={true}
        //   createBtnProps={{
        //     text: 'Prof',
        //     createURL: '/admin/profs/add-prof',
        //   }}
        >
          {questions &&
            questions?.map((data, i) => (
              <tr key={i} className="odd text-center">
                <td className="">{skip + i + 1}</td>
                <td> 
                  <Form.Check
                     
                        type="checkbox"
                        checked={selectedQuestions?.some(question => question?._id === data?._id)}
                        onChange={(e) => handleCheckboxChange(e.target.checked, data)}
                    />
    </td>
                <td>{data?.question}</td>
                <td><div className='shadow px-2'>{data?.difficulty_level}</div></td>
                <td><div className='shadow px-2'>{data?.question_type}</div></td>
            
                <td>
                  <EditButton
                    onClick={() => navigate(`/admin/questions/edit-question/${data?._id}`)}
                  />
                  <ViewButton
                    onClick={handleShowQueModal}
                  />
                
          
                </td> 
              </tr>
            ))}
        </CustomTable>
        <Row className="my-3">
        <Col>
        <Button variant="transparent" className="add-btn" onClick={handleShowCancelModal}>Cancel</Button>
        </Col>
        <Col className="text-end">
        <Button variant="transparent" className="add-btn m-1">Save as Draft <FaRegSave/></Button>
        <Button variant="transparent" className="blue-btn m-1" onClick={handleShowTestModal}>Preview</Button>
        </Col>
      </Row>
        <QuestionModal show={showQueModal} onHide={handleHideQueModal} />

       <ViewTestModal
        onConfirm={handleSubmit} 
        onCancel={handleHideTestModal} 
         show={showTestModal} 
         onHide={handleHideTestModal} 
         selectedQuestions={selectedQuestions}
         data={form}
         loading={createTestLoading}
         />       

       <ModalTemplate
  show={showCreatedModal}
  onHide={handleHideCreatedModal}
  src={'/icons/tick.png'}
  title={`You have successfully ${id?'updated':'created'} a new test.`}
 
/>

<ModalTemplate
 show={showCancelModal}
 onHide={handleHideCancelModal}
 src={'/icons/question-green.png'}
title={'Are you sure you want to cancel the created test?'}
description={'Lorem ipsum dolor sit amet consectetur. Suscipit nunc tincidunt iaculis sit feugiat platea. Aliquet amet cras amet mauris neque facilisi. Scelerisque interdum elit maecenas.'}
onConfirm={handleHideCancelModal}
onDiscard={handleHideCancelModal}
loading={isLoading}
/>

    </MotionDiv>
  )
}

export default CreateTest