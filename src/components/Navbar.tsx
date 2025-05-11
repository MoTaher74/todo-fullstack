// import { NavLink } from "react-router-dom";

import { NavLink, useLocation } from "react-router-dom";
import Button from "./ui/Button";


const Navbar =()=>{

const storageKey = "isLoggedIn";
const userDataString = localStorage.getItem(storageKey);
const userData = userDataString ? JSON.parse(userDataString) : null;

const {pathname} = useLocation();
const logout = ()=>{
    localStorage.removeItem(storageKey);

    setTimeout(() => {
        location.replace(pathname)
    }, 1500);
}

return (
<nav className="max-w-lg mx-auto px-4 py-6 mt-7 mb-20 rounded-md border shadow-md">
    <ul className="flex items-center justify-between font-semibold">
        <li className="">
            <NavLink to={"/"}>Home</NavLink>
        </li>
        {userData? (
            <div className="flex items-center space-x-4 font-semibold text-md">
                <li className="text-black duration-200 ">
                    <NavLink to ={"/profile"}>Profile</NavLink>
                </li>
                <Button className="bg-red-600 hover:bg-red-800" width="w-fit" onClick={logout}>Logout</Button>

            </div>
            ):(  <p className="flex space-x-4 items-center">
  <li>
            <NavLink to ={"/register"}>Register</NavLink>
        </li>
        <li>
            <NavLink to ={"/login"}>Login</NavLink>
        </li>
  </p>)}

        </ul>
</nav>

)
}

export default Navbar ;