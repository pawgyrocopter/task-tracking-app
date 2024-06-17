export interface ProjectDTO {
    id: string
    name: string
    startDate: string
    endDate: string
    description: string
    users: [
        {
            email: string
        },
    ]
    tasks: TaskDTO[]
    img?: string
}

export interface TaskDTO {
    id: string
    name: string
    description: string
    startDate: string
    endDate: string
    priority: TaskPriority
    state: 0 | 1 | 2
    creatorEmail: string
    assigneeEmail: string
}

export const TaskPriorities = [
    'HIGHEST',
    'HIGH',
    'MEDIUM',
    'LOW',
    'LOWEST',
] as const

export type TaskPriority = (typeof TaskPriorities)[number]
