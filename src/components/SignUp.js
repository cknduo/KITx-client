import React from 'react'

import './SignUp.css'

const SignUp = () => {
    let [name, setName] = useState()

    return (
    <div className='signup'>
        <div>
            <label HTMLfor="name">Name</label>
            <input id="name" value={name}/>
        </div>
    </div>
    )
}
/* 
firstName
lastName
email
confirm email
password --- weak/strong?
confirm password
address
city
province/state
postalCode-zipCode
Country
*/

export default SignUp