import { useState } from "react";
import { useNavigate } from "react-router-dom";
// components
import DocumentReview from "../components/DocumentReview";
// helpers
import { getEndpoint } from "../helpers/getEndpoint";
// api
import api from "../services/api";
import Button from "../components/Button";

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

      const res = await api.post(
        `${API_URL}/api/upload/${type}`,
        formData,
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
        <Button
          onClick={() => navigate("/dashboard")}
          variant="primary"
        >
          Go to Dashboard
        </Button>
      </div>

      <h2>Upload Document</h2>
      <div className="upload-btn">
        <input type="file" onChange={handleFileChange}/>

        <Button
          onClick={handleUpload} 
          disabled={loading} 
          variant="upload"
        >
            {loading ? "Uploading..." : "Upload"}
        </Button>
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