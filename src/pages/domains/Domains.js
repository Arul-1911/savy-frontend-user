import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import SearchField from '../../components/layout/SearchField'
import { IoAddCircleSharp } from 'react-icons/io5'
import { MdDashboard } from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'
import { FaAngleRight, FaArrowRight, FaChevronRight } from 'react-icons/fa'
import { IoIosInformationCircleOutline } from 'react-icons/io'
import { AddButton } from '../../components/layout/CustomTable'
import { MotionDiv } from '../../components'
import { useGetDomainsMutation, useGetSubdomainsMutation } from '../../features/apiSlice'
import { getError } from '../../utils/error'
import Skeleton from 'react-loading-skeleton'
import { fetchDomains, fetchSubdomains } from '../../utils/apis'


function Domains() {

     
const navigate = useNavigate();
const [getDomains,{isLoading:domainLoading} ] = useGetDomainsMutation();
const [getSubdomains,{isLoading:subdomainLoading} ] = useGetSubdomainsMutation();
const [domains,setDomains] = useState([]);
const [subdomains,setSubdomains] = useState([]);
const [selectedDomain,setSelectedDomain] = useState(null)

const [domainQuery,setDomainQuery] = useState('')
const [subDomainQuery,setSubDomainQuery] = useState('')


// const fetchDomains = async()=>{
//     try {
//       const data = await getDomains().unwrap();
//       console.log(data);
//       setDomains(data?.domains);
//     } catch (error) {
//       getError(error);
//     }
//   }


// const fetchSubdomains = async()=>{
//     try {
//       const data = await getSubdomains(selectedDomain).unwrap();
//       console.log(data);
//       setSubdomains(data?.subDomains);
//     } catch (error) {
//       getError(error);
//     }
//   }




  useEffect(()=>{
     if(domains.length>0){
        setSelectedDomain(domains[0]?._id);
     }
  },[domains])

  useEffect(()=>{
        fetchDomains({getDomains,setDomains,params:`?key=${domainQuery}`});
  },[domainQuery])

  useEffect(()=>{
    if(selectedDomain){

        fetchSubdomains({getSubdomains,setSubdomains,id:selectedDomain,params:`key=${subDomainQuery}`});
    }
  },[selectedDomain,subDomainQuery])


  

  

    // const domainsTest = [
    //     {domain_name:'Engineering',_id:1},
    //     {domain_name:'Medicine',_id:2},
    //     {domain_name:'B-Pharm',_id:3},
    //     {domain_name:'MBBS',_id:4},
    //     {domain_name:'BSC',_id:5},
    // ]




    // const subdomainsTest = [
    //     {sub_domain_name: 'Civil Engineering'},
    //     {sub_domain_name: 'Mechanical Engineering'},
    //     {sub_domain_name: 'Electrical Engineering'},
    //     {sub_domain_name: 'E&tc Engineering'},
    //     {sub_domain_name: 'Automobile Engineering'},
    //     {sub_domain_name: 'Computer Science Engineering'},
    //     {sub_domain_name: 'Aerospace Engineering'},
    //     {sub_domain_name: 'Chemical Engineering'},
    //     {sub_domain_name: 'Biomedical Engineering'},
    //     {sub_domain_name: 'Environmental Engineering'},
    //     {sub_domain_name: 'Software Engineering'},
    //     {sub_domain_name: 'Petroleum Engineering'},
    //     {sub_domain_name: 'Marine Engineering'},
    //     {sub_domain_name: 'Nuclear Engineering'},
    //     {sub_domain_name: 'Agricultural Engineering'},
    //     {sub_domain_name: 'Materials Science Engineering'},
    // ];
    

  return (
    <MotionDiv>
  
    <Row>
        <Col md={8}>    <h5>Select Domain to View List of Area of Specialty</h5>
        </Col>
       
          <Col>
          <SearchField query={domainQuery} setQuery={setDomainQuery} placeholder='Search domain' />
          </Col>
      
        {/* <Col md={3}>
          <AddButton url='/admin/domains/add-domain' title={'Add Domain'} />
         </Col> */}
      

    </Row>

    <Row >
        {domainLoading ?
            [...Array(5)].map((_, index) => (
                <Col md={2}>
                <Skeleton height={'3rem'} className='mb-2' key={index} />
                </Col>
              ))
        :
        domains.length >0 && domains.slice(0,5).map((item,index)=>(
            <Col className='p-1' md={2}>
            <Card className={`px-4 pt-2 ${selectedDomain===item?._id ?'selected-domain':'domain-card'}`} style={{height:"100%",cursor:'pointer'}} onClick={()=>setSelectedDomain(item?._id)}>
          <p><MdDashboard/> {item?.domain_name}</p>
            </Card>
            </Col>
        ))}
        <Col className='d-flex align-items-center'>
        <Link to={'/admin/domains/all-domains'} style={{color:'rgba(0, 0, 155, 1)'}}><u>View List <FaChevronRight/></u></Link>

        </Col>
        
    </Row>

    <Row  className='px-md-5 my-3'>
        <Col md={5}>
         <SearchField query={subDomainQuery} setQuery={setSubDomainQuery} placeholder='Search Area of Specialty'/>
        </Col>
        <Col className='text-end' >
         <Link style={{color:'rgba(0, 0, 155, 1)'}} to={`/admin/domains/all-specialties/${selectedDomain}`}><u>View All</u> <FaChevronRight /></Link> 
         <Link  className='mx-2 p-2' to={'/admin/domains/summary'} style={{background:'rgba(238, 244, 255, 1)',color:'rgba(97, 114, 243, 1)'}}><IoIosInformationCircleOutline/> View Summary <FaChevronRight /></Link> 
         
        </Col>
    </Row>

<hr/>
    <Row sm={2} xs={1} className='px-md-5'>
    {subdomainLoading ?
  [...Array(8)].map((_, index) => (
    <Skeleton height={'2rem'} className='mb-2' key={index} />
  ))

:
       subdomains.length >0 ? subdomains.map((item,index)=>(
            <Col className='p-1'>
<div className="d-flex justify-content-between align-items-center border rounded p-2 " onClick={()=> navigate(`/admin/domains/topic-subtopic/${item._id}`)} style={{maxWidth:'500px',cursor:'pointer'}}>
            <span>{item?.sub_domain_name}</span>
            <FaAngleRight />
          </div>
           </Col>
        ))
        : <p>No data under this domain</p>
        
        }
    </Row>
   
  
   </MotionDiv>
  )
}

export default Domains