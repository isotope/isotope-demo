describe("Test formal functions of backend", () => {
  before(() => {
    // Reset the database and wait for it to complete
    cy.exec("npm run db:reset").its("code").should("eq", 0);

    // Navigate to the backend's startpage
    cy.visit("https://isotopedemo.loc/contao");

    // Type the username and password into input fields
    cy.get("input[name=username]").type("k.jones");
    cy.get("input[name=password]").type("kevinjones");
    cy.get('button[type="submit"').click();
  });

  it('create product "Another stone", edit it and delete it', () => {
    // Click the User link in the top menu
    cy.get(".profile > button").click();

    // Click the profile link in the submenu
    cy.get(".icon-profile").click();

    // Select english language
    cy.get("#ctrl_language").select("en");

    // Click "SaveNClose" button
    cy.get("#saveNclose").click();

    // Click Product management in the Isotope submenu in the left bar
    cy.get("#isotope > .first > .navigation").click();

    // Click "New product" icon
    cy.get(".header_new").click();

    // Fill out the form

    // Click "General settings" legend
    cy.get("legend").click();

    // Select "Stone" as product type
    cy.get("#ctrl_type").select("22");

    // We cannot (not easily at least) select a category as cypress does not have access to the backend itself

    // type in name
    cy.get("#ctrl_name").clear("A");
    cy.get("#ctrl_name").type("Another Stone");

    // type in sku
    cy.get("#ctrl_sku").clear("1");
    cy.get("#ctrl_sku").type("1111112");

    // type in shipping weight
    cy.get("#ctrl_shipping_weight").type("0.2");

    // click Pricing Settings legend
    cy.get("#pal_pricing_legend > legend").click();

    // type in price
    cy.get("#ctrl_price").clear("1");
    cy.get("#ctrl_price").type("150");

    // click "Media Management" legend
    cy.get("#pal_media_legend > legend").click();

    // // // click "Upload files" button
    // // cy.get(".qq-upload-button-selector > input").click();

    // We cannot (not easily at least) choose a file as cypress does not have access to the backend itself; this approach I did not examine further:
    // // Select file from local machine - mock
    // cy.mockFileUpload('input[type="file"]', "isotope/s/stone.jpg");
    // // type in alt text
    // cy.get('[name="images[0][alt]"]').clear("A");
    // cy.get('[name="images[0][alt]"]').type("Another Stone");
    // // type in description text
    // cy.get(".col_2 > .tl_textarea").click();

    // Click "Publish product" legend
    cy.get("#pal_publish_legend > legend").click();

    // Click "Published" checkbox
    cy.get("#ctrl_published > label").click();
    cy.get("#opt_published_0").check();

    // Click "SaveNClose" button
    cy.get("#saveNclose").click();

    // Click the newly created product "Another Stone" in the still opened product panel
    cy.get(":nth-child(16) > .tl_right_nowrap > .edit > img").click();

    // Click
    cy.get("#ctrl_teaser").click();
    cy.get('textarea[name="teaser"]').type(
      "Another Stone, added by cypress test"
    );

    // Change the price
    cy.get("#ctrl_price").clear("3");
    cy.get("#ctrl_price").type("390");

    // Click "SaveNClose" button
    cy.get("#saveNclose").click();

    // Click the newly created product "Another Stone" in the still opened product panel
    cy.get(":nth-child(16) > .tl_right_nowrap > .delete > img").click();
  });
});
