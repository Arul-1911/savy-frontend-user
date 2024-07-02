import React from 'react'
import { Button } from 'react-bootstrap';
import { IoAddCircleSharp } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

function CreateBtn({createURL,text}) {
    const navigate = useNavigate();
  return (
    <Button
    onClick={() => {
      navigate(createURL);
    }}
    variant="transparent"
    className="add-btn  px-3 mx-2 m-1 text-nowrap"
    style={{display:'inline-block'}}
  >
  Add {text && text} <IoAddCircleSharp className='mb-1' size={22}/>
  
  </Button>
  )
}

export default CreateBtn