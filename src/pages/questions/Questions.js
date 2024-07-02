import React, { useEffect, useState } from 'react'
import { Col, Container, Modal, Row } from 'react-bootstrap'
import FormField from '../../components/layout/FormField'
import SearchField from '../../components/layout/SearchField'
import CustomTable, { AddButton, DeleteButton, EditButton, ViewButton } from '../../components/layout/CustomTable'
import { MotionDiv } from '../../components'
import { FiEdit } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import QuestionModal from '../../components/modals/QuestionModal'
import { useGetDomainsMutation, useGetQuestionsMutation, useGetSubTopicsMutation, useGetSubdomainsMutation, useGetTopicsMutation } from '../../features/apiSlice'
import { fetchDomains, fetchQuestions, fetchSubdomains, fetchSubtopics, fetchTopics } from '../../utils/apis'
import { getError } from '../../utils/error'


function Questions() {

  const [getQuestions,{isLoading}] = useGetQuestionsMutation();
  const [getTopics,{isLoading:topicLoading}] = useGetTopicsMutation();
  const [getSubtopics,{isLoading:subtopicLoading}] = useGetSubTopicsMutation();
  const [getDomains,{isLoading:domainLoading}] = useGetDomainsMutation();
  const [getSubdomains,{isLoading:subdomainLoading}] = useGetSubdomainsMutation();

  const [topics,setTopics] = useState([]);
  const [subtopics,setSubtopics] = useState([]);
  const [domains,setDomains] = useState([]);
   const [subdomains,setSubdomains] = useState([]);
   const [questions,setQuestions] = useState([]);
  const [query,setQuery]=useState('');
    
    const [curPage, setCurPage] = useState(1);
    const [resultPerPage, setResultPerPage] = useState(10);
    const [showQueModal, SetShowQueModal] = useState(false);
    const handleShowQueModal = ()=>SetShowQueModal(true);
    const handleHideQueModal = ()=>SetShowQueModal(false);

    const [form,setForm] = useState({});

    const handleChange = (e) => {
      const { name, value } = e.target;
     
      setForm({ ...form, [name]: value });
    };
  

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




   


const navigate = useNavigate();

    const curPageHandler = (p) => setCurPage(p);

//     const domains = [
//         {name:'Engineering'},
//         {name:'Medical'},
// ]
// const subDomains = [
//         {name:'Mechanical Engineering'},
//         {name:'Civil Engineering'},
// ]

const sampleData = [
    {
      question: "What is the capital of France?",
      difficulty: "Basic",
      questionType: "Select Best Answer",
      status: "Pending"
    },
    {
      question: "Who painted the Mona Lisa?",
      difficulty: "Medium",
      questionType: "Select Best Answer",
      status: "Completed"
    },
    {
      question: "Is the sky blue?",
      difficulty: "Basic",
      questionType: "True Or False",
      status: "Completed"
    },
    {
      question: "What is the boiling point of water?",
      difficulty: "Advanced",
      questionType: "Select Best Answer",
      status: "Pending"
    },
    {
      question: "True or False: Earth is flat.",
      difficulty: "Medium",
      questionType: "True Or False",
      status: "Completed"
    }
  ];
  

const numOfPages = Math.ceil(sampleData.length / resultPerPage);
const skip = resultPerPage * (curPage - 1);
console.log("no of Page", numOfPages, resultPerPage,sampleData.length);

const column = [
  "S.No.",
  "Question",
  "Difficulty Level",
  "Question Type",
  "Question Status",
  "Actions"
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
            <Col sm={4} className='d-flex align-items-center pt-3'> 
            <SearchField placeholder='Search Question' query={query} setQuery={setQuery} disabled={!form?.subtopic}/>
             </Col>
             <Col className=' d-flex align-items-center justify-content-end pt-3' sm={4}>   
            <AddButton title={'Add New Questions'} url='/admin/questions/add-question'/>
            </Col>
        </Row>

        <CustomTable
          loading={isLoading}
          column={column}
          rowNo={resultPerPage}
          rowProps={{ setResultPerPage }}
          paging={numOfPages > 0}
          pageProps={{ numOfPages, curPage }}
          pageHandler={curPageHandler}
        //    search={true}
        //    searchProps={{ searchInput, setSearchInput, setQuery }}
          isTitle="true"
          title="Questions List"
        //   isCreateBtn={true}
        //   createBtnProps={{
        //     text: 'Prof',
        //     createURL: '/admin/profs/add-prof',
        //   }}
        >
          {questions &&
            questions?.map((data, i) => (
              <tr key={i} className="odd">
                <td className="text-center">{skip + i + 1}</td>
                <td>{data?.question}</td>
                <td className='text-center'><div className='shadow px-2' >{data?.difficulty_level}</div></td>
                <td className='text-center'><div className='shadow px-2'>{data?.question_type}</div></td>
                <td className='text-center'><div className='rounded-pill p-1' style={{background:`${data?.status ==='Completed'? 'rgba(0, 200, 56, 0.1)':'rgba(255, 156, 7, 0.1)'} `,color:`${data?.status ==='Completed'? 'rgba(0, 200, 56, 1)':'rgba(255, 156, 7, 1)'} ` }}>{data?.status}</div></td>
             
                {/* <td>{user.role}</td> */} 
                <td className='text-center'>
                  <EditButton
                    onClick={() => navigate(`/admin/questions/edit-question/${data?._id}`)}
                  />
                  <ViewButton
                    onClick={handleShowQueModal}
                  />
                  <DeleteButton onClick={() =>{
                    //  deleteUser(user?._id)
                     console.log('deleted')
                  }}
           />
                </td> 
              </tr>
            ))}
        </CustomTable>

<QuestionModal show={showQueModal} onHide={handleHideQueModal} />
    
    </MotionDiv>
  )
}

export default Questions