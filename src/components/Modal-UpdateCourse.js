import React, { useState, useEffect } from "react"
import './Modal-UpdateCourse.css'

import UploadCourseMaterial from './Upload-CourseMaterial'
import UploadModuleMaterial from './Upload-ModuleMaterial'
import FormCourseData from './Form-CourseData'
import FormKitInfo from './Form-KitInfo'
import TableCourseMaterial from './Table-CourseMaterial'
import FormUpdateModule from './Form-UpdateModule'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Button from '@material-ui/core/Button';


const ModalUpdateCourse = ({ courseID, teacherID }) => {
/* This function is called from the TableTeacherCourses component.  The button to close this modal is in the parent component */

    const [course, setCourse] = useState(null)
    const [courseUpdated, setCourseUpdated] = useState(false)
    const [open, setOpen] = useState(false);  // for triggering expanded view of 'update modules & upload module files'


    // function is triggered by child components if course update is performed within.  This allows the update modal to be refreshed upon change
    function refreshModal () {
        setCourseUpdated (!courseUpdated)
     }

    useEffect(() => {
        const getCourse = async () => {
            let response = await fetch(`/courses/${courseID}`)
            let data = await response.json()
            setCourse(data)
            console.log("useEffect called")
        }
        getCourse()
    }, [courseUpdated])  // course data will be refreshed if parts of the Update Modal are changed

    if (!course) return null // ensures the nested array in course is fetched completely before proceeding with rendering
 
    let modules = course.modules

    return (
        <div className="modal-update-course-container">

            <div className="modal-course-image">
                <h3> Course Image</h3>
                <UploadCourseMaterial currentFileID={course.courseImage.fileID} courseID={courseID} fileUse={"courseImage"} description={"Course Image"} refreshModal={refreshModal}/>
            </div>

            <div className="modal-certificate">
                <h3> Course Certificate</h3>
                <UploadCourseMaterial currentFileID={course.certificate.fileID} courseID={courseID} fileUse={"certificate"} description={"Course Certificate"} refreshModal={refreshModal}/>
            </div> 

            <div className="modal-kit-info">
                <h3> Kit Information</h3>
                <UploadCourseMaterial currentFileID={course.kitImage.fileID} courseID={courseID} fileUse={"kitImage"} description={"Kit Image"} refreshModal={refreshModal}/>
                <FormKitInfo courseID={courseID} course={course}/>
            </div> 

            <div className="modal-course-material">
                <h3> Course Materials </h3>
                <TableCourseMaterial courseID={courseID} course={course} module={modules} refreshModal={refreshModal} />
                <br></br>
                <Button color="primary" variant="contained" onClick={() => setOpen(!open)}> {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />} UPDATE MODULE </Button>
 
                {open && <div className = "update-module">
                    <h4> Update module description </h4>
                    <FormUpdateModule courseID={courseID} modules={modules} refreshModal = {refreshModal} />
                    <h4> Load course material </h4>
                    <UploadModuleMaterial courseID={courseID} fileUse={"module"} course={course} modules={modules} refreshModal={refreshModal} />
                </div>}
            
            </div>

            <div className="course-info">
                <h3> Course Details</h3>
                <h4> Course ID#: {courseID}</h4>
                <FormCourseData course={course} teacher={teacherID} />
            </div>

        </div>
    )
}

export default ModalUpdateCourse