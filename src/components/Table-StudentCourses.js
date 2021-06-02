import React, { useEffect, useState } from 'react';
import ImageCourseMaterial from './Image-CourseMaterial'
import { useHistory } from 'react-router-dom'

import './Table-StudentCourses.css'

const TableStudentCourses = ({studentID, /*courseAdded,*/ courseStatus, student}) => {
  
  const [rows, setRows] = useState([]);

  //const classes = useStyles();
  const history = useHistory()

  /* The enrolled courses are listed in student profile, under courseLearning object*/
  /* For each enrolled course, need to get the info for it from course database */

  /* get by multiple course IDs */
  
useEffect(() => {
    const getCourse = async () => {
     let response = await fetch(`/courses/findMultiple?multipleIDs=${student.coursesLearning.enrolled}`)
     let data = await response.json()
     setRows(data)
   }
   getCourse()
  }, []);
  
  return (
    <div className='table-student-courses'>
      {rows.map(row => (
        <div key={row._id}>
          <div className='table-student-courses-item'>
            <div className='student-courses-item-img-container'>
              <ImageCourseMaterial className='student-courses-item-img' imageFileID={row.courseImage.fileID}/>
            </div>
            <div className='student-courses-item-course-name-container'>
              <h4 className='student-courses-item-course-name'>{row.courseName}</h4>
              <h5 className='student-courses-item-kit-name'>Kit: {row.requiredKits.kitName}</h5>
            </div>
            <div className='student-courses-item-btn-container'>
              <button 
                className='student-courses-item-resume-btn' 
                onClick={()=>{history.push(`/student/${studentID}/course/${row._id}/learn`)}}
              >
                RESUME LEARNING
              </button>                 
            </div>
            
          </div>

        </div>   
      ))}
    </div>
  )
}

export default TableStudentCourses