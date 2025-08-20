import React, { useState } from "react";
import { FaSearch, FaEdit, FaTrash, FaPlus, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./CaseManagement.css";

const CaseManagement = () => {
  const navigate = useNavigate();

  const [cases, setCases] = useState([
    { id: 1, title: "Case #101 - Theft", status: "Open", lawyer: "John Doe" },
    { id: 2, title: "Case #102 - Fraud", status: "Assigned", lawyer: "Jane Smith" },
    { id: 3, title: "Case #103 - Civil Dispute", status: "Closed", lawyer: "N/A" },
  ]);

  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ id: "", title: "", status: "Open", lawyer: "" });
  const [editingId, setEditingId] = useState(null);

  const handleAddNew = () => {
    setFormData({ id: "", title: "", status: "Open", lawyer: "" });
    setEditingId(null);
    setShowForm(true);
  };

  const handleEdit = (caseData) => {
    setFormData(caseData);
    setEditingId(caseData.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setCases(cases.filter((c) => c.id !== id));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (editingId) {
      // Update case
      setCases(cases.map((c) => (c.id === editingId ? formData : c)));
    } else {
      // Add new case
      setCases([...cases, { ...formData, id: cases.length + 1 }]);
    }
    setShowForm(false);
  };

  const filteredCases = cases.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="case-page">
      <div className="page-header">
        <h2>Case Management</h2>
        <div className="header-actions">
          <button className="back-btn" onClick={() => navigate("/admin-dashboard")}>
            <FaArrowLeft /> Back to Dashboard
          </button>
          <button className="add-btn" onClick={handleAddNew}>
            <FaPlus /> Add New Case
          </button>
        </div>
      </div>

      {/* Search bar */}
      <div className="search-bar">
        <FaSearch />
        <input
          type="text"
          placeholder="Search cases..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Case form */}
      {showForm && (
        <form className="case-form" onSubmit={handleFormSubmit}>
          <input
            type="text"
            placeholder="Case Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          >
            <option>Open</option>
            <option>Assigned</option>
            <option>Closed</option>
          </select>
          <input
            type="text"
            placeholder="Lawyer Name"
            value={formData.lawyer}
            onChange={(e) => setFormData({ ...formData, lawyer: e.target.value })}
          />
          <button type="submit" className="save-btn">
            {editingId ? "Update Case" : "Add Case"}
          </button>
          <button type="button" className="cancel-btn" onClick={() => setShowForm(false)}>
            Cancel
          </button>
        </form>
      )}

      {/* Case Table */}
      <table className="case-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Case Title</th>
            <th>Status</th>
            <th>Lawyer</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCases.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.title}</td>
              <td className={`status ${c.status.toLowerCase()}`}>{c.status}</td>
              <td>{c.lawyer}</td>
              <td>
                <button className="edit-btn" onClick={() => handleEdit(c)}>
                  <FaEdit />
                </button>
                <button className="delete-btn" onClick={() => handleDelete(c.id)}>
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CaseManagement;
