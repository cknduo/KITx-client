import React from 'react'
import Axios from "axios"

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Get USER info from DB

const getUserInfo = async (personID) => {

    let usersName = ""

    const getRes = await Axios({
        method: "GET",
        withCredentials: true,
        url: "/useridgetter/user", 
        // url: `/useridgetter/user/${personID}`, // ! This route is WRONG !
    })

    usersName = getRes.data.firstName

    return usersName
}

export default getUserInfo