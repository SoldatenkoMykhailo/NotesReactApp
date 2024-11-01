import "../styles/MyNotes.css";
import React, { useEffect, useState, useRef } from "react";
import TopBar from "./TopBar";
import SideBar from "./SideBar";

export default function MyNotes() {
  const [notes, setNotes] = useState([]);
  const [originNotes, setOriginNotes] = useState([]);
  const inputRef = useRef();

  useEffect(() => {
    async function fetchNotes() {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:5000/api/notes", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        console.log(data);
        setNotes(data);
        setOriginNotes(data);
      } catch (err) {
        console.log(err.message);
      }
    }

    fetchNotes();
  }, []);

  function search() {
    if (inputRef.current.value === "") setNotes(originNotes);
    else {
      setNotes(
        originNotes.filter((item) =>
          item.title.includes(inputRef.current.value),
        ),
      );
    }
  }

  function clear() {
    inputRef.current.value = "";
    setNotes(originNotes);
  }

  function updateNote(id, isGraphic) {
    const editPage = isGraphic
      ? `/update-graphic-note/${id}`
      : `/update-note/${id}`;
    window.location.href = editPage;
  }

  async function deleteNote(id) {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`http://localhost:5000/api/notes/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response);
      window.location.reload();
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
      <div className="search-div">
        <input
          ref={inputRef}
          type="text"
          onInput={search}
          placeholder="Search"
          className="search-input"
        />
        <button onClick={clear} className="clear-search-btn">
          ❌
        </button>
      </div>

      <div className="note-divs">
        {notes.length !== 0 ? (
          notes.map((item) => (
            <div key={item._id} className="note-div">
              <div style={{ textAlign: "center" }}>
                {item.title && (
                  <span
                    style={{
                      fontFamily: 'Georgia, "Times New Roman", Times, serif',
                      fontSize: "18px",
                    }}
                  >
                    {item.title}
                  </span>
                )}
              </div>

              <hr />
              {item.content && (
                <p
                  style={{
                    fontFamily: 'Georgia, "Times New Roman", Times, serif',
                    fontSize: "12px",
                    lineHeight: "20px",
                  }}
                >
                  {item.content}
                </p>
              )}
              {item.image && (
                <img
                  src={item.image}
                  style={{
                    width: "240px",
                    height: "210px",
                  }}
                />
              )}
              <div className="note-div-footer">
                {item.updatedAt && (
                  <span>{new Date(item.updatedAt).toLocaleString()}</span>
                )}
                <button
                  onClick={() => updateNote(item._id, !!item.image)}
                  className="edit-note-btn"
                >
                  ✏️
                </button>
                <button
                  onClick={() => deleteNote(item._id)}
                  className="delete-note-btn"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))
        ) : (
          <p
            style={{
              fontFamily: 'Georgia, "Times New Roman", Times, serif',
              fontSize: "20px",
            }}
          >
            There are no notes. Add your first one
          </p>
        )}
      </div>
    </>
  );
}
