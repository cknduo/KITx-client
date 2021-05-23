import React, { useState, useEffect } from "react"

import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Axios from "axios"

import './UpdateCourse.css'
import placeholder from '../assets/whale.svg'
import CourseMaterialTable from './CourseMaterialTable'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing(5),
    },

}));

/* Input validation using YUP */
const UpdateCourse = ({ courseID, instructorID }) => {

    const [course, setCourse] = useState(null)
    //    const classes = useStyles()

    useEffect(() => {
        const getCourse = async () => {
            let response = await fetch(`/courses/${courseID}`)
            let data = await response.json()
            setCourse(data)
        }
        getCourse()
    }, [])

    if (!course) {
        return null
    }

    return (
        <div className="container">

            <div className="course-image">
                <h2> Course Image</h2>
                <CourseMaterialUpload courseID={courseID} fileUse={"courseImage"} ModuleNumber={"0"} />
            </div>

            <div className="certificate">
                <h2> Course Certificate</h2>
                <CourseMaterialUpload courseID={courseID} fileUse={"certificate"} ModuleNumber={"0"} />
            </div>

            <div className="course-material">
                <h2> Course Materials </h2>
                <ModuleMaterialUpload courseID={courseID} fileUse={"module"} ModuleNumber={"0"} />
            </div>

            <div className="formgrid">
                <h2> Course Details</h2>

                <h3> Course ID#: {courseID}</h3>
                <CourseDataForm course={course} instructor={instructorID} />

            </div>
        </div>
    )
}

const CourseDataForm = ({ course, instructorID }) => {

    const classes = useStyles()

    const validationSchema = yup.object({
        courseName: yup
            .string('Enter course name'),
        //            .required('Course name is required'),
        description: yup
            .string('Enter course description'),
        //           .required('Course description is required'),
        preRequisites: yup
            .string('Enter the preRequisites for your course'),
        keywords: yup
            .string('Enter some keywords for your course'),
        kitName: yup
            .string('Enter kit name'),
        //            .required('Kit name is required'),
        kitDescription: yup
            .string('Enter kit description'),
        //            .required('Kit description is required'),
        coursePrice: yup
            .string('Enter course price'),
        //            .required('Course price is required')

        /*  NEED TO ADD COURSE STATUS AS A DROPDOWN*/

    })

    const initialValues = {
        courseName: course.courseName,
        description: course.description,
        //preRequisites: course.preRequisites,
        keywords: course.keywords,
        kitName: course.requiredKits.kitName,
        kitDescription: course.requiredKits.kitDescription,
        coursePrice: course.coursePrice
    }
    //}   

    /* formik object to define intial values.  If the values do not match the validation Schema, form items will not be submitted */
    let formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit(values) {
            console.log("submit")
            alert(JSON.stringify(values, null, 2))
            let courseToAdd = {
                courseName: values.courseName,
                description: values.description,
                //preRequisites: values.preRequisites,
                keywords: values.keywords,  // work on parsing into array
                instructor: instructorID, // pass in instructor name
                rating: null, // placeholder to future rating given by student to course
                requiredKits: { kitName: values.kitName, kitDescription: values.kitDescription },
                coursePrice: values.coursePrice,
            }
            const addCourseOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(courseToAdd, null, 2)
            };
            fetch(`/courses/${course._id}`, addCourseOptions)
                .then(response => response.json())
            //    .then(data => setPostId(data.id));
            //resetForm({})
        }
    });

    return (

        <form className={classes.root} onSubmit={formik.handleSubmit}>

            <TextField
                fullWidth
                id="courseName"
                name="courseName"
                label="Course Name"
                defaultValue={course.courseName}
                variant="filled"
                style={{ margin: "16px 0px" }}
                //value={course.courseName}
                onChange={formik.handleChange}
                error={formik.touched.courseName && Boolean(formik.errors.courseName)}
                helperText={formik.touched.courseName && formik.errors.courseName}
            />

            <TextField
                fullWidth
                id="description"
                name="description"
                label="Course Description"
                variant="filled"
                defaultValue={course.description}
                multiline
                rows={4}
                style={{ margin: "16px 0px" }}
                //value={formik.values.description}
                onChange={formik.handleChange}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
            />

            {/*<TextField
            fullWidth
            id="preRequisites"
            name="preRequisites"
            label="Pre-Requisites for course"
            variant="filled"
            defaultValue={course.preRequisites}
            style={{ margin: "16px 0px" }}
            //value={formik.values.preRequisites}
            onChange={formik.handleChange}
            error={formik.touched.preRequisites && Boolean(formik.errors.preRequisites)}
            helperText={formik.touched.preRequisites && formik.errors.preRequisites}
        />*/}

            <TextField
                fullWidth
                id="keywords"
                name="keywords"
                label="Key words for course"
                variant="filled"
                style={{ margin: "16px 0px" }}
                defaultValue={course.keywords}
                //value={formik.values.keywords}
                onChange={formik.handleChange}
                error={formik.touched.keywords && Boolean(formik.errors.keywords)}
                helperText={formik.touched.keywords && formik.errors.keywords}
            />

            <TextField
                fullWidth
                id="kitName"
                name="kitName"
                label="Kit Name"
                variant="filled"
                style={{ margin: "16px 0px" }}
                defaultValue={course.requiredKits.kitName}
                //value={formik.values.kitName}
                onChange={formik.handleChange}
                error={formik.touched.kitName && Boolean(formik.errors.kitName)}
                helperText={formik.touched.kitName && formik.errors.kitName}
            />

            <TextField
                fullWidth
                multiline
                rows={4}
                id="kitDescription"
                name="kitDescription"
                label="Kit Description"
                variant="filled"
                style={{ margin: "16px 0px" }}
                defaultValue={course.requiredKits.kitDescription}
                //value={formik.values.kitDescription}
                onChange={formik.handleChange}
                error={formik.touched.kitDescription && Boolean(formik.errors.kitDescription)}
                helperText={formik.touched.kitDescription && formik.errors.kitDescription}
            />

            <TextField
                fullWidth
                id="coursePrice"
                name="coursePrice"
                label="Course Price (in $CAD)"
                variant="filled"
                style={{ margin: "16px 0px" }}
                defaultValue={course.coursePrice}
                // value={formik.values.coursePrice}
                onChange={formik.handleChange}
                error={formik.touched.coursePrice && Boolean(formik.errors.coursePrice)}
                helperText={formik.touched.coursePrice && formik.errors.coursePrice}
            />
            <Button color="primary" variant="contained" type="submit">
                Submit
        </Button>
        </form>
    )
}


const CourseMaterialUpload = ({ courseID, fileUse, moduleNumber }) => {
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
        console.log("File Info sent to server is", fileInfo)
        let data = new FormData()
        data.append('file', fileInfo)

        const fileUploadData = await Axios.post(`/courseMaterial/upload/${courseID}/${fileUse}/${moduleNumber}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        let fileID = fileUploadData.data
        setIsSuccessful(true)
        console.log('fileUpload from server', fileID)
    }

    return (
        <div>
            <img className="preview-image" src={previewImage} alt="No Preview Available" height="100px" width="100px" margin="20px" border="2px" />
            <input type="file" name="file" id="file" onChange={filechangeHandler} />
            <Button color="primary" variant="contained" type="submit" disabled={!isSelected} onClick={fileUpload}>
                Upload
            </Button>
            {isSuccessful && <> File upload complete </>}
        </div>

    )



}

const ModuleMaterialUpload = ({ courseID, fileUse, ModuleNumber }) => {
    const [selectedFile, setSelectedFile] = useState()
    const [isSelected, setIsSelected] = useState(false)
    const [isSuccessful, setIsSuccessful] = useState(false)
    const [fileID, setfileID] = useState()
    const [materialAdded, setMaterialAdded] = useState()

    const classes = useStyles()

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
            await fileUpload()
            console.log("submit")
            alert(JSON.stringify(values, null, 2))
            let detailsToAdd = {
                description: values.materialDescription,
                moduleNumber: values.materialModuleNumber
            }
            const addDetailsOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(detailsToAdd, null, 2)
            };
            fetch(`/courseMaterialRecords/${fileID}`, addDetailsOptions)
                .then(response => response.json())
        },
    });

    //for sending the file to the server    
    const fileUpload = async () => {
        const fileInfo = selectedFile
        console.log("File Info sent to server is", fileInfo)
        let data = new FormData()
        data.append('file', fileInfo)

        const fileUploadData = await Axios.post(`courseMaterial/upload/${courseID}/${fileUse}/${ModuleNumber}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        let fileID = fileUploadData.data
        setIsSuccessful(true)
        setfileID(fileID)
        setMaterialAdded(!materialAdded)
        console.log('fileUpload from server', fileID)

    }

    const filechangeHandler = (event) => {
        let file = event.target.files[0]
        setSelectedFile(file)
        setIsSelected(true)
        //const fileReader = new window.FileReader()
        //fileReader.readAsDataURL(file)
        //fileReader.onloadend = () => {
        //    setPreviewImage(fileReader.result)
        //}

    }

    return (
        <div>
            <form className={classes.root} onSubmit={formik.handleSubmit}>

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

                <input type="file" name="file" id="file" onChange={filechangeHandler} />

                <Button color="primary" variant="contained" type="Submit" disabled={!isSelected}>
                    Upload
            </Button>

            </form>
            <CourseMaterialTable courseID={courseID} materialAdded={materialAdded} />

        </div>

    )



}



export default UpdateCourse