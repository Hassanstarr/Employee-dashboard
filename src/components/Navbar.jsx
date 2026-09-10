import { FaUsers } from "react-icons/fa";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <FaUsers />
        <span>Employee Dashboard</span>
      </div>

      <div className="navbar-user">
        <span>Admin</span>
      </div>
    </nav>
  );
}

export default Navbar;