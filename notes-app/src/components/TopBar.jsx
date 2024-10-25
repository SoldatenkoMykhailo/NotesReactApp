import Profile from "./Profile";
import "../styles/TopBar.css";
import React, { useState } from "react";

export default function TopBar() {
  const [display, setDisplay] = useState(false);

  function overlay() {
    setDisplay(!display);
  }

  return (
    <>
      <div className="top-bar">
        <a href="/my-notes" className="notes-app-p">
          NotesApp
        </a>
        <button className="profile-btn" onClick={overlay}>
          📷
        </button>
      </div>
      <Profile isVisible={display} />
    </>
  );
}
