export interface Session {
  id: string
  title: string
  tags: string[]
  mins: string | number
  difficulty: string | null
  popularity: number
  updatedAt: string
  completed: boolean
}
