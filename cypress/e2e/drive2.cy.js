describe("Advanced Drive2 UI Tests with Allure & Winston Logger", () => {
  const visitWithTimeout = (url = "/") => {
    cy.task("log", "Navigating to page: Drive2");
    cy.visit(url, {
      failOnStatusCode: false,
      timeout: 60000,
      loadTimeout: 0,
      onBeforeLoad(win) {
        setTimeout(() => win.stop(), 5000);
      },
    });
  };

  beforeEach(() => {
    cy.allure().startStep("Open the main page");
    visitWithTimeout();
    cy.allure().endStep();
  });

  it("1. Logo is visible", () => {
    cy.allure().startStep("Check that the logo is visible");
    cy.get('a.c-logo[rel="home"], .c-logo')
      .should("be.visible")
      .then(() => cy.task("log", "Logo successfully found"));
    cy.allure().endStep();
  });

  it("2. Search input is visible and has a placeholder", () => {
    cy.allure().startStep(
      "Check that the search input is available and has a placeholder"
    );
    cy.get('input[name="text"]')
      .should("exist")
      .and("have.attr", "placeholder")
      .then(() => cy.task("log", "Search input found and has a placeholder"));
    cy.allure().endStep();
  });

  it('3. Search for "Honda" using input and check results', () => {
    cy.allure().startStep(
      'Enter "Honda" in the search field and check the results'
    );
    cy.task("log", 'Start entering "Honda" in the search input');
    cy.get('input[name="text"]').should("be.visible").type("Honda{enter}");

    cy.url().should("include", "/search");
    cy.task("log", "Check that the URL contains /search");

    cy.get("span.u-text-overflow", { timeout: 20000 })
      .contains("Honda")
      .should("be.visible")
      .then(() => cy.task("log", "Results with text Honda found"));
    cy.allure().endStep();
  });

  it("4. The footer contains a link to the data processing policy", () => {
    cy.allure().startStep(
      "Check the data processing policy link in the footer"
    );
    cy.get('a[href="/data-use/"]')
      .should("be.visible")
      .then(() => cy.task("log", 'The "/data-use/" link is visible'));

    cy.contains("footer a", "Personal data processing policy")
      .should("be.visible")
      .then(() =>
        cy.task(
          "log",
          'The "Personal data processing policy" link is visible in the footer'
        )
      );
    cy.allure().endStep();
  });

  it('5. "Honda" brand link is visible on the homepage', () => {
    cy.allure().startStep(
      "Check that the Honda brand link is visible on the main page"
    );
    cy.get('a.c-index-makes__item.c-link.c-link--text[href="/cars/honda/"]')
      .should("be.visible")
      .and("contain.text", "Honda")
      .then(() =>
        cy.task("log", "Honda link successfully found on the main page")
      );
    cy.allure().endStep();
  });

  it('6. Footer contains a working "VK" link', () => {
    cy.allure().startStep("Check the VK link in the footer");
    cy.get("footer a")
      .contains("VK")
      .should("have.attr", "href", "https://vk.com/drive2")
      .then(() => cy.task("log", "VK link in the footer is correct"));
    cy.allure().endStep();
  });

  it('7. "About" section link is visible on the homepage', () => {
    cy.allure().startStep('Check the "About" link on the main page');
    cy.get('a.c-link.c-link--current[href="/about/"]')
      .should("be.visible")
      .and("contain.text", "About")
      .then(() => cy.task("log", 'The "About" link successfully found'));
    cy.allure().endStep();
  });

  it('8. Intercept: search request for "Tesla" returns status 200', () => {
    cy.allure().startStep(
      "Check that the search request for Tesla returns status 200"
    );
    cy.intercept("GET", "**/search?text=Tesla*").as("searchTesla");
    cy.task("log", "Entering Tesla in the search input");

    cy.get('input[name="text"]').type("Tesla{enter}");
    cy.wait("@searchTesla")
      .its("response.statusCode")
      .should("eq", 200)
      .then(() =>
        cy.task("log", "Search request for Tesla returned status 200")
      );
    cy.allure().endStep();
  });
});

import "@shelex/cypress-allure-plugin";
