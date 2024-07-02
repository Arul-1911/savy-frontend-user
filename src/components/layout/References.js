import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { FaTrashAlt } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa6';

function References({ references, setReferences }) {
  const addReference = () => {
    const newReferences = [...references, ''];
    setReferences(newReferences);
  };

  const removeReference = (index) => {
    const newReferences = [...references];
    newReferences.splice(index, 1);
    setReferences(newReferences);
  };

  const handleReferenceChange = (index, value) => {
    const newReferences = [...references];
    newReferences[index] = value;
    setReferences(newReferences);
  };

  return (
    <Card className="border-0 shadow">
      <Card.Header className="bg-white">References:</Card.Header>
      <Card.Body>
      {references?.map((reference, index) => (
        <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
          <input
            type="text"
            value={reference}
            onChange={(e) => handleReferenceChange(index, e.target.value)}
            style={{ marginRight: '10px' }}
            className='border-1 rounded shadow'
          />
          <Button variant="transparent" className='del-btn px-1 py-0 m-1' onClick={() => removeReference(index)}>
            <FaTrashAlt />
          </Button>
        </div>
      ))}
        <Button variant="transparent" className='blue-btn' onClick={addReference}>
          <FaPlus/>
        </Button>
      </Card.Body>
    </Card>
  );
}

export default References;
