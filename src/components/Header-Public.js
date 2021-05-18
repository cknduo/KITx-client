import React from 'react'
import { Link } from 'react-router-dom'

import HeaderStaticSection from './Header-StaticSection'
import './Header.css'

const PublicHeader = () => {

    return (
        <div className='header'>
            <div className='options-width'>

                <HeaderStaticSection />

                <div className='options right'>
                    <Link className='option' to='/teach'>
                        Teach
                    </Link>
                    <Link className='option' to='/signin'>
                        Sign In
                    </Link>
                </div>

            </div>
        </div>
    )
}

export default PublicHeader