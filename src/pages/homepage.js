import React, { useState, useEffect } from 'react'

const HomePage = props => {
    const [courses, setCourses] = useState([])

    useEffect(() => {
        const getCourses = async () => {
            let response = await fetch('/courses')
            let data = await response.json()
            setCourses(data)
            console.log(data)
        }
        getCourses()
        console.log(courses)
    }, [])

    return (
        <div className='homepage'>
            <div className='welcome'>
                <span> Welcome Section </span> 
            </div>
            <hr />
            <div className='courses-preview'>
                {courses.map(course => {
                    return <p>{course.courseName}</p>
                })}
            </div>
        </div>
    )
}

export default HomePage