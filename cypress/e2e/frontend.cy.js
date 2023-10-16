describe("Test formal functions of website", () => {
  beforeEach(() => {
    // reset the database prior to every test
    // cy.exec("npm run db:reset");

    // Navigate to the startpage
    cy.visit("/");
  });

  // Check all links on baseUrl except email
  // Throws a 404 error if a link is not working
  it("checks all links to sites", () => {
    cy.get("a:not([href*='mailto:'])").each((page) => {
      cy.request(page.prop("href"));
    });
  });

  // Login to frontend
  // Login is only working in prod env and with cookie allow list set (preventing other cookies not needed for contao to cause the CSRF protection to fail)
  it("logs in", () => {
    const username = "j.smith";
    const password = "johnsmith";

    cy.login(username, password);

    // Assert that we are on the expected page
    cy.location("pathname").should("eq", "/en/my-order-history.html");
  });

  // Login to frontend - missing username
  it("displays form validation", () => {
    // Fill out the login form and submit
    cy.get("input[name=username]").clear();
    cy.get("input[name=password]").type(`${"johnsmith"}`, { log: false });
    cy.get('button[type="submit"').click();

    // Verify that the PHPSESSID cookie does not exist
    cy.getCookie("PHPSESSID").should("not.exist");
    // Assert that we are on the expected page
    cy.location("pathname").should("eq", "/en/");
  });

  // Login to frontend - missing password
  it("displays form validation", () => {
    // Fill out the login form and submit
    cy.get("input[name=username]").type("j.smith");
    cy.get("input[name=password]").clear();
    cy.get('button[type="submit"').click();

    // Verify that the PHPSESSID cookie does not exist
    cy.getCookie("PHPSESSID").should("not.exist");
    // Assert that we are on the expected page
    cy.location("pathname").should("eq", "/en/");
  });

  // Buy 1 article as a guest
  it("Buy Stone as guest", () => {
    // reset the database
    cy.exec("npm run db:reset");

    // Click on the first product Stone
    cy.get("#fmd65_product_213 > .formbody > h3 > a").click();
    cy.get(".add_to_cart").click();
    // Confirm message
    cy.get(".iso_confirm").click();
    cy.get(".button_checkout").click();
    // Click Order now (without registration)
    cy.get("div.ce_text > :nth-child(3) > a").click();
    cy.get("#ctrl_billingaddress_firstname").click();
    // Fill in billing address
    cy.get("#ctrl_billingaddress_firstname").clear();
    cy.get("#ctrl_billingaddress_firstname").type("Test");
    cy.get("#ctrl_billingaddress_lastname").clear();
    cy.get("#ctrl_billingaddress_lastname").type("Tester");
    cy.get("#ctrl_billingaddress_street_1").clear();
    cy.get("#ctrl_billingaddress_street_1").type("Test Avenue");
    cy.get("#ctrl_billingaddress_postal").clear();
    cy.get("#ctrl_billingaddress_postal").type("10000");
    cy.get("#ctrl_billingaddress_city").clear();
    cy.get("#ctrl_billingaddress_city").type("Berlin");
    cy.get("#ctrl_billingaddress_country_chzn > .chzn-single > span").click();
    cy.get(
      "#ctrl_billingaddress_country_chzn > .chzn-drop > .chzn-search > input"
    ).clear();
    cy.get(
      "#ctrl_billingaddress_country_chzn > .chzn-drop > .chzn-search > input"
    ).type("ger");
    cy.get("#ctrl_billingaddress_country_chzn_o_84").click();
    cy.get("#iso_mod_checkout_address > .formbody").click();
    cy.get("#ctrl_billingaddress_phone").clear("0");
    cy.get("#ctrl_billingaddress_phone").type("0171 123 456 78");
    cy.get("#ctrl_billingaddress_email").clear("t");
    cy.get("#ctrl_billingaddress_email").type("test@test.de");
    // Shipping address: Use billing address
    cy.get("#container").click();
    // Click Continue
    cy.get(".submit_container > .submit").click();
    // Click Order
    cy.get(".confirm").click();
  });

  // Buy several articles; start as a guest and then have older cart merged when you log in; Going to "Kasse" shows a message that no shipping methods available; thus remove "Stone" from cart and succesfully finish your order.
  it("A more complex order", () => {
    // reset the database
    cy.exec("npm run db:reset");
    // Click navigation: Shop - Filter
    cy.get(":nth-child(4) > .submenu").click();

    // Type "Genesis" in the search field and click search button
    cy.get("#ctrl_keywords_67").clear("G");
    cy.get("#ctrl_keywords_67").type("Genesis");
    cy.get("form > .submit").click();

    // Click on title of the CD
    cy.get("h3 > a").click();

    // Click "add to cart"
    cy.get(".add_to_cart").click();

    // Confirm the message by ENTER
    cy.get(".iso_confirm").click();

    // Click "Proceed to Checkout!"
    cy.get(".checkout > .button").click();

    // Type data into login form and submit
    cy.get("#username").clear("k");
    cy.get("#username").type("j.smith");
    cy.get("#password").clear();
    cy.get("#password").type("johnsmith");
    cy.get("#tl_login_56 > .formbody > .widget-submit > .submit").click();

    // Article "Stone" is added to this cart as it had been in a cart of this member before (merging guest and member carts)
    // We confirm the corresponding message by ENTER
    cy.get(".iso_confirm").click();

    // Visit the CD page
    cy.visit("/cd.html");

    // Click to get to page 3
    cy.get(":nth-child(3) > .link").scrollIntoView().click();

    // Click CD "Tool - Lateralus"
    cy.get("#fmd69_product_145 > .formbody > h3 > a").click();

    // Click "add to cart"
    cy.get(".add_to_cart").click();

    // Confirm the message by ENTER
    cy.get(".iso_confirm").click();

    // Click "Proceed to Checkout!"
    cy.get(".button_checkout").click();

    // Click "Kasse"
    cy.get('.grid9 > [href="en/checkout.html"]').click();

    // Click "continue"
    cy.get(".next").click();

    // We see the message: "no shipping methods available", so we remove the Stone from the cart
    cy.get(":nth-child(1) > .remove > a").click();

    //Now we can click "Order"
    cy.get(".confirm").click();
  });

  it("Backend link", () => {
    // Get the first backend link and click it
    cy.get("a[href*='/contao']")
      .first()
      .invoke("removeAttr", "target") // Remove the target attribute to open in the same window
      .click();

    // Type the username and password into input fields
    cy.get("input[name=username]").type("k.jones");
    cy.get("input[name=password]").type("kevinjones");
    cy.get('button[type="submit"').click();
  });
});
