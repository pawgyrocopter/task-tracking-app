export interface TaskDTO {
    id: string
    name: string
    description: string
    startDate: string
    endDate?: string
    priority: TaskPriority
    state: number
    creatorEmail: string
    assigneeEmail: string
}

export interface TaskCreateDTO {
    name: string
    description: string
    startDate: string
    endDate?: string
    assignedUserEmail: string
    priority: TaskPriority
    state: number
    projectId: string
}

export const TaskPriorities = [
    'HIGHEST',
    'HIGH',
    'MEDIUM',
    'LOW',
    'LOWEST',
] as const

export type TaskPriority = (typeof TaskPriorities)[number]
