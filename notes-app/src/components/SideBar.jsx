import "../styles/SideBar.css";
import React from "react";
export default function SideBar() {
  return (
    <>
      <div className="side-bar">
        <div className="side-bar-a-div">
          <a href="/my-notes" className="side-bar-a">
            My Notes
          </a>
        </div>
        <div className="side-bar-a-div">
          <a href="/create-note" className="side-bar-a">
            Create Note
          </a>
        </div>
        <div className="side-bar-a-div">
          <a href="/about" className="side-bar-a">
            About App
          </a>
        </div>
      </div>
    </>
  );
}
