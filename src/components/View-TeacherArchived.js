import React from 'react'
import TableTeacherCourses from '../components/Table-TeacherCourses'

const ViewTeacherArchived = ({teacherID}) => {   

    return <TableTeacherCourses teacherID={teacherID} courseStatus={"Archived"}  /*courseAdded={courseAdded}*//>

}    

export default ViewTeacherArchived