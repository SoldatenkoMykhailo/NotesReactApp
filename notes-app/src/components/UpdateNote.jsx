import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import TopBar from "./TopBar";
import SideBar from "./SideBar";

export default function UpdateNote() {
  let { noteID } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    async function getNote() {
      const token = localStorage.getItem("token");

      try {
        const response = await fetch(
          `http://localhost:5000/api/notes/${noteID}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await response.json();
        console.log(data);
        setTitle(data.title);
        setContent(data.content);
      } catch (err) {
        console.log(err.message);
      }
    }

    getNote();
  }, [noteID]);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/api/notes/${noteID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ title, content }),
        },
      );

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
      <div>
        <TopBar />
        <SideBar />
      </div>
      <div className="create-text-div">
        <h1
          style={{
            fontFamily: 'Georgia, "Times New Roman", Times, serif',
          }}
        >
          Update your note
        </h1>
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
          <button
            className="create-note-btn"
            type="submit"
            style={{
              top: "29.2%",
            }}
          >
            ✔️
          </button>
        </form>
      </div>
    </>
  );
}
