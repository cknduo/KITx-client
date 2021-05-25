import React, { useEffect, useState } from 'react';
import ModalUpdateCourse from './Modal-UpdateCourse'
import ImageCourseMaterial from './Image-CourseMaterial'
import Modal from 'react-modal'
import Button from '@material-ui/core/Button';
import Edit from '@material-ui/icons/Edit';
import { 
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const TableTeacherCourses = ({teacherID, /*courseAdded,*/ courseStatus}) => {
  
  const [UpdateCourseModalIsOpen, setUpdateCourseModalIsOpen] = useState()
  const [courseIDtoUpdate, setCourseIDtoUpdate] = useState()
  const [rows, setRows] = useState([]);

  const toggleUpdateCourseModal = () => {
    setUpdateCourseModalIsOpen(!UpdateCourseModalIsOpen)
  }    
  
  const classes = useStyles();

  useEffect(() => {
    const getCourses= async () => {
      console.log(courseStatus)
      // fetch uses the "proxy" value set in client/package.json
      let response = await fetch(`/courses/findByTeacher/${teacherID}?courseStatus=${courseStatus}`);
      let data = await response.json();
      setRows(data);
    };
    getCourses();
  }, [/*courseAdded*/]);

  return (
    <div>
    <TableContainer component={Paper}>
      <Table aria-label='simple table'>
        {/* <TableHead>
          <TableRow>
            <TableCell className={classes.headerCell}></TableCell>
            <TableCell className={classes.headerCell}>Course Name</TableCell>
           <TableCell className={classes.headerCell}></TableCell>
           <TableCell className={classes.headerCell}>Enrollment Details</TableCell>         
            <TableCell className={classes.headerCell}></TableCell> 
          </TableRow>
        </TableHead>*/}
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
              >
                VIEW COURSE PAGE
              </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

  <Modal isOpen={UpdateCourseModalIsOpen}>
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