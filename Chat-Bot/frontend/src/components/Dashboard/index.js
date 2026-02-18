import React, { useState } from "react";
import Home from "../Home";
import About from "../About";
import Careers from "../Careers";
import Notifications from "../Notifications";
import ChatWidget from "../ChatWidget";
import "./index.css";

const Dashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState("Home");

  // Logic to render the correct component based on activeTab
  const renderComponent = () => {
    switch (activeTab) {
      case "Home":
        return <Home />;
      case "About":
        return <About />;
      case "Careers":
        return <Careers />;
      case "Notifications":
        return <Notifications />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="sidebar-logo">Innoira</div>
        <ul className="sidebar-menu">
          {["Home", "About", "Careers", "Notifications"].map((item) => (
            <li
              key={item}
              className={activeTab === item ? "active" : ""}
              onClick={() => setActiveTab(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      </aside>

      <main className="main-viewport">
        <header className="content-header">
          <h1 className="header-title">Innoira</h1>
          <button onClick={onLogout} className="top-logout-btn">
            Logout
          </button>
        </header>

        <section className="page-content">
          <div className="content-card">{renderComponent()}</div>
        </section>
      </main>

      <ChatWidget />
    </div>
  );
};

export default Dashboard;
