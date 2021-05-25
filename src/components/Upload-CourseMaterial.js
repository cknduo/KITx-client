import React, { useState, useEffect } from "react"
import Button from '@material-ui/core/Button';
import Axios from "axios"

import './Modal-UpdateCourse.css'
import placeholder from '../assets/whale.svg'

const UploadCourseMaterial = ({ courseID, fileUse, description }) => {
    const [selectedFile, setSelectedFile] = useState()
    const [isSelected, setIsSelected] = useState(false)
    const [isSuccessful, setIsSuccessful] = useState(false)
    const [previewImage, setPreviewImage] = useState(placeholder)

    //for viewing preview of file to be submitted
    const filechangeHandler = (event) => {
        let file = event.target.files[0]
        setSelectedFile(file)
        setIsSelected(true)
        const fileReader = new window.FileReader()
        fileReader.readAsDataURL(file)
        fileReader.onloadend = () => {
            setPreviewImage(fileReader.result)
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
   
        const update = {
        [fileUse]: {
            fileID: uploadedFile._id,
            filename: uploadedFile.filename,
            description: description
        }
    }
    
    try {
        let response = await fetch(`/courses/${courseID}`,
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
        <div>
            <img className="preview-image" src={previewImage} alt="No Preview Available" height="100px" width="100px" margin="20px" border="2px" />
            <input type="file" name="file" id="file" onChange={filechangeHandler} />
            <Button color="primary" variant="contained" type="submit" disabled={!isSelected} onClick={()=>{fileUpload()}}>
                Upload
            </Button>
            {isSuccessful && <> File upload complete </>}
        </div>

    )



}

export default UploadCourseMaterial