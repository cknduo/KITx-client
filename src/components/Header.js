import React from 'react'
import { Link } from 'react-router-dom'

import './Header.css'

const Header = () => (
    <div className='header'>
        <Link to='/'>
            {/* <Logo className='logo' /> */}
            Logo
        </Link>
        <div className='options'>
            <Link className='option' to='/signin'>
                SIGN IN
            </Link>
        </div>
    </div>
)

export default Header