import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Rating from '@material-ui/lab/Rating'
import { Link } from 'react-router-dom'
import modifyDBCartItems from '../functions/ModifyDBCartItems'

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

        // Based on how the buttons work, user can only click
        // on ENROLL to call this function if the user is logged in.
        // Adding an extra check just to be safe.
        if (props.userID !== ""){
            
            // Add course to DB:
            // Loop through cart STATE to pre-populate tempArray, then
            // add THIS course as the last item onto the array before
            // calling the API (method:PUT) to update/replace the existing
            // DB record.
            let tempArray = []
            let counter = 0
            while (counter < props.cart.length){
                // Insert a new entry into the tempArray, a copy of the cart's element
                // at the same index position.
                console.log("inner counter = ",counter)
                tempArray[counter] = props.cart[counter].courseID
                counter += 1  //increment counter
            }
            console.log("exited the loop counter = ",counter)
            tempArray[counter] = course._id
            console.log("final array before sending to DB = ",tempArray)

            modifyDBCartItems(props.userID,tempArray)

            // Add course to cart STATE
            const courseToAdd = {
                courseID: course._id,
                coursePrice: course.price, 
            }
            props.setCart( item => [...item, courseToAdd])
        }
    }

    const courseInCart = ()=>{ 
        // Note: Only need to check the cart's STATE for existence of the item.
        // No need to query the DB, because the process of LOG IN will populate
        // the cart STATE for us, based on what is found in the DB. 
        
        let isInCart = false

        // Test the cart STATE array...
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
                    {props.userID === "" &&
                        <Link to={'/sign-in'}>
                            <button className='login-button'>LOG IN TO ENROLL</button>
                        </Link>
                    }
                </div>

                <div className='course-details-enroll-btn'> 
                    {props.userID !== "" &&
                        <button className='enroll-btn' 
                            disabled={courseInCart() === true}
                            onClick={addToCart}>ENROLL NOW</button>
                    }
                </div>               
            </div>
        </div>
    )
}

export default CourseDetails