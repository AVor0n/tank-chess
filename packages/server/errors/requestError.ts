export class RequestError extends Error {
  public errorName = ''
  public status = 400

  constructor(message: string, name: string) {
    super(message)
    this.errorName = name
  }
}
