Cypress.Commands.add  ('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type ('Michele')
    cy.get('#lastName').type ('Rodrigues') 
    cy.get('#email') .type ('feheta4967@morxin.com') 
    cy.get('#phone') .type ('37204336') 
    cy.get('#open-text-area') .type ('teste') 
    cy.contains('Enviar') .click()
})