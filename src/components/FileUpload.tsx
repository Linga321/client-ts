import React, { useRef, useLayoutEffect } from "react"
import { Button } from "react-bootstrap"
import { useSelector } from "react-redux"

import { RootState } from "../redux/store"
import { useAppDispatch } from "../redux/hooks"
import { uploadFile } from "../redux/reducers/fileReducer"

export const FileUpload = (props: any) => {
  const dispatch = useAppDispatch()
  const file = useSelector((state: RootState) => state.fileRedu)
  
  const handleChange = async(event: any) => {
    const fileUploaded = event.target.files[0]
    if(props.multi){ // if mutible images needed
      const result = await dispatch(uploadFile({file: fileUploaded}))
      props.handleFile((prevImg:any) => [...prevImg, result.payload?._id])
    }else{
      const result = await dispatch(uploadFile({file: fileUploaded, imageId: file.imageId, fileName: file.fileName}))
      props.handleFile(result.payload?._id)
    }
  }

  return (
    <>
      <input
        onChange={handleChange}
        type="file"
        className="fileupload"
        name="image"
        id="image"
      />
     {file.location && <img className="show-image" src={`${file.location}`} alt="Image" />}
    </>
  )
}
