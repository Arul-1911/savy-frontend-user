import React, { useEffect, useRef ,useState} from 'react';
import { Button, Col, Row, Image } from 'react-bootstrap';
import { BsUpload, BsX } from 'react-icons/bs';

function UploadImages({ images, setImages, preImages,setPreImages }) {
  const fileInputRef = useRef(null);
  // const [previewUrls, setPreviewUrls] = useState([]);
  const imgAddr = 'https://creative-story.s3.amazonaws.com';



  const handleImageChange = (event) => {
    const fileList = event.target.files;
    const filePreviews = Array.from(fileList).map((file) => URL.createObjectURL(file));
    // setPreviewUrls((prevPreviews) => [...prevPreviews, ...filePreviews]);
    setImages((prevImages) => [...prevImages, ...fileList]);
  };

  const removeImage = (index) => {
    // const updatedPreviewUrls = [...previewUrls];
    const updatedImages = [...images];
    // updatedPreviewUrls.splice(index, 1);
    updatedImages.splice(index, 1);
    // setPreviewUrls(updatedPreviewUrls);
    setImages(updatedImages);
  };
  const removePreImage = (index) => {
    // const updatedPreviewUrls = [...previewUrls];
    const updatedImages = [...preImages];
    // updatedPreviewUrls.splice(index, 1);
    updatedImages.splice(index, 1);
    // setPreviewUrls(updatedPreviewUrls);
    setPreImages(updatedImages);
  };

  const handleUploadButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <Row className='my-3'>
      <Col style={{ height: '100%' }}>
        <h6 className="blue">Upload images</h6>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleImageChange}
          style={{ display: 'none' }}
          accept="image/*"
        />
        <Button className="blue-btn m-1" onClick={handleUploadButtonClick}>
          Upload Image <BsUpload />
        </Button>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
         
          {preImages?.map((url, index) => (
            <div className='p-2' key={index} style={{ width: '25%', maxWidth: '25%', height: '80px', position: 'relative' }}>
              <Image src={`${imgAddr}${url}`} alt={`Image ${index}`} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'cover' }} />
              <Button variant="transparent" className='p-0 delete-btn' size="sm" style={{ position: 'absolute', top: '0px', right: '0px' }} onClick={() => removePreImage(index)}>
                <BsX size={20} />
              </Button>
            </div>
          ))}
          
          {images?.map((file, index) => (
            <div className='p-2' key={index} style={{ width: '25%', maxWidth: '25%', height: '80px', position: 'relative' }}>
              <Image src={URL.createObjectURL(file)} alt={`Preview ${index}`} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'cover' }} />
              <Button variant="transparent" className='p-0 delete-btn' size="sm" style={{ position: 'absolute', top: '0px', right: '0px' }} onClick={() => removeImage(index)}>
                <BsX size={20} />
              </Button>
            </div>
          ))}
        </div>
      </Col>
    </Row>
  );
}

export default UploadImages;
