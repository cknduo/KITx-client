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

    console.log("course",course)
    if (!course) {
        console.log("Not course!")
        return null
    }
    
    console.log("course modules",course.modules)


    let modules = course.modules
    console.log("module in upload form", modules)
    return (
        <div className="container">

            <div className="course-image">
                <h3> Course Image</h3>
                <ImageCourseMaterial imageFileID={course.courseImage.fileID} />
                <UploadCourseMaterial courseID={courseID} fileUse={"courseImage"} description={"Course Image"}/>
                
            </div>

            <div className="certificate">
                <h3> Course Certificate</h3>
                <UploadCourseMaterial courseID={courseID} fileUse={"certificate"} description={"Course Certificate"}/>
            </div> 

            <div className="kit-info">
                <h3> Kit Information</h3>
                <ImageCourseMaterial imageFileID={course.kitImage.fileID} />
                <FormKitInfo courseID={courseID} course={course}/>
            </div> 

            <div className="course-material">
                <h3> Course Materials </h3>
                <UploadModuleMaterial courseID={courseID} fileUse={"module"} course={course} module={modules} />
                <TableCourseMaterial courseID={courseID} course={course} module={modules} />
            </div>

            <div className="formgrid">
                <h3> Course Details</h3>
                <h4> Course ID#: {courseID}</h4>
                <FormCourseData course={course} teacher={teacherID} />
            </div>

        </div>
    )
}

export default ModalUpdateCourse