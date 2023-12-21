import { generateId } from '../utils/generateid'

export class Player {
  readonly id: string
  public readonly name: string

  constructor(name: string) {
    this.id = generateId(`player`)
    this.name = name
  }
}
