import React, { useState } from "react";
import "./Settings.css";

const Settings = () => {
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("");

  const handleSave = () => {
    alert("Settings saved!");
  };

  return (
    <div className="settings-page">
      <h2>Platform Settings</h2>

      <div className="settings-card">
        <label>Admin Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} />

        <label>Change Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <button onClick={handleSave}>Save Changes</button>
      </div>
    </div>
  );
};

export default Settings;
