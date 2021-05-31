import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Axios from "axios"

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import IconButton from '@material-ui/core/IconButton';

import './student-learning.css'

const StudentLearning = () => {   

    const { courseid } = useParams()
    
    const [videoFileID, setVideoFileID] = useState()
    const [modules, setModules] = useState()
    const [moduleFiles, setModuleFiles] = useState()
    const [course, setCourse] = useState()
    
    useEffect(() => {
            const getCourse = async () => {
            let response = await fetch(`/courses/${courseid}`)
            let data = await response.json()
            setCourse(data)
            setModules(data.modules)
            setModuleFiles(data.moduleFiles)
        }
        getCourse()
    }, []);

    if(!moduleFiles) {
        return null
    }

    /* if another video is selected in the course list to view, refresh the video screen with the new file*/
    const updateVideoFileID = (fileID) => {
        setVideoFileID (fileID)
        console.log(fileID)
    }


    let courseImageURL = `/courseMaterial/image/${course.courseImage.fileID}`
    
    return (
        <div className="learner-page">
        
            <div className="banner" style= {{backgroundImage:`url(${courseImageURL}`}}>
                <p className='banner-title'>{course.courseName}</p>     
            </div>

            <div className="learner-view">

                <div className="video-view">
                    <VideoPlayback videoFileID={videoFileID} width="200px"/>
                </div>

                <div className="module-details-view">
                    <h2> Course Material </h2>
                    {modules.map((module) => (<CardModule module={module} moduleFiles={moduleFiles} updateVideoFileID={updateVideoFileID}/> ))}
                </div>

            </div>
        </div>
  ) 
}

function CardModule(props) {
    const { module, moduleFiles, updateVideoFileID } = props;
    const [open, setOpen] = React.useState(false);
  

    const fileDownload = (fileID, filename) => {

        Axios({
            url: `/courseMaterial/image/${fileID}`,
            method: 'GET',
            responseType: 'blob', // download as a binary stream
          }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${filename}`);
            document.body.appendChild(link);
            link.click();
          });
    }

    return (

            <div>
            <div className = "expand-file-view">
                <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    <strong> Module {module.moduleNumber}: {module.description} </strong>
                </IconButton>
            </div>

            <div className = "file-action-buttons">
                {moduleFiles.map((moduleFile, item) => {

                    if (open  && (moduleFile.moduleNumber == module.moduleNumber)) {

                        return (
                            <div>
                            <p>&emsp; {moduleFile.description} &emsp; File: {moduleFile.filename} &emsp;
                            
                            {/* extract the filename extension to determine action for button */}
                            { ((moduleFile.filename.split('.').pop() === "mp4") || (moduleFile.filename.split('.').pop() === "mov"))  &&
                                <button onClick={()=>{updateVideoFileID(moduleFile.fileID)}}> Play Video </button>
                            }
                            
                            {((moduleFile.filename.split('.').pop() !== "mp4") && (moduleFile.filename.split('.').pop() !== "mov")) &&
                                <button onClick={()=>{/*window.open(`/courseMaterial/image/${moduleFile.fileID}`)}*/fileDownload(moduleFile.fileID, moduleFile.filename)}}> Download File </button> }
                            </p>
                            </div>                       
                        )
                    } else return null  
                })} 
            </div>

            </div>
    )
}  
  
const VideoPlayback = ({videoFileID}) => {

    if (!videoFileID)
        return (
            <video controls>
            </video>
        )

    return (
        <video controls>
           <source src = {`/courseMaterial/image/${videoFileID}`} type="video/mp4"/>
        </video>
    )  

}

export default StudentLearning

