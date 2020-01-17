describe('My First Test', () => {
    it('Should see the h1 heading is correct.', () => {
        cy.visit("/")
        cy.get("#root > .App > h1").contains("Hello, React!")
    })
})