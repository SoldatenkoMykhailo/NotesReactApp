/* eslint-disable */

import React from "react";
import Profile from "../../notes-app/src/components/Profile";
import { mount } from "cypress/react18";

describe("Profile Component", () => {
  const mockUser = {
    userName: "testUser",
    email: "test@example.com",
  };

  beforeEach(() => {
    cy.intercept("GET", "http://localhost:5000/api/auth/user", {
      statusCode: 200,
      body: mockUser,
    });

    cy.window().then((win) => {
      win.localStorage.setItem("token", "mockToken");
    });
  });

  it("should render user info when visible", () => {
    mount(<Profile isVisible={true} />);

    cy.get(".profile-div").should("be.visible");
    cy.get(".profile-div p").first().should("contain.text", mockUser.userName);
    cy.get(".profile-div p").last().should("contain.text", mockUser.email);
  });

  it("should not render user info when not visible", () => {
    mount(<Profile isVisible={false} />);

    cy.get(".profile-div").should("exist");
  });

  it("should log out the user and redirect to home", () => {
    mount(<Profile isVisible={true} />);

    cy.intercept("GET", "http://localhost:5000/api/auth/user", {
      statusCode: 200,
      body: mockUser,
    });

    cy.get(".logout-btn").click();

    cy.window().then((win) => {
      expect(win.localStorage.getItem("token")).to.be.null;
    });

    cy.url().should("include", "/");
  });
});