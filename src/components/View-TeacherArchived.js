import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import TableTeacherCourses from '../components/Table-TeacherCourses'
import FunctionAddNewCourse from '../components/Function-AddCourse'
import Button from '@material-ui/core/Button';

const ViewTeacherArchived = ({teacherID}) => {   

    return <TableTeacherCourses teacherID={teacherID} courseStatus={"Archived"}  /*courseAdded={courseAdded}*//>


}    


/*
const { id } = useParams()
    const teacherID = id

    const [user, setUser] = useState(null)
    const [updateCourseID, setUpdateCourseID] = useState(null)
    const [addCourseModalIsOpen, setAddCourseModalIsOpen] = useState(false)
    const [courseAdded, setCourseAdded] = useState()
    
     useEffect(() => {
        const getUser = async () => {
            let response = await fetch(`/teachers/${teacherID}`)
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
            <div className='teacher-dash'>
                <strong>Welcome back {user && user.firstName} {user && user.lastName} </strong><br/>
                User id: {user && user._id}
            <br/> <br/>
            <strong>Assigned Courses:</strong>
            <br></br>
            Click on course to update information
            <TableTeacherCourses teacherID={teacherID} courseAdded={courseAdded}/>
            <Button color="primary" variant="contained" onClick={()=> {FunctionAddNewCourse(teacherID); setCourseAdded(!courseAdded); console.log(courseAdded)}}> Add Course </Button>

        </div>
    
    )



}*/

export default ViewTeacherArchived