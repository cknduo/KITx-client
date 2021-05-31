import React, { useState, useEffect } from "react"
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormLabel from '@material-ui/core/FormLabel'
import RadioGroup from '@material-ui/core/RadioGroup'
import Radio from '@material-ui/core/Radio'


import './Modal-UpdateCourse.css'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing(5),
    },

}));

const FormCourseData = ({ course, teacherID }) => {

    const classes = useStyles()

    //const [courseStatus, setCourseStatus] = useState("draft") // Default selection is Student

    const validationSchema = yup.object({
        courseName: yup
            .string('Enter course name'),
            //.required('Course name is required'),
        description: yup
            .string('Enter course description'),
        //           .required('Course description is required'),
        preRequisites: yup
            .string('Enter the preRequisites for your course'),
        /*keywords: yup
            .string('Enter some keywords for your course'),*/
        coursePrice: yup
            .number('Enter the price for the course'),
        //            .required('Course price is required')
        courseStatus: yup
            .string('Enter course status'),
        /*  NEED TO ADD COURSE STATUS AS A DROPDOWN*/

    })

    const initialValues = {
        courseName: course.courseName,
        description: course.description,
        //preRequisites: course.preRequisites,
        /*keywords: course.keywords,*/
        coursePrice: course.coursePrice,
        courseStatus: course.courseStatus
    }
    //}   

    /* formik object to define intial values.  If the values do not match the validation Schema, form items will not be submitted */
    let formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit(values) {
            console.log("submit")
            let courseToAdd = {
                courseName: values.courseName,
                description: values.description,
                //preRequisites: values.preRequisites,
                /*keywords: values.keywords,*/  // work on parsing into array
                teacher: teacherID, // pass in instructor name
                rating: null, // placeholder to future rating given by student to course
                coursePrice: values.coursePrice,
                courseStatus: values.courseStatus
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
        />

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
            />*/}

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

            <h3>Course Status:</h3>

                <RadioGroup defaultValue={course.courseStatus} name="courseStatus" onChange={formik.handleChange}>
                         <FormControlLabel value="Current" control={<Radio color="primary" />} label="Current" />
                    <FormControlLabel value='Draft' control={<Radio color="primary" />} label="In Progress" />
                    <FormControlLabel value='Archived' control={<Radio color="primary" />} label="Archived" />
                </RadioGroup>

            <Button color="primary" variant="contained" type="submit">
                Submit
            </Button>

        </form>
    )
}

export default FormCourseData