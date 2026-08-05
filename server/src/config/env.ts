import 'dotenv/config'

export const env = {
  PORT: Number(process.env.PORT) || 3000,
  JWT_SECRET: process.env.JWT_SECRET ?? (() => { throw new Error('JWT_SECRET is not defined') })(),
  DATABASE_URL: process.env.DATABASE_URL ?? (() => { throw new Error('DATABASE_URL is not defined') })(),
  SALT_ROUNDS: Number(process.env.SALT_ROUNDS) || 10,
  FRONTEND_PORT: Number(process.env.FRONTEND_PORT) || 5173,

}
