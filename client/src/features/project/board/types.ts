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

export type TaskPriority = 'HIGHEST' | 'HIGH' | 'MEDIUM' | 'LOW' | 'LOWEST'
