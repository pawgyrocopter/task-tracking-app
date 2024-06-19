import { BoardColumn } from '@/features/project/board/types'
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

export interface BoardData {
    columns: BoardColumn[]
    users: string[]
}
