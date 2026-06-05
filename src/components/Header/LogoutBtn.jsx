import { useDispatch } from "react-redux"
import authService from "../../appwrite/Auth"
import { toggleLogoutRedux } from "../../store/AuthSlice"

export default function LogoutBtn(){

    const dispatch = useDispatch()
    function handleLogout(){
        authService.deleteSessions()
        dispatch(toggleLogoutRedux())
        alert("Logout")
    }

    return (
        <div>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}