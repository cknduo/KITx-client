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


    const [viewMode, setViewMode] = useState('Active')

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
        <div className='teacher-dashboard'>
            <div className='dashboard-tab-container'>
                
                <div className='dashboard-user-details'>
                    <h3>Welcome back {user && user.firstName} {user && user.lastName}</h3>
                    <p>Your Account Number: {user && user._id}</p>                    
                </div>

                <div className='dashboard-tab-options'>
                    <button 
                        className={`${viewMode === 'Active' ? 'dashboard-active-view' : ''} dashboard-tab-btn`}
                        onClick={() => setViewMode('Active')}
                    >
                        ACTIVE
                    </button>
                    <button 
                        className={`${viewMode === 'InProgress' ? 'dashboard-active-view' : ''} dashboard-tab-btn`}
                        onClick={() => setViewMode('InProgress')}
                    >
                        IN THE MAKING
                    </button>
                    <button 
                        className={`${viewMode === 'Archived' ? 'dashboard-active-view' : ''} dashboard-tab-btn`}
                        onClick={() => setViewMode('Archived')}
                    >
                        ARCHIVED
                    </button>
                </div>

                <div className='dashboard-tab-content'>
                    {viewMode === 'Current' && <ViewTeacherCurrent teacherID={teacherID}/>}
                    {viewMode === 'InProgress' && <ViewTeacherInProgress teacherID={teacherID} courseUpdated={toggleCourseUpdated} />}    
                    {viewMode === 'Archived' && <ViewTeacherArchived teacherID={teacherID}/>}    
                </div>

            </div>
        </div>
    )
}
    

















export default TeacherDash