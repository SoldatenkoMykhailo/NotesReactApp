import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router";
import TopBar from "./TopBar";
import SideBar from "./SideBar";

export default function UpdateGraphicNote() {
  let { noteID } = useParams();

  const canvasRef = useRef();
  const contextRef = useRef();

  const [isDrawing, setIsDrawing] = useState(false);
  const [title, setTitle] = useState("");

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 700;
    canvas.height = 480;
    const context = canvas.getContext("2d");
    context.lineCap = "round";
    context.strokeStyle = "black";
    context.lineWidth = 1;
    contextRef.current = context;

    async function fetchNote() {
      try {
        const token = localStorage.getItem("token");

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
        setTitle(data.title);

        if (data.image) {
          const img = new Image();
          img.src = data.image;
          img.onload = () => {
            context.drawImage(img, 0, 0, canvas.width, canvas.height);
          };
        }
      } catch (err) {
        console.log(err.message);
      }
    }

    fetchNote();
  }, [noteID]);

  function startDrawing(event) {
    const { offsetX, offsetY } = event.nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  }

  function finishDrawing() {
    contextRef.current.closePath();
    setIsDrawing(false);
  }

  function draw(event) {
    if (!isDrawing) return;
    const { offsetX, offsetY } = event.nativeEvent;
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
          body: JSON.stringify({ title: title, image: imageData }),
        },
      );

      const data = await response.json();
      console.log(data);
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
      <h1
        style={{
          fontFamily: 'Georgia, "Times New Roman", Times, serif',
          position: "absolute",
          top: "17%",
          left: "37%",
        }}
      >
        Update your note
      </h1>
      <div className="canvas-div">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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
