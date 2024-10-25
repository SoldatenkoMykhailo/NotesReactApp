import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function Login() {
  const [error, setError] = useState(null);

  async function submitHandler(event) {
    event.preventDefault();

    const email = event.target[0].value;
    const password = event.target[1].value;

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error("Authorization failed!");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);

      window.location.href = "/my-notes";
    } catch (error) {
      setError(error.message);
    }

    if (error) console.log(error);
  }

  return (
    <>
      <div className="entry-div">
        <div className="entry-div-internal">
          <Header head1="NotesApp" head2="Authorization" />
          <form onSubmit={submitHandler}>
            <input
              type="text"
              id="email"
              className="entry-input"
              placeholder="Login or Email"
            />
            <br />
            <input
              type="password"
              id="password"
              className="entry-input"
              placeholder="Password"
            />
            <br />
            <button type="submit" className="sign-btns">
              Sign in
            </button>
          </form>
          <Footer a_text="Create an account" a_href="/register" />
        </div>
      </div>
    </>
  );
}
