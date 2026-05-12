import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// components
import DocumentReview from "../components/DocumentReview";
// helpers
import { getEndpoint } from "../helpers/getEndpoint";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert("Select a file");

    const type = getEndpoint(file);
    if (!type) {
        alert("Unsupported file type");
        return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${API_URL}/api/upload/${type}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );

      setResponse(res.data);
    } catch (err) {
      console.error(err);
      alert("Upload failed!");
    } finally {
      setLoading(false);
    }
  };

  const handleSaved = () => {
    setResponse(null);
  };

  return (
    <div style={{ padding: "2rem", textAlign: "left" }}>
      <div style={{ marginBottom: "1rem" }}>
        <button
          onClick={() => navigate("/dashboard")}
          className="btn navigate-btn"
        >
          Go to Dashboard
        </button>
      </div>

      <h2>Upload Document</h2>
      <div className="upload-btn">
        <input type="file" onChange={handleFileChange}/>

        <button onClick={handleUpload} disabled={loading} className="btn btn-upload">
            {loading ? "Uploading..." : "Upload"}
        </button>
      </div>  

      {response && (
        <DocumentReview 
          data={response} 
          onSaved={handleSaved}
          hideEdit={true} 
        />
      )}
    </div>
  );
};

export default UploadPage;