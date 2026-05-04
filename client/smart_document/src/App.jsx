import { useState } from "react";
import UploadPage from "./pages/UploadPage";
import Dashboard from "./pages/Dashboard";

function App() {
  const [page, setPage] = useState("upload");

  return (
    <div>
      {/* NAVBAR */}
      <div style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
        <div className="main-button">
          <button 
            onClick={() => setPage("upload")}
            className="btn nav-btn-upload"  
          >
            Upload
          </button>
          <button 
            onClick={() => setPage("dashboard")}
            className="btn nav-btn-dashboard"
          >
              Dashboard
          </button>
        </div>
      </div>

      {/* PAGES */}   
      {page === "upload" && <UploadPage />}
      {page === "dashboard" && <Dashboard />}
    </div>
  );
}

export default App;