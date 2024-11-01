/* eslint-disable */

import React from "react";
import Signup from "../../notes-app/src/components/Signup";
import { mount } from "cypress/react18";

describe("Signup Component", () => {
  beforeEach(() => {
    mount(<Signup />);
  });

  it("should render all input fields and submit button", () => {
    cy.get("input#username").should("be.visible");
    cy.get("input#email").should("be.visible");
    cy.get("input#password").should("be.visible");
    cy.get("button[type='submit']").should("be.visible");
  });

  it("should display error message on failed registration", () => {
    cy.intercept("POST", "http://localhost:5000/api/auth/register", {
      statusCode: 400,
      body: { message: "Registration failed!" },
    }).as("registerRequest");

    cy.get("input#username").type("TestUser")
    cy.get("input#email").type("test@example.com");
    cy.get("input#password").type("password123");
    cy.get("button[type='submit']").click();

    cy.wait("@registerRequest");
    cy.get(".error-message").should("contain.text", "Registration failed!");
  });

  it("should display success message on successful registration", () => {
    cy.intercept("POST", "http://localhost:5000/api/auth/register", {
      statusCode: 200,
      body: { message: "Registration successful!" },
    }).as("registerRequest");

    cy.get("input#username").type("TestUser");
    cy.get("input#email").type("test@example.com");
    cy.get("input#password").type("password123");
    cy.get("button[type='submit']").click();

    cy.wait("@registerRequest");
    cy.on("window:location:change", (newLocation) => {
      expect(newLocation.href).to.contain("/");
    });
  });

});