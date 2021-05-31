import React, { useState, useEffect } from "react"

import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Axios from "axios"
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl'


const UploadModuleMaterial = ({ courseID, fileUse, description, modules, refreshModal}) => {
    const [selectedFile, setSelectedFile] = useState()
    const [isSelected, setIsSelected] = useState(false)

    const classes = useStyles()

    const filechangeHandler = (event) => {
        let file = event.target.files[0]
        setSelectedFile(file)
        setIsSelected(true)
        const fileReader = new window.FileReader()
        fileReader.readAsDataURL(file)
//        fileReader.onloadend = () => {
//            setPreviewImage(fileReader.result)
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
                .required('Module number is required')
        }),
        onSubmit: async values => {
            console.log("onSubmit called")

            /* Upload File */
            let uploadedFile = await fileUpload()
            console.log("submit")

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
        refreshModal()
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
        let fileUploaded = await fileUploadData.data
        return fileUploaded
    }

    return (
        <div>
            <form className={classes.root} onSubmit={formik.handleSubmit}>

                <FormControl variant="filled" className={classes.formControl}>
                    <InputLabel id="module-drop-down">Module Number</InputLabel>
                    <Select
                    labelId="moduleNumber-label"
                    label="materialModuleNumber"
                    id="materialModuleNumber"
                    name = "materialModuleNumber"
                    variant = "filled"
                    onChange={formik.handleChange}
                    error={formik.touched.materialModuleNumber && Boolean(formik.errors.materialModuleNumber)}
                    helperText={formik.touched.materialModuleNumber && formik.errors.materialModuleNumber}
                    >

                    {modules.map((module) => { return <MenuItem value={module.moduleNumber}>{module.moduleNumber}</MenuItem>})}

                   </Select>
                </FormControl>

                <TextField
                    id="materialDescription"
                    name="materialDescription"
                    label="Material description"
                    variant="filled"
                    style={{ margin: "0px 16px 16px", width:"70%" }}
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
        margin: theme.spacing(0),
    },
    formControl: {
        //margin: theme.spacing(1),
        minWidth: 180,
      },
      selectEmpty: {
        //marginTop: theme.spacing(2),
      },
}));




export default UploadModuleMaterial

