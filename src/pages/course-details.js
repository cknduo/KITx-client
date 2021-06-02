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
            let response = await fetch(`/courses/${id}?courseStatus=Current`)
            let data = await response.json()
            setCourse(data)
        }
        getCourse()
    }, [])
    
    if (!course) {
        return ''
    }
    
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++    
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
                tempArray[counter] = props.cart[counter].courseID
                counter += 1  //increment counter
            }
            tempArray[counter] = course._id
            
            modifyDBCartItems(props.userID,tempArray)

            // Add course to cart STATE
            const courseToAdd = {
                courseID: course._id,
                coursePrice: course.price, 
            }
            props.setCart( item => [...item, courseToAdd])
        }
    }
    // --------------------------------------------------------------------------

    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // useEffect(() => {
        const courseIsValid = ()=>{ 
            // Before allowing the user to Enroll in the course, validate what
            // type of user they are, and whether or not they have already enrolled
            // in this class before. If they are a TEACHER, then they should NOT
            // be allowed to enroll in ANY courses. If they have already added the
            // course to their shopping cart, or are currently enrolled or have
            // completed the course, then they should NOT be allowed to enroll again.
            // Note: Only need to check the cart's STATE for existence of the item.
            // No need to query the DB, because the process of LOG IN will populate
            // the cart STATE for us, based on what is found in the DB. 
            
            let messageToUser = ""
            let inArray = false
            
            if (props.userInfo.accountType === 'student') {

                // Inspect the cart STATE array...
                if (props.cart.length !== 0){
                    for (let counter = 0; counter < props.cart.length; counter++) {
                        if (props.cart[counter].courseID === course._id){
                            messageToUser = "This course has been added to your shopping cart."
                            return(messageToUser)
                        }
                    }
                } 
                
                // Inspect the courses this user has already enrolled in.
                inArray = props.userInfo.coursesLearning.enrolled.includes(course._id)
                if(inArray){
                    messageToUser = "You are already enrolled in this course. Find it in My Learning."
                    return(messageToUser)
                }
                
                // Inspect the courses this user has already completed.
                inArray = props.userInfo.coursesLearning.completed.includes(course._id)
                if(inArray){
                    messageToUser = "You've already completed this course. Find it in My Learning"
                    return(messageToUser)
                }
            }
            else {  // teachers should not be allowed to enroll
                messageToUser = "Only student accounts may enroll in this course." 
                return(messageToUser)
            }
            return(messageToUser)
        }
    // --------------------------------------------------------------------------

    return (
        <div className='course-details'>
            <div className='course-details-container'>
                <div className='course-details-section'>
                    <div className='course-details-section-main'>
                        <h2 className='course-details-title'>{course.courseName}</h2>
                        <h4 className='course-details-description'>{course.description}</h4>
                        <Rating value={course.rating} precision={0.1} readOnly />
                        <p>Instructor: Westley Follis</p>
                        <p>Price: ${course.coursePrice}</p>                        
                    </div>
                    <div className='course-details-section-side'>
                        <img className='course-details-img' src={`/courseMaterial/image/${course.courseImage.fileID}`} alt='course-img' />                        
                    </div>
                </div>
                
                <div className='course-details-section'>
                    <div className='course-details-section-main'>
                        <div className='course-details-content'>
                            <h4 className='course-details-section-title'>COURSE CONTENT</h4>
                            <div className='course-details-content-list'>
                                {course.modules.map(module => {
                                    return (
                                        <span className='module-item'>{module.moduleNumber}. {module.description}</span>
                                    )
                                })}                            
                            </div>
                        </div>                        
                    </div>
                    <div className='course-details-section-side'>
                        <div className='course-details-kits'>
                            <h4 className='course-details-section-title'>KIT: {course.requiredKits.kitName}</h4>
                            <p>{course.requiredKits.kitDescription}</p>
                        </div>                               
                    </div>       
                </div>

                <div className='course-details-enroll-btn'>
                    {props.userID === "" &&
                        <Link to={'/sign-in'}>
                            <button className='enroll-btn'>LOG IN TO ENROLL</button>
                        </Link>
                    }
                </div>

                <div className='course-details-enroll-btn'>
                    {props.userID !== "" &&
                        <button className='enroll-btn' 
                        disabled={courseIsValid() !== ""}
                        onClick={addToCart}>ENROLL NOW</button>
                    }
                </div>

                <div className='message-to-user'>
                    <span>{courseIsValid()}</span> 
                </div>               
            </div>
        </div>
    )
}

export default CourseDetails