import { TaskPriority } from '@/services/task/types'

export type BoardColumn = {
    id: number
    name: string
    tasks: BoardTask[]
}

export type BoardTask = {
    id: string
    name: string
    description: string
    priority: TaskPriority
    avatar: string
    assignee: string
    dueDate?: Date
}
