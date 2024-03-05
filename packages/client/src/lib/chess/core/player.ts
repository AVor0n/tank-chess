export class Player {
  readonly id: number
  public readonly name: string

  constructor(name: string, id?: number) {
    this.id = id ?? Math.random()
    this.name = name
  }
}
