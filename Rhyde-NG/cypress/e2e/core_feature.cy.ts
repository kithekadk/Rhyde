/// <reference types="Cypress" />

describe('Core features cypress', ()=>{

    // beforeEach(()=>{
    //     cy.visit('http://localhost:4200')
    // })

    // afterEach(()=>{
    //     cy.get('')
    // })

    it('uses contains keyword', ()=>{
        cy.visit('http://localhost:4200')
        cy.get('nav').find('div').should('have.length', 2)
        cy.get('nav').find('div')
        cy.get('.logo').contains('Rhyde')
    })

    it('simulates user actions', ()=>{
        cy.visit('http://localhost:4200')
        cy.get('#join-rhyde').click()
        cy.contains('Password')
    })

    it('registers a user', ()=>{
        cy.visit('http://localhost:4200/register')
        cy.get('#fullname').type('John Doe')
        cy.get('#email').type('john')
        cy.get('#phone').type('0789765309')
        cy.get('#address').type('Nyeri')
        cy.get('#password').type('12345678')
        cy.get('[type="submit"]').click()


        cy.visit('http://localhost:4200/login')
    })

    it('selects a dropdown using data cy attribute', ()=>{
        cy.visit('http://localhost:4200/register')
        cy.get('[data-cy="role"]').select('customer')
    })
})