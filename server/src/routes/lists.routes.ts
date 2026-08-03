import { Router } from 'express'
import { validate } from '@/middlewares/validate'
import { authenticate } from '@/middlewares/authenticate'
import { createListSchema, updateListSchema } from '@/schemas/lists.schema'
import { createList, deleteList, getLists, updateList } from '@/controllers/lists.controller'

const router = Router()

router.post('/', authenticate, validate(createListSchema), createList)
router.get('/', authenticate, getLists)
router.patch('/:id',authenticate, validate(updateListSchema), updateList)
router.delete('/:id', authenticate, deleteList)

export { router as listsRouter }