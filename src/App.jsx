import {Header,Footer} from "./components/index"
import { Outlet } from "react-router"
import './index.css'
import { useEffect } from "react"
import authService from "./appwrite/Auth"
import { useDispatch } from "react-redux"
import { toggleLoginRedux } from "./store/AuthSlice"

function App() {

  const dispatch = useDispatch()
  useEffect(()=>{
    const userData = authService.getAccount()
    if (userData){
      dispatch(toggleLoginRedux(userData))
    }
  },[])

  return (
    <div className="min-h-screen flex flex-col">
        <Header/>
        <main className="flex-1">
        <Outlet/>
        </main>
        <Footer/>
    </div>
  )
}

export default App
