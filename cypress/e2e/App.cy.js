/* eslint-disable */

import about from '../../notes-app/src/about-app';

describe("Login Page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it("should display login form", () => {
    cy.get(".entry-input#email").should("be.visible");
    cy.get(".entry-input#password").should("be.visible");
    cy.get(".sign-btns").should("contain", "Sign in");
  });

  it("should login successfully with correct credentials", () => {
    cy.get(".entry-input#email").type("correct-email@example.com");
    cy.get(".entry-input#password").type("correctPassword");

    cy.get(".sign-btns").click();

    cy.url().should("include", "/my-notes");
  });

  it("should display error with incorrect credentials", () => {
    cy.intercept("POST", "http://localhost:5000/api/auth/login", {
      statusCode: 400,
      body: { message: "Authorization failed!" },
    }).as("loginFailure");
  
    cy.get(".entry-input#email").type("wrong-email@example.com");
    cy.get(".entry-input#password").type("wrongPassword");
  
    cy.get(".sign-btns").click();
  
    cy.wait("@loginFailure");
    cy.get(".error-message", { timeout: 10000 }).should("contain", "Authorization failed!");
  });
});

describe("Registration Page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/register");
  });

  it("should display registration form", () => {
    cy.get(".entry-input#username").should("be.visible");
    cy.get(".entry-input#email").should("be.visible");
    cy.get(".entry-input#password").should("be.visible");
    cy.get(".sign-btns").should("contain", "Sign up");
  });

  it("should register successfully with correct details", () => {
    cy.intercept("POST", "http://localhost:5000/api/auth/register", {
      statusCode: 200,
      body: { message: "Registration successful!" },
    }).as("registerRequest");

    cy.get(".entry-input#username").type("newUser");
    cy.get(".entry-input#email").type("newuser@example.com");
    cy.get(".entry-input#password").type("newPassword");

    cy.get(".sign-btns").click();

    cy.wait("@registerRequest");
    cy.url().should("include", "/");
  });

  it("should display error with existing email", () => {
    cy.intercept("POST", "http://localhost:5000/api/auth/register", {
      statusCode: 400,
      body: { message: "Registration failed!" },
    }).as("registerFailure");

    cy.get(".entry-input#username").type("existingUser");
    cy.get(".entry-input#email").type("existinguser@example.com");
    cy.get(".entry-input#password").type("password123");

    cy.get(".sign-btns").click();

    cy.wait("@registerFailure");
    cy.contains("Registration failed!", { timeout: 10000 }).should("be.visible");
  });
});

describe("MyNotes Page", () => {
  beforeEach(() => {
    cy.intercept("GET", "http://localhost:5000/api/notes", {
      fixture: "notes.json",
    }).as("getNotes");

    cy.visit("http://localhost:5173/my-notes");
    cy.wait("@getNotes");
  });

  it("should display list of notes", () => {
    cy.get(".note-div").should("have.length.greaterThan", 0);
  });

  it("should search for a note by title", () => {
    cy.get(".search-input").type("Sample Note Title");
    cy.get(".note-div").each(($note) => {
      cy.wrap($note).contains("Sample Note Title");
    });
  });

  it("should clear search input", () => {
    cy.get(".search-input").type("Sample Note Title");
    cy.get(".clear-search-btn").click();
    cy.get(".search-input").should("have.value", "");
  });

  it("should navigate to edit page for text note", () => {
    cy.get(".edit-note-btn").first().click();
    cy.url().should("include", "/update-note/");
  });

  it("should navigate to edit page for graphic note", () => {
    cy.get(".note-div").find("img").first().parent().find(".edit-note-btn").click();
    cy.url().should("include", "/update-graphic-note/");
  });

  it("should delete a note", () => {
    cy.intercept("DELETE", "http://localhost:5000/api/notes/*", {
      statusCode: 200,
    }).as("deleteNote");

    cy.get(".delete-note-btn").first().click();
    cy.wait("@deleteNote");
    cy.get(".note-div").should("have.length.lessThan", 1);
  });

  it("should display message when there are no notes", () => {
    cy.intercept("GET", "http://localhost:5000/api/notes", { body: [] }).as("getEmptyNotes");
    cy.visit("http://localhost:5173/my-notes");
    cy.wait("@getEmptyNotes");
    cy.contains("There are no notes. Add your first one").should("be.visible");
  });
});

