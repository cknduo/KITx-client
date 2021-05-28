import React from 'react'
import Axios from 'axios'

import './Dropdown.css'

const DropdownProfile = ({ logout }) => {


    function DropdownItem(props) {
        return (
            <a href={props.goToLink} className='menu-item profile-menu-item' onClick={props.logout}>
                {props.children}
            </a>
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