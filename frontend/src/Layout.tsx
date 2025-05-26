import { Outlet } from "react-router-dom"
import { TopNavbar } from "./components/Navbar"
import { useState, useEffect } from "react"

export function Layout(){
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const userToken = localStorage.getItem("token");
        setIsLoggedIn(!!userToken);
    }, []);

    return (
        <>
{/* {!isLoggedIn && <TopNavbar />} */}
<TopNavbar />
<Outlet />
        </>
    );
}



// }'
// {"error":"Access denied. No token provided."}snk@fedora:~$ curl -X POST http://localhost:5000/curl -X POST http://localhost:5000/api/auth/signup \
//   -H "Content-Type: application/json" \
//   -d '{
//     "name": "Ravi Kumar",
//     "username": "ravikumar123",
//     "email": "ravi.kumar@example.com",
//     "password": "mySecurePass789",
//     "phone": "9812345678",
//     "blockchainWallet": "0x998877665544332211",
//     "userType": "patient"
//   }'
