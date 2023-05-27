describe("FAQ test", () => {
    
    it("Checks FAQs basic functionality", () => {
        cy.visit('/', {failOnStatusCode: false});
        cy.get('#welcome_modal').type('{esc}');
        cy.get('span').contains('FAQ').click({force: true}); //element otherwise hard to get
        cy.url().should('contain', '/faq/default/index');
        
        // Check help categories exist.
        cy.contains('All');
        cy.contains('Games');
        cy.contains('Payments');
        cy.contains('Bonuses');
        cy.contains('Others');

        // Check expanding a FAQ article. Content visibility.
        cy.contains('Didn\'t receive Verification code?').click()        
        cy.contains('Please check the correctness of phone number. If you have had this problem yet, send us an email').should('be.visible');
        cy.contains('Didn\'t receive Verification code?').click()        
        cy.contains('Please check the correctness of phone number. If you have had this problem yet, send us an email').should('not.be.visible');

        //Check Contact Support is available.
        cy.get('a[href="/help"]')
            .first()
            .should('exist')
            .should('contain', 'Contact support');        
    })    
})
