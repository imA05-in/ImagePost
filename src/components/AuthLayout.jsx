import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

export default function AuthLayout({ children }) {
  const navigate = useNavigate()
        const loggedIn = useSelector((state) => state.auth.status);
  if (!loggedIn) {
    return navigate("/login")
  } else return children;
}
