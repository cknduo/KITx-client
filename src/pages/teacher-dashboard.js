import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import ViewTeacherCurrent from '../components/View-TeacherCurrent'
import ViewTeacherArchived from '../components/View-TeacherArchived'
import ViewTeacherInProgress from '../components/View-TeacherInProgress'

import './user-dashboard.css'

const TeacherDash = () => {   
    
    const { id } = useParams()

    const [viewMode, setViewMode] = useState('Active')

    const [user, setUser] = useState(null)
    const [courseUpdated, setCourseUpdated] = useState()
    
     useEffect(() => {
        const getUser = async () => {
            let response = await fetch(`/users/${id}`)
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
        <div className='user-dashboard'>
            <div className='dashboard-tab-container'>
                
                <div className='dashboard-user-details'>
                    <h3>Welcome back {user && user.firstName} {user && user.lastName}</h3>
 
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
                    {viewMode === 'Active' && <ViewTeacherCurrent teacherID={id}/>}
                    {viewMode === 'InProgress' && <ViewTeacherInProgress teacherID={id} courseUpdated={toggleCourseUpdated} />}    
                    {viewMode === 'Archived' && <ViewTeacherArchived teacherID={id}/>}    
                </div>

            </div>
        </div>
    )
}
    

















export default TeacherDash