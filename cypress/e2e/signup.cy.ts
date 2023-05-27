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

        /*
        // TODO: Getting the confirmation code from Email body (when the feature is fixed)
        cy.request({
            method: "GET",
            url: "https://mailsac.com/api/addresses/xxxx@mailsac.com/messages",
            headers: {
              "Mailsac-Key": "here-goes-the-key",
            },
          }).then((res) => {
            // 'res' contains all messages bodies as JSON
          });
        */
    })

    it("Creates a user sucesfully using a phone", () => {
        let randomStr = (Math.random() + 1).toString(36).substring(7);
        cy.get('li').contains('Phone').click();
        cy.get('[data-test=input-phone]').clear().type(`+54291571${(Math.floor(Math.random() * 10000) + 10000).toString().substring(1)}`);
        cy.contains('I unconditionally agree with').click();
        cy.get('[data-test=input-password]').type(`${randomStr.repeat(2)}D23`);
        cy.get('[data-test=input-password_confirmation]').type(`${randomStr.repeat(2)}D23`);
        cy.contains('No bonus').click();
        cy.get('[data-test=control-submit]').click();
        cy.url().should('contain', '/user/confirm/phone');
        cy.contains('You must confirm your phone number');
    })

    it("Checks Form Validation", () => {
        // Scenario #1: leaving fields empty
        cy.get('[data-test=control-submit]').click();
        cy.get('[data-test=error-email]').should('contain.text', 'Email or phone number is required.');
        cy.get('[data-test=error-terms_and_conditions]').should('contain.text', 'You have to accept our Terms and Conditions.');
        cy.get('[data-test=error-password]').should('contain.text', 'Password cannot be blank.');
        cy.get('[data-test=error-password_confirmation]').should('contain.text', 'Password confirmation cannot be blank.');
        cy.contains('Promo code is invalid');

        // I'll skip the rest of the form validation test cases
        // A captcha appears after repeated hits of the Create Account button.
    })
})
