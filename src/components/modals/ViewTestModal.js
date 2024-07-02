import React, { useEffect, useState } from 'react'
import { Col, Modal, Row ,Card,Button, Spinner} from 'react-bootstrap'
import { FiEdit } from 'react-icons/fi'
import { useNavigate, useParams } from 'react-router-dom'
import { CustomTable } from '../layout';

function ViewTestModal({show,onHide,onConfirm,onCancel,selectedQuestions,data,loading=false}) {

    const navigate = useNavigate();
    const [resultPerPage, setResultPerPage] = useState(10);
    const [curPage, setCurPage] = useState(1);
    const curPageHandler = (p) => setCurPage(p);
    const {id} = useParams();
    
    const [topicPercentage, setTopicPercentage] = useState({});
    const [subtopicPercentage, setSubtopicPercentage] = useState({});
    const [topicNames, setTopicNames] = useState({});
    const [subtopicNames, setSubtopicNames] = useState({});

    useEffect(() => {
        if (selectedQuestions && selectedQuestions.length > 0) {
            const { topicPercentage, subtopicPercentage, topicNames, subtopicNames } = calculatePercentage(selectedQuestions);
            setTopicPercentage(topicPercentage);
            setSubtopicPercentage(subtopicPercentage);
            setTopicNames(topicNames);
            setSubtopicNames(subtopicNames);
        }
    }, [selectedQuestions]);

    const calculatePercentage = (questions) => {
        let topicCount = {};
        let subtopicCount = {};
        let topicNames = {};
        let subtopicNames = {};

        questions.forEach(question => {
            const topicId = question?.sub_topic_reference?.topic_reference?._id;
            const subtopicId = question?.sub_topic_reference?._id;

            if (!(topicId in topicNames)) {
                topicNames[topicId] = question?.sub_topic_reference?.topic_reference?.topic_name;
            }

            if (!(subtopicId in subtopicNames)) {
                subtopicNames[subtopicId] = question?.sub_topic_reference?.sub_topic_name;
            }

            topicCount[topicId] = (topicCount[topicId] || 0) + 1;
            subtopicCount[subtopicId] = (subtopicCount[subtopicId] || 0) + 1;
        });

        const totalQuestions = questions.length;

        const topicPercentage = {};
        const subtopicPercentage = {};

        Object.keys(topicCount).forEach(topic => {
            topicPercentage[topicNames[topic]] = ((topicCount[topic] / totalQuestions) * 100).toFixed(2);
        });

        Object.keys(subtopicCount).forEach(subtopic => {
            subtopicPercentage[subtopicNames[subtopic]] = ((subtopicCount[subtopic] / totalQuestions) * 100).toFixed(2);
        });

        return { topicPercentage, subtopicPercentage, topicNames, subtopicNames };
    };

    const renderTopicStats = () => {
        return Object.keys(topicPercentage).map((topic, index) => (
            <div key={index} className='mx-2 px-2' style={{ display: 'inline-block', backgroundColor: 'rgba(224, 234, 255, 1)' }}>
                {`${topic}: `}
                <span style={{ color: 'rgba(0, 0, 139, 1)' }}>{topicPercentage[topic]}%</span>
            </div>
        ));
    };

    const renderSubtopicStats = () => {
        return Object.keys(subtopicPercentage).map((subtopic, index) => (
            <div key={index} className='mx-2 px-2' style={{ display: 'inline-block', backgroundColor: 'rgba(254, 247, 195, 1)' }}>
                {`${subtopic}: `}
                <span style={{ color: 'rgba(0, 0, 139, 1)' }}>{subtopicPercentage[subtopic]}%</span>
            </div>
        ));
    };


const numOfPages =1;


    const column = [
        "S.No",
        "Question",
        "Topic Name",
        "Sub Topic", 
       
      ];

   

  return (
    <Modal show={show} onHide={onHide} size='lg'>
    <Modal.Body>

        <Card className='p-1 border '>
                <Row>
                    <Col>
                       <p>Test Name: <span style={{color:'rgba(0, 0, 139, 1)'}}>{data?.testName}</span></p>
                       <p>Total No. of Que Selected: <span style={{color:'rgba(0, 0, 139, 1)'}}>{selectedQuestions?.length}</span></p>
                       <p>Type of Test: <span style={{color:'rgba(0, 0, 139, 1)'}}>{data?.testType}</span></p>
                       <p>Time Allotted: <span style={{color:'rgba(0, 0, 139, 1)'}}>{data?.timeAlloted} Minutes</span></p>
                     </Col>
                    <Col md={6} className='p-2'>
                       

                      <div className='custom-scroll py-2' style={{overflowX:'scroll',textWrap:'nowrap'}}>                  
                      {renderTopicStats()}
                        {/* {[{ topic: '1', per: '40' }, { topic: '2', per: '30' }, { topic: '3', per: '20' }].map((t, i) => (
    <div  key={i} className='mx-2 px-2' style={{ display: 'inline-block',backgroundColor:'rgba(224, 234, 255, 1)' }}>
        Topic {t?.topic}: <span style={{color:'rgba(0, 0, 139, 1)'}}>{t?.per}%</span>
    </div>
))} */}
                      </div>                  
                      <div className='custom-scroll py-2 ' style={{overflowX:'scroll',textWrap:'nowrap'}}>                  
                      {renderSubtopicStats()}
                        {/* {[{ subtopic: '1', per: '20' }, { subtopic: '2', per: '40' }, { subtopic: '3', per: '60' },{ subtopic: '4', per: '35' }].map((t, i) => (
    <div  key={i} className='mx-2 px-2' style={{ display: 'inline-block',backgroundColor:'rgba(254, 247, 195, 1)' }}>
        Sub Topic {t?.topic}: <span style={{color:'rgba(0, 0, 139, 1)'}}>{t?.per}%</span>
    </div>
))} */}
                      </div>                  
                 
                   </Col>
                   </Row>    
          </Card >            
                    <CustomTable
        //   loading={isLoading}
          column={column}
          rowNo={resultPerPage}
          rowProps={{ setResultPerPage }}
          paging={false}
          pageProps={{ numOfPages, curPage }}
        //   pageHandler={curPageHandler}
        //    search={true}
        //    searchProps={{ searchInput, setSearchInput, setQuery }}
        
        //   isCreateBtn={true}
        //   createBtnProps={{
        //     text: 'Prof',
        //     createURL: '/admin/profs/add-prof',
        //   }}
        >
          {selectedQuestions &&
            selectedQuestions?.map((data, i) => (
              <tr key={data?._id} className="odd text-center">
                <td className="">{i + 1}</td>
                <td>{data?.question}</td>
                <td><div className=''>{data?.sub_topic_reference?.topic_reference?.topic_name}</div></td>
                <td><div className=''>{data?.sub_topic_reference?.sub_topic_name}</div></td>
              
              </tr>
            ))}
        </CustomTable>
                  
        
    
        <Row>
        <Col className="text-end">
          <Button variant="transparent" className="add-btn px-3 m-1" onClick={onCancel}>Go Back</Button>
          <Button className="blue-btn px-3 m-1" type="submit" disabled={loading} onClick={onConfirm}>
          {loading?<Spinner size='sm' />:
          id?'Update Test': 'Create Test'
          
          }
            
            </Button>
        </Col>
      </Row>
     
      
    </Modal.Body>
  </Modal>
  )
}

export default ViewTestModal