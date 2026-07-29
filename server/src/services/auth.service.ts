import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { prisma } from '@/lib/prisma'
import { AppError } from '@/utils/AppError'
import { LoginInput, RegisterInput } from '@/types/auth.types'
import { env } from '@/config/env'

export async function register({ name, email, password }: RegisterInput) {
	const userExists = await prisma.user.findUnique({
		where: { email }
	})

	if (userExists){
		throw new AppError('Email already registered', 409)
	}

	const hashedPassword = await bcrypt.hash(password, env.SALT_ROUNDS)

	const user = await prisma.user.create({
		data: {
			name,
			email,
			password: hashedPassword
		}
  })

	const token = jwt.sign(
    { userId: user.id },
    env.JWT_SECRET,
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

export async function login({ email, password }: LoginInput) {
	const user = await prisma.user.findUnique({
		where: { email }
	})

	if (!user || !user.password) {
		throw new AppError('Invalid Credentials', 401)
	}

	const isMatch = await bcrypt.compare(password, user.password)

	if (!isMatch) {
		throw new AppError('Invalid credentials', 401)
	}

	const token = jwt.sign(
    { userId: user.id },
    env.JWT_SECRET,
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