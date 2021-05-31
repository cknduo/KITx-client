import React from 'react'
import { Link } from 'react-router-dom'

import './homepage.css'

const Teach = () => {
    return (
        <div className='homepage'>
            <div className='teach-landing'>
                <p className='landing-title'>BUILD A HANDS-ON EXPERIENCE</p>
                <div className='landing-btn-container'>
                    <Link to='/sign-in'>
                        <button className='landing-btn'>START TEACHING</button>
                    </Link>                    
                </div>
            </div>
        </div>
    )
}

export default Teach