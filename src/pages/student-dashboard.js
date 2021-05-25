import React, { useState } from 'react'

import './student-dashboard.css'

const StudentDashboard = () => {
    const [viewMode, setViewMode] = useState('Enrolled')

    return (
        <div className='student-dashboard'>
            <div className='dashboard-tab-container'>
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
                    <button
                        className={`${viewMode === 'Bookmarked' ? 'dashboard-active-view' : ''} dashboard-tab-btn`}
                        onClick={() => setViewMode('Bookmarked')}
                    >
                        BOOKMARKED
                    </button>
                    <div className='dashboard-tab-content'>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default StudentDashboard