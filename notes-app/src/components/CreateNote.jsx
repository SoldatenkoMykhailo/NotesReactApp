import "../styles/CreateNote.css";
import React from "react";
import TopBar from "./TopBar";
import SideBar from "./SideBar";
import { useState } from "react";

export default function CreateNote() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const token = localStorage.getItem("token");
      console.log(token);
      const response = await fetch("http://localhost:5000/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content }),
      });

      if (!response.ok) {
        throw new Error("Error creating note!");
      }

      const data = await response.json();
      console.log(data);
      setTitle("");
      setContent("");
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <>
      <div className="top-side-bar">
        <TopBar />
        <SideBar />
        <button
          className="create-graphic-note-btn"
          onClick={() => {
            window.location.href = "/create-graphic-note";
          }}
        >
          🖌️
        </button>
        <div className="create-text-div">
          <form onSubmit={handleSubmit} className="create-note-form">
            <input
              type="text"
              className="create-note-title"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <p
              style={{
                fontSize: "18px",
                fontFamily: 'Georgia, "Times New Roman", Times, serif',
              }}
            >
              Enter the text:
            </p>
            <textarea
              className="create-text-area"
              name="create-note-text-area"
              id="create-note-text-area"
              placeholder="Type..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
            <button className="create-note-btn" type="submit">
              ✔️
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
