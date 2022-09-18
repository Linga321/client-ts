import React, { useState, useEffect } from "react";

import { useAppDispatch } from "../redux/hooks";
import {
  uploadFile,
  deleteFile,
  getFiles,
} from "../redux/reducers/fileReducer";
import { File } from "../redux/types/file";

export const FileUpload = (props: any) => {
  const dispatch = useAppDispatch();
  const [imageeLink, setImagesLink] = useState<File[]>([]);
  const [errorMeg, setErrorMeg] = useState("");

  const handleChange = async (event: any) => {
    const fileUploaded = event.target.files[0];
    if (fileUploaded) {
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
          props.handleFile((prevImg: any) => [
            ...prevImg,
            created.payload?._id,
          ]);
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
        setImagesLink(
          imageeLink.filter((item: File) => item.imageId !== props?.image._id)
        );
        props.handleFile(createdUpdate.payload?._id);
      }
    }
  };

  const getImages = async () => {
    const images = props?.images ? props?.images : [props?.image];
    const foundFiles = await dispatch(getFiles(images));
    if (foundFiles.payload) {
      foundFiles.payload &&
        foundFiles.payload.map((payload: any) => {
          setImagesLink((prev) => [
            ...prev,
            {
              imageId: payload?._id,
              fileName: payload?.filename,
              location: payload?.filelocation,
            },
          ]);
        });
    }
  };

  const handleDelete = async (imageId: any) => {
    const created = await dispatch(deleteFile({ imageId: imageId }));
    if (props.multi) {
      if (created.payload?._id) {
        setImagesLink(
          imageeLink.filter((item: File) => item.imageId !== imageId)
        );
        props.handleFile(props?.images.filter((item: any) => item !== imageId));
      } else {
        setErrorMeg("file not Deleted");
      }
    }
  };

  useEffect(() => {
    if ((props.multi && props?.images[0] !== undefined) || props?.image) {
      setImagesLink([]);
      getImages();
    }
  }, [props?.images || props?.image]);

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
      {imageeLink &&
        imageeLink.map((img, index) => {
          if (img) {
            return (
              <img
                onClick={(e) => {
                  e.preventDefault();
                  if(props.multi){
                    handleDelete(img.imageId);
                  }
                }}
                key={index}
                className="show-image"
                src={`${img.location}`}
                alt="Image"
              />
            );
          }
        })}
    </>
  );
};
