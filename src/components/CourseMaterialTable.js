import React, { useEffect, useState } from 'react';

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

const CourseMaterialTable = ({courseID, materialAdded}) => {
  const [rows, setRows] = useState([]);
  const classes = useStyles();
  console.log("course ID", courseID)

  useEffect(() => {
    const getCourseMaterialRecords = async () => {
      // fetch uses the "proxy" value set in client/package.json
      let response = await fetch(`/coursematerialrecords/findByCourseID/${courseID}`);
      let dataCourseDB = await response.json();
      console.log("course Material", dataCourseDB)
      setRows(dataCourseDB);
    };
    getCourseMaterialRecords();
  }, [materialAdded]);



  return (
    <TableContainer component={Paper}>
      <Table aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell className={classes.headerCell}>FileID</TableCell>
            <TableCell className={classes.headerCell}>CourseID</TableCell>
            <TableCell className={classes.headerCell}>File Usage</TableCell>
            <TableCell className={classes.headerCell}>Module Number</TableCell>
            <TableCell className={classes.headerCell}>Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.fileID}>
              <TableCell component='th' scope='row'>
                {row.fileID}
              </TableCell>
              <TableCell>{row.courseID}</TableCell>
              <TableCell>{row.fileUse}</TableCell>
              <TableCell>{row.moduleNumber}</TableCell>
              <TableCell>{row.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CourseMaterialTable;
