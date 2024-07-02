import React, { useState, useRef } from "react";

import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
} from "react-image-crop";
import { canvasPreview } from "./canvasPreview";
import { useDebounceEffect } from "./useDebounceEffect";

import "react-image-crop/dist/ReactCrop.css";
import { Button, Form } from "react-bootstrap";

// This is to demonstate how to make and center a % aspect crop
// which is a bit trickier so we use some helper functions.
function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 90,
        //height:600
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

export default function Cropper({ uploadHandler, w, h, isUploaded }) {
  const imgRef = useRef(null);
  const blobUrlRef = useRef("");
  const hiddenAnchorRef = useRef(null);
  const previewCanvasRef = useRef(null);

  const [crop, setCrop] = useState({});
  const [completedCrop, setCompletedCrop] = useState();
  const [imgSrc, setImgSrc] = useState("");
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [aspect, setAspect] = useState(w / h);
  const [imageName, setImageName] = useState(null);

  function onSelectFile(e) {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined); // Makes crop preview update between images.
      setImageName(e.target.files[0].name);
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        setImgSrc(reader.result?.toString() || "")
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  function onImageLoad(e) {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  }

  function onDownloadCropClick() {
    if (!previewCanvasRef.current) {
      throw new Error("Crop canvas does not exist");
    }

    previewCanvasRef.current.toBlob((blob) => {
      if (!blob) {
        throw new Error("Failed to create blob");
      }
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
      }

      // blobUrlRef.current = URL.createObjectURL(blob);
      // hiddenAnchorRef.current.href = blobUrlRef.current;
      // hiddenAnchorRef.current.click();
      uploadHandler(new File([blob], imageName, { type: blob.type }));
    });
  }

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          scale,
          rotate
        );
      }
    },
    100,
    [completedCrop, scale, rotate]
  );

  // function handleToggleAspectClick() {
  //   if (aspect) {
  //     setAspect(undefined);
  //   } else if (imgRef.current) {
  //     const { width, height } = imgRef.current;
  //     setAspect(15 / 6);
  //     setCrop(centerAspectCrop(width, height, 15 / 6));
  //   }
  // }

  return (
    <div className="App">
      <div className="Crop-Controls">
        <Form.Group className="mb-3" controlId="promotion_image">
          <Form.Label>Upload Image</Form.Label>
          <Form.Control type="file" accept="image/*" onChange={onSelectFile} />
        </Form.Group>
        {/* <input type="file" accept="image/*" onChange={onSelectFile} /> */}
      </div>
      {!isUploaded && (
        <>
          {!!imgSrc && (
            <ReactCrop
              crop={crop}
              onChange={(_, percentCrop) => setCrop(percentCrop)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={aspect}
            >
              <img
                ref={imgRef}
                alt="Crop me"
                src={imgSrc}
                style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
                onLoad={onImageLoad}
              />
            </ReactCrop>
          )}
          {!!completedCrop && (
            <>
              <div>
                <canvas
                  ref={previewCanvasRef}
                  style={{
                    border: "1px solid black",
                    objectFit: "contain",
                    width: completedCrop.width,
                    height: completedCrop.height,
                  }}
                />
              </div>
              <div>
                <Button onClick={onDownloadCropClick}>Upload Image</Button>
                {/* <a
              ref={hiddenAnchorRef}
              download
              style={{
                position: "absolute",
                top: "-200vh",
                visibility: "hidden",
              }}
            >
              Hidden download
            </a> */}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