describe("CreateNote Page", () => {
  beforeEach(() => {
    localStorage.setItem("token", "your-fake-auth-token");
    cy.visit("http://localhost:5173/create-note");
  });

  it("should create a note successfully", () => {
    cy.get(".create-note-title").type("Test Note Title");
    cy.get("#create-note-text-area").type("This is a test note content.");
    
    cy.intercept("POST", "http://localhost:5000/api/notes", {
      statusCode: 200,
      body: { title: "Test Note Title", content: "This is a test note content." },
    }).as("createNote");

    cy.get(".create-note-btn").click();

    cy.wait("@createNote").its("response.statusCode").should("eq", 200);
    
  });

  it("should show an error if note creation fails", () => {
    cy.get(".create-note-title").type("Test Note Title");
    cy.get("#create-note-text-area").type("This is a test note content.");
    
    cy.intercept("POST", "http://localhost:5000/api/notes", {
      statusCode: 400,
      body: { message: "Error creating note!" },
    }).as("createNoteFail");

    cy.get(".create-note-btn").click();

    cy.wait("@createNoteFail").its("response.statusCode").should("eq", 400);
    
  });
});

describe("CreateGraphicNote Page", () => {
  beforeEach(() => {
    localStorage.setItem("token", "your-fake-auth-token");
    cy.visit("http://localhost:5173/create-graphic-note");
});

  it("should allow drawing on the canvas", () => {
    const startX = 50;
    const startY = 50;
    const endX = 200;
    const endY = 200;

    cy.get("canvas").should("exist");

    cy.get("canvas")
      .trigger("mousedown", { clientX: startX, clientY: startY })
      .trigger("mousemove", { clientX: endX, clientY: endY })
      .trigger("mouseup");

});

  it("should clear the canvas when the clear button is clicked", () => {
    cy.get("canvas")
      .trigger("mousedown", { clientX: 50, clientY: 50 })
      .trigger("mousemove", { clientX: 200, clientY: 200 })
      .trigger("mouseup");

    cy.get(".clear").click();

    cy.get("canvas").then((canvas) => {
      const context = canvas[0].getContext("2d");
      const pixelData = context.getImageData(50, 50, 1, 1).data;
      expect(pixelData[3]).to.equal(0);
    });
  });

  it("should save the drawing and title", () => {
    const title = "My Graphic Note";
    const startX = 50;
    const startY = 50;
    const endX = 200;
    const endY = 200;

    cy.get(".title-input").type(title);

    cy.get("canvas")
      .trigger("mousedown", { clientX: startX, clientY: startY })
      .trigger("mousemove", { clientX: endX, clientY: endY })
      .trigger("mouseup");

    cy.intercept("POST", "http://localhost:5000/api/notes", {
      statusCode: 200,
      body: { title: title, image: "mocked-image-data" },
    }).as("saveGraphicNote");

    cy.get(".save").click();

    cy.wait("@saveGraphicNote").its("response.statusCode").should("eq", 200);
  });
});

describe("About Page", () => {
  beforeEach(() => {
    localStorage.setItem("token", "your-fake-auth-token");
    cy.visit("http://localhost:5173/about");
  });

  it("should render the About page correctly", () => {
    cy.get(".about-div p").contains("About the app:").should("be.visible");

    cy.get(".info-div ul").within(() => {
      cy.get(".about-li").should("have.length", 4); // Убедитесь, что у вас 4 элемента списка
      cy.get(".about-li").eq(0).contains(about.about.features.first);
      cy.get(".about-li").eq(1).contains(about.about.features.second);
      cy.get(".about-li").eq(2).contains(about.about.features.third);
      cy.get(".about-li").eq(3).contains(about.about.features.fourth);
    });

    cy.get(".about-p").contains(about.about.footer).should("be.visible");
    cy.get(".about-p").contains(about.about.end).should("be.visible");
  });
});

describe("TopBar Component", () => {
  beforeEach(() => {
    localStorage.setItem("token", "your-auth-token");
    cy.visit("http://localhost:5173/create-note");
  });

  it("should render the TopBar correctly", () => {
    cy.get(".top-bar").should("be.visible");
    cy.get(".notes-app-p").contains("NotesApp").should("have.attr", "href", "/my-notes");
    cy.get(".profile-btn").should("be.visible");
  });

});

describe("SideBar Component", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/create-note");
  });

  it("should render the SideBar correctly", () => {
    cy.get(".side-bar").should("be.visible");
    cy.get(".side-bar-a").contains("My Notes").should("have.attr", "href", "/my-notes");
    cy.get(".side-bar-a").contains("Create Note").should("have.attr", "href", "/create-note");
    cy.get(".side-bar-a").contains("About App").should("have.attr", "href", "/about");
  });

});

describe("Error Component", () => {
  it("should display the 404 error message", () => {
    cy.visit("http://localhost:5173/non-existent-route");
    cy.get("h1").contains("404 Error").should("be.visible");
  });
});