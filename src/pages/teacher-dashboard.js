import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import TableTeacherCourses from '../components/Table-TeacherCourses'
import FunctionAddCourse from '../components/Function-AddCourse'
import Button from '@material-ui/core/Button';

import ViewTeacherCurrent from '../components/View-TeacherCurrent'
import ViewTeacherArchived from '../components/View-TeacherArchived'
import ViewTeacherInProgress from '../components/View-TeacherInProgress'

import './teacher-dashboard.css'

const TeacherDash = () => {   
    
    const { id } = useParams()
    /* Wesley Follis for testing purposes only */
        const teacherID = "60a2ece8201b091de34f1902"


    const [viewMode, setViewMode] = useState('Current')

    const [user, setUser] = useState(null)
    //const [updateCourseID, setUpdateCourseID] = useState(null)
    //const [addCourseModalIsOpen, setAddCourseModalIsOpen] = useState(false)
    const [courseUpdated, setCourseUpdated] = useState()
    
     useEffect(() => {
        const getUser = async () => {
            let response = await fetch(`/users/${teacherID}`)
            let data = await response.json()
            setUser(data)
        }
        getUser()
    }, [])

     const toggleCourseUpdated = () => {
        setCourseUpdated(!courseUpdated)
    }    
    
    if (!user) {
        return null
    }

   
     
        return (
            <div className='signin-signup'>
                <div className='tab-container'>
                <strong>Welcome back {user && user.firstName} {user && user.lastName} </strong><br/>
            User id: {user && user._id}
    
            <div className='tab-options'>
                        <button 
                            className={`${viewMode === 'Current' ? 'active-view' : ''} signin-signup-button`}
                            onClick={() => setViewMode('Current')}
                        >
                            Current
                        </button>
                        <button 
                            className={`${viewMode === 'InProgress' ? 'active-view' : ''} signin-signup-button`}
                            onClick={() => setViewMode('InProgress')}
                        >
                            In Progress
                        </button>
                        <button 
                            className={`${viewMode === 'Archived' ? 'active-view' : ''} signin-signup-button`}
                            onClick={() => setViewMode('Archived')}
                        >
                            Archived
                        </button>

                    </div>
                    <div className='tab-content'>
                        {viewMode === 'Current' && <ViewTeacherCurrent teacherID={teacherID}/>}
                        {viewMode === 'InProgress' && <ViewTeacherInProgress teacherID={teacherID} courseUpdated={toggleCourseUpdated} />}    
                        {viewMode === 'Archived' && <ViewTeacherArchived teacherID={teacherID}/>}    

                    </div>
                </div>
            </div>
        )
    }
    

















export default TeacherDash