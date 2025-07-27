describe('Drive2 UI Tests', () => {
  beforeEach(() => {
    cy.visitWithTimeout();
  });

  it('1. Logo is visible', () => {
    cy.get('a.c-logo[rel="home"], .c-logo').should('be.visible');
  });

  it('2. Search input is visible and has a placeholder', () => {
    cy.get('input[name="text"]')
      .should('exist')
      .and('have.attr', 'placeholder');
  });

  it('3. Search for "Honda" using input and check results', () => {
    cy.get('input[name="text"]')
      .should('be.visible')
      .type('Honda{enter}');

    cy.url().should('include', '/search');

    cy.get('span.u-text-overflow', { timeout: 20000 })
      .contains('Honda')
      .should('be.visible');
  });

  it('4. Footer contains link to personal data policy', () => {
    cy.get('a[href="/data-use/"]').should('be.visible');
    cy.contains('footer a', 'Политика обработки персональных данных').should('be.visible');
  });

  it('5. "Honda" brand link is visible on the homepage', () => {
    cy.get('a.c-index-makes__item.c-link.c-link--text[href="/cars/honda/"]')
      .should('be.visible')
      .and('contain.text', 'Honda');
  });

  it('6. Footer contains working VK link', () => {
    cy.get('footer a')
      .contains('ВКонтакте')
      .should('have.attr', 'href', 'https://vk.com/drive2');
  });

  it('7. "About" section link is visible on homepage', () => {
    cy.get('a.c-link.c-link--current[href="/about/"]')
      .should('be.visible')
      .and('contain.text', 'О проекте');
  });

  it('8. Intercept: search request for "Tesla" returns status 200', () => {
    cy.intercept('GET', '**/search?text=Tesla*').as('searchTesla');
    cy.get('input[name="text"]').type('Tesla{enter}');
    cy.wait('@searchTesla').its('response.statusCode').should('eq', 200);
  });
});
