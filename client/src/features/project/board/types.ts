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
}

export const TaskPriorities = [
    'HIGHEST',
    'HIGH',
    'MEDIUM',
    'LOW',
    'LOWEST',
] as const

export type TaskPriority = (typeof TaskPriorities)[number]
