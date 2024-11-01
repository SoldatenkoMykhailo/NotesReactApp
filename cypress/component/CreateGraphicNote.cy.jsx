/* eslint-disable */

import React from "react";
import CreateGraphicNote from "../../notes-app/src/components/CreateGraphicNote";
import { mount } from "cypress/react18";

describe("CreateGraphicNote Component", () => {
  beforeEach(() => {
    localStorage.setItem("token", "test-token");
    mount(<CreateGraphicNote />);
  });

  it("should render the canvas and title input", () => {
    cy.get(".title-input").should("exist");
    cy.get(".canvas-field").should("exist");
  });

  it("should start drawing on mouse down and stop on mouse up", () => {
    cy.get(".canvas-field")
      .trigger("mousedown", { clientX: 100, clientY: 100 })
      .trigger("mousemove", { clientX: 200, clientY: 200 })
      .trigger("mouseup");

    cy.get(".canvas-field").trigger("mousemove", { clientX: 150, clientY: 150 });
  });

  it("should clear the canvas when clear button is clicked", () => {
    cy.get(".canvas-field")
      .trigger("mousedown", { clientX: 100, clientY: 100 })
      .trigger("mousemove", { clientX: 200, clientY: 200 })
      .trigger("mouseup");

    cy.get(".clear").click();

  });

  it("should save the drawing when save button is clicked", () => {
    cy.intercept("POST", "http://localhost:5000/api/notes", {
      statusCode: 200,
      body: { message: "Note saved successfully!" },
    }).as("saveNote");

    cy.get(".title-input").type("Test Title");
    cy.get(".canvas-field")
      .trigger("mousedown", { clientX: 100, clientY: 100 })
      .trigger("mousemove", { clientX: 200, clientY: 200 })
      .trigger("mouseup");

    cy.get(".save").click();
    cy.wait("@saveNote").its("response.statusCode").should("eq", 200);
  });

  it("should handle error on save", () => {
    cy.intercept("POST", "http://localhost:5000/api/notes", {
      statusCode: 500,
      body: { message: "Error saving note!" },
    }).as("saveNoteError");

    cy.get(".title-input").type("Test Title");
    cy.get(".canvas-field")
      .trigger("mousedown", { clientX: 100, clientY: 100 })
      .trigger("mousemove", { clientX: 200, clientY: 200 })
      .trigger("mouseup");

    cy.get(".save").click();
    cy.wait("@saveNoteError").its("response.statusCode").should("eq", 500);
  });
});