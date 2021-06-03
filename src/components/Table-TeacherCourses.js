import React, { useEffect, useState } from 'react'

import ModalUpdateCourse from './Modal-UpdateCourse'
import ImageCourseMaterial from './Image-CourseMaterial'
import Modal from 'react-modal'
import { ReactComponent as Pen } from '../assets/pen.svg'
import { useHistory } from 'react-router-dom'

import './Table-TeacherCourses.css'

const TableTeacherCourses = ({teacherID, courseAddedToggle, courseStatus}) => {
  
  const [updateCourseModalIsOpen, setUpdateCourseModalIsOpen] = useState()
  const [courseIDtoUpdate, setCourseIDtoUpdate] = useState()
  const [rows, setRows] = useState([]);  // each row is a course object

  const toggleUpdateCourseModal = () => {
    setUpdateCourseModalIsOpen(!updateCourseModalIsOpen)
  }    
  
  const history = useHistory()

  useEffect(() => {
    const getCourses= async () => {
      console.log(courseStatus)
      let response = await fetch(`/courses/findByTeacher/${teacherID}?courseStatus=${courseStatus}`);
      let data = await response.json();
      setRows(data);
    };
    getCourses();
  }, [courseAddedToggle, updateCourseModalIsOpen]);

  return (
    <div className='table-teacher-courses'>
        {rows.map(row => (
          <div key={row._id}>
            <div className='table-teacher-courses-item'>
              <div className='teacher-courses-item-img-container'>
                <ImageCourseMaterial className='teacher-courses-item-img' imageFileID={row.courseImage.fileID}/>
              </div>
              <div className='student-courses-item-course-name-container'>
                <h4 className='teacher-courses-item-course-name'>{row.courseName}</h4>
                <h5 className='teacher-courses-item-kit-name'>{row.requiredKits.kitName}</h5>
                <p className='teacher-courses-item-enrollment'>Total Enrollment: {row.studentIDs.length}</p>                
              </div>
              <div className='teacher-courses-item-edit-btn-container'>
                <button className='teacher-courses-item-btn' onClick={()=>{setCourseIDtoUpdate(row._id); toggleUpdateCourseModal()}}><Pen className='pen-icon'/> EDIT </button>
                <button className='teacher-courses-item-btn' onClick={()=>{history.push(`/course/${row._id}`)}}>GO TO COURSE PAGE</button>                  
              </div>
            </div>
          </div>   
        ))}

      <Modal 
        isOpen={updateCourseModalIsOpen}
        style={{
          overlay: {
            backgroundColor: 'rgba(31, 40, 47, 0.9)'
          },
          content: {
            top: '5rem',
            left: '2rem',
            right: '2rem',
            bottom: '2rem',
            backgroundColor: '#0e171d',
          }
        }}
      >
        <div className='inside-modal'>
          {courseIDtoUpdate && < ModalUpdateCourse courseID={courseIDtoUpdate} teacher={teacherID}/>}
          <div>
            <button className='modal-close-btn' onClick={toggleUpdateCourseModal}>GO BACK TO DASHBOARD</button>               
          </div>
        </div>

      </Modal>
    </div>
  )
}

export default TableTeacherCourses