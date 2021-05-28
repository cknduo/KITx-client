import React from 'react'
import { Link } from 'react-router-dom'

import DropdownTextNav from './Dropdown-TextNav'
import DropdownExplore from './Dropdown-Explore'
import Logo from '../assets/logo.png'
import './Header.css'

const HeaderStaticSection = () => {
    return (
        <div className='options'>
            <Link to="/">
                <img src={Logo} alt='logo' className='option logo' />
            </Link>
            <div className='option'>
                <DropdownTextNav>
                    <DropdownExplore />
                </DropdownTextNav>
            </div>
        </div>

    )
}

export default HeaderStaticSection