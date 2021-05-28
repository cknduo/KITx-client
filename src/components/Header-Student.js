//import React from 'react'
import React, {useState} from 'react'
import { Link } from 'react-router-dom'

import DropdownIconNav from './Dropdown-IconNav'
import DropdownProfile from './Dropdown-Profile'
import HeaderStaticSection from './Header-StaticSection'
import Badge from '@material-ui/core/Badge'
import { ReactComponent as ShoppingBox } from '../assets/shopping-box.svg'
import { ReactComponent as User } from '../assets/user.svg'
import './Header.css'

const StudentHeader = ({ cartSize, logout }) => (
    <div className='header'>
        <div className='options-width'>

            <HeaderStaticSection />

            <div className='options right'>
                <Link className='option' to='/student/:id'>
                    MY LEARNING
                </Link>
                <div className='option'>
                    <Badge badgeContent={cartSize} color="error">
                        <DropdownIconNav icon={<ShoppingBox />} linkTo='/cart' />
                    </Badge>
                </div>
                <div className='option'>
                    <DropdownIconNav icon={<User />} linkTo='#'>
                        <DropdownProfile logout={logout} />
                    </DropdownIconNav>
                </div>
            </div>
        </div>
    </div>
)

export default StudentHeader
