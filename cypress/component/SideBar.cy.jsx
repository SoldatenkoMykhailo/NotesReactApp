/* eslint-disable */

import React from "react";
import SideBar from "../../notes-app/src/components/SideBar";
import { mount } from "cypress/react18";

describe("SideBar Component", () => {
  beforeEach(() => {
    mount(<SideBar />);
  });

  it("should render 'My Notes' link with correct href", () => {
    cy.get(".side-bar-a").contains("My Notes").should("have.attr", "href", "/my-notes");
  });

  it("should render 'Create Note' link with correct href", () => {
    cy.get(".side-bar-a").contains("Create Note").should("have.attr", "href", "/create-note");
  });

  it("should render 'About App' link with correct href", () => {
    cy.get(".side-bar-a").contains("About App").should("have.attr", "href", "/about");
  });
});