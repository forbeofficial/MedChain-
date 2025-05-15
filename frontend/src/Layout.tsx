
import { Outlet } from "react-router-dom"
import { TopNavbar } from "./components/Navbar"
export function Layout(){
    return (
    <>
    <TopNavbar/>
    <Outlet/>
    </>
    )
}