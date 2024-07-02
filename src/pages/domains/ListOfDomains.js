import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import {
  MessageBox,
  useTitle,
  MotionDiv,
  CustomTable,
  ViewButton,
  DeleteButton,
} from "../../components";
import { getError, toastOptions } from "../../utils/error";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../../features/loadingSlice";
import axiosInstance from "../../utils/axiosUtil";
import { Card, Col, InputGroup, Row } from "react-bootstrap";
import CountCard from "../../components/layout/CountCard";
import { AddButton, EditButton } from "../../components/layout/CustomTable";
import SearchField from "../../components/layout/SearchField";
import CreateBtn from "../../components/layout/CreateBtn";
import { MdDashboard } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { selectAuth } from "../../features/authSlice";
import AddTopicSubtopicModal from "../../components/modals/AddTopicSubtopicModal";
import { useCreateDomainMutation, useGetDomainByIdMutation, useGetDomainsMutation, useUpdateDomainByIdMutation } from "../../features/apiSlice";
import Skeleton from 'react-loading-skeleton'
import { fetchDomains } from "../../utils/apis";

export default function ListOfDomains() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  // const [users,setUsers] = useState([]);
  const [usersCount, setUsersCount] = useState([]);
  const [curPage, setCurPage] = useState(1);
  const [resultPerPage, setResultPerPage] = useState(10);
  const [searchInput, setSearchInput] = useState("");
  const [query, setQuery] = useState("");
 const [domains,setDomains] = useState([]);
 const [id,setId] = useState(null);
  const [isEdit,setIsEdit] = useState(false);
  const [showAddModal,setShowModal] = useState(false);
  const handleShowAddModal = ()=>setShowModal(true)
  const handleHideAddModal = ()=>{
  
  setShowModal(false)
  setId(null);
  setTitle('')
  setDescription('')
}

  //--domain by id
  const [createDomain] = useCreateDomainMutation();
  const [getDomains,{isLoading}] = useGetDomainsMutation();
  const [getDomainById] = useGetDomainByIdMutation();
  const [updateDomainById] = useUpdateDomainByIdMutation();

  const [title,setTitle] = useState('')
  const [description,setDescription] = useState('')
  // const domainsTest = [
  //   { domain_name: "Engineering" },
  //   { domain_name: "Medicine" },
  //   { domain_name: "B-Pharm" },
  //   { domain_name: "MBBS" },
  //   { domain_name: "BSC" },
  // ];

  const submitHandler = async()=>{
    try {
      const data = id?
      await updateDomainById({id:id,data:{
        domain_name: title,
        description: description
      }}).unwrap()
      :  await createDomain({
        domain_name: title,
        description: description
      }).unwrap();
      console.log(data);
      toast.success(data?.message);
       handleHideAddModal();
       fetchDomains();
    } catch (error) {
      getError(error);
    }
  }

  

  const fetchDomainById = async(id)=>{
   
    setId(id);
    try {
      const data = await getDomainById(id).unwrap();
      console.log(data);
      setTitle(data?.domain?.domain_name);
      setDescription(data?.domain?.description);
       handleShowAddModal(); 
    } catch (error) {
      getError(error);
    }
  }

useEffect(()=>{
  fetchDomains({getDomains,setDomains,params:`key=${query}`});
},[query])
  

  const column = [
    "S.No",
    "Area of Speciality",
    "Prof Name",
    "Email",
    "No of Subs",
    "Amount Received by plans",
    "Total Amount Received",
  ];

  // useTitle("Users");
  // useTitle("User Details");
  return (
    <MotionDiv>
     
        <>
          <Row>
            <Col md={7}>
              <h4 className="mb-3">List of Domains</h4>
            </Col>

            <Col>
              <SearchField placeholder="Domain" query={query} setQuery={setQuery}/>
            </Col>
            <Col md={2}>
              {/* <AddButton url="/admin/domains/add-domain" title={"New Domain"} /> */}
              <AddButton func={handleShowAddModal} title={"Add Domain"} />
            </Col>
          </Row>

         
            <Row md={3} sm={2} className="my-3">
              {isLoading ?
            [...Array(6)].map((_, index) => (
                <Col >
                <Skeleton height={'3rem'} className='mb-2' key={index} />
                </Col>
              ))
        :
             domains.length>0 ? domains?.map((data, i) => (
                <Col className="p-1">
                  <Card className="p-2 w-100 ">
                    <Row className="align-items-center">
                      <Col>
                        <MdDashboard />
                        {data?.domain_name}
                      </Col>
                      <Col xs={2}>
                        <FiEdit
                          className="ms-left"
                          color="rgba(0, 0, 139, 1)"
                          size={20}
                          onClick={()=>fetchDomainById(data?._id)}
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
          
        </>
      

<AddTopicSubtopicModal
 heading={'Field'} 
  title={title} setTitle={setTitle} description={description} setDescription={setDescription} show={showAddModal} onHide={handleHideAddModal} 
  onSubmit={submitHandler} 
  // onSubmit={handleHideAddModal}
  />

    </MotionDiv>
  );
}
