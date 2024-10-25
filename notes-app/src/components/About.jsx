import React from "react";
import TopBar from "./TopBar";
import SideBar from "./SideBar";
import "../styles/About.css";
import about from "../about-app";

export default function About() {
  return (
    <>
      <div className="top-side-bar">
        <TopBar />
        <SideBar />
      </div>
      <div className="about-div">
        <p
          style={{
            fontFamily: 'Georgia, "Times New Roman", Times, serif',
            fontSize: "18px",
          }}
        >
          About the app:
        </p>
        <div className="info-div">
          <p className="about-p">{about.about.header}</p>
          <ul>
            <li className="about-li">{about.about.features.first}</li>
            <li className="about-li">{about.about.features.second}</li>
            <li className="about-li">{about.about.features.third}</li>
            <li className="about-li">{about.about.features.fourth}</li>
          </ul>
          <p className="about-p">{about.about.footer}</p>
          <p className="about-p">{about.about.end}</p>
        </div>
      </div>
    </>
  );
}
