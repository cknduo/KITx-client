import React, { useEffect, useState } from 'react';
import UpdateCourse from '../components/UpdateCourse'
import Modal from 'react-modal'
import Button from '@material-ui/core/Button';

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

const useStyles = makeStyles({
  headerCell: {
    color: 'blue',
    fontWeight: 'bold',
  },
});

const InstructorCourseTable = ({instructorID, courseAdded}) => {
  
  const [addCourseModalIsOpen, setAddCourseModalIsOpen] = useState(false)
  const [courseIDtoUpdate, setCourseIDToUpdate] = useState()

  const toggleAddCourseModal = () => {
    console.log("courseID for modal", courseIDtoUpdate)
    setAddCourseModalIsOpen(!addCourseModalIsOpen)
  }    
  

  const [rows, setRows] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    const getCourses= async () => {
      // fetch uses the "proxy" value set in client/package.json
      let response = await fetch(`/courses/findByTeacher/${instructorID}`);
      let data = await response.json();
      setRows(data);
      console.log("coursetableload")
    };
    getCourses();
  }, [courseAdded]);

  return (
    <div>
    <TableContainer component={Paper}>
      <Table aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell className={classes.headerCell}>Course ID</TableCell>
            <TableCell className={classes.headerCell}>Course Name</TableCell>
            <TableCell className={classes.headerCell}>Course Description</TableCell>
            <TableCell className={classes.headerCell}>Course Status</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row._id} onClick={()=>{setCourseIDToUpdate(row._id); console.log("courseinfo",courseIDtoUpdate); toggleAddCourseModal()}}>
              <TableCell component='th' scope='row'>
                {row._id}
              </TableCell>
              <TableCell>{row.courseName}</TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell>{row.courseStatus}</TableCell>
         </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

  <Modal isOpen={addCourseModalIsOpen}>
      {courseIDtoUpdate && <UpdateCourse courseID={courseIDtoUpdate} instructor={instructorID}/>}
      <Button color="primary" variant="contained" onClick={toggleAddCourseModal}> Close </Button>
  </Modal>
  </div>
  );
};

export default InstructorCourseTable;
//onClick={toggleAddCourseModal()