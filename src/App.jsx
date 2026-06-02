import { Header, Footer } from "./components/index";
import { Outlet } from "react-router";
import "./index.css";
import { useEffect } from "react";
import authService from "./appwrite/Auth";
import { useDispatch, useSelector } from "react-redux";
import { toggleLoginRedux, toggleLogoutRedux } from "./store/AuthSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function AuthStatus() {
      try {
        const userData = await authService.getAccount();
        if (userData) {
          dispatch(toggleLoginRedux(userData));
        } else {
          dispatch(toggleLogoutRedux());
        }
      } catch (error) {}
    };
    AuthStatus()
  }, []);

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
