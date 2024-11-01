/* eslint-disable */

import React from "react";
import CreateNote from "../../notes-app/src/components/CreateNote";
import { mount } from "cypress/react18";

describe("CreateNote Component", () => {
  beforeEach(() => {
    localStorage.setItem("token", "test-token");
    mount(<CreateNote />);
  });

  it("should render the form elements", () => {
    cy.get(".create-note-title").should("exist");
    cy.get("#create-note-text-area").should("exist");
    cy.get(".create-note-btn").should("exist");
  });

  it("should allow input for title and content", () => {
    const title = "Test Title";
    const content = "This is the content of the note.";

    cy.get(".create-note-title").type(title).should("have.value", title);
    cy.get("#create-note-text-area").type(content).should("have.value", content);
  });

  it("should submit the form and clear inputs on successful creation", () => {
    cy.intercept("POST", "http://localhost:5000/api/notes", {
      statusCode: 201,
      body: { message: "Note created successfully!" },
    }).as("createNote");

    cy.get(".create-note-title").type("Test Title");
    cy.get("#create-note-text-area").type("This is the content of the note.");
    cy.get(".create-note-btn").click({force: true});

    cy.wait("@createNote");

    cy.get(".create-note-title").should("have.value", "");
    cy.get("#create-note-text-area").should("have.value", "");
  });

  it("should handle error on submission", () => {
    cy.intercept("POST", "http://localhost:5000/api/notes", {
      statusCode: 500,
      body: { message: "Error creating note!" },
    }).as("createNoteError");

    cy.get(".create-note-title").type("Test Title");
    cy.get("#create-note-text-area").type("This is the content of the note.");
    cy.get(".create-note-btn").click({force: true});

    cy.wait("@createNoteError");
    
    cy.get(".create-note-title").should("have.value", "Test Title");
  });
});