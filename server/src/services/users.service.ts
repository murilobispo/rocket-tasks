import { prisma } from '@/lib/prisma'
import { UpdateMeInput, UpdatePasswordType } from '@/types/users.types'
import { AppError } from '@/utils/AppError'
import bcrypt from 'bcrypt'
import { env } from '@/config/env'

export async function getMe(userId : string) {
	const user = await prisma.user.findUnique({
		where: { id: userId },
		omit: { password: true}
	})

	if (!user) {
		throw new AppError('User not found', 404)
	}
	
	return user
}

export async function updateMe(userId: string, data: UpdateMeInput) {
	const user = await prisma.user.update({
		where: { id: userId},
		data,
		omit: {password: true}
	})
	
	return user
}

export async function updatePassword(	userId: string, data: UpdatePasswordType) {
	const user = await prisma.user.findUnique({
		where: {id : userId}
	})

	if (!user || !user.password){
		throw new AppError('User not found', 404)
	}

	const isMatch = await bcrypt.compare(data.currentPassword, user.password)

	if (!isMatch){
		throw new AppError('Invalid current password', 401)
	}

	const hashedNewPassword = await bcrypt.hash(data.newPassword, env.SALT_ROUNDS)

	await prisma.user.update({
		where: {id: userId},
		data: { password: hashedNewPassword}
	})
}

export async function deleteMe(userId: string) {
	await prisma.user.delete({
		where: {id : userId}
	})
}