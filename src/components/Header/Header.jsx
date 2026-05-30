import { Link, NavLink } from "react-router";
import { HomeP } from "../../pages/indexP";
import { useState } from "react";
import logo from "../../assets/hero.png";
import LogoutBtn from "./LogoutBtn";
import { useSelector } from "react-redux";
export default function Header() {
  const loginStatus = useSelector((state)=>state.auth.status)
  const navItems = [
    { title: "Home", show: true, path: "home" },
    {
      title: "Login",
      show: !loginStatus,
      path: "login",
    },
    {
      title: "Signup",
      show: !loginStatus,
      path: "signup",
    },
    {
      title: "All Posts",
      show: loginStatus,
      path: "all-posts",
    },
    {
      title: "Add Post",
      show: loginStatus,
      path: "add-post",
    },
  ];
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <div>
      <nav className="flex justify-between px-3 py-1 border-b h-15 items-center backdrop-blur-md ">
          <div>
        <NavLink to={`/home`}>
            <img
              src={logo}
              alt="logo"
              className="max-h-15 py-1"
            />
        </NavLink>
          </div>
        {/* desktop */}
        <div className="flex gap-20  justify-between px-3 text-gray-200/90">
          {navItems.map((item) =>
            item.show ? (
              <div
                key={item.title}
                className="hidden bg-purple-600 font-medium rounded transform px-2 py-1 md:flex items-center justify-center"
              >
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `${isActive ? "text-white" : null}`
                  }
                >
                  {item.title}
                </NavLink>
               
              </div>
            ) : null,
          )}
          {loginStatus && <div className="hidden bg-purple-600 font-medium rounded transform px-2 py-1 md:flex items-center justify-center">
          <LogoutBtn/>
          </div>}
        </div>

        {/* mobile */}
        <div>
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="md:hidden bg-purple-600 font-medium rounded py-1 px-2"
          >
            menu
          </button>
        </div>
      </nav>
      {mobileMenu && (
        <div className="md:hidden flex flex-col gap-4 py-2 px-2">
          {navItems.map((item) => {
            if (item.show) {
              return (
                  <div className="bg-purple-600 font-medium rounded py-1 px-2" key={item.title} >
                <NavLink to={item.path}  onClick={() => setMobileMenu(false)} >
                    {item.title}
                </NavLink>
                    </div>
              );
            }
          })}
          {loginStatus && <div  onClick={() => setMobileMenu(false)} className=" bg-purple-600 font-medium rounded transform px-2 py-1 md:flex items-center justify-center" >
          <LogoutBtn/>
          </div>}
        </div>
      )}
    </div>
  );
}
