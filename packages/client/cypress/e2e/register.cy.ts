import { faker } from '@faker-js/faker'
const email = faker.internet.exampleEmail()
const login = faker.internet.userName()

describe('register', () => {
  function registerUser(first_name, second_name, login, email, phone, password) {
    cy.visit('http://localhost:3000')

    cy.get(`[title="Регистрация"]`, { withinSubject: null }).should('be.visible').click()
    cy.get('[data-test="signup"]')
      .should('be.visible')
      .within(() => {
        cy.get('[placeholder="Имя"]').type(first_name).should('have.value', first_name)
        cy.get('[placeholder="Фамилия"]').type(second_name).should('have.value', second_name)
        cy.get('[placeholder="Логин"]').type(login).should('have.value', login)
        cy.get('[placeholder="E-mail"]').type(email).should('have.value', email)
        cy.get('[placeholder="Телефон"]').type(phone).should('have.value', phone)
        cy.get('[placeholder="Пароль"]').type(password).should('have.value', password)
      })
  }

  it('should get error if an email already exists', function () {
    cy.fixture('failUser.json').then(user => {
      registerUser(user.first_name, user.second_name, user.login, user.email, user.phone, user.password)
    })
    cy.get(`[type="submit"]`).click('center')
    cy.get('[data-test="error"]').should('be.visible')
  })

  it('should redirect after successful registration', function () {
    cy.fixture('newUser.json').then(user => {
      registerUser(user.first_name, user.second_name, login, email, user.phone, user.password)
    })
    cy.get(`[type="submit"]`).click('center')
    cy.location().should(l => expect(l.pathname).to.eq('/'))
  })
})
