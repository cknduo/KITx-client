import React, { useEffect, useState } from 'react'

import ModalUpdateCourse from './Modal-UpdateCourse'
import ImageCourseMaterial from './Image-CourseMaterial'
import Modal from 'react-modal'
import Button from '@material-ui/core/Button';
import Edit from '@material-ui/icons/Edit';
import { Paper, Table, TableBody, TableCell, TableContainer, TableRow} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom'

const TableTeacherCourses = ({teacherID, courseAddedToggle, courseStatus}) => {
  
  const [updateCourseModalIsOpen, setUpdateCourseModalIsOpen] = useState()
  const [courseIDtoUpdate, setCourseIDtoUpdate] = useState()
  const [rows, setRows] = useState([]);  // each row is a course object

  const toggleUpdateCourseModal = () => {
    setUpdateCourseModalIsOpen(!updateCourseModalIsOpen)
  }    
  
  const classes = useStyles();
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
    <div>
    <TableContainer component={Paper}>
      <Table aria-label='simple table'>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row._id}>
              <TableCell component='th' scope='row'>
                 <TableCell><ImageCourseMaterial imageFileID={row.courseImage.fileID}/></TableCell>
              </TableCell>
              <TableCell>{row.courseName}</TableCell>
              <TableCell>Total Enrollment: {row.studentIDs.length}</TableCell>
              <TableCell>
                  <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      startIcon={<Edit/>}
                      style={{ marginLeft: 16 }}
                      onClick={()=>{setCourseIDtoUpdate(row._id); toggleUpdateCourseModal()}}>
                      UPDATE
                  </Button>
              </TableCell>
              <TableCell>
              <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      style={{ marginLeft: 16 }}
                      onClick={()=>{history.push(`/course/${row._id}`)}}>
                      VIEW COURSE PAGE
              </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    <Modal 
      isOpen={updateCourseModalIsOpen}
      style={{
        overlay: {
          backgroundColor: 'rgba(31, 40, 47, 0.5)'
        },
        content: {
          top: '5rem',
          left: '2rem',
          right: '2rem',
          bottom: '2rem',
          borderRadius: '8px',
        }
      }}
    >
        {courseIDtoUpdate && < ModalUpdateCourse courseID={courseIDtoUpdate} teacher={teacherID}/>}
        <Button color="primary" variant="contained" onClick={toggleUpdateCourseModal}> Close </Button>
    </Modal>
  </div>
  );
};

const useStyles = makeStyles({
  headerCell: {
    color: 'blue',
    fontWeight: 'bold',
  },
});


export default TableTeacherCourses