import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

export default function AuthLayout({ children }) {
  const navigate = useNavigate();
  const loggedIn = useSelector((state) => state.auth.status);

  useEffect(() => {
    if (!loggedIn) {
      navigate("/login");
    } else;
  }, [loggedIn]);


  loggedIn? children : null

}
