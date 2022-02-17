/// <reference types="cypress" />

const baseUrl = Cypress.config("baseUrl");

describe("Login tests", () => {
  it("should be able to login as the admin user", () => {
    cy.visit(baseUrl);
    cy.get('[data-testid=loading]').should("exist");

    cy.location("pathname").should("include", "/auth/login");

    cy.get('[data-testid=logo-container]').should("exist");
    cy.contains("Sign in to your account").should("exist");

    // Failed login attempt
    cy.get("#email").as("email").type("admin@admin.com");
    cy.get("#password").as("password").type("12345");
    cy.get("button[type=submit]").as("submit").click();
    cy.contains("There was an error, please try again").should("exist")

    // Successful login
    cy.get("@email").type("admin@admin.com");
    cy.get("@password").type("1234");
    cy.get("@submit").click();

    cy.location("pathname").should("equal", "/")
  });
});
