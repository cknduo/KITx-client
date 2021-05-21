import React from 'react'
import { Link } from 'react-router-dom'

import DropdownTextNav from './Dropdown-TextNav'
import DropdownExplore from './Dropdown-Explore'
import { ReactComponent as Logo } from '../assets/whale.svg'
import './Header.css'

const HeaderStaticSection = () => {
    return (
        <div className='options'>
            <Link to="/">
                <Logo className='option logo' />
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