import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FileCase.css';

const FileCase = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Civil');
  const [document, setDocument] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('document', document);
    formData.append('petitionerId', user.id); // Save reference

    try {
      const response = await fetch('http://localhost:5000/api/cases', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        alert('Case filed successfully!');
        navigate('/petitioner-dashboard');
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (err) {
      alert('Server error while filing case!');
      console.error(err);
    }
  };

  return (
    <div className="file-case-form">
      <h2>File New Case</h2>
      <form onSubmit={handleSubmit}>
        <label>Case Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={5}
          required
        />

        <label>Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option>Civil</option>
          <option>Criminal</option>
          <option>Family</option>
          <option>Labor</option>
          <option>Others</option>
        </select>

        <label>Upload Document</label>
        <input
          type="file"
          accept=".pdf,.jpg,.png"
          onChange={(e) => setDocument(e.target.files[0])}
          required
        />

        <button type="submit">Submit Case</button>
      </form>
    </div>
  );
};

export default FileCase;
