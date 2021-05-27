import Axios from "axios"

const SignOut = ({ setCart, setUserID, setUserInfo, setAccountType }) => {

    const logout = async () => {
        const logoutRes = await Axios({
            method: "GET",
            withCredentials: true,
            url: "/logout/",
        })
        console.log(logoutRes.data)
        setCart([]) //so that Art's Cart can go back to the Start ;)
        setUserID("")
        setUserInfo("")
        setAccountType("")
    }

    return (
        <div>
            <button onClick={logout}>Sign Out</button>
        </div>
    )
}

export default SignOut