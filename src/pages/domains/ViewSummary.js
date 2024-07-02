import React from 'react'
import { HiMinusCircle, HiPlusCircle } from "react-icons/hi2";
import { Link } from "react-router-dom"
import { MotionDiv } from '../../components';

// import ModuleContainer from '../../../components/layout/ModuleContainer'

// import { SUB_TOPICS } from '../../../constants/AreaTopic'

const ViewSummaryContainer = ({ children, topic, containerHeader }) => {
    return (
        <div
            style={{
                borderLeft: '2px solid var(--primary-color)',
                position: 'relative',
                padding: '2rem 1.5rem',
            }}
        >
            <span
                style={{
                    position: 'absolute',
                    top: '-15px',
                    left: '-9px',
                    cursor: 'pointer',
                }}
            ><HiMinusCircle style={{ color: 'var(--primary-color)' }} /></span>
            {containerHeader}
            {children}
        </div>
    )
}

const ViewSummary = () => {

     const SUB_TOPICS = [
        {
            "topic": "Control Engineering",
            "subtopics": [
                "Subtopic 1",
                "Subtopic 2",
                "Subtopic 3",
                "Subtopic 4",
                "Subtopic 5",
            ]
        },
        {
            "topic": "Workshop1 1",
            "subtopics": [
                "Pancreatities",
                "CLCS",
                "Quantum",
                "Quantum",
            ]
        },
        {
            "topic": "Fluide Mechanics",
            "subtopics": [
                "Subtopic 1 - Fluide",
                "Subtopic 2 - Fluide",
                "Subtopic 3 - Fluide",
                "Subtopic 4 - Fluide",
                "Subtopic 5 - Fluide",
            ]
        },
        {
            "topic": "Mathematics 1",
            "subtopics": [
                "Subtopic 1 - Mathematics",
                "Subtopic 2 - Mathematics",
                "Subtopic 3 - Mathematics",
                "Subtopic 4 - Mathematics",
                "Subtopic 5 - Mathematics",
            ]
        },
        {
            "topic": "Statistics 1",
            "subtopics": [
                "Subtopic 1 - Statistics",
                "Subtopic 2 - Statistics",
                "Subtopic 3 - Statistics",
                "Subtopic 4 - Statistics",
                "Subtopic 5 - Statistics",
            ]
        },
        {
            "topic": "FMC",
            "subtopics": [
                "Subtopic 1 - FMC",
                "Subtopic 2 - FMC",
                "Subtopic 3 - FMC",
                "Subtopic 4 - FMC",
                "Subtopic 5 - FMC",
            ]
        },
        {
            "topic": "Graphic Design",
            "subtopics": [
                "Subtopic 1 - Graphic",
                "Subtopic 2 - Graphic",
                "Subtopic 3 - Graphic",
                "Subtopic 4 - Graphic",
                "Subtopic 5 - Graphic",
            ]
        },
        {
            "topic": "MNSC",
            "subtopics": [
                "Subtopic 1 - MNSC",
                "Subtopic 2 - MNSC",
                "Subtopic 3 - MNSC",
                "Subtopic 4 - MNSC",
                "Subtopic 5 - MNSC",
            ]
        },
    ]


    return (
        <MotionDiv>
            <ViewSummaryContainer
                containerHeader={<h6
                    style={{
                        position: 'absolute',
                        top: '-12px',
                        left: '1rem',
                        color: 'var(--primary-color)',
                    }}
                >Engineering</h6>}
            >
                <ViewSummaryContainer
                    containerHeader={<h6
                        style={{
                            position: 'absolute',
                            top: '-12px',
                            left: '1rem',
                            // color: 'var(--primary-color)',
                        }}
                    >Mechanical Engineering</h6>}
                >
                    {SUB_TOPICS.map(({ topic, subtopics }, index) => (
                        <div className='mb-4'>
                            <ViewSummaryContainer
                                key={index}
                                containerHeader={
                                    <div
                                        className='d-flex justify-content-between align-items-start'
                                        style={{
                                            position: 'absolute',
                                            top: '-10px',
                                            left: '1rem',
                                            width: 'calc(100% - 2.5rem)',
                                        }}
                                    >
                                        <h6>Topic {index + 1}: {topic}</h6>
                                        <Link to={`/menu/questions?topic=${topic}`} style={{ textDecoration: 'none'}}>
                                            <p
                                                style={{
                                                    borderRadius: '0.25rem',
                                                    color: 'white',
                                                    backgroundColor: '#6172F3',
                                                    padding: '0.2rem 0.375rem',
                                                    fontSize: '0.75rem'
                                                }}
                                            >No. Questions: 100</p>
                                        </Link>
                                    </div>
                                }
                            >
                                {subtopics.map((subtopic, index) => (<div>
                                    <hr className='w-100 my-0' />
                                    <div className='w-100 py-2 ps-3 pe-2 d-flex justify-content-between align-items-start'>
                                        <p>{subtopic}</p>
                                        <p
                                            style={{
                                                borderRadius: '0.25rem',
                                                color: '#9E9E9E',
                                                backgroundColor: '#F7F7F7',
                                                padding: '0.2rem 0.375rem',
                                                fontSize: '0.75rem',
                                                fontWeight: 600
                                            }}
                                        >No. Questions: 25</p>
                                    </div>
                                </div>))}
                            </ViewSummaryContainer>
                        </div>
                    ))}
                </ViewSummaryContainer>
            </ViewSummaryContainer>
        </MotionDiv>
    )
}

export default ViewSummary

/*
<div
                style={{
                    borderLeft: '2px solid var(--primary-color)',
                    position: 'relative',
                    padding: '2rem 1.5rem',
                }}
            >
                <span
                    style={{
                        position: 'absolute',
                        top: '-15px',
                        left: '-9px',
                        cursor: 'pointer',
                    }}
                ><HiMinusCircle style={{ color: 'var(--primary-color)' }} /></span>
                <h6
                    style={{
                        position: 'absolute',
                        top: '-12px',
                        left: '1rem',
                        color: 'var(--primary-color)',
                    }}
                >Engineering</h6>

                <div
                    style={{
                        borderLeft: '2px solid var(--primary-color)',
                        position: 'relative',
                        padding: '2rem 1rem',
                    }}
                >
                    <span
                        style={{
                            position: 'absolute',
                            top: '-14px',
                            left: '-7px',
                            cursor: 'pointer',
                        }}
                    ><ViewSummaryDropdownIcon /></span>
                    <h6
                        style={{
                            position: 'absolute',
                            top: '-10px',
                            left: '1rem'
                        }}
                    >Mechanical Engineering</h6>

                    {SUB_TOPICS.map(({ topic, subtopics }, index) => (
                        <div
                            key={index}
                            style={{
                                borderLeft: '2px solid var(--primary-color)',
                                position: 'relative',
                                padding: '2rem 1rem',
                                marginBottom: '1rem',
                            }}
                        >
                            <span
                                style={{
                                    position: 'absolute',
                                    top: '-14px',
                                    left: '-7px',
                                    cursor: 'pointer',
                                }}
                            ><ViewSummaryDropdownIcon /></span>
                            <div
                                className='d-flex justify-content-between align-items-start'
                                style={{
                                    position: 'absolute',
                                    top: '-10px',
                                    left: '1rem',
                                    width: 'calc(100% - 2.5rem)'
                                }}
                            >
                                <h6>Topic {index + 1}: {topic}</h6>
                                <p
                                    style={{
                                        borderRadius: '0.25rem',
                                        color: 'white',
                                        backgroundColor: '#6172F3',
                                        padding: '0.2rem 0.375rem',
                                        fontSize: '0.75rem'
                                    }}
                                >No. Questions: 100</p>
                            </div>
                            {subtopics.map((subtopic, index) => (<div>
                                <hr className='w-100 my-0' />
                                <div className='w-100 py-2 ps-3 pe-2 d-flex justify-content-between align-items-start'>
                                    <p>{subtopic}</p>
                                    <p
                                        style={{
                                            borderRadius: '0.25rem',
                                            color: '#9E9E9E',
                                            backgroundColor: '#F7F7F7',
                                            padding: '0.2rem 0.375rem',
                                            fontSize: '0.75rem',
                                            fontWeight: 600
                                        }}
                                    >No. Questions: 25</p>
                                </div>
                            </div>))}
                        </div>
                    ))}
                </div>
            </div>
*/