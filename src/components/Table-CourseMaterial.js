import React, { useEffect, useState } from 'react';

import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

const TableCourseMaterial = ({courseID, materialAdded, course, refreshModal}) => {
/* This table is the list of course modules, and the module files associated with the modules */

  const classes = useStyles();
  let rows = course.modules
  let moduleFiles = course.moduleFiles

  const addModule = async () => {
    /*add new module to course database*/
  
    /*check what the last module number was, and increment to the next one*/
    /* parse array of strings to array of numbers*/
    /* if modules are empty, then assign 1 to maxModuleNumber */
    let maxModuleNumber
    
    if (rows.length!==0) {
      let moduleNumberArray = rows.map(module => parseInt(module.moduleNumber))
      maxModuleNumber = Math.max(...moduleNumberArray) + 1
    } else {
      maxModuleNumber =  `1`
    }
  

    /*module info to push into modules Array - Module Number and Description*/
    const newModule = {
      moduleNumber : `${maxModuleNumber}`,
      description : ""
    }

    try {
      let response = await fetch(`/courses/${courseID}/modules`,
          {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(newModule, null, 2)
          })
      } catch (err) {
          console.log(`Problem encoutered while trying to add module`)
      }
    
    refreshModal()

  }

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
                    {rows.map((row) => (<Row key={row.moduleNumber} row={row} moduleFiles={course.moduleFiles} moduleNumber={row.moduleNumber} courseID={courseID} refreshModal={refreshModal}/> ))}
              </TableBody>
              </Table>
          </TableContainer>
          
          <Button color="primary" variant="contained" onClick={()=>{addModule()}}> Add Module </Button>

    </div>
  ) 
}

function Row({row, moduleFiles, moduleNumber, courseID, refreshModal }) {
/* each row is a module.  For each row, a nested table is rendered which shows the associated module files */


  const [open, setOpen] = useState(false)  // determines whether the nested table should be visible (open) or not
  //const [updated, setUpdated] = useState(false) //row properties have been updated
  const classes = useRowStyles()

  const deleteFile = async (fileID) => {

    /*delete module file from gridfs database*/

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
    refreshModal()
    //setUpdated(!updated)  
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
                                  <IconButton aria-label="delete" color="secondary" onClick={()=>{deleteFile(moduleFilesRow.fileID)}}>
                                      <DeleteIcon />
                                  </IconButton>
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

/** material ui functions */

const useStyles = makeStyles({
  headerCell: {
    color: '#0091ca',
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
      color: '#0091ca',
      fontWeight: 'bold',
  
    }
  
});


export default TableCourseMaterial;
