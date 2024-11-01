/* eslint-disable */

import React from "react";
import Footer from "../../notes-app/src/components/Footer";
import { mount } from "cypress/react18";

describe("Footer Component", () => {
  it("should render the footer with the correct link text and URL", () => {
    const linkText = "Back to Sign In";
    const linkHref = "/";

    mount(<Footer a_text={linkText} a_href={linkHref} />);

    cy.get("p").should("contain.text", "Or");
    cy.get("a").should("have.text", linkText).and("have.attr", "href", linkHref);
  });

  it("should have correct styles", () => {
    const linkText = "Back to Sign In";
    const linkHref = "/";

    mount(<Footer a_text={linkText} a_href={linkHref} />);

    cy.get("a").should("have.css", "color", "rgb(0, 0, 0)");
  });
});