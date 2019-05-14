// https://docs.cypress.io/api/introduction/api.html

describe('User Registration', () => {
  it('Visits the registration page', () => {
    cy.visit('/login/register');
    cy.contains('h2', 'Registration');
  });

  it('Fills out registration form', () => {
    cy.get('input[name=firstName]').type('John');
    cy.get('input[name=lastName]').type('Doe');
    cy.get('input[name=email]').type('johnemail.com');
    cy.get('input[name=password]').type('somePassword123');
    cy.get('input[name=confirmPassword]').type('somePassword1234');
  });

  it('Fails if passwords do not match', () => {
    cy.get('button[type=submit]').click();
    cy.contains('.toast .message', 'Password do not match');
    cy.get('input[name=confirmPassword]')
      .clear()
      .type('somePassword123');
  });

  it("Fails if email isn't in proper format", () => {
    cy.get('button[type=submit]').click();
    cy.contains('.toast .message', '"email" must be a valid email');
    cy.get('input[name=email]')
      .clear()
      .type('john@email.com');
  });

  it('Registers a dummy user', () => {
    cy.get('button[type=submit]').click();
    cy.contains('.toast .message', 'Account has been created.');
  });

  it('Fails when registering an existing user', () => {
    cy.get('button[type=submit]').click();
    cy.contains('.toast .message', 'Email is already registered');
  });

  it('Visits login page', () => {
    cy.get('button:first-of-type').click();
    cy.url().should('eq', `${Cypress.config().baseUrl}login`);
    cy.contains('.logo', 'Rudget');
    cy.contains('h2', 'Login');
  });
});
