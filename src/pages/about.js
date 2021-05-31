import React from 'react'

import './about.css'

const About = () => {
    return (
        <div className='about'>
            <div className='about-container'>
                <div className='about-team'>
                    <div className='about-team-member'>
                        <h3>Art Treleaven</h3>
                        <p>About Art</p>                    
                    </div>
                    <div className='about-team-member'>
                        <h3>Pam Torres</h3>
                        <p>About Pam</p>
                    </div>
                    <div className='about-team-member'>
                        <h3>Muhammad Khan</h3>
                        <p>About Muhammad</p>                    
                    </div>
                    <div className='about-team-member'>
                        <h3>Chloe Silvester</h3>
                        <p>About Chloe</p>
                    </div>
                </div>
                <div className='about-problem'>
                    <h3>The Problem</h3>
                </div>
                <div className='about-solution'>
                    <h3>The Solution</h3>
                </div>
                <div className='about-technologies'>
                    <h3>The Technologies</h3>
                </div>                
            </div>
        </div>
    )
}

export default About