import React, { useState } from 'react'
import TableTeacherCourses from '../components/Table-TeacherCourses'

import './View-TeacherInProgress.css'

const ViewTeacherInProgress = ({teacherID, courseUpdated}) => {   

    const [courseAddedToggle, setCourseAddedToggle] = useState(false) 


    async function addCourse () {
        // Function adds a new course entry to course database and course material database
        // Intialized to empty strings, except for course name, called New Course
        // New course can be referenced by courseID
        
        // intialize values for databases
        const initialValuesCourseDB = {
            courseName: "NEW COURSE",
            description: "",
            preRequisites: "",
            teacherID: teacherID,
            keywords: "",
            requiredKits: { kitName: "", kitDescription: "" },
            coursePrice: "",
            courseStatus: "Draft",
            studentIDs:[],
            subject:"",
            courseImage: {
                fileID:"60b70b4ee143353331068b39",
                description:"placeholder"
            },
            certificate: {
                fileID:"60b70b4ee143353331068b39",
                description:"placeholder"
            },
            kitImage: {
                fileID:"60b70b4ee143353331068b39",
                description:"placeholder"
            },
            modulesFiles: [],
            modules: []  
            
        }
         
        // create new entry in course DB
        try {
            
            await fetch("/courses/addCourse",
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(initialValuesCourseDB, null, 2)
            })
            //console.log("courseDB initialized")
            //console.log("courseID",newCourseID)
        }    
        catch (err) {
                console.log(`Problem with posting data`, err)
            }
        
        // changes the state of the course added toggle.  This will be sent to TableTeacherCourses component to indicate that table should be re-rendered
        setCourseAddedToggle(!courseAddedToggle)    
    }

    return (
        <div className='teach-in-progress-container'>
            <div className='add-new-course-btn-container'>
                <button className='add-new-course-btn' onClick={addCourse}>Add A New Course</button>                
            </div>
            <TableTeacherCourses teacherID={teacherID} courseStatus={"Draft"} courseAddedToggle={courseAddedToggle}/>
        </div>
    )
}


export default ViewTeacherInProgress