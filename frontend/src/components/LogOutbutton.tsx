import { useNavigate } from "react-router-dom";

export default function Logout() {
    const navigate = useNavigate();

    function handleLogout() {
        localStorage.removeItem("token"); 
        
        navigate("/signin");
    }

    return (
        <button
            type="button"
            onClick={handleLogout}
            className="text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 me-2 mb-2"
        >
           
            LOGOUT
        </button>
    );
}
