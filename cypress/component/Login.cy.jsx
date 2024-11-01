/* eslint-disable */

import Login from '../../notes-app/src/components/Login';
import { mount } from 'cypress/react18';
import React from 'react';

describe("Login Component Tests", () => {
  beforeEach(() => {
    mount(<Login />);
  });

  it("displays the login form elements", () => {
    cy.get("input#email").should("be.visible").and("have.attr", "placeholder", "Login or Email");
    cy.get("input#password").should("be.visible").and("have.attr", "placeholder", "Password");
    cy.get("button.sign-btns").should("be.visible").and("contain", "Sign in");
  });

  it("shows an error message on failed login attempt", () => {
    cy.intercept("POST", "http://localhost:5000/api/auth/login", {
      statusCode: 401,
      body: { message: "Authorization failed!" },
    }).as("failedLogin");

    cy.get("input#email").type("wrong@example.com");
    cy.get("input#password").type("wrongpassword");
    cy.get("button.sign-btns").click();

    cy.wait("@failedLogin");
    cy.get(".error-message").should("be.visible").and("contain", "Authorization failed!");
  });

});