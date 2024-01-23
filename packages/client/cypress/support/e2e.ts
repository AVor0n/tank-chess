import './commands'

declare global {
  namespace Cypress {
    interface Chainable {
      seeAndVisit(): void
    }
  }
}
