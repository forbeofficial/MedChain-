import { BrowserRouter,Route,Routes } from "react-router-dom"
import Role from "./pages/role"
import MainPage from "./pages/mainpage"
import Signin from "./pages/signin"
import { Dashboard } from "./pages/dashboard"
import { Layout } from "./Layout"
import { Signup } from "./pages/signup"
import Error from "./pages/404"
import { PrivateRoute } from "./PrivateRoute";

export default function Approutes(){
    return(
        <>
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route path="/landing" element={<MainPage/>}/>
                <Route path="/role"  element={<Role/>}/>
                <Route path="/signin" element={<Signin/>}/>
                <Route path="/signup" element={<Signup/>}/>
            <Route element={<PrivateRoute />}>

                <Route path="/dashboard" element={<Dashboard/>}/>
            </Route>
                <Route path="*" element={< Error/>} />

                <Route/>
            </Route>
        </Routes>
        </BrowserRouter>
        </>
    )
}