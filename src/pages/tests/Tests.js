import React, { useEffect, useState } from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap'
import FormField from '../../components/layout/FormField'
import SearchField from '../../components/layout/SearchField'
import CustomTable, { AddButton, DeleteButton, EditButton, ViewButton } from '../../components/layout/CustomTable'
import { MotionDiv } from '../../components'
import ViewTestModal from '../../components/modals/ViewTestModal'
import {useNavigate} from 'react-router-dom'
import ModalTemplate from '../../components/modals/ModalTemplate'
import { fetchDomains, fetchSubdomains, fetchSubtopics, fetchTopics } from '../../utils/apis'
import { useGetDomainsMutation, useGetSubTopicsMutation, useGetSubdomainsMutation, useGetTestsMutation, useGetTopicsMutation, useUpdateTestMutation } from '../../features/apiSlice'
import { getError } from '../../utils/error'


function Tests() {

    const [isLoading,setIsLoading] = useState(false);
    const [curPage, setCurPage] = useState(1);
    const [resultPerPage, setResultPerPage] = useState(10);
    const curPageHandler = (p) => setCurPage(p);
    const [getTests,{isLoading:testLoading}] = useGetTestsMutation();
    const [updateTest,{isLoading:updateTestLoading}] = useUpdateTestMutation();
    const [getDomains,{isLoading:domainLoading}] = useGetDomainsMutation();
    const [getSubdomains,{isLoading:subdomainLoading}] = useGetSubdomainsMutation();
  
    const navigate = useNavigate()
   
    const [domains,setDomains] = useState([]);
     const [subdomains,setSubdomains] = useState([]);
     const [form,setForm] = useState({});
     const [tests,setTests] = useState([]);
     const [query,setQuery]=useState('');
     const [searchInput,setSearchInput]=useState('');
    const [showTestModal, SetShowTestModal] = useState(false);
    const handleShowTestModal = ()=>SetShowTestModal(true);
    const handleHideTestModal = ()=>SetShowTestModal(false);
    const [showCancelModal,setShowCancelModal] = useState(false);
    const handleShowCancelModal = ()=>setShowCancelModal(true);
  const handleHideCancelModal = ()=>setShowCancelModal(false);
//     const domains = [
//         {name:'Engineering'},
//         {name:'Medical'},
// ]
// const subDomains = [
//         {name:'Mechanical Engineering'},
//         {name:'Civil Engineering'},
// ]

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

   fetchTests()
 }
},[form?.subdomain,query])


const handleUpdateTest = async({id,status})=>{
  try {
    const data = await updateTest({id,data:{
      status: status,
    }})

    console.log(data);
    fetchTests();

  } catch (error) {
    getError(error)
  }
}

const fetchTests = async()=>{
  try {
    const data = await getTests({id:form?.subdomain,params:`key=${query}`}).unwrap();

    console.log(data);
    setTests(data?.tests);


  } catch (error) {
    getError(error)
  }
}

// useEffect(()=>{
//  if(form?.topic){

//    fetchSubtopics({getSubtopics,setSubtopics,id:form?.topic})
//  }
// },[form?.topic])


const handleStatusToggler=({id,status})=>{
  try {
     handleUpdateTest({id,status: status === 'Active' ? 'Inactive' : 'Active'});
  } catch (error) {
    getError(error);
  }
}


const sampleTestData = [
  {
    testName: "Mathematics Quiz",
    testType: "Quiz",
    noofQue: 20,
    timeAlloted: 60,
    testCreatedOn: "2024-03-15",
    status: "active"
  },
  {
    testName: "English Exam",
    testType: "Exam",
    noofQue: 50,
    timeAlloted: 120,
    testCreatedOn: "2024-03-10",
    status: "active"
  },
  {
    testName: "Science Quiz",
    testType: "Quiz",
    noofQue: 25,
    timeAlloted: 30,
    testCreatedOn: "2024-03-05",
    status: "deactive"
  },
  {
    testName: "History Exam",
    testType: "Exam",
    noofQue: 40,
    timeAlloted: 60,
    testCreatedOn: "2024-03-01",
    status: "active"
  },
  // Additional test data
  {
    testName: "Physics Quiz",
    testType: "Quiz",
    noofQue: 15,
    timeAlloted: 45,
    testCreatedOn: "2024-03-20",
    status: "active"
  },
  {
    testName: "Geography Exam",
    testType: "Exam",
    noofQue: 50,
    timeAlloted: 90,
    testCreatedOn: "2024-03-12",
    status: "active"
  },
  {
    testName: "Chemistry Quiz",
    testType: "Quiz",
    noofQue: 50,
    timeAlloted: 50,
    testCreatedOn: "2024-03-08",
    status: "deactive"
  }
];

const numOfPages = Math.ceil(sampleTestData.length / resultPerPage);
const skip = resultPerPage * (curPage - 1);
console.log("no of Page", numOfPages, resultPerPage,sampleTestData.length);

const column = [
  "S.No.",
  "Test Name",
  "Test Type",
  "No. of Que.",
  "Time Alloted",
  "Test Created On",
  "Status",
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
        <Col sm={4}>
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
        {/* <Col>
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
        </Col> */}
        </Row>
        <Row>
        {/* <Col sm={4}>
         
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
         </Col> */}
            {/* <Col sm={4} className='d-flex align-items-center pt-3'><SearchField placeholder='Search For Test'/></Col> */}
            {/* <Col sm={4} className='d-flex align-items-center justify-content-end pt-3'><AddButton title={'Create New Test'} url='/admin/tests/create-test'/></Col> */}
        </Row>

        <CustomTable
          loading={testLoading}
          column={column}
          rowNo={resultPerPage}
          rowProps={{ setResultPerPage }}
          paging={numOfPages > 0}
          pageProps={{ numOfPages, curPage }}
          pageHandler={curPageHandler}
           search={true}
           searchProps={{ searchInput, setSearchInput, setQuery }}
          isTitle="true"
          title="Test Details"
          isCreateBtn={true}
          createBtnProps={{
            text: ' New Test',
            createURL: '/admin/tests/create-test',
          }}
        >
          {tests &&
            tests?.map((data, i) => (
              <tr key={data?._id} className="odd text-center">
                <td className="">{skip + i + 1}</td>
                <td>{data?.test_name}</td>
                <td>{data?.test_type}</td>
                <td className='d-flex justify-content-center'><div  className='rounded-pill p-1 px-3' style={{backgroundColor:`${data?.questions_reference?.length === data?.number_of_questions?'rgba(18, 221, 0, 0.1)':'rgba(255, 170, 6, 0.1)'}`}}><span style={{color:`${data?.questions_reference?.length === data?.number_of_questions?'rgba(18, 221, 0, 1)':'rgba(255, 170, 6, 1)'}`}}>{data?.questions_reference?.length}</span>/{data?.number_of_questions}</div></td>
                <td>{data?.duration_in_mins} min</td>
                <td>{new Date(data?.createdAt).toLocaleDateString('en-GB')}</td>                {/* <td>{data?.status}</td> */}
                <td>  <Form.Check
      type="switch"
      id="custom-switch"
      className="custom-switch"
      
      checked={data?.status === 'Active'?true:false}
      onChange={()=>handleStatusToggler({id:data?._id,status: data?.status})}
    /></td>
             
                {/* <td>{user.role}</td> */} 
                <td>
                  <EditButton
                    onClick={() => navigate(`/admin/tests/edit-test/${data?._id}`)}
                    disabled={data?.status === 'Active'}
                  />
                  <ViewButton
                    onClick={handleShowTestModal}
                  />
                  <DeleteButton onClick={handleShowCancelModal}
           />
                </td> 
              </tr>
            ))}
        </CustomTable>

        <ViewTestModal show={showTestModal} onHide={handleHideTestModal} />       
        <ModalTemplate
    title={"Are you sure you want to delete this test?"}
    description={'Lorem ipsum dolor sit amet consectetur. Suscipit nunc tincidunt iaculis sit feugiat platea. Aliquet amet cras amet mauris neque facilisi. Scelerisque interdum elit maecenas.'}
    src={'/icons/question-red.png'}
    onDiscard={handleHideCancelModal}
    show={showCancelModal}
    onHide={handleHideCancelModal}
    onConfirm={handleHideCancelModal}
/>
      
    </MotionDiv>
  )
}

export default Tests