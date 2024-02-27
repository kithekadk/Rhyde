describe('Method chaining', ()=>{
    it('uses values and aliases', (()=>{
        cy.visit('/')

        const loginlink = cy.get('[data-cy="login-link"]')

        loginlink.click()

        cy.get('.register-link').as('RegisterLink');

        cy.get('@RegisterLink').click()

        cy.get('[data-cy="create-account-btn"]').as('CreateAccountBtn')

        cy.get('@CreateAccountBtn').then((el)=>{
            expect(el.val()).to.equal('Create Account')
            expect(el.val()).to.contain('Create') 
        })
    }))
})