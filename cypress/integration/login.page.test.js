describe('Login Page Tests', () => {
    it('Should render the Login Form', () => {
        cy.visit("/login")
        cy.get('[data-cy="loginFormHeading"]').contains("Login Form")
    })
})