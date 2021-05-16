import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

import './DropdownNavItem.css'

const NavItem = props => {
    const [open, setOpen] = useState(false)
    const ref = useRef()

    const handleClick = e => {
        if (!ref.current || ref.current.contains(e.target)) {
          return;
        }
        
        setOpen(open)
      }

    useEffect(() => {
        document.addEventListener("mousedown", handleClick);
        
        return () => {
          document.removeEventListener("mousedown", handleClick);
        }
      }, [])

    return (
        <div className='nav-item' ref={ref}>

            {/* for ICONS as Menu Item
            <Link to='#' className='icon-button' onClick={() => setOpen(!open)}>
                { props.icon }
            </Link> */}

            <Link to='#' onClick={() => setOpen(!open)}>
                EXPLORE
            </Link>

            {open && props.children}

        </div>
    )
}

export default NavItem