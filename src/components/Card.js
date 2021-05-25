import React from 'react'
import { Link } from 'react-router-dom'
import Rating from '@material-ui/lab/Rating'

import './Card.css'

const Card = ({ courseID, courseImage, courseName, courseDescription, courseKit, courseRating }) => {
    return (
        <div className='card-container'>
            <img src={courseImage} alt='course-img' className='card-img' />
            <div className='card-content'>
                <h4 className='card-content-title'>{courseName}</h4>
                <p className='card-content-description'>{courseDescription}</p>
                <h5>Kit: {courseKit}</h5>
                <div className='card-content-rating'>
                    <Rating
                        value={courseRating}
                        precision={0.1}
                        readOnly
                    />                
                </div> 
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