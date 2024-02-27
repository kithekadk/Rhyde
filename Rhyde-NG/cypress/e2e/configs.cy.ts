describe('Configuring Timeouts', {
    defaultCommandTimeout: 10000,
    execTimeout: 5000,
    taskTimeout: 4000
},()=>{
    it('configuring test case',{
        execTimeout: 7000
    }, ()=>{
        cy.visit('/login')
    })
})