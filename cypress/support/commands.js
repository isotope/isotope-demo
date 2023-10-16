// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// import "@testing-library/cypress/add-commands";

// Login
Cypress.Commands.add("login", (username, password) => {
  // Type the username and password into input fields
  cy.get("input[name=username]").type(username);
  cy.get("input[name=password]").type(`${password}{enter}`, { log: false });
  // our auth cookie should be present
  cy.getCookie("PHPSESSID").should("exist");
});

// Select elements by data-test attribute
Cypress.Commands.add("getBySel", (selector, ...args) => {
  return cy.get(`[data-test=${selector}]`, ...args);
});

// Select elements by data-test attribute mit Wildcard
Cypress.Commands.add("getBySelLike", (selector, ...args) => {
  return cy.get(`[data-test*=${selector}]`, ...args);
});

// Mock a file selection and upload; unsure if useful, not used till now
Cypress.Commands.add("mockFileUpload", (selector, fileUrl) => {
  cy.fixture(fileUrl, "base64").then((fileContent) => {
    cy.get(selector).then(($input) => {
      // Create a blob object from the file contents
      const blob = Cypress.Blob.base64StringToBlob(fileContent, "image/jpeg");

      // Create a file object from the blob
      const file = new File([blob], "mocked-file.jpg", { type: "image/jpeg" });

      // Exchange the inmput field object with the created file object
      cy.wrap($input)
        .invoke("prop", "files", [file])
        .trigger("change", { force: true });
    });
  });
});
