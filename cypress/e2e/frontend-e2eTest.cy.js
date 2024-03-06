describe('Navigation', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('navigates to Budget Tracker', () => {
    cy.get('a').contains('Budget Tracker').click();
    cy.url().should('include', '/budget-tracker');
  });

  it('navigates to Resources', () => {
    cy.get('a').contains('Resources').click();
    cy.url().should('include', '/resources');
  });

  it('navigates to Login', () => {
    cy.get('a').contains('Login').click();
    cy.url().should('include', '/login');
  });
});

describe('BudgetTracker', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/budget-tracker');
  });

  it('navigates to Summary', () => {
    cy.get('button').contains('Summary').click();
    cy.url().should('include', '/summary');
  });
});

describe('Resources', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/resources');
  });

  it('searches for articles', () => {
    cy.get('#searchInput').type('budgeting');
    cy.get('button').contains('Search').click();
    cy.get('h3').should('have.length', 3);
  });

  it('searches for finance events', () => {
    cy.get('#locationInput').type('Charlotte');
    cy.get('#test').contains('Search').click();
    cy.get('h3').should('have.length', 3);
  });
});