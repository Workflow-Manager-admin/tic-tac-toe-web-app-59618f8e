import React from "react";
import "./App.css";

/**
 * About page for the Tic Tac Toe app.
 * Minimal, modern, light-themed. Displays app info and navigation.
 */
// PUBLIC_INTERFACE
function About() {
  return (
    <div
      className="tic-tac-toe-app"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--bg-primary, #fff)",
        color: "var(--text-primary, #222)",
        padding: "60px 24px",
        transition: "background 0.3s"
      }}
    >
      <header
        className="tic-tac-toe-header"
        style={{
          color: "var(--primary, #1976D2)",
          fontWeight: 900,
          fontSize: "2.5rem",
          letterSpacing: 2,
          marginBottom: 16
        }}
      >
        About Tic Tac Toe
      </header>
      <p
        style={{
          fontSize: "1.15rem",
          color: "var(--text-secondary, #424242)",
          maxWidth: 400,
          textAlign: "center",
          marginBottom: 24
        }}
      >
        This web app lets you play a simple, classic game of Tic Tac Toe in a modern, minimal interface.<br /><br />
        Built in React with a lightweight aesthetic and a bright, accessible color scheme.
      </p>
      <a
        href="/"
        style={{
          color: "var(--button-text, #fff)",
          background: "var(--primary, #1976D2)",
          borderRadius: 8,
          padding: "12px 30px",
          textDecoration: "none",
          fontWeight: 600,
          letterSpacing: 1,
          fontSize: "1rem",
          boxShadow: "0 2px 10px 0 #1976D222",
          transition: "background 0.2s"
        }}
      >
        ← Back to Game
      </a>
      <div style={{marginTop:32, fontSize:"0.85rem", color:"var(--border-color, #E0E6EF)"}}>
        &copy; {new Date().getFullYear()} KAVIA · Made with React
      </div>
    </div>
  );
}

export default About;
