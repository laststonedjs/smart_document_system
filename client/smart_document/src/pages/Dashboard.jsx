import { useEffect, useState } from "react";
// components
import DocumentReview from "../components/DocumentReview";
import Button from "../components/Button";
// api
import api from "../services/api";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const Dashboard = () => {
  const [documents, setDocuments] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDocuments = documents.filter((doc) => {
    const matchesStatus =
      statusFilter === "all" || doc.status === statusFilter;

    const supplier = doc.supplier ? doc.supplier.toLowerCase() : ""; 
    const documentNumber = doc.documentNumber ? doc.documentNumber.toLowerCase() : "";
    const search = searchTerm.toLowerCase();
    const matchesSearch = supplier.includes(search) || documentNumber.includes(search);

    return matchesStatus && matchesSearch;
  });

  const fetchDocs = async () => {
    const res = await api.get(
      `${API_URL}/api/documents`,
    );
    setDocuments(res.data);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchDocs();
  }, []);

  // useEffect(() => {
  //   return () => {
  //     setSelectedDoc(null);
  //   };
  // }, []); 

  // const closeModal = () => setSelectedDoc(null);

  const handleSaved = async () => {
    await fetchDocs();
    setSelectedDoc(null);
  };

  return (
    <div>
      {/* Filters */}
      <div className="filter-container">
        <input
          type="text"
          placeholder="Search by supplier or number..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="status-select"
        >
          <option value="all">
            All
          </option>
          <option value="validated">
            Validated
          </option>
          <option value="needs_review">
            Needs Review
          </option>
        </select>
      </div>

      <div className="dashboard">
        {filteredDocuments.map((doc) => (
            <div key={doc._id} className="card">
              <div className="card-header">
                  <h3>{doc.supplier || "Unknown"}</h3>
                  <span className={`status ${doc.status}`}>
                    {doc.status}
                  </span>
              </div>
              <div className="card-stats">
                  <span><strong>Number:</strong> {doc.documentNumber}</span>
                  <span><strong>Type:</strong> {doc.documentType}</span>
                  <span><strong>Total:</strong> {doc.total} {doc.currency}</span>
              </div>
              <Button
                  onClick={() => setSelectedDoc(doc)}
                  variant="primary"  
              >
                  View
              </Button>
            </div>
        ))}
      </div>

      {selectedDoc && (
        <div className="modal-overlay" style={{
          position: "fixed",
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000,
        }}>
          <div className="modal-content" style={{
            backgroundColor: "#fff",
            padding: "2rem",
            borderRadius: "8px",
            maxWidth: "800px",
            width: "100%",
            maxHeight: "90vh",
            overflowY: "auto",
            position: "relative",
          }}>
            <button 
              onClick={() => setSelectedDoc(null)} 
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "transparent",
                backgroundColor: "red",
                borderRadius: "20%",
                border: "none",
                fontSize: "1.2rem",
                cursor: "pointer",
              }}
              aria-label="Close modal"
            >
              &times;
            </button>
            <DocumentReview data={selectedDoc} onSaved={handleSaved} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;