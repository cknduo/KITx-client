import React from 'react'
import { Link } from 'react-router-dom'

import './Dropdown.css'

const DropdownProfile = ({ logout }) => {
    function DropdownItem(props) {
        return (
            <Link to={props.goToLink} className='menu-item profile-menu-item' onClick={props.logout}>
                {props.children}
            </Link>
        )
    }

    return (
        <div className='dropdown profile-dropdown'>
            <div className=''>
                <DropdownItem>Profile</DropdownItem>
                <DropdownItem>Transaction History</DropdownItem>
                <DropdownItem goToLink='/' logout={logout}>Log Out</DropdownItem>
            </div>
        </div>
    )
}

export default DropdownProfile