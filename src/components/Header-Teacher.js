import React from 'react'
import { Link } from 'react-router-dom'

import DropdownIconNav from './Dropdown-IconNav'
import DropdownProfile from './Dropdown-Profile'
import HeaderStaticSection from './Header-StaticSection'
import { ReactComponent as User } from '../assets/user.svg'
import './Header.css'

const TeacherHeader = ({ logout, userID }) => (
    <div className='header'>
        <div className='options-width'>

            <HeaderStaticSection />

            <div className='options right'>
                <Link className='option' to={`/teacher/${userID}`}>
                    MY TEACHING
                </Link>
                <div className='option'>
                    <DropdownIconNav icon={<User />} linkTo='#'>
                        <DropdownProfile logout={logout}/>
                    </DropdownIconNav>
                </div>
            </div>
        </div>
    </div>
)

export default TeacherHeader