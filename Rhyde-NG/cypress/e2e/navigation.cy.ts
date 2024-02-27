describe('It navigates the user', ()=>{
    it('should navigate back and forth', ()=>{
        cy.visit('http://localhost:4200/')
        cy.get('.register-link').click()
        
        cy.location('pathname').should('equal', '/register')

        cy.go('back')

        cy.location('pathname').should('equal', '/')

        cy.get('#join-rhyde').contains('Join the Rhide')

        cy.go('forward')

        cy.location('pathname').should('equal', '/register')

        cy.go('back')

        cy.get('ul > :nth-child(5)').click()

        cy.get(':nth-child(6) > .align-baseline')
    })
})