describe('Login Tests', () => {

    beforeEach(() => {
        cy.visit("/")
        window.sessionStorage.clear()
    })

    it('Should login Admin', () => {
        cy.visit("/login")
        cy.get('form').within(($form) => {
            cy.get('input[name="username"]').type('AdminUser')
            cy.get('input[name="password"]').type('Admin1$')
            cy.get('button').click()
        })
        cy.url().should('include', '/dashboard')
    })

    it('Should login Volunteer', () => {
        cy.visit("/login")
        cy.get('form').within(($form) => {
            cy.get('input[name="username"]').type('VolunteerUser')
            cy.get('input[name="password"]').type('Volunteer1$')
            cy.get('button').click()
        })
        cy.url().should('include', '/dashboard')
    })

    it('Should login Guest', () => {
        cy.visit("/login")
        cy.get('form').within(($form) => {
            cy.get('input[name="username"]').type('GuestUser')
            cy.get('input[name="password"]').type('Guest1$')
            cy.get('button').click()
        })
        cy.url().should('include', '/dashboard')
    })
})

describe('Admin Validation Tests', () => {

    beforeEach(() => {
        cy.visit("/")
        window.sessionStorage.clear()
        cy.visit("/login")
        cy.get('form').within(($form) => {
            cy.get('input[name="username"]').type('AdminUser')
            cy.get('input[name="password"]').type('Admin1$')
            cy.get('button').click()
        })
    })

    it('Admin can view Dashboard', () => {
        cy.url().should('include', '/dashboard')
    })
})

describe('Volunteer Validation Tests', () => {

    beforeEach(() => {
        cy.visit("/")
        window.sessionStorage.clear()
        cy.visit("/login")
        cy.get('form').within(($form) => {
            cy.get('input[name="username"]').type('VolunteerUser')
            cy.get('input[name="password"]').type('Volunteer1$')
            cy.get('button').click()
        })
    })
    it('Volunteer can view Dashboard', () => {
        cy.url().should('include', '/dashboard')
    })
    it('Volunteer cannot view Users', () => {
        cy.url().should('include', '/dashboard')
        cy.visit("/users")
        cy.url().should('include', '/dashboard')
    })
    it('Volunteer can view Help', () => {
        cy.url().should('include', '/dashboard')
        cy.visit("/help")
        cy.url().should('include', '/help')
    })
    it('Volunteer can view Add Photo', () => {
        cy.url().should('include', '/dashboard')
        cy.visit("/addphoto")
        cy.url().should('include', '/addphoto')
    })
    it('Volunteer can view Edit Photo', () => {
        cy.url().should('include', '/dashboard')
        cy.visit("/editphoto")
        cy.url().should('include', '/editphoto')
    })
    it('Volunteer can view Show Photo', () => {
        cy.url().should('include', '/dashboard')
        cy.visit("/showphoto")
        cy.url().should('include', '/showphoto')
    })
    it('Volunteer can view Categories', () => {
        cy.url().should('include', '/dashboard')
        cy.visit("/categories")
        cy.url().should('include', '/categories')
    })
    it('Volunteer can view Search', () => {
        cy.url().should('include', '/dashboard')
        cy.visit("/search")
        cy.url().should('include', '/search')
    })
})

describe('Guest Validation Tests', () => {

    beforeEach(() => {
        cy.visit("/")
        window.sessionStorage.clear()
        cy.visit("/login")
        cy.get('form').within(($form) => {
            cy.get('input[name="username"]').type('GuestUser')
            cy.get('input[name="password"]').type('Guest1$')
            cy.get('button').click()
        })
    })
    it('Guest can view Dashboard', () => {
        cy.url().should('include', '/dashboard')
    })
    it('Guest cannot view Users', () => {
        cy.url().should('include', '/dashboard')
        cy.visit("/users")
        cy.url().should('include', '/dashboard')
    })
    it('Guest can view Help', () => {
        cy.url().should('include', '/dashboard')
        cy.visit("/help")
        cy.url().should('include', '/help')
    })
    it('Guest cannot view Add Photo', () => {
        cy.url().should('include', '/dashboard')
        cy.visit("/addphoto")
        cy.url().should('include', '/dashboard')
    })
    it('Guest cannnot view Edit Photo', () => {
        cy.url().should('include', '/dashboard')
        cy.visit("/editphoto")
        cy.url().should('include', '/dashboard')
    })
    it('Guest can view Show Photo', () => {
        cy.url().should('include', '/dashboard')
        cy.visit("/showphoto")
        cy.url().should('include', '/showphoto')
    })
    it('Guest can view Categories', () => {
        cy.url().should('include', '/dashboard')
        cy.visit("/categories")
        cy.url().should('include', '/categories')
    })
    it('Guest can view Search', () => {
        cy.url().should('include', '/dashboard')
        cy.visit("/search")
        cy.url().should('include', '/search')
    })
})