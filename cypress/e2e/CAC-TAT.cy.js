/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {
        cy.visit ('./src/index.html')
    
    })


    it('verifica o título da aplicação', function() {
        cy.title ().should ('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche todos os campos obrigatorios e faz o envio do formulario', function(){
        const longtext = ('como criar um teste de fumaça, como criar um teste de fumaça, como criar um teste de fumaça')
        cy.get('#firstName').type ('Michele')
        cy.get('#lastName').type ('Rodrigues') 
        cy.get('#email') .type ('feheta4967@morxin.com') 
        cy.get('#phone') .type ('37204336') 
        cy.get('Select') .select ('Cursos')
        cy.get('#open-text-area') .type (longtext, {delay: 0}) 
        cy.get('button[type="submit"]') .click() 
        cy.get('.success') .should ('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação invalida', function(){
        const longtext = ('como criar um teste de fumaça, como criar um teste de fumaça, como criar um teste de fumaça')
        cy.get('#firstName').type ('Michele')
        cy.get('#lastName').type ('Rodrigues')
        cy.get('#email') .type ('oi') 
        cy.get('#phone') .type ('37204336')
        cy.get('#open-text-area') .type (longtext, {delay: 0}) 
        cy.get('button[type="submit"]') .click()
        cy.get ('.error') .should ('be.visible') 
    })

    it('não escreve no campo telefone caso for inserido um valor não númerico', function(){
        cy.get ('#phone') 
            .type ('michele') .should ('have.value', '')

    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('#firstName').type ('Michele')
        cy.get('#lastName').type ('Rodrigues')
        cy.get('#email') .type ('feheta4967@morxin.com') 
        cy.get('#phone-checkbox').check ()
        cy.get('#open-text-area') .type ('oi') 
        cy.get('button[type="submit"]') .click()
        cy.get ('.error') .should ('be.visible') 
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){

        cy.get('#firstName')
            .type ('Michele') .should ('have.value', 'Michele')
            .clear () .should ('have.value', '')
        cy.get('#lastName')
            .type ('Rodrigues') .should ('have.value', 'Rodrigues')
            .clear () .should ('have.value', '')
        cy.get('#email') 
            .type ('feheta4967@morxin.com') .should ('have.value', 'feheta4967@morxin.com')
            .clear () .should ('have.value', '')
        cy.get('#phone') 
            .type ('37204336') .should ('have.value', '37204336')
            .clear () .should ('have.value', '')
        cy.get('#open-text-area') .type ('oi') 
        cy.get('button[type="submit"]') .click() 
        cy.get('.error') .should ('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        cy.get('button[type="submit"]') .click() 
        cy.get('.error') .should ('be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', function(){
        cy.fillMandatoryFieldsAndSubmit ()
        cy.get('.success') .should ('be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto', function(){
        cy.get('#product') .select ('YouTube') 
            .should ('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function(){
        cy.get('#product') .select('mentoria')
            .should ('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', function(){
        cy.get ('#product') .select (1)
            .should ('have.value','blog')
    })

    it('marca o tipo de atendimento "Feedback', function(){
        cy.get ('input[value="feedback"]') 
            .check () .should ('have.value', 'feedback')
    })

    it('Marca cada tipo de atendimento', function(){
        cy.get ('input[type="radio"]')
            .should ('have.length', 3)
            .each(function($radio){
                cy.wrap ($radio) .check ()
                cy.wrap ($radio) .should ('be.checked')
            })
        })
            
    it('marca ambos checkboxes, depois desmarca o último', function(){
        cy.get('input[type="checkbox"]')
            .check () .should ('be.checked')
            .last () .uncheck()
            .should ('be.not.checked')
    })

    it('seleciona um arquivo da pasta fixtures', function(){
        cy.get ('#file-upload') .should ('not.have.value')
        .selectFile ('./cypress/fixtures/example.json') 
        .should (function($input) {
                expect ($input[0].files[0].name).to.equal('example.json')
            })
    })
    it('seleciona um arquivo simulando um drag-and-drop' , function(){
        cy.get ('#file-upload') .should ('not.have.value')
        .selectFile ('./cypress/fixtures/example.json', {action: 'drag-drop'}) 
        .should (function($input) {
                expect ($input[0].files[0].name).to.equal('example.json')
            })
    })
    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function (){
        cy.fixture ('example.json').as('sampleFile')
        cy.get ('#file-upload')
            .selectFile ('@sampleFile')
            .should (function($input) {
                expect ($input[0].files[0].name).to.equal('example.json')
            })
    })
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
        cy.get ('a[href="privacy.html"]') 
            .should('have.attr', 'target', '_blank')
    })
    it('acessa a página da política de privacidade removendo o target e então clicando no link', function (){
        cy.get ('a[href="privacy.html"]')
                .invoke('removeAttr', 'target') 
                .click()
        cy.contains ('Talking About Tsting') .should('be.visible')
    })
   
})