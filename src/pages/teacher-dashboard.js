import React, { useState, useEffect } from 'react'
import UpdateCourse from '../components/UpdateCourse'
import InstructorCourseTable from '../components/InstructorCourseTable'
import Modal from 'react-modal'
import Button from '@material-ui/core/Button';

const TeacherDash = () => {   const [user, setUser] = useState(null)
    const [updateCourseID, setUpdateCourseID] = useState(null)
    const [addCourseModalIsOpen, setAddCourseModalIsOpen] = useState(false)
    const [courseAdded, setCourseAdded] = useState()
    //const [newCourseID, setNewCourseID] = useState(null)
    
    let instructorID = "60a2ece8201b091de34f1902"

    /* TEMP -  for TESTING ONLY.  Hardcode instructor */
    useEffect(() => {
        const getUser = async () => {
            let response = await fetch(`/teachers/${instructorID}`)
            let data = await response.json()
            setUser(data)
        }
        getUser()
    }, [])

     const toggleAddCourseModal = () => {
        setAddCourseModalIsOpen(!addCourseModalIsOpen)
    }    
    
    const setCourseToUpdate = (courseID) => {
        setUpdateCourseID(courseID)
        console.log("UpdateCourse ID is",courseID)
    } 

    return (
            <div className='instructor-dash'>
                <strong>Welcome back {user && user.firstName} {user && user.lastName} </strong><br/>
                User id: {user && user._id}
            <br/> <br/>
            <strong>Assigned Courses:</strong>
            <br></br>
            Click on course to update information
            <InstructorCourseTable instructorID={instructorID} courseAdded={courseAdded}/>
            <Button color="primary" variant="contained" onClick={()=> {addNewCourse(instructorID); setCourseAdded(!courseAdded); console.log(courseAdded)}}> Add Course </Button>

            {/*<Modal isOpen={addCourseModalIsOpen}>
                <UpdateCourse courseID={updateCourseID} instructor={instructorID}/>
    </Modal>*/}
        
        </div>
    
    )



}

async function addNewCourse (instructorID) {
// Function adds a new course entry to course database and course material database
// Intialized to empty strings, except for course name, called New Course
// New course can be referenced by courseID

let newinstructorID = instructorID
console.log(newinstructorID)

// intialize values for databases
    const initialValuesCourseDB = {
        courseName: "NEW COURSE",
        description: "",
        preRequisites: "",
        instructorID: newinstructorID,
        keywords: "",
        requiredKits: {kitName: "", kitDescription:""},
        coursePrice: "",
        courseStatus:"Draft"
    }    

// create new entry in course DB
    try {
            let response = await fetch("/courses/addCourse", 
            {                
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(initialValuesCourseDB, null, 2)
            })
            //let dataCourseDB = await response.json()
            //newCourseID = dataCourseDB._id
            //console.log("courseDB initialized")
            //console.log("courseID",newCourseID)
    } catch (err) {
        console.log (`Problem with posting data`, err)
    }
/*

// intialize values for course material database
const initialValuesCourseMaterialDB = {
    courseID: newCourseID
}   


// create new entry in course Materials DB    
    try {
        let response = await fetch("/courseMaterialRecords/addCourse", 
        {                
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: initialValuesCourseMaterialDB
        })
        let dataCourseMaterialDB = await response.json()
        //setNewCourseID(data._id)
        console.log("courseMaterialDBinitialized")
        //console.log("courseID",newCourseID)
    } catch (err) {
    console.log (`Problem with posting data`)
}
*/
 console.log("new course added")
}

export default TeacherDash