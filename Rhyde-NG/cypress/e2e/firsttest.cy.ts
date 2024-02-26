/// <reference types="Cypress"/>

describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:4200/')
    cy.get('#join-rhyde')
    cy.get('h1')
    cy.get('.services')
    cy.get('[type="button"]')
    cy.get('.cards > div')
  })
})