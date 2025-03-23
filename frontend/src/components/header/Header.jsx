import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function Header() {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="text-center text-xl font-bold py-4 bg-gray-800 shadow-md">
      <nav className="flex justify-between items-center px-4">
        <div>
          <NavLink to="/" className="text-white hover:text-blue-500 mx-2">
            Home
          </NavLink>
          {user && (
            <NavLink to="/chat" className="text-white hover:text-blue-500 mx-2">
              Chat
            </NavLink>
          )}
        </div>
        <div>
          {user ? (
            <button
              onClick={logout}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md transition font-bold text-sm"
            >
              Logout
            </button>
          ) : (
            <>
              <NavLink
                to="/login"
                className="text-white hover:text-blue-500 mx-2"
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="text-white hover:text-blue-500 mx-2"
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
