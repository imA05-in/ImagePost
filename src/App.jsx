import { Header, Footer } from "./components/index";
import { Outlet } from "react-router";
import "./index.css";
import { useEffect, useState } from "react";
import authService from "./appwrite/Auth";
import { useDispatch, useSelector } from "react-redux";
import { toggleLoginRedux, toggleLogoutRedux } from "./store/AuthSlice";

function App() {
  const dispatch = useDispatch()

   useEffect(() => {
    async function initializeHome() {
      try {
        const userData = await authService.getAccount()
        if(userData){
          dispatch(toggleLoginRedux(userData))
          console.log(userData);
          
        }

      } catch (error) {
        console.error("Error initializing Home page:", error);
      } 
    }

    initializeHome();
  }, [dispatch]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
