import React, { useState, useEffect } from 'react'

const StudentDash = () => {
    const [user, setUser] = useState([])

    useEffect(() => {
        const getUser = async () => {
            let response = await fetch('/users/60917ac1f7ccfb4de4eb5d31')
            let data = await response.json()
            setUser(data)
            console.log(data)
        }
        getUser()
        console.log({user})
    }, [])

    // useEffect(() => {
    //     // POST request using fetch inside useEffect React hook
    //     const addUserOptions = {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({ title: 'React Hooks POST Request Example' })
    //     };
    //     fetch('/users', addUserOptions)
    //         .then(response => response.json())
    //         .then(data => setPostId(data.id));
    
    // // empty dependency array means this effect will only run once (like componentDidMount in classes)
    // }, []);

    return (
        <div className='student-dash'>
            {user.firstName}
        </div>
    )
}

export default StudentDash