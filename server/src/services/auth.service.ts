import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { prisma } from '../lib/prisma'
import { AppError } from '../utils/AppError'
import { RegisterInput } from '../types/auth.types'

export async function register({ name, email, password }: RegisterInput) {

	const userExists = await prisma.user.findUnique({
		where: { email }
	})

	if (userExists ){
		throw new AppError('Email already registered', 409)
	}
	const hashedPassword = await bcrypt.hash(password, 10)

	const user = await prisma.user.create({
		data: {
			name,
			email,
			password: hashedPassword
		}
  })

	const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET!,
    { expiresIn: '7d' }
  )
	
  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email
    }
  }
}