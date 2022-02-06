describe('OnPoint E2E Test', () => {
  it('Visit Login Page', () => {
    cy.visit('/');
    cy.wait(1000);

    cy.get('.login-container').should('have.length', 1);
    cy.get('.login-card').should('have.length', 1);
    cy.get('.login-title').should('have.length', 1);
    cy.get('.login-btn').should('have.length', 1);

    // Test Actions
    cy.get('.login-input').as('first-event').type('2a3ashhf4o6dos4w');
    cy.wait(1500);
    cy.get('.login-btn').first().click();

    cy.url().should('include', '/dashboard');
    cy.get('.header-container').should('have.length', 1);

    cy.get('.logo').should('have.length', 1);
    cy.get('.logo').first().click();
    cy.url().should('include', '/dashboard');

    cy.get('.link-dashboard').should('have.length', 1);
    cy.get('.link-dashboard').first().click();
    cy.url().should('include', '/dashboard');

    cy.get('.link-jobs').should('have.length', 1);
    cy.get('.link-jobs').first().click();
    cy.url().should('include', '/jobs');

    cy.get('.link-profile').should('have.length', 1);
    cy.get('.link-profile').first().click();
    cy.url().should('include', '/profile');
  });
});
