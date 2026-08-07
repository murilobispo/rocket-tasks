import type { User } from '@/types/user'

export interface AuthResponse{
	token: string,
	user: Pick<User, 'id' | 'name' | 'email'>
}