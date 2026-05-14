import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
// components
import DocumentReview from "../components/DocumentReview";
// helpers
import { getEndpoint } from "../helpers/getEndpoint";
// api
import api from "../services/api";
import Button from "../components/Button";

import toast from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const reviewRef = useRef(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return toast.error("Select a file please");

    const type = getEndpoint(file);
    if (!type) {
        toast.error("Unsupported file type");
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
      setTimeout(() => {
        reviewRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    } catch (err) {
      console.error(err);
      toast.error("Upload failed!");
    } finally {
      setLoading(false);
    }
  };

  const handleSaved = () => {
    setResponse(null);
  };

  return (
    <div className="upload-page">
      <div className="upload-header">
        <div>
          <h1>Document Upload</h1>
          <p>
            Upload and process your documents
          </p>
        </div>

        <Button
          onClick={() => navigate("/dashboard")}
          variant="primary"
        >
          Dashboard
        </Button>
      </div>

    <div className="upload-card">
      <div className="upload-left">
        <div className="upload-dropzone">
          <input
            type="file"
            onChange={handleFileChange}
          />

          <div className="upload-placeholder">
            <div className="upload-icon">
              ☁️
            </div>

            <h3>
              Drop your files here
            </h3>

            <p>
              or browse from your computer
            </p>
          </div>
        </div>
      </div>

      <div className="upload-right">
        <h3>Upload Details</h3>

        <div className="upload-info">
          <div className="info-row">
            <span>File Name</span>
            <strong>
              {file ? file.name : "No file selected"}
            </strong>
          </div>

          <div className="info-row">
            <span>File Type</span>
            <strong>
              {file
                ? file.name.split(".").pop()
                : "-"}
            </strong>
          </div>

          <div className="info-row">
            <span>Status</span>
            <strong>
              {loading
                ? "Uploading..."
                : "Ready"}
            </strong>
          </div>
        </div>

        <div className="upload-actions">
          <Button
            onClick={handleUpload}
            disabled={loading}
            variant="upload"
          >
            {loading
              ? "Uploading..."
              : "Upload Document"}
          </Button>
        </div>
      </div>
    </div>

    {response && (
      <div
        ref={reviewRef}
        style={{ marginTop: "40px" }}
      >
        <DocumentReview
          data={response}
          onSaved={handleSaved}
          hideEdit={true}
        />
      </div>
    )}
  </div>
  );
};

export default UploadPage;