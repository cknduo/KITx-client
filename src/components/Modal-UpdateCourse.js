import React, { useState, useEffect } from "react"
import './Modal-UpdateCourse.css'

import UploadCourseMaterial from './Upload-CourseMaterial'
import UploadModuleMaterial from './Upload-ModuleMaterial'
import FormCourseData from './Form-CourseData'
import FormKitInfo from './Form-KitInfo'
import ImageCourseMaterial from './Image-CourseMaterial'
import TableCourseMaterial from './Table-CourseMaterial'

const ModalUpdateCourse = ({ courseID, teacherID }) => {

    const [course, setCourse] = useState(null)

    useEffect(() => {
        const getCourse = async () => {
            let response = await fetch(`/courses/${courseID}`)
            let data = await response.json()
            setCourse(data)
        }
        getCourse()
    }, [])

    if (!course) {
        console.log("Not course!")
        return null
    }
    
    let modules = course.modules

    return (
        <div className="modal-update-course-container">

            <div className="modal-course-image">
                <h3> Course Image</h3>
                <ImageCourseMaterial imageFileID={course.courseImage.fileID} />
                <UploadCourseMaterial currentFileID={course.courseImage.fileID} courseID={courseID} fileUse={"courseImage"} description={"Course Image"}/>
                
            </div>

            <div className="modal-certificate">
                <h3> Course Certificate</h3>
                <UploadCourseMaterial currentFileID={course.certificate.fileID} courseID={courseID} fileUse={"certificate"} description={"Course Certificate"}/>
            </div> 

            <div className="modal-kit-info">
                <h3> Kit Information</h3>
                <ImageCourseMaterial imageFileID={course.kitImage.fileID} />
                <UploadCourseMaterial currentFileID={course.kitImage.fileID} courseID={courseID} fileUse={"kitImage"} description={"Kit Image"}/>
                <FormKitInfo courseID={courseID} course={course}/>
            </div> 

            <div className="modal-course-material">
                <h3> Course Materials </h3>
                <TableCourseMaterial courseID={courseID} course={course} module={modules} />
                <UploadModuleMaterial courseID={courseID} fileUse={"module"} course={course} />
            </div>

            <div className="modal-form-grid">
                <h3> Course Details</h3>
                <h4> Course ID#: {courseID}</h4>
                <FormCourseData course={course} teacher={teacherID} />
            </div>



        </div>
    )
}

export default ModalUpdateCourse