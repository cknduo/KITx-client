import React, { useState } from 'react'
import { CSSTransition } from 'react-transition-group'

import { ReactComponent as ChevronIcon } from '../assets/chevron.svg'
import { ReactComponent as BackArrowIcon } from '../assets/left-arrow.svg'

import './Dropdown.css'

const DropdownExplore = () => {
    const [activeMenu, setActiveMenu] = useState('main')

    function DropdownItem(props) {
        return (
            <a href={props.goToLink} className='menu-item' onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
                {props.children}
            </a>
        )
    }

    return (
        <div className='dropdown'>

            <CSSTransition 
                in={activeMenu === 'main'} 
                unmountOnExit
                timeout={500}
                classNames='menu-primary'
            >
                <div className='menu'>
                    <DropdownItem
                        rightIcon={<ChevronIcon />}
                        goToMenu='science'
                    >
                        Science
                    </DropdownItem>
                    <DropdownItem
                        rightIcon={<ChevronIcon />}
                        goToMenu='arts-and-crafts'
                    >
                        Arts & Crafts
                    </DropdownItem>
                </div>
            </CSSTransition>

            <CSSTransition 
                in={activeMenu === 'science'} 
                unmountOnExit
                timeout={500}
                classNames='menu-secondary'
            >
                <div className='menu'>
                    <DropdownItem goToMenu='main'>
                        <span className='icon-button'><BackArrowIcon /></span>
                        Go Back
                    </DropdownItem>
                    <DropdownItem goToLink='#'>Chemistry</DropdownItem>
                    <DropdownItem goToLink='#'>Physics</DropdownItem>
                    <DropdownItem goToLink='#'>Robotics</DropdownItem>
                </div>
            </CSSTransition>

            <CSSTransition 
                in={activeMenu === 'arts-and-crafts'} 
                unmountOnExit
                timeout={500}
                classNames='menu-secondary'
            >
                <div className='menu'>
                    <DropdownItem goToMenu='main'>
                        <span className='icon-button'><BackArrowIcon /></span>
                        Go Back
                    </DropdownItem>
                    <DropdownItem goToLink='#'>Blacksmithery</DropdownItem>
                    <DropdownItem goToLink='#'>Pottery</DropdownItem>
                </div>
            </CSSTransition>

        </div>
    )
}

export default DropdownExplore