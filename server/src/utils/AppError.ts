export class AppError extends Error {
  constructor(public message: string, public readonly statusCode: number) {
    super(message)
  }
}