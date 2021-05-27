import React from 'react'
import { Link } from 'react-router-dom'
import Rating from '@material-ui/lab/Rating'

import './Card.css'

const Card = ({ courseID, courseImage, courseName, courseDescription, courseKit, courseRating }) => {
    return (
        <div className='card-container'>
            <div className='card-img-container'>
                <img src='https://images.unsplash.com/photo-1541701494587-cb58502866ab?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' alt='course-img' className='card-img' />        
                >
                {/* <img src={courseImage} className='card-img' />         */}
                       
            </div>
            <div className='card-content'>                
                <div className='card-content-rating'>
                    <Rating
                        value={courseRating}
                        precision={0.1}
                        readOnly
                    />                
                </div> 
                <h3 className='card-content-title'>{courseName}</h3>
                <p className='card-content-description'>{courseDescription}</p>
                <h4 className='card-content-kit'>Kit: {courseKit}</h4>
                <div className='card-content-button'>
                    <Link to={`/course/${courseID}`}>
                        <button className='card-button'>COURSE DETAILS</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Card