Cypress._.times(3, () => {
it('acessa a página da política de privacidade', () => {
  cy.verifyUrlPolicy('./src/privacy.html');
});
});