import Axios from "axios"

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Add NEW Shopping Cart to DB
const addNewDBCart = async (user,itemList) => {
    let addCartReq = await Axios({
            method: "POST",
            data: {
                userID: user,
                cartItems: itemList,
            },
            withCredentials: true,
            url: "/carts/",
        })
    console.log("Result of addNewDBCart Axios POST request = ",addCartReq)
    return
}

export default addNewDBCart

