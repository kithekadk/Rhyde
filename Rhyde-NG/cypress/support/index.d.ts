/// <reference types="Cypress"/>

declare namespace Cypress{
    interface Chainable{
        loginUser(): Chainable<void>
    }
}