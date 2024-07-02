import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Modal, Row,Spinner } from "react-bootstrap";
import FormField from "../../components/layout/FormField";
import { MotionDiv } from "../../components";
import { FaCalendarAlt } from "react-icons/fa";
import { AddButton } from "../../components/layout/CustomTable";
import { useLocation } from "react-router-dom";
import ModalTemplate from "../../components/modals/ModalTemplate";
import { useNavigate,useParams} from 'react-router-dom'
import { FaRegCircleCheck } from 'react-icons/fa6';
import { useCreateSubdomainMutation, useGetDomainsMutation, useGetSubdomainByIdMutation, useUpdateSubdomainByIdMutation } from "../../features/apiSlice";
import { getError } from "../../utils/error";
import { toast } from "react-toastify";
import { fetchDomains } from "../../utils/apis";
function AddEditDomain() {

  const navigate = useNavigate();
  const [getDomains] = useGetDomainsMutation();
  const [createSubdomain,{isLoading:subdomainLoading}] = useCreateSubdomainMutation();
  const [updateSubdomainById,{isLoading:updateSubdomainLoading}] = useUpdateSubdomainByIdMutation();
  const [getSubdomainById,{isLoading}] = useGetSubdomainByIdMutation();
  const {id} = useParams();
  const [showModal,setShowModal] = useState(false);
  const [form,setForm] = useState({});
  const [editingPlanIndex, setEditingPlanIndex] = useState(null);

    const handleShowModal = (index) => {
      if (index !== undefined) {
        setEditingPlanIndex(index);
        setValidity(plans[index].validity);
        setPrice(plans[index].price);
      } else {
        setEditingPlanIndex(null);
        setValidity('');
        setPrice('');
      }
      setShowModal(true);
    };
  
  
    const handleCloseModal = () => {
      setShowModal(false);
      setEditingPlanIndex(null);
      setValidity('');
      setPrice('');
    };
    
  const [domains,setDomains] = useState([]);
  const [plans,setPlans] = useState([]);
  const [validity,setValidity] = useState('');
  const [price,setPrice] = useState('');
  const [showCancelModal,setShowCancelModal] = useState(false);
  const handleShowCancelModal = ()=>setShowCancelModal(true);
  const handleCloseCancelModal = ()=>setShowCancelModal(false);
  const location = useLocation()
  const isEditDomain = location.pathname.includes('edit-specialty')

  // const fetchDomains = async()=>{
  //   try {
  //     const data = await getDomains().unwrap();
  //     console.log(data);
  //     setDomains(data?.domains);
  //   } catch (error) {
  //     getError(error);
      
  //   }
  // }

  useEffect(()=>{
     fetchDomains({setDomains,getDomains});
     if(id){
        fetchSubdomain()
     }
  },[])

  const handleCancelConfirm = ()=>{
      handleCloseCancelModal();
      navigate('/admin/domains');
  }


  // const handleAddPlan = ()=>{
  //      setPlans((prev)=>[...prev,{validity,price}]);
  //      console.log(plans);
  // }
  const handleAddPlan = () => {
    if (editingPlanIndex !== null) {
      const updatedPlans = [...plans];
      updatedPlans[editingPlanIndex] = { _id: plans[editingPlanIndex]?._id,validity, price };
      setPlans(updatedPlans);
    } else {
      setPlans(prev => [...prev, { _id:null,validity, price }]);
    }
    handleCloseModal();
  };

  // const handleEditPlan = (index) => {
  //   handleShowModal(index);
  // };

  const fetchSubdomain = async()=>{
      try {
        const data = await getSubdomainById(id).unwrap();
        console.log(data);
        const {subDomain} = data;
        
        setForm({
          url: subDomain?.domain_url,
          domain: subDomain?.domain_reference,
          subdomain: subDomain?.sub_domain_name,
          description: subDomain?.description,
        })
        // setPlans(subDomain?.plans)
        if (subDomain?.plans) {
          const updatedPlans = subDomain?.plans?.map(plan => ({ ...plan, _id: plan._id }));
          setPlans(updatedPlans);
        } else {
          setPlans([]);
        }
        

      } catch (error) {
        getError(error)
      }
  }

  const handleDeletePlan = (index) => {
    const updatedPlans = plans.filter((_, i) => i !== index);
    setPlans(updatedPlans);
  };

  console.log(plans);

  const handlesubmit = async(e)=>{
    e.preventDefault();
    try {
     
      const data = id? await updateSubdomainById({id:id,data:{
        domain_url: form?.url,
        sub_domain_name: form?.subdomain,
        domain_reference: form?.domain,
        description: form?.description,
        plans:plans,
      }}).unwrap()
      : await createSubdomain({
        domain_url: form?.url,
        sub_domain_name: form?.subdomain,
        domain_reference: form?.domain,
        description: form?.description,
        plans:plans,
      }).unwrap()

      console.log(data);
      toast.success(data?.message);
      navigate('/admin/domains')
      // console.log(form);
      // console.log(plans);
    } catch (error) {
      getError(error);
    }
  }

    // const domains = [
    //         {name:'Engineering'},
    //         {name:'Medical'},
    // ]
    // const subDomains = [
    //         {name:'Mechanical Engineering'},
    //         {name:'Civil Engineering'},
    // ]

    const handleChange = (e) => {
      const { name, value } = e.target;
      console.log(name,value)
      setForm({ ...form, [name]: value });
    };
    
    useEffect(()=>{
 console.log(form)
    },[form])


  

  return (
    <MotionDiv >
      <h3>{isEditDomain?'Edit Area of Specialty':'Add Area of Specialty'}</h3>
        <Form
         onSubmit={handlesubmit}
         >
      <Container className="px-md-5">
      <Row>
        <Col md={6}>
        <FormField
            label={"Search & Select Domain"}
            type={"select"}
            name={'domain'}
            loading={isLoading}
            value={form?.domain}
            onChange={handleChange}
            options={ domains?.map((item) => ({
                label: item?.domain_name,
                value: item?._id,
              }))}
              // onChange={(e) => {
              //   const {  value, label } = e.target;
              //  console.log(value,label)
                  
              // }}
          />
        </Col>
        <Col md={6}>
          <FormField
            label={"Enter Area of specialty"}
            placeholder={"Area of specialty"}
            type={"text"}
            loading={isLoading}
            name={'subdomain'}
            value={form?.subdomain}
            onChange={handleChange}
          />
        </Col>
        <Col md={6}>
          <FormField
            label={"Enter URL"}
            placeholder={"www.example.com"}
            type={"text"}
            loading={isLoading}
            value={form?.url}
            name={'url'}
            onChange={handleChange}
          />
        </Col>
      </Row>
     


      {/* <Row>
        <Col md={6}>
          <FormField
            label={"Prof. Name"}
            type={"text"}
            placeholder={"John Doe"}
          />
        </Col>
        <Col md={6}>
          <FormField
            label={"Email ID"}
            type={"email"}
            placeholder={"johndoe@gmail.com"}
          />
        </Col>
       
      </Row>
      <Row>
        <Col md={6}>
          <FormField
            label={"Prof. ID"}
            type={"text"}
            placeholder={"johndoe24"}
          />
        </Col>
        <Col md={6}>
          <FormField
            label={"Password"}
            type={"password"}
            placeholder={"*******"}
          />
        </Col>
        
      </Row> */}


      <h6 className="fw-bold">Information About Course</h6>
      <Row>
        <Col >
          <FormField
            label={"Introduction about course"}
            type={"text"}
            as={"textarea"}
            value={form?.description}
            onChange={handleChange}
            name={'description'}
            rows={5}
            placeholder={"Text goes here..."}
          />
        </Col>
      </Row>
    
    <Row>
      <Col md={6}>
       <h6>Add plans for this Domain</h6>
      
      </Col>
      {plans?.length > 0 && plans?.length<3? 
      
      
      
      <Col className="text-end">
      <AddButton title={'Add New Plan'} func={handleShowModal} />
      </Col>
      : null}
    </Row>

       <Row className=" my-4 text-center justify-content-center" md={3} sm={6}>
       

        {plans?.length > 0? 
        
        plans?.map((plan,i)=>(
           <Col key={i} className="p-1">
           <Card className="m-1">
            <Card.Body>
              <h3 style={{color:'rgba(97, 114, 243, 1)'}}>£{plan?.price}</h3>
              <p>{plan?.validity}</p>
              <Row><Col>
              
              <Button variant="transparent" className="m-1 w-100 add-btn" onClick={()=>handleShowModal(i)}>Edit</Button>
              </Col></Row>
              <Row><Col>
              <Row>
                <Col className="text-start pt-3">
                <p className="fw-bold">Features:</p>
                   <p><FaRegCircleCheck color="rgba(0, 0, 139, 1)"/> Full QBank Access </p>
                   <p><FaRegCircleCheck color="rgba(0, 0, 139, 1)"/> 2-Self Assessments </p>
                   <p><FaRegCircleCheck color="rgba(0, 0, 139, 1)"/> One Time reset option </p>
                </Col>
              </Row>
              
              <Button variant="transparent" className="del-btn m-1 w-100" onClick={()=>handleDeletePlan(i)}>Delete </Button>
              </Col></Row>
            </Card.Body>
           </Card>
           </Col>

        ))
        
        : 
         <Col   className="d-flex justify-content-center align-items-center ">
        <Card className="shadow text-center border-0 p-3 py-5" >
        <div className="text-center"><FaCalendarAlt size={40}/></div> 
        There are no plans added
        <AddButton title={'Add New Plan'} func={handleShowModal} />
  </Card>
        </Col>
        }
          


      
       </Row>
        </Container>
        <hr/>
        <Row className="my-3">
            <Col className="text-center ">
               <Button variant="transparent" className="add-btn m-1 px-3" onClick={handleShowCancelModal}>Cancel</Button>
               <Button variant="transparent" type="submit" disabled={subdomainLoading || updateSubdomainLoading} className="add-btn m-1 px-3">
                {subdomainLoading || updateSubdomainLoading ? <Spinner size="sm" /> :
                  isEditDomain?'Edit Specialty' :'Add Specialty'}
                  </Button>
            </Col>
           
        </Row>
     </Form>

        <Modal show={showModal} onHide={handleCloseModal} size="lg" >
            
            <Modal.Body>
           
                
            <h5 className="text-center my-3">{editingPlanIndex !== null ? 'Edit Plan' : 'Add New Plan'}</h5>
     <hr/>
               
                <Row>
                    <Col sm={6}>
                         <Row>
                            <Col>
                            {/* <FormField label={'Enter Plan Validity'} value={validity} onChange={(e)=>setValidity(e.target.value)} type={'text'} placeholder={'30 days'} /> */}
                            <FormField
            label={"Choose Plan Validity"}
            type={"select"}
            
            value={validity}
            onChange={(e)=>setValidity(e.target.value)}
            
            options={[
              { label: "Monthly", value: "Monthly" },
              { label: "Quarterly", value: "Quarterly" },
              { label: "Annually", value: "Annually" },
            ]}
          />
                            </Col>
                         </Row>
                         <Row>
                            <Col>
                            <FormField label={'Enter cost of Plan (£)'} value={price} onChange={(e)=>setPrice(e.target.value)} type={'text'} placeholder={'£310'} />
                            </Col>
                         </Row>
                    </Col>
                    <Col>
                         <p>Select Plan Feature From Below</p>
                         <hr/>
                         <Form.Check label={'Full QBank Access'} />
                         <Form.Check label={'2-Self Assessment'} />
                         <Form.Check label={'One-time reset option'} />
                        
                    </Col>
                </Row>

            </Modal.Body>
            <Modal.Footer>
            <Row className="my-3">
            <Col className="text-center ">
               <Button variant="transparent" className="add-btn m-1 px-3" onClick={handleCloseModal}>Cancel</Button>
               <Button variant="transparent" className="add-btn m-1 px-3" onClick={handleAddPlan}> {editingPlanIndex !== null ?'Edit Plan':'Add Plan'}</Button>
            </Col>
           
        </Row>
            </Modal.Footer>
        </Modal>

       
       <ModalTemplate
    show={showCancelModal}
    onHide={handleCloseCancelModal}
       title={`Are you sure you want to cancel ${isEditDomain?'editing':'adding'} specialty?`}
       description={'Lorem ipsum dolor sit amet consectetur. Suscipit nunc tincidunt iaculis sit feugiat platea. Aliquet amet cras amet mauris neque facilisi. Scelerisque interdum elit maecenas.'}
       src={'/icons/question-red.png'}
       onDiscard={handleCloseCancelModal}
       onConfirm={handleCancelConfirm}

/>

    </MotionDiv>
  );
}

export default AddEditDomain;
