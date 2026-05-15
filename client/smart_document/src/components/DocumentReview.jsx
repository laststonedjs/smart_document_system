import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// api
import api from "../services/api";
// components
import Button from "./Button";

import toast from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const DocumentReview = ({ data, onSaved, hideEdit }) => {
    const [editableData, setEditableData] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [dateError, setDateError] = useState(null);

    const navigate = useNavigate();
        
    useEffect(() => {
        if (data) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setEditableData(data);
        }
    }, [data]);

    if (!editableData) return null;

    if (!data) return null;

        const {
        documentType,
        supplier,
        documentNumber,
        date,
        total,
        subtotal,
        tax,
        currency,
        issues = [],
        status,
        } = editableData;

    const isValidDateInput = (dateString) => {
        const regex = /^\d{4}\.\d{2}\.\d{2}$/;
        if (!regex.test(dateString)) return false;
        const [year, month, day] = dateString.split(".").map(Number);
        const date = new Date(year, month - 1, day);
        return (
            date.getFullYear() === year &&
            date.getMonth() === (month - 1) &&
            date.getDate() === day
        );
    };

    const handleChange = (field, value) => {
        if (field === "date") {
            if (!value) {
                setDateError("Date is required");
            } else if (!isValidDateInput(value)) {
                setDateError("Date must be in YYYY. MM.DD format and valid");
            } else {
            setDateError(null);
            }
        }

        setEditableData((prev) => {
        const updated = {
        ...prev,
        [field]: value,
    };

        // recalculation
        if (field === "subtotal" || field === "tax") {
        const subtotal = Number(updated.subtotal) || 0;
        const tax = Number(updated.tax) || 0;

        updated.total = subtotal + tax;
        }

        return updated;
    });
    };

    const handleSave = async () => {
        if (dateError) {
            toast.error("Please fix issues before saving");
            return;
        }
        try {

            let payload = {
                ...editableData,
                subtotal: Number(editableData.subtotal),
                tax: Number(editableData.tax),
                total: Number(editableData.total),
            };
            let res;

            if (editableData._id) {
            res = await api.put(
                `${API_URL}/api/documents/${editableData._id}`,
                payload,
            );
            } else {
            res = await api.post(
                `${API_URL}/api/documents`,
                payload,
            );
            }

            setEditableData(res.data);
            
            if(onSaved) onSaved(res.data);    

            toast.success("Saved successfully!");
            navigate("/dashboard");
            setEditMode(false);
            } catch (err) {
                console.error("Save error:", err);
                toast.error("Save failed");
        }
    };

    const handleDelete = async () => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this document?"
        );

        if (!confirmDelete) return;

        try {
            await api.delete(
                `${API_URL}/api/documents/${editableData._id}`
            );

            toast.success("Document deleted");

            if (onSaved) await onSaved();

        } catch (error) {
            console.error(error);

            toast.error("Delete failed");
        }
    };

    const hasIssues = (issues, type) => {
        return issues.some((issue) => issue.type === type);
    }

    const getFieldStyle = (isError) => ({
        color: isError ? "red" : "black",
        fontWeight: isError ? "bold" : "normal", 
    });

    return (
    <div className="document-container">
    <h2 className="title">Document Review</h2>
        <hr />
        <div className="info-grid">
            <div className="row">
                <span className="label">Type:{documentType}</span>
            </div>

            <div className="row">
                <span style={getFieldStyle(hasIssues(issues, "MISSING_SUPPLIER"))} className="label">
                    Supplier:
                    {editMode ? (
                        <input
                        value={editableData.supplier || ""}
                        onChange={(e) => handleChange("supplier", e.target.value)}
                        />
                    ) : (
                        <span>{supplier || "N/A"}</span>
                    )}
                </span>
            </div>

            <div className="row">
                <span className="label">
                    Number:
                    {editMode ? (
                        <input
                        value={editableData.documentNumber || ""}
                        onChange={(e) => handleChange("documentNumber", e.target.value)}
                        />
                    ) : (
                        <span>{documentNumber || "N/A"}</span>
                    )}
                </span>
            </div>

            <div className="row">  
                <span style={getFieldStyle(hasIssues(issues, "MISSING_DATE"))} className="label">
                    Date:
                    {editMode ? (
                        <input
                            type="text"
                            placeholder="YYYY.MM.DD"
                            value={editableData.date || ""}
                            onChange={(e) => handleChange("date", e.target.value)}
                        />
                    ) : (
                        <span>{date || "N/A"}</span>
                    )}
                </span>
                
            </div>          
            {dateError && <div style={{ color: "red", fontSize: "0.8rem" }}>{dateError}</div>}
            <div className="row">
                <span style={getFieldStyle(hasIssues(issues, "SUBTOTAL_MISMATCH"))} className="label">
                    Subtotal:
                    {editMode ? (
                        <input
                        value={editableData.subtotal || ""}
                        onChange={(e) => handleChange("subtotal", e.target.value)}
                        />
                    ) : (
                        <span>{subtotal || "N/A"}</span>
                    )}
                </span>
            </div>        

            <div className="row">
                <span className="label">
                    Tax:
                    {editMode ? (
                        <input
                        value={editableData.tax || ""}
                        onChange={(e) => handleChange("tax", e.target.value)}
                        />
                    ) : (
                        <span>{tax || "N/A"}</span>
                    )}
                </span>
            </div>              

            <div className="row">
                <span style={getFieldStyle(hasIssues(issues, "TOTAL_MISMATCH"))} className="label">
                    Total:
                    {editMode ? (
                    <input
                        value={editableData.total || ""}
                        onChange={(e) => handleChange("total", e.target.value)}
                    />
                    ) : (
                    <span>{total || "N/A"} {currency}</span>
                    )}
                </span>
            </div> 

            <div className="button-group">

            {/* DEFAULT MODE */}
            {!editMode && (
                <>
                <Button
                    onClick={handleSave}
                    variant="success"
                >
                    Save to dashboard
                </Button>

                {!hideEdit && (
                    <Button
                    onClick={() => setEditMode(true)}
                    variant="edit"
                >
                    Edit
                </Button>
                )}
                </>
            )}

            {editableData._id && !editMode && (
                <Button
                    onClick={handleDelete}
                    variant="danger"
                >
                    Delete
                </Button>
            )}

            {/* EDIT MODE */}
            {editMode && (
                <>
                <Button
                    onClick={handleSave}
                    variant="success"
                >
                    Confirm
                </Button>

                <Button
                    onClick={() => {
                    setEditableData(data);
                    setEditMode(false);
                    }}
                    variant="danger"
                >
                    Cancel
                </Button>
                </>
            )}

            </div>

            <div className="row">
                <span className="label">Status: {status} </span>
            </div>
        </div>

        <h4>Validation Results:</h4>
        {issues.length === 0 ? (
            <p className="no-issues">No issues!</p>
        ) : (
            <ul className="issues-list">
            {issues.map((issue, index) => (
                <li key={index} style={{ color: "red" }}>
                {issue.type} — {issue.message}
                </li>
            ))}
            </ul>
        )}
        </div>
    );
    };

    export default DocumentReview;