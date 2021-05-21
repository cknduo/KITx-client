import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const CourseDetails = props => {
    const [course, setCourse] = useState(null)
    const { id } = useParams()

    useEffect(() => {
        const getCourse = async () => {
            let response = await fetch(`/courses/${id}`)
            let data = await response.json()
            setCourse(data)
        }
        getCourse()
        console.log(course)
    }, [])

    if (!course) {
        return ''
    }

    const addToCart = ()=>{
        const courseToAdd = {
            courseID: course._id, 
            imageURL: course.imageURL, 
            courseTitle: course.courseName, 
            price: course.coursePrice
        }
        props.setCart( item => [...item, courseToAdd])
    }

    return (
        <div className='course-details'>
            <ul className='course-descriptions'>
                <h1>{course.courseName}</h1>
                <h3>{course.description}</h3>
                <p>Rating: {course.rating}</p>
                <p>Instructor: {course.instructor}</p>
                <p>Price: ${course.coursePrice}</p>
            </ul>
            <ul className='kit-details'>
                <h2>Required Kit: {course.requiredKits.kitName}</h2>
            </ul>
            
            <div>
                <button className='enroll-button' onClick={addToCart}> ENROLL NOW !</button>
            </div>
        </div>

    )
}

export default CourseDetails