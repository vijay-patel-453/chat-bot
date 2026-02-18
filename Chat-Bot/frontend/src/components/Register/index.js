import React, { useState } from "react";
import "../Login/index.css";

const Register = ({ onRegister }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Registration Successful! Please login.");
        onRegister(); // Redirect to login view
      } else {
        const error = await response.json();
        alert(error.message);
      }
    } catch (err) {
      console.error("Connection failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Full Name"
            required
            onChange={(e) =>
              setFormData({ ...formData, fullName: e.target.value })
            }
          />
          <input
            type="email"
            placeholder="Email"
            required
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="Password"
            required
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <button type="submit" className="auth-btn">
            Create Account
          </button>
        </form>
        <p>
          Already have an account?{" "}
          <span onClick={onRegister} className="auth-link">
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
