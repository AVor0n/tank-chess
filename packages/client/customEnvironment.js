/**automock */
import { TestEnvironment } from 'jest-environment-jsdom'

class CustomTestEnvironment extends TestEnvironment {
  constructor(...args) {
    super(...args)

    this.global.structuredClone = globalThis.structuredClone
  }
}

export default CustomTestEnvironment
