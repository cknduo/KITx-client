import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import ViewStudentCurrent from '../components/View-StudentCurrent'
import './user-dashboard.css'

const StudentDashboard = () => {
    const [viewMode, setViewMode] = useState('Enrolled')
    const { id } = useParams()
    
    const [user, setUser] = useState(null)

    /* hard coded for testing purposes*/ 
    //let studentID = "60ab3978f7d205756ee94709"    
    
    useEffect(() => {
        const getUser = async () => {
            let response = await fetch(`/users/${id}`)
            let data = await response.json()
            setUser(data)
        }
        getUser()
    }, [])

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
                        className={`${viewMode === 'Enrolled' ? 'dashboard-active-view' : ''} dashboard-tab-btn`}
                        onClick={() => setViewMode('Enrolled')}
                    >
                        ENROLLED
                    </button>
                    <button
                        className={`${viewMode === 'Completed' ? 'dashboard-active-view' : ''} dashboard-tab-btn`}
                        onClick={() => setViewMode('Completed')}
                    >
                        COMPLETED
                    </button>
                </div>
                <div className='dashboard-tab-content'>
                    {viewMode === 'Enrolled' && <ViewStudentCurrent studentID={id} student={user} />}
                </div>  
            </div>
        </div>
    )
}

export default StudentDashboard