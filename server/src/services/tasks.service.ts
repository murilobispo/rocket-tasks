import { prisma } from '@/lib/prisma'
import { CreateTaskInput, GetTasksQueryInput, UpdateTaskInput } from '@/types/tasks.types'
import { AppError } from '@/utils/AppError'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client'
import { getDueDateFilter } from '@/utils/dateFilters'
import { Prisma } from 'generated/prisma/browser'

export async function createTask(userId: string, data: CreateTaskInput) {
	if (data.listId) {
		const listExists = await prisma.list.findUnique({
			where: { 
				userId,
				id: data.listId
			},
			select: {
        id: true,
      }
		})

		if (!listExists) {
			throw new AppError('The specified list was not found', 404)
		}
	}

	const task = await prisma.task.create({
		data: {
			...data,
			userId
		},
		omit: { userId: true }
	})

	return task
}

export async function getTasksQuery(userId: string, query: GetTasksQueryInput) {
	
	if (query.listId) {
		const listExists = await prisma.list.findUnique({
			where: { 
				userId,
				id: query.listId
			},
			select: {
				id: true,
			}
		})

		if (!listExists) {
			throw new AppError('The specified list was not found', 404)
		}
	}
	
	const where: Prisma.TaskWhereInput = {
		userId,
		listId: query.listId,
		completed: query.completed,
		dueDate: getDueDateFilter(query.due)
	}

	const [tasks, total] = await prisma.$transaction([
		prisma.task.findMany({
			where,
			orderBy:{
				[query.sortBy]: query.sortOrder
			},
			omit: {
				userId: true
			},
			skip: (query.page - 1) * query.limit,
			take: query.limit
		}),

		prisma.task.count({
			where
		})
	])

	return {
		data: tasks,
		meta: {
			page: query.page,
			limit: query.limit,
			total,
			totalPages: Math.ceil(total / query.limit)
		}
	}
}

export async function getTask(userId: string, taskId: string) {
	const task = await prisma.task.findUnique({
		where: { 
			userId,
			id: taskId
		},
		omit: { userId: true }
	})

	if(!task) {
		throw new AppError('Task not found', 404)
	}

	return task
}

export async function updateTask(userId: string, taskId: string, data: UpdateTaskInput) {
	try {
    return await prisma.task.update({
      where: { 
				id: taskId,
				userId
			},
      data,
      omit: { userId: true }
    })
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
      throw new AppError('Task not found', 404)
    }
    throw error
  }
}

export async function deleteTask(userId: string, taskId: string) {
  try {
    await prisma.task.delete({
      where: { userId, id: taskId }
    })
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
      throw new AppError('Task not found', 404)
    }
    throw error
  }
}