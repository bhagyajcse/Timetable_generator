import React, { useState } from "react";
import "./App.css";

function Login({ onLogin }) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {

    // Simple demo login
    if (
      username === "admin" &&
      password === "admin123"
    ) {
      onLogin(true);
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="login-container">

      <div className="login-card">

        <h1>Timetable Generator</h1>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button onClick={handleLogin}>
          Login
        </button>

      </div>

    </div>
  );
}

export default Login;