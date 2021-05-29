import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import Card from '../components/Card'
import './homepage.css'

const HomePage = () => {
    const [courses, setCourses] = useState([])

    useEffect(() => {
        const getCourses = async () => {
            let response = await fetch('/courses')
            let data = await response.json()
            setCourses(data)
        }
        getCourses()
    }, [])

    return (
        <div className='homepage'>
            <div className='landing'>
                <p className='landing-title'>EXPERIENCE OUR CAMPUS WHEREVER YOU ARE</p>
                <div className='landing-btn-container'>
                    <Link to='/sign-in'>
                        <button className='landing-btn'>START LEARNING</button>
                    </Link>                    
                </div>

            </div>
            <div className='courses-preview-title'><h2>Featured Courses</h2></div>
            <div className='courses-preview'>
                {courses
                    .sort(() => Math.random() - 0.5)
                    .slice(0,4)
                    .map(course => {
                        return (
                                <Card
                                    key={course._id}
                                    courseID={course._id}
                                    courseImage={course.courseImage}
                                    courseName={course.courseName}
                                    courseDescription={course.description}      
                                    courseKit={course.requiredKits.kitName}
                                    courseRating={course.rating}                          
                                />
                        )
                })}
            </div>
        </div>
    )
}

export default HomePage