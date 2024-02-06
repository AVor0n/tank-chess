export class NotFoundError extends Error {
  public errorName = ''
  public status = 404

  constructor(message: string, name: string) {
    super(message)
    this.errorName = name
  }
}
