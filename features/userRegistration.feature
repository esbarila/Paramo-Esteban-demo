Feature: Sign Up
    As a User I want to be able to sucessfully sign in using an email or phone.

    Scenario: Successful creation
    Given User wants to sign in
    When they enter a valid email OR phone
    And they are able to choose a desired currency
    And they complete all required fields in a correct way
    Then their account will be correctly created
    Then they would be able to check their profile page

    Scenario: Form Validation #1 (required fields)
    Given a User is attempting to sign in
    When User clicks "Create Account"
    Then User is reminded what fields are required.

    Scenario: Form validation #2 (Password too short)
    Given a User types a short password (minimum of 6 chars)
    Then User is prompted to input a longer password.

    Scenario: Form validaton #3 (Password not strong enough)
    Given a User types a weak password (minimum lowercase and uppecase letters, digit)
    Then Sign up fails with weak password alert. 

    Scenario: Form validation #4 (Re-entering different password)
    Given a User re-enters a different password
    Then Sign up fails with correct alert displayed.

    Scenario: User already exists
    Given User tries to sign in with an already created User
    Then they shouldn not be able to create a new account