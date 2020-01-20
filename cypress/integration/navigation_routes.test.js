describe('Testing Static Navigation', () => {

    it('Landing URL shows Landing page', () => {
        cy.visit("/")
        cy.get("#root > div > h1").contains("Landing")
    })

    it('Login URL shows Login page', () => {
        cy.visit("/login")
        cy.get("#root > div > h1").contains("Login")
    })

    it('Dashboard URL shows Dashboard page', () => {
        cy.visit("/dashboard")
        cy.get("#root > div > h1").contains("Dashboard")
    })

    it('Users URL shows Users page', () => {
        cy.visit("/users")
        cy.get("#root > div > h1").contains("Users")
    })

    it('AddPhoto URL shows AddPhoto page', () => {
        cy.visit("/addphoto")
        cy.get("#root > div > h1").contains("Add Photo")
    })

    it('EditPhoto URL shows EditPhoto page', () => {
        cy.visit("/editphoto")
        cy.get("#root > div > h1").contains("Edit Photo")
    })

    it('ShowPhoto URL shows ShowPhoto page', () => {
        cy.visit("/showphoto")
        cy.get("#root > div > h1").contains("Show Photo")
    })

    it('Categories URL shows Categories page', () => {
        cy.visit("/categories")
        cy.get("#root > div > h1").contains("Categories")
    })

    it('Help URL shows Help page', () => {
        cy.visit("/help")
        cy.get("#root > div > h1").contains("Help")
    })

    it('Search URL shows Search page', () => {
        cy.visit("/search")
        cy.get("#root > div > h1").contains("Search")
    })
})