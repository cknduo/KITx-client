import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import TableTeacherCourses from '../components/Table-TeacherCourses'
import FunctionAddCourse from '../components/Function-AddCourse'
import Button from '@material-ui/core/Button';

import ViewTeacherCurrent from '../components/View-TeacherCurrent'
import ViewTeacherArchived from '../components/View-TeacherArchived'
import ViewTeacherInProgress from '../components/View-TeacherInProgress'

import './teacher-dashboard.css'

const TeacherDash = () => {   
    
    const { id } = useParams()
    const teacherID = id

    const [viewMode, setViewMode] = useState('Current')

    const [user, setUser] = useState(null)
    //const [updateCourseID, setUpdateCourseID] = useState(null)
    //const [addCourseModalIsOpen, setAddCourseModalIsOpen] = useState(false)
    const [courseUpdated, setCourseUpdated] = useState()
    
     useEffect(() => {
        const getUser = async () => {
            let response = await fetch(`/teachers/${teacherID}`)
            let data = await response.json()
            setUser(data)
        }
        getUser()
    }, [])

     const toggleCourseUpdated = () => {
        setCourseUpdated(!courseUpdated)
    }    
    

   
     
        return (
            <div className='signin-signup'>
                <div className='tab-container'>
                <strong>Welcome back {user && user.firstName} {user && user.lastName} </strong><br/>
            User id: {user && user._id}
    
            <div className='tab-options'>
                        <button 
                            className={`${viewMode === 'Current' ? 'active-view' : ''} signin-signup-button`}
                            onClick={() => setViewMode('Current')}
                        >
                            Current
                        </button>
                        <button 
                            className={`${viewMode === 'InProgress' ? 'active-view' : ''} signin-signup-button`}
                            onClick={() => setViewMode('InProgress')}
                        >
                            In Progress
                        </button>
                        <button 
                            className={`${viewMode === 'Archvied' ? 'active-view' : ''} signin-signup-button`}
                            onClick={() => setViewMode('Archived')}
                        >
                            Archived
                        </button>

                    </div>
                    <div className='tab-content'>
                        {viewMode === 'Current' && <ViewTeacherCurrent teacherID={teacherID}/>}
                        {viewMode === 'InProgress' && <ViewTeacherInProgress teacherID={teacherID} courseUpdated={toggleCourseUpdated} />}    
                        {viewMode === 'Archived' && <ViewTeacherArchived teacherID={teacherID}/>}    

                    </div>
                </div>
            </div>
        )
    }
    
   
// async function FunctionAddCourse (teacherID) {
//     // Function adds a new course entry to course database and course material database
//     // Intialized to empty strings, except for course name, called New Course
//     // New course can be referenced by courseID

//     // intialize values for databases
//     const initialValuesCourseDB = {
//         courseName: "NEW COURSE",
//         description: "",
//         preRequisites: "",
//         teacherID: teacherID,
//         keywords: "",
//         requiredKits: { kitName: "", kitDescription: "" },
//         coursePrice: "",
//         courseStatus: "Draft"
//     }

//     console.log("teacherID",teacherID)
//     let newCourseID

//     // create new entry in course DB
//     async function createNewCourseDBEntry() {
//         try {
//             let response = await fetch("/courses/addCourse",
//                 {
//                     method: 'POST',
//                     headers: { 'Content-Type': 'application/json' },
//                     body: JSON.stringify(initialValuesCourseDB, null, 2)
//                 })
//             let dataCourseDB = await response.json()
//             newCourseID = dataCourseDB._id
//             console.log("courseDB initialized")
//             console.log("courseID",newCourseID)
//         } catch (err) {
//             console.log(`Problem with posting data`, err)
//         }
//     }

//     async function createNewCourseMaterialDBEntry() {
//         try {
//             let response = await fetch("/courseMaterialRecords/addCourse",
//                 {
//                     method: 'POST',
//                     headers: { 'Content-Type': 'application/json' },
//                     body: JSON.stringify(initialValuesCourseMaterialDB, null,2)
//                 })
//             let dataCourseMaterialDB = await response.json()
//             //setNewCourseID(data._id)
//             console.log("courseMaterialDBinitialized")
//             //console.log("courseID",newCourseID)
//         } catch (err) {
//             console.log(`Problem with posting data`)
//         }

//     }
    
//         await createNewCourseDBEntry()

//     const initialValuesCourseMaterialDB = {
//         courseID: newCourseID
//     }

//     createNewCourseMaterialDBEntry()

//     console.log("new course added")
// }
















export default TeacherDash