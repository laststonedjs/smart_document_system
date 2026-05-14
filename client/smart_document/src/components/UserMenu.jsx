import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const UserMenu = () => {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const menuRef = useRef();

  const token = localStorage.getItem("token");

  let user = null;

  if (token) {
    user = jwtDecode(token);
  }

  const email = user?.email || "User";
  const nameLetter = email.charAt(0).toUpperCase();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/login");
  };

  return (
    <div
      className="user-menu"
      ref={menuRef}
    >
      <button
        className="avatar-btn"
        onClick={() => setOpen(!open)}
      >
        {nameLetter}
      </button>

      {open && (
        <div className="user-dropdown">
          <div className="user-info">
            <p className="user-name">
              {email}
            </p>
          </div>

          <div className="dropdown-divider" />

          <button
            className="dropdown-item"
            onClick={() =>
              navigate("/profile")
            }
          >
            Profile
          </button>

          <button
            className="dropdown-item"
            onClick={() =>
              navigate("/settings")
            }
          >
            Account Settings
          </button>

          <button
            className="dropdown-item logout"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;