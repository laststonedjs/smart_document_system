import { useNavigate, useLocation } from "react-router-dom"
import Button from "./Button"

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();  

  const isDashboard = 
    location.pathname === "/dashboard";

  const isUpload = 
    location.pathname === "/upload";

  return (
    <div className="navbar">
        <div className="navbar-left">
            <h2 className="navbar-logo">
                Smart Document
            </h2>
        </div>

        <div className="navbar-right">
        {isUpload && (
          <Button
            onClick={() =>
              navigate("/dashboard")
            }
            variant="primary"
          >
            Dashboard
          </Button>
        )}

        {isDashboard && (
          <Button
            onClick={() =>
              navigate("/upload")
            }
            variant="primary"
          >
            Upload
          </Button>
        )}

        <Button
          onClick={() => {
            localStorage.removeItem(
              "token"
            );

            navigate("/login");
          }}
          variant="danger"
        >
          Logout
        </Button>
      </div>
    </div>
  )
}

export default Navbar