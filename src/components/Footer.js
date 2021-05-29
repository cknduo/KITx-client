import React from 'react'
import { Link } from 'react-router-dom'

import './Footer.css'

const Footer = () => {
    return (
        <div className='footer'>
            <div className='footer-container'>
                <Link to='/about' className='footer-item'>ABOUT</Link>
                <Link to='/contact' className='footer-item'>CONTACT US</Link>
                <Link to='/terms-of-use' className='footer-item'>TERMS OF USE</Link>
                <Link to='/privacy-policy' className='footer-item'>PRIVACY POLICY</Link>
                <p className='footer-copyright'>Copyright © 2021 KITx Inc.</p>
            </div>
        </div>
    )
}

export default Footer