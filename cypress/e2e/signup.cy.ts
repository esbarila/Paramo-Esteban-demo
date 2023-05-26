describe("User Registration test", () => {
    beforeEach(() => {
        // navigate to baseUrl, dismiss popup and go to register page before each test scenario.
        cy.visit('/', {failOnStatusCode: false});
        cy.get('#welcome_modal').type('{esc}');
        cy.get('[data-test=nav-reg-head]').click();
    })

    it("Creates a user sucesfully using email", () => {
        let randomStr = (Math.random() + 1).toString(36).substring(7);
        let randomEmail = `test${randomStr}@testerson.com`;
        cy.task('setUserData' , randomEmail);
        cy.get('[data-test=input-email]').type(randomEmail);
        cy.contains('I unconditionally agree with').click();
        cy.get('[data-test=input-password]').type(`${randomStr.repeat(2)}D23`);
        cy.get('[data-test=input-password_confirmation]').type(`${randomStr.repeat(2)}D23`);
        cy.contains('No bonus').click();
        cy.get('[data-test=control-submit]').click();
        cy.url().should('contain', '/registrationSuccess')
        cy.contains('Registration successfully finished!');
        cy.contains('View profile').click();
        cy.url().should('contain', '/cabinet/profile');
    })
})
