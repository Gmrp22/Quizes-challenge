import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/dashboard", label: "Dashboard" },
];

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  return (
    <nav className="bg-white shadow mb-6">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <span className="font-bold text-xl text-primary">AI Quiz App</span>
          {user && navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`font-medium hover:text-blue-600 transition px-2 py-1 rounded ${location.pathname === link.to ? "text-blue-700 bg-blue-100" : "text-gray-700"}`}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-4">
          {user ? (
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-4 rounded transition"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="text-blue-600 hover:underline font-medium">Login</Link>
              <Link to="/register" className="text-blue-600 hover:underline font-medium">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
