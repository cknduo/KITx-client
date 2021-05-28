import React, { useEffect, useState } from 'react';
import ImageCourseMaterial from './Image-CourseMaterial'
import Button from '@material-ui/core/Button';
import { 
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom'

const TableStudentCourses = ({studentID, /*courseAdded,*/ courseStatus, student}) => {
  
  const [courseIDtoUpdate, setCourseIDtoUpdate] = useState()
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
                      style={{ marginLeft: 16 }}
                      onClick={()=>{history.push(`/student/${studentID}/course/${row._id}/learn`)}}>
                  LEARNING PAGE
              </Button>
              </TableCell>
            </TableRow>
          ))} 
        </TableBody>
      </Table>
    </TableContainer>


   </div>
   )
}


export default TableStudentCourses