import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function Signup() {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  async function submitHandler(event) {
    event.preventDefault();
    console.log(event);

    const userName = event.target[0].value;
    const email = event.target[1].value;
    const password = event.target[2].value;

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName,
          email,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error("Registration failed!");
      }

      const data = await response.json();
      console.log(data);
      setError(null);
      setSuccess("Registration successful!");
      window.location.href = "/";
    } catch (error) {
      setError(error.message);
      setSuccess(null);
    }

    if (error) console.log(error);
    if (success) console.log(success);
  }

  return (
    <>
      <div className="entry-div">
        <div className="entry-div-internal">
          <Header head1="NotesApp" head2="Registration" />
          <form onSubmit={submitHandler}>
            <input
              type="text"
              id="username"
              className="entry-input"
              placeholder="User Name"
            />
            <br />
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
              Sign up
            </button>
          </form>

          <Footer a_text="Back to Sign In" a_href="/" />
        </div>
      </div>
    </>
  );
}
