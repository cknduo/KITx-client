import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Rating from '@material-ui/lab/Rating'

import './course-details.css'

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
            coursePrice: 0, 
        //     imageURL: course.imageURL, 
        //     courseTitle: course.courseName,
        }
        // const courseToAdd = course._id
        props.setCart( item => [...item, courseToAdd])
    }

    const courseInCart = ()=>{
        let isInCart = false
        if (props.cart.length !== 0){
            for (let counter = 0; counter < props.cart.length; counter++) {
                if (props.cart[counter].courseID === course._id){
                    isInCart = true
                    return (isInCart)
                }
            }
        }
        return (isInCart)
    }


    return (
        <div className='course-details'>
            <div className='course-details-container'>
                <div className='course-details-header'>
                    <img src={course.courseImage.filename} alt='course-img' />
                    <h2 className='course-details-title'>{course.courseName}</h2>
                    <h4>{course.description}</h4>
                    <Rating value={course.rating} precision={0.1} readOnly />
                    <p>Instructor: {course.instructor}</p>
                    <p>Price: ${course.coursePrice}</p>
                </div>
                
                <div className='course-details-content'>
                    <h4>Course Content</h4>
                    {/* <p>{course.modules[0].moduleNumber}. {course.modules[0].description}</p> */}
                </div>

                <div className='course-details-kits'>
                    <h4>Required Kit: {course.requiredKits.kitName}</h4>
                    <p>{course.requiredKits.kitDescription}</p>
                </div>
                
                <div className='course-details-enroll-btn'>
                    <button className='enroll-btn' 
                        disabled={courseInCart() === true}
                        onClick={addToCart}>ENROLL NOW</button>
                </div>                
            </div>
        </div>
    )
}

export default CourseDetails