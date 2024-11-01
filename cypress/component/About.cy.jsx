/* eslint-disable */

import React from "react";
import { mount } from "cypress/react18";
import About from "../../notes-app/src/components/About";
import TopBar from "../../notes-app/src/components/TopBar";
import SideBar from "../../notes-app/src/components/SideBar";
import about from "../../notes-app/src/about-app";

describe("About Component", () => {
  beforeEach(() => {
    mount(<About />);
  });

  it("renders TopBar and SideBar components", () => {
    cy.get(TopBar).should("exist");
    cy.get(SideBar).should("exist");
  });

  it("displays the correct about header text", () => {
    cy.contains("p", "About the app:").should("be.visible");
    cy.contains(".about-p", about.about.header).should("be.visible");
  });

  it("displays the list of features", () => {
    cy.get(".about-li").should("have.length", 4);
    cy.contains(".about-li", about.about.features.first).should("be.visible");
    cy.contains(".about-li", about.about.features.second).should("be.visible");
    cy.contains(".about-li", about.about.features.third).should("be.visible");
    cy.contains(".about-li", about.about.features.fourth).should("be.visible");
  });

  it("displays the footer and end text", () => {
    cy.contains(".about-p", about.about.footer).should("be.visible");
    cy.contains(".about-p", about.about.end).should("be.visible");
  });
});