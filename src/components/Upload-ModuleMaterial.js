import React, { useState, useEffect } from "react"

import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Axios from "axios"
import { makeStyles } from '@material-ui/core/styles';
import placeholder from '../assets/whale.svg'


const UploadModuleMaterial = ({ courseID, fileUse, description}) => {
    const [selectedFile, setSelectedFile] = useState()
    const [isSelected, setIsSelected] = useState(false)
    const [isSuccessful, setIsSuccessful] = useState(false)
    const [uploadedFile, setUploadedFile] = useState()
    const [materialAdded, setMaterialAdded] = useState()
    const [previewImage, setPreviewImage] = useState(placeholder)

    const classes = useStyles()

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

    const formik = useFormik({
        initialValues: {
            materialDescription: '',
            materialModuleNumber: '',
        },
        validationSchema: yup.object({
            materialDescription: yup
                .string('Enter description of file')
                .required('Description is required'),
            materialModuleNumber: yup
                .string('Enter module number')
                .required('Module number is required.  Enter 0 if general for all modules.')
        }),
        onSubmit: async values => {
            console.log("onSubmit called")

            /* Upload File */
            await fileUpload()
            console.log("submit")
            alert(JSON.stringify(values, null, 2))
            alert(JSON.stringify(uploadedFile, null, 2))

            /* Update course database with file information */
            const update = {
                fileID: uploadedFile._id,
                filename: uploadedFile.filename,
                description: values.materialDescription,
                moduleNumber: values.materialModuleNumber
            }
            console.log('update course files', update)
            try {
                let response = await fetch(`/courses/${courseID}/modulefiles`,
                    {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(update, null, 2)
                    })
            } catch (err) {
                console.log(`Problem with posting data`)
            }

        },
    });

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
        let file = await fileUploadData.data
        setIsSuccessful(true)
        setUploadedFile(file) 
        console.log("This is the file that was uploaded", file)
    }

     
        

    return (
        <div>
            <form className={classes.root} onSubmit={formik.handleSubmit}>

                <TextField
                    id="materialModuleNumber"
                    name="materialModuleNumber"
                    label="Module Number"
                    variant="filled"
                    style={{ margin: "16px 0px" }}
                    //value={formik.values.materialModuleNumber}
                    onChange={formik.handleChange}
                    error={formik.touched.materialModuleNumber && Boolean(formik.errors.materialModuleNumber)}
                    helperText={formik.touched.materialModuleNumber && formik.errors.materialModuleNumber}
                />

                <TextField
                    id="materialDescription"
                    name="materialDescription"
                    label="Material description"
                    variant="filled"
                    style={{ margin: "16px 16px" }}
                    //value={formik.values.materialDescription}
                    onChange={formik.handleChange}
                    error={formik.touched.materialDescription && Boolean(formik.errors.materialDescription)}
                    helperText={formik.touched.materialDescription && formik.errors.materialDescription}
                />



                <input type="file" name="file" id="file" onChange={filechangeHandler}/>

                <Button color="primary" variant="contained" type="Submit" disabled={!isSelected}>
                    Upload
            </Button>

            </form>


        </div>

    )

}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing(5),
    },

}));


export default UploadModuleMaterial

