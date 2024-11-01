/* eslint-disable */

import React from "react";
import Header from "../../notes-app/src/components/Header";
import { mount } from "cypress/react18";

describe("Header Component", () => {
  it("should render the header with given text", () => {
    const head1 = "NotesApp";
    const head2 = "Welcome to the Notes Application";

    mount(<Header head1={head1} head2={head2} />);

    cy.get("p").first().should("contain.text", head1);
    cy.get("p").last().should("contain.text", head2);
  });

  it("should have correct styles", () => {
    const head1 = "NotesApp";
    const head2 = "Welcome to the Notes Application";

    mount(<Header head1={head1} head2={head2} />);

    cy.get("p").first().should("have.css", "font-size", "40px");
    cy.get("p").last().should("have.css", "font-size", "25px");
  });
});