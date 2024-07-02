import React, { useEffect, useState } from 'react'
import { MotionDiv } from '../../components'
import DomainHeader from '../../components/layout/DomainHeader'
import { Card, Col, Container, Row } from 'react-bootstrap'
import SearchField from '../../components/layout/SearchField'
import { AddButton } from '../../components/layout/CustomTable'
import { FiEdit } from 'react-icons/fi'
import AddTopicSubtopicModal from '../../components/modals/AddTopicSubtopicModal'
import {useNavigate,useParams} from 'react-router-dom'
import { useGetSubdomainsMutation } from '../../features/apiSlice'
import Skeleton from 'react-loading-skeleton'
import { getError } from '../../utils/error'
import { fetchSubdomains } from '../../utils/apis'

function ListOfAreaOfSpeciality() {

  const [showAddModal,setShowModal] = useState(false);
  const [getSubdomains,{isLoading:subdomainLoading}] = useGetSubdomainsMutation();
  const [subdomains,setSubdomains] = useState([]);
  const {id} = useParams()
  const handleShowAddModal = ()=>setShowModal(true)
  const handleHideAddModal = ()=>setShowModal(false)
 const [query,setQuery] = useState('')
  const navigate = useNavigate()

  


useEffect(()=>{
  fetchSubdomains({getSubdomains,setSubdomains,id,params:`key=${query}`});
},[query])



  return (
   <MotionDiv>
     
       <DomainHeader/>
       <h5 className='my-3'>Add/Edit/Remove any specialty area from below</h5>
       <Row>
            <Col md={6}>
              <h4 className="mb-3">List of Specialty</h4>
            </Col>

            <Col className='text-end'>
              <SearchField query={query} setQuery={setQuery} placeholder='Search area of speciality'/>
            </Col>
            <Col lg={3} md={3} className='text-end'>
              <AddButton url='/admin/domains/add-specialty' title={"Add Specialty Area"} />
            </Col>
          </Row>

         
            <Row  sm={2} className="my-3 px-md-5">
            {subdomainLoading ?
  [...Array(8)].map((_, index) => (
    <Skeleton height={'2rem'} className='mb-2' key={index} />
  ))

:
              subdomains.length >0 ? subdomains?.map((data, i) => (
                <Col className="p-1">
                  <Card className="p-2 w-100 ">
                    <Row className="align-items-center">
                      <Col>
                     
                        {data?.sub_domain_name}
                      </Col>
                      <Col xs={2}>
                        <FiEdit
                          className="ms-left"
                          color="rgba(0, 0, 139, 1)"
                          size={20}
                          onClick={()=>navigate(`/admin/domains/edit-specialty/${data?._id}`)}
                          style={{cursor:'pointer'}}
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
          

<AddTopicSubtopicModal title={'Specialty'} show={showAddModal} onHide={handleHideAddModal} />

   </MotionDiv>
  )
}

export default ListOfAreaOfSpeciality