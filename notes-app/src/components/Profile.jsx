import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "../styles/Profile.css";

export default function Profile({ isVisible }) {
  const [info, setInfo] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    async function fetchUser() {
      try {
        const response = await fetch("http://localhost:5000/api/auth/user", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        setInfo(data);
      } catch (err) {
        console.log(err.message);
      }
    }

    fetchUser();
  }, []);

  function exit() {
    localStorage.removeItem("token");
    window.location.href = "/";
  }

  return (
    <>
      <div
        className="profile-div"
        style={{ display: isVisible ? "block" : "none" }}
      >
        <p
          style={{
            fontFamily: ' Georgia, "Times New Roman", Times, serif',
          }}
        >
          {info.userName}
        </p>
        <hr />
        <p
          style={{
            fontFamily: ' Georgia, "Times New Roman", Times, serif',
          }}
        >
          {info.email}
        </p>
        <hr />
        <button onClick={exit} className="logout-btn">
          📤 Log Out
        </button>
      </div>
    </>
  );
}

Profile.propTypes = {
  isVisible: PropTypes.bool.isRequired,
};
