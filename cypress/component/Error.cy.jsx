/* eslint-disable */

import React from "react";
import Error from "../../notes-app/src/components/Error";
import { mount } from "cypress/react18";

describe("Error Component", () => {
  it("should render 404 error message", () => {
    mount(<Error />);

    cy.get("h1").should("exist");
    cy.get("h1").contains("404 Error");
    
    cy.get("h1").should("have.css", "font-family").and("include", 'Georgia');
  });
});