import { prisma } from '@/lib/prisma'
import { CreateListInput, UpdateListInput } from '@/types/lists.types'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client'
import { AppError } from '@/utils/AppError'

export async function createList(userId: string, data: CreateListInput) {
	const list = await prisma.list.create({
		data : {
			...data,
			userId
		},
		omit: {
			userId: true
		}
	})

	return list
}

export async function getLists(userId: string) {
	const lists = await prisma.list.findMany({
		where: { userId },
		omit: { userId: true },
    include: {
      _count: {
        select: { tasks: true }
      }
    }
	})
	
	return lists
}

export async function updateList(userId: string, listId: string, data: UpdateListInput) {
  try {
    return await prisma.list.update({
      where: { 
				id: listId,
				userId
			},
      data,
      omit: { userId: true }
    })
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
      throw new AppError('List not found', 404)
    }
    throw error
  }
}

export async function deleteList(userId: string, listId: string) {
  try {
    await prisma.list.delete({
      where: { id: listId, userId }
    })
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
      throw new AppError('List not found', 404)
    }
    throw error
  }
}