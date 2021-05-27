import React, { useEffect, useState } from 'react';

import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
import Edit from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';


const TableCourseMaterial = ({courseID, materialAdded, course}) => {

  const classes = useStyles();

  let rows = course.modules
  let moduleFiles = course.moduleFiles

  /* function for adding modules */  
  const addModule = () => {}


  return (
      <div>
          <TableContainer component={Paper}>
              <Table aria-label='simple table'>
              <TableHead>
                  <TableRow>
                      <TableCell className={classes.headerCell}>
                        Expand
                      </TableCell>
                      <TableCell className={classes.headerCell}>Module Number</TableCell>
                      <TableCell className={classes.headerCell}>Description</TableCell>
                      <TableCell className={classes.headerCell}>             </TableCell>
                  </TableRow>
              </TableHead>
              <TableBody>
                    {rows.map((row) => (<Row key={row.moduleNumber} row={row} moduleFiles={moduleFiles} moduleNumber={row.moduleNumber} courseID={courseID}/> ))}
              </TableBody>
              </Table>
          </TableContainer>
                    <Button color="primary" variant="contained" onClick={addModule}/*; setCourseAdded(!courseAdded);*/ > Add Module </Button>
    </div>

) 
  
}

function Row(props) {
  const { row, moduleFiles, moduleNumber, courseID } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  const deleteFile = async (fileID) => {

    /*delete module file from gridfs database*/
    alert (`request to delete ${fileID}`)
    try {
            
      let response = await fetch(`/coursesMaterials/delete/${fileID}`,
      {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
      })
    }    
    catch (err) {
          console.log(`Problem deleting data`, err)
      }

    /*delete module file from course database*/
    try {
            
        let response = await fetch(`/courses/${courseID}/modulefiles/delete/${fileID}`,
        {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
        })
    }    
    catch (err) {
            console.log(`Problem deleting data`, err)
        }


  }


  return (
    <React.Fragment>
      <TableRow className={classes.root}>
          <TableCell>
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row"> {row.moduleNumber} </TableCell>
          <TableCell >{row.description} </TableCell>
          <TableCell >
           <Button
              variant="contained"
              color="primary"
              size="small"
              startIcon={<Edit/>}
              style={{ marginLeft: 16 }}
              /*onClick={()=>{setCourseIDtoUpdate(row._id); toggleUpdateCourseModal()}}*/>
               UPDATE
            </Button>
          </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0}} colSpan={4}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Table size="small" aria-label="Module files">
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.headerCell}>Filename</TableCell>
                    <TableCell className={classes.headerCell}>File Description</TableCell>
                    <TableCell>                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {moduleFiles.map((moduleFilesRow) => {
                      if (moduleNumber == moduleFilesRow.moduleNumber) {
                        return (
                          <TableRow key={moduleFilesRow}>
                              <TableCell component="th" scope="row">{moduleFilesRow.filename}</TableCell>
                              <TableCell>{moduleFilesRow.description}</TableCell>
                              <TableCell>
                              <Button
                                  variant="contained"
                                  color="secondary"
                                  size="small"
                                  className={classes.button}
                                  startIcon={<DeleteIcon />}
                                  style={{ marginLeft: 16 }}
                                  onClick={()=>{deleteFile(moduleFilesRow.fileID)}}>
                                 Delete
                              </Button>
                              </TableCell>
                          </TableRow>
                        )
                      } else return null  
                  })} 
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}


const useStyles = makeStyles({
  headerCell: {
    color: 'blue',
    fontWeight: 'bold',
  },
  
});

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    }
    },
    headerCell: {
      color: 'blue',
      fontWeight: 'bold',
  
    }
  
});


export default TableCourseMaterial;
