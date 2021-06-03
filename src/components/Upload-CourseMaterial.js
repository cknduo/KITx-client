import React, { useState } from "react"
import Axios from "axios"

import ImageCourseMaterial from './Image-CourseMaterial'
import './Modal-UpdateCourse.css'

import './Upload-CourseMaterial.css'

const UploadCourseMaterial = ({ currentFileID, courseID, fileUse, description, refreshModal }) => {
/* This loads the course image, course certificate, and kit image into the database */    
    
    const [selectedFile, setSelectedFile] = useState()
    const [isSelected, setIsSelected] = useState(false)
    const [isSuccessful, setIsSuccessful] = useState(false)
    //const [previewImage, setPreviewImage] = useState(placeholder)

    //for viewing preview of file to be submitted
    const filechangeHandler = (event) => {
        let file = event.target.files[0]
        setSelectedFile(file)
        setIsSelected(true)
        const fileReader = new window.FileReader()
        fileReader.readAsDataURL(file)
        //fileReader.onloadend = () => {
        //    setPreviewImage(fileReader.result)
        //}
    }

    /*check if there is already an existing file defined.  If so, store
      the fileID, so when the new file is uploaded, the old one can be deleted
      from the gridfs database*/

    const deleteFile = async () => {

        /*delete module file from gridfs database*/
        try {
                
        let response = await fetch(`/courseMaterial/delete/${currentFileID}`,
            {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            })
        }    
        catch (err) {
                console.log(`Problem deleting data`, err)
            }
        }


    //for sending the file to the server    
    
    const fileUpload = async () => {
        const fileInfo = selectedFile
        let data = new FormData()
        data.append('file', fileInfo)

        const fileUploadData = await Axios.post(`/courseMaterial/upload/`, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        let uploadedFile = await fileUploadData.data
        setIsSuccessful(true)
        refreshModal()
   
        // if the currentFileID exists (not equal to ""), delete the existing file
        // from the gridfs database*/
         if ((currentFileID!=="60b70b4ee143353331068b39") && (currentFileID!=="")) {
             deleteFile()
             //console.log("file deleted called")
         }


        const update = {
            [fileUse]: {
                fileID: uploadedFile._id,
                filename: uploadedFile.filename,
                description: description
            }
        }

        try {
            await fetch(`/courses/${courseID}`,
                {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(update, null, 2)
                })
             } catch (err) {
            console.log(`Problem with posting data`)
        }

   
    }

    return (
        <div className='upload-course-image-file-container'>
            <div className='upload-img-container'>
                <ImageCourseMaterial imageFileID={currentFileID} />                
            </div>

            {/*<img className="preview-image" src={previewImage} alt="No Preview Available" height="100px" width="100px" margin="20px" border="2px" />*/}
            
            {/* Only accept image files*/}
            <div className='upload-content-container'>
                <input type="file" name="file" id="file" accept="image/*" onChange={filechangeHandler} />
                
                <div className='upload-btn-container'>
                    <button className='file-upload-btn' type='submit' disabled={!isSelected} onClick={()=>{fileUpload()}}>
                        UPLOAD
                    </button>
                </div>

                {isSuccessful && <> File upload complete </>}                
            </div>
        </div>
    )
}

export default UploadCourseMaterial