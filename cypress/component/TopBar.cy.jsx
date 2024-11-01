/* eslint-disable */

import React from "react";
import TopBar from "../../notes-app/src/components/TopBar";
import { mount } from "cypress/react18";

describe("TopBar Component", () => {
    beforeEach(() => {
      mount(<TopBar />);
    });
  
    it("should render the application title", () => {
      cy.get(".notes-app-p").should("contain.text", "NotesApp");
    });
  
    it("should render the profile button", () => {
      cy.get(".profile-btn").should("be.visible");
    });
  
    it("should toggle profile visibility when profile button is clicked", () => {
      cy.get(".profile-div").should("exist");
  
      cy.get(".profile-div").should("have.css", "display", "none");
  
      cy.get(".profile-btn").click();
  
      cy.get(".profile-div").should("have.css", "display", "block");
  
      cy.get(".profile-btn").click();
  
      cy.get(".profile-div").should("have.css", "display", "none");
    });
  });