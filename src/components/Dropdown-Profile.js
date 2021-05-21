import React, { useState } from 'react'

import './Dropdown.css'

const DropdownProfile = () => {

    function DropdownItem(props) {
        return (
            <a href={props.goToLink} className='menu-item profile-menu-item'>
                {props.children}
            </a>
        )
    }

    return (
        <div className='dropdown profile-dropdown'>
            <div className=''>
                <DropdownItem>Profile</DropdownItem>
                <DropdownItem>Transaction History</DropdownItem>
                <DropdownItem goToLink='/'>Log Out</DropdownItem>
            </div>
        </div>
    )
}

export default DropdownProfile