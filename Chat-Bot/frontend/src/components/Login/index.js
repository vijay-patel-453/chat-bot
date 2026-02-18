import React, { useState } from "react";
import "./index.css";

const Login = ({ onLogin, goToRegister }) => {
  const [email, setEmail] = useState("");

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Welcome Back</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onLogin();
          }}
        >
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input type="password" placeholder="Password" required />
          <button type="submit" className="auth-btn">
            Sign In
          </button>
        </form>
        <p>
          New here?{" "}
          <span onClick={goToRegister} className="auth-link">
            Create account
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
