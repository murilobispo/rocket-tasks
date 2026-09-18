export interface User {
  id: string
  name: string
  email: string
  avatarUrl: string | null;
  createdAt: string
  updatedAt: string
}

export type UpdateUser = Pick<User, 'name' | 'avatarUrl'>