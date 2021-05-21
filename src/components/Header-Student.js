//import React from 'react'
import React, {useState} from 'react'
import { Link } from 'react-router-dom'

import DropdownIconNav from './Dropdown-IconNav'
import DropdownProfile from './Dropdown-Profile'
import HeaderStaticSection from './Header-StaticSection'
import { ReactComponent as ShoppingBox } from '../assets/shopping-box.svg'
import { ReactComponent as User } from '../assets/user.svg'
import './Header.css'

const StudentHeader = ( {cartSize}) => (
    <div className='header'>
        <div className='options-width'>

            <HeaderStaticSection />

            <div className='options right'>
                <Link className='option' to='/student-dash'>
                    My Learning
                </Link>
                <div className='option'>
                    <DropdownIconNav icon={<ShoppingBox />} linkTo='/cart' />
                    {/* <span class='badge' id='lblCartCount'> {cartSize} </span> */}
                    <span className='cart-badge' id='cart-counter'>{cartSize}</span>
                </div>
                <div className='option'>
                    <DropdownIconNav icon={<User />} linkTo='#'>
                        <DropdownProfile />
                    </DropdownIconNav>
                </div>
            </div>
        </div>
    </div>
)

export default StudentHeader
