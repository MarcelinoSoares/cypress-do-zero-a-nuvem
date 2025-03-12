// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.add('verifyTitle', () => {
  cy.title().should('eq', 'Central de Atendimento ao Cliente TAT');
});

Cypress.Commands.add('fillMandatoryFields', ({ firstName, lastName, email, message }) => { 
  cy.get('#firstName').type(firstName);
  cy.get('#lastName').type(lastName);
  cy.get('#email').type(email);
  cy.get('#open-text-area').type(message);
});

Cypress.Commands.add('clearForm', ({ firstName, lastName, email, phone }) => {
  const fields = [
    { selector: '#firstName', value: firstName },
    { selector: '#lastName', value: lastName },
    { selector: '#email', value: email },
    { selector: '#phone', value: phone }
  ];

  fields.forEach(field => {
    cy.get(field.selector)
      .type(field.value || '')
      .should('have.value', field.value || '')
      .clear()
      .should('have.value', '');
  });
});

Cypress.Commands.add('clickSendButton', () => {
  cy.get('button[type="submit"]').click();
});

Cypress.Commands.add('checkPhone', () => {
  cy.get('#phone-checkbox').check().should('be.checked');
});

Cypress.Commands.add('uncheckLastElement', () => {
  cy.get('input[type="checkbox"]').check().should('be.checked')
    .last().uncheck().should('not.be.checked');
});

Cypress.Commands.add('checkAllProducts', () => {
  cy.get('input[type="radio"]').each(typeOfService => {
    cy.wrap(typeOfService).check().should('be.checked');
  });
});

Cypress.Commands.add('shouldMessageSuccess', () => {
  cy.get('.success').should('be.visible');
});

Cypress.Commands.add('shouldMessageError', () => {
  cy.get('.error').should('be.visible');
});

Cypress.Commands.add('shouldPhoneFieldEmpty', () => {
  cy.get('#phone').should('have.value', '');
});

Cypress.Commands.add('selectOptions', ({ select, options, type = 'value' }) => {
  cy.get(select).should('exist').and('be.visible').then($select => {
    if (Array.isArray(options)) {
      options.forEach(option => {
        if (type === 'index') {
          cy.wrap($select).select(option).should('have.value', $select.find('option').eq(option).val());
        } else {
          cy.wrap($select).select(option, { force: true }).should('have.value', option);
        }
      });
    } else {
      if (type === 'index') {
        cy.wrap($select).select(options).should('have.value', $select.find('option').eq(options).val());
      } else {
        cy.wrap($select).select(options, { force: true }).should('have.value', options);
      }
    }
  });
});

Cypress.Commands.add('checkRadio', (value) => {
  cy.get(`input[type="radio"][value="${value}"]`).should('exist').and('be.visible').check().should('be.checked');
});

Cypress.Commands.add('uploadFile', (file) => {
  cy.get('#file-upload').selectFile(file).should(input => {
    expect(input[0].files[0].name).to.equal('users.json');
  });
});

Cypress.Commands.add('checkRadioWitchAlias', (alias) => {
  cy.fixture(alias).as('simpleFile');
  cy.get('#file-upload').selectFile('@simpleFile').should(input => {
      expect(input[0].files[0].name).to.equal('');
    });
});

Cypress.Commands.add('dragFile', (file) => {
  cy.get('#file-upload').selectFile(file, { action: 'drag-drop' }).should(input => {
    expect(input[0].files[0].name).to.equal('users.json');
  });
});

Cypress.Commands.add('checkPolicyLink', () => { 
  cy.contains('a', 'Política de Privacidade').should('have.attr', 'href', 'privacy.html').and('have.attr', 'target', '_blank');
});

Cypress.Commands.add('checkRemoveTarget' , () => { 
  cy.contains('a', 'Política de Privacidade').invoke('removeAttr', 'target').click();
  cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible');
});

Cypress.Commands.add('verifyUrlPolicy', (link) => {
  cy.visit(link);
  cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible');
});