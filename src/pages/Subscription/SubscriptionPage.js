import React, { useEffect, useState } from 'react'
import { Button, Col,  Row } from 'react-bootstrap'
import PlanCard from './Components/PlanCard'
import { MotionDiv } from '../../components'
import { Link } from 'react-router-dom';
import { IoArrowBackCircleOutline } from 'react-icons/io5';
import GradientText from '../../components/layout/GradientText';

function SubscriptionPage() {

  const [selectedCard,setSelectedCard] = useState(null);

  const plans = [
    {title:'RetireSmart',tagline:'Sayv for the Long Term',save:33,bgColor:'linear-gradient(180deg, #5CB6F9 0%, #004AAD 100%)',annualPrice:'19.99',monthlyPrice:'29.95',featuresTitle:'Enjoy your goals while planning towards your golden egg',features:['Automatic bank feeds','Priority email helpdesk support','Unlimited connected banks from all countries']},
    {title:'RewardSmart',tagline:'Sayv for Special Rewards',save:33,bgColor:'rgba(0, 74, 173, 1)',annualPrice:'19.99',monthlyPrice:'29.95',featuresTitle:'Enjoy your goals while planning towards your golden egg',features:['Automatic bank feeds','Priority email helpdesk support','Unlimited connected banks from all countries']},
    {title:'Rudimentary',tagline:'Smart Savings Tracker',save:33,bgColor:'rgba(55, 73, 87, 1)',annualPrice:'19.99',monthlyPrice:'29.95',featuresTitle:'Enjoy your goals while planning towards your golden egg',features:['Automatic bank feeds','Priority email helpdesk support','Unlimited connected banks from all countries']},
    {title:'SavyFree',tagline:'For the casual budgeter',textColor:'var(--primary-color)',bgColor:'rgba(217, 217, 217, 1)',features:['Automatic bank feeds','Priority email helpdesk support','Unlimited connected banks from all countries']},
  ]

  useEffect(() => {
    if (selectedCard !== null) {
      const nonSelectedCards = document.querySelectorAll('.non-selected-card-div');
      nonSelectedCards.forEach((card) => {
        card.addEventListener('transitionend', () => {
          card.classList.add('position-absolute');
        }, { once: true });
      });
    }
  }, [selectedCard]);

  return (
<MotionDiv>
  <div className='d-flex'>

<Link to={-1}>
<IoArrowBackCircleOutline color='rgba(92, 182, 249, 1)' className='text-start mb-1 me-1' size={30} />
</Link>
<h4><GradientText text={'Subscription Plan'} color={'linear-gradient(270deg, #5CB6F9 0%, #004AAD 100%)'}/></h4>
  </div>

    <Row className='pt-3'> 
      <Col className='text-center'>

   {selectedCard === null?
   <>
      <h5 style={{color:'#374957',fontWeight:'600'}}>Saving smarter is 30 seconds away</h5>
      <p style={{color:'var(--primary-color)',fontWeight:'600'}}>Find the plan that's right for you</p>
    </>
     :
     <>
     <h5 style={{color:'#374957',fontWeight:'600'}}>Subscription Plan</h5>
     <p style={{color:'var(--primary-color)',fontWeight:'600'}}>Selected Subscription Plan</p>
   </>}
      </Col>
    </Row>
    <Row  className='justify-content-center p-3' style={{overflow:'hidden',position:'relative'}}>
      {plans?.map((plan,i)=>(

       
        <Col lg={3} md={4} sm={12} className={`p-2 ${selectedCard != null? selectedCard === i ? 'selected-card-div':'non-selected-card-div':'plan-card-div'}`} >
          <PlanCard id={i} setSelectedCard={setSelectedCard} title={plan?.title} save={plan?.save} textColor={plan?.textColor} bgColor={plan?.bgColor} annualPrice={plan?.annualPrice} monthlyPrice={plan?.monthlyPrice} tagline={plan?.tagline} featureTitle={plan?.featuresTitle} features={plan?.features} />
        </Col>

      ))}
    </Row>


  {selectedCard === null? null:  <Row>
      <Col className='text-center'>
       <Button className='border-0 px-4' onClick={()=>setSelectedCard(null)} style={{fontWeight:600,backgroundColor:'var(--primary-color)'}}>Change Subscription Plan</Button>
      </Col>
    </Row>
    }
</MotionDiv>
  )
}

export default SubscriptionPage