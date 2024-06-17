import { TaskDTO } from '../task/types'

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
