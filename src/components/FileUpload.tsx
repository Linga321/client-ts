import React, { useRef, useLayoutEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";

import { RootState } from "../redux/store";
import { useAppDispatch } from "../redux/hooks";
import { uploadFile, deleteFile } from "../redux/reducers/fileReducer";
import { File } from "../redux/types/file";

export const FileUpload = (props: any) => {
  const dispatch = useAppDispatch();
  const [imageeLink, setImagesLink] = useState<File[]>([]);
  const [errorMeg, setErrorMeg] = useState("");
  const file = useSelector((state: RootState) => state.fileRedu);

  const handleChange = async (event: any) => {
    const fileUploaded = event.target.files[0];
    if(fileUploaded){
      if (props.multi) {
        // if mutible images needed
        const created = await dispatch(uploadFile({ file: fileUploaded }));
        if (created.payload?._id) {
          setImagesLink((prev) => [
            ...prev,
            {
              imageId: created.payload?._id,
              fileName: created.payload?.filename,
              location: created.payload?.filelocation,
            },
          ]);
          props.handleFile((prevImg: any) => [...prevImg, created.payload?._id]);
        } else {
          setErrorMeg("file not Upload");
         
        }
      } else {
        const createdUpdate = await dispatch(
          uploadFile({
            file: fileUploaded,
            imageId: imageeLink[0]?.imageId,
          })
        );
        props.handleFile(createdUpdate.payload?._id);
        
      }
    }
  };

  const handleDelete = async (imageId: any) => {
    const created = await dispatch(deleteFile({ imageId: imageId }));
    if (props.multi) {
      if (created.payload?._id) {
        setImagesLink(imageeLink.filter((item :File) => item.imageId !== imageId))
        props.handleFile(props?.images.filter((item :any) => item !== imageId))
      } else {
        setErrorMeg("file not Deleted");
      }
    }
  };

  return (
    <>
      <input
        onChange={handleChange}
        type="file"
        className="fileupload"
        name="image"
        id="image"
      />
      <p className="error-message">{errorMeg}</p>
      {imageeLink.length > 0 &&
        imageeLink.map((img) => (
          <img
            onClick={(e) => {
              e.preventDefault();
              handleDelete(img.imageId);
            }}
            key={img.imageId}
            className="show-image"
            src={`${img.location}`}
            alt="Image"
          />
        ))}
    </>
  );
};
