describe("Reset", () => {
  beforeEach(() => {});

  it("Reset", () => {
    cy.exec("npm run db:reset");
    // Delete cart cookie
    cy.clearCookie("ISOTOPE_TEMP_CART");
  });

  // Extend test with Cypress Studio
  it("create new transaction", () => {
    // Navigate to the startpage
    cy.visit("/");
  });
});
