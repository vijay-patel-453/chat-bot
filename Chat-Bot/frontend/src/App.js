import React, { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";

function App() {
  const [view, setView] = useState("login");

  return (
    <div className="App">
      {view === "login" && (
        <Login
          onLogin={() => setView("dashboard")}
          goToRegister={() => setView("register")}
        />
      )}
      {view === "register" && <Register onRegister={() => setView("login")} />}
      {view === "dashboard" && <Dashboard onLogout={() => setView("login")} />}
    </div>
  );
}

export default App;
