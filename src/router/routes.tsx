import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import RootLayout from "../pages/layout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import HomePage from "../pages";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import ErrorHandler from "../components/error/ErrorHandler";

const storageKey = "isLoggedIn";
const userDataString = localStorage.getItem(storageKey);
const userData = userDataString ? JSON.parse(userDataString) : null;
const router = createBrowserRouter(
    createRoutesFromElements(
        <>
        <Route path="/" element={<RootLayout/>} errorElement={<ErrorHandler/>}>
        <Route index element={ 
            <ProtectedRoute isAllowed={userData?.jwt} redirectPath={"/login"} data={userData}>
                <HomePage/>
            </ProtectedRoute>
        }/>
        <Route path="profile" element={ 
            <ProtectedRoute isAllowed={userData?.jwt} redirectPath={"/login"} data={userData}>
                <h1>this is profile page !</h1>
            </ProtectedRoute>
        }/>
        <Route path="login" element={<Login/>}/>
        <Route path="register" element={<Register/>}/>
        
        </Route>
        </>
    )
)

export default router