import Axios from "axios"

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Add NEW Shopping Cart to DB
const modifyDBCartItems = async (user,itemList) => {
    let modCartReq = await Axios({
            method: "PUT",
            data: {
                // userID: user,
                cartItems: itemList,
            },
            withCredentials: true,
            url: `/carts/${user}`,
        })
    console.log("Result of modifyDBCartItems Axios POST request = ",modCartReq)
    return
}

export default modifyDBCartItems