import React, { useEffect, useState, useRef } from "react";
import TopBar from "./TopBar";
import SideBar from "./SideBar";
import "../styles/CreateGraphicNote.css";

export default function CreateGraphicNote() {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const inputRef = useRef();
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 700;
    canvas.height = 480;

    const context = canvas.getContext("2d");
    context.lineCap = "round";
    context.strokeStyle = "black";
    context.lineWidth = 1;
    contextRef.current = context;
  }, []);

  function startDrawing(event) {
    const { nativeEvent } = event;
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  }

  function finishDrawing() {
    contextRef.current.closePath();
    setIsDrawing(false);
  }

  function draw(event) {
    const { nativeEvent } = event;
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  }

  function clear() {
    const canvas = canvasRef.current;
    contextRef.current.clearRect(0, 0, canvas.width, canvas.height);
  }

  async function save() {
    const canvas = canvasRef.current;
    const imageData = canvas.toDataURL("image/png");
    const title = inputRef.current.value;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: title, image: imageData }),
      });

      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <>
      <div className="top-side-bar">
        <TopBar />
        <SideBar />
      </div>
      <div className="canvas-div">
        <button
          onClick={() => {
            window.location.href = "/create-note";
          }}
          className="clear-save-back-btns back"
        >
          🔙
        </button>
        <input
          type="text"
          ref={inputRef}
          className="title-input"
          placeholder="Title"
        />
        <p
          style={{
            fontFamily: 'Georgia, "Times New Roman", Times, serif',
            fontSize: "18px",
          }}
        >
          Draw your note:
        </p>
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseUp={finishDrawing}
          onMouseMove={draw}
          onMouseOut={finishDrawing}
          className="canvas-field"
        ></canvas>
        <button onClick={clear} className="clear-save-back-btns clear">
          🗑️
        </button>
        <button onClick={save} className="clear-save-back-btns save">
          💾
        </button>
      </div>
    </>
  );
}
