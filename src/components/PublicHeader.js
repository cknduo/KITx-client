import React from 'react'
import { Link } from 'react-router-dom'

import DropdownNavItem from './DropdownNavItem'
import DropdownMenu from './DropdownMenu'
import { ReactComponent as Logo } from '../assets/whale.svg'
import './PublicHeader.css'

const PublicHeader = () => (
    <div className='header'>
        <div className='options-width'>

            <div className='options'>
                <Link to="/">
                    <Logo className='option logo' />
                </Link>
                <div className='option'>
                    <DropdownNavItem>
                        {/* pass in icon attribute if needed */}
                        <DropdownMenu />
                    </DropdownNavItem>
                </div>
            </div>

            <div className='options right'>
                <Link className='option' to='/teach'>
                TEACH
                </Link>
                <Link className='option' to='/signin'>
                    SIGN IN
                </Link>
            </div>

        </div>
    </div>
)

export default PublicHeader