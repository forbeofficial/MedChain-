
import { Outlet } from "react-router-dom"
import { TopNavbar } from "./components/Navbar"
import { useState } from "react"
export function Layout(){

    const[isLoggedIn,setIsLoggedIn]=useState(false);
    useState(()=>{
        const userToken = localStorage.getItem("token");
        setIsLoggedIn(!!userToken);
    },[]);
    return (
    <>
    <TopNavbar isLoggedIn={isLoggedIn} />
    <Outlet/>
    </>
    )
}