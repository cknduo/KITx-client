import React, { useState } from 'react'
import SignIn from '../components/SignIn'
import SignUp from '../components/SignUp'

import './signin-signup.css'

const SignInSignUpPage = ({ setUserID, setUserInfo, setAccountType }) => {
    const [viewMode, setViewMode] = useState('SignInView')

    return (
        <div className='signin-signup'>
            <div className='tab-container'>
                <div className='tab-options'>
                    <button
                        className={`${viewMode === 'SignInView' ? 'active-view' : ''} signin-signup-button`}
                        onClick={() => setViewMode('SignInView')}
                    >
                        Sign In
                    </button>
                    <button
                        className={`${viewMode === 'SignUpView' ? 'active-view' : ''} signin-signup-button`}
                        onClick={() => setViewMode('SignUpView')}
                    >
                        Create An Account
                    </button>
                </div>
                <div className='tab-content'>
                    {viewMode === 'SignInView' && <SignIn setUserID={setUserID} setUserInfo={setUserInfo} setAccountType={setAccountType} />}
                    {viewMode === 'SignUpView' && <SignUp setUserID={setUserID} setUserInfo={setUserInfo} setAccountType={setAccountType} />}
                </div>
            </div>
        </div>
    )
}

export default SignInSignUpPage