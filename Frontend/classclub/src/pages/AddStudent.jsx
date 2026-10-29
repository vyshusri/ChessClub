import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddStudent.css";

function AddStudent() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    const token = localStorage.getItem("token");

    if (!token) {
      setError("Admin login required.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8081/api/admin/students",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            role: "STUDENT",
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(
          typeof data === "string"
            ? data
            : "Unable to create student."
        );
        return;
      }

      setMessage("Student added successfully!");

      setFormData({
        name: "",
        email: "",
        password: "",
      });

    } catch (error) {
      setError("Unable to connect to the server.");
    }
  };

  return (
    <div className="add-student-page">

      <div className="add-student-card">

        <button
          className="back-button"
          onClick={() => navigate("/admin-dashboard")}
        >
          ← Back to Dashboard
        </button>

        <div className="chess-icon">♟</div>

        <h1>Add Student</h1>

        <p className="subtitle">
          Create a training student account
        </p>

        <form onSubmit={handleSubmit}>

          <label>Student Name</label>

          <input
            type="text"
            name="name"
            placeholder="Enter student name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label>Email</label>

          <input
            type="email"
            name="email"
            placeholder="Enter student email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Password</label>

          <input
            type="password"
            name="password"
            placeholder="Create student password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="add-student-button"
          >
            Add Student
          </button>

        </form>

        {message && (
          <p className="success-message">
            ✓ {message}
          </p>
        )}

        {error && (
          <p className="error-message">
            {error}
          </p>
        )}

      </div>

    </div>
  );
}

export default AddStudent;