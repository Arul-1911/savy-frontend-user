import React from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import { FaRegCircleCheck } from 'react-icons/fa6'

function PlanCard({id,setSelectedCard,title,tagline,save,annualPrice,bgColor,textColor,monthlyPrice,featureTitle,features}) {
  console.log(features)
  return (
    <Card className='p-3 rounded-4 border-0 h-100 plan-card' onClick={()=>setSelectedCard && setSelectedCard(id)} style={{background:bgColor || '#ddd',color:textColor || '#fff',cursor:'pointer',minHeight:'400px'}}>
      <Card.Body className='p-0'>
      {save && <Row>
        <Col className='text-center d-flex justify-content-center'>
            <p className='rounded-pill bg-white px-3 mb-1 ' style={{color:'var(--primary-color)'}}>Save {save}%</p>
        </Col>
       </Row>}
       <Row className=' '>
        <Col className='text-center'>
          <h4 className='mb-1 mt-2' style={{fontWeight:600}}>{title}</h4>
          <p className='mt-0' style={{fontSize:'0.75rem',fontWeight:600}}>{tagline}</p>
          </Col>
       </Row>

       {annualPrice && <Row>
        <Col className='text-center'>
        <div className='py-2' style={{borderTop:'1px solid white',borderBottom:'1px solid white'}}>
             <h5>AUD ${annualPrice}</h5>
             <p className='mb-0' style={{fontSize:'0.75rem'}}>per month, billed monthly</p>
             </div>
             <p className='mt-2' style={{fontSize:'0.85rem'}}>${monthlyPrice} billed monthly</p>
        </Col>
       </Row>}

       <Row>
        <Col>
       {featureTitle && <h6 className='' style={{fontSize:'0.90rem'}}>{featureTitle}</h6>}


          {features && features?.map((feature,i)=>(
              <p className='mb-1' style={{fontSize:'0.8rem'}}><FaRegCircleCheck /> {feature}</p>
          ))}

        </Col>
       </Row>
       </Card.Body>
       <Card.Footer className='bg-transparent px-0 border-0'>
         <Button className='w-100 bg-white border-white ' style={{color:'var(--primary-color)',fontWeight:600}}>Get {title}</Button>
       </Card.Footer>

    </Card>
  )
}

export default PlanCard