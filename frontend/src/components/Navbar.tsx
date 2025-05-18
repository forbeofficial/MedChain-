import { Link } from "react-router-dom";

export function TopNavbar({ isLoggedIn }) {
  return (
    <nav className="bg-black text-white p-4 flex justify-between items-center">
      <div className="flex space-x-6 text-sm font-semibold">
    
        <Link to="/landing" className="hover:text-gray-300 transition">
          ABOUT US
          </Link>
          {!isLoggedIn && (
          <>
            <Link to="/role" className="hover:text-gray-300 transition">
              REGISTER
            </Link>
            <Link to="/signin" className="hover:text-gray-300 transition">
              LOG IN
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
