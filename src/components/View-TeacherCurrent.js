import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import TableTeacherCourses from '../components/Table-TeacherCourses'
import FunctionAddNewCourse from '../components/Function-AddCourse'
import Button from '@material-ui/core/Button';

const ViewTeacherCurrent = ({teacherID}) => {   
    
    return <TableTeacherCourses teacherID={teacherID} courseStatus={"Current"}  /*courseAdded={courseAdded}*//>

}    

export default ViewTeacherCurrent