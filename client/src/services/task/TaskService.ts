import { BoardTask } from '@/features/project/board/types'
import { TaskCreateDTO, TaskDTO } from './types'
import { customFetchWithCredentials } from '@/utils/fetch'

const TASKS_ENDPOINT = '/tasks'

export async function createTask(
    taskToCreate: TaskCreateDTO
): Promise<TaskDTO> {
    return await customFetchWithCredentials<TaskDTO>(TASKS_ENDPOINT, {
        method: 'POST',
        body: JSON.stringify(taskToCreate),
    })
}

export async function createTaskToTheBoard(
    taskToCreate: TaskCreateDTO
): Promise<BoardTask> {
    const taskDTO = await createTask(taskToCreate)
    return taskDTOToBoardTask(taskDTO)
}

export function taskDTOToBoardTask(taskDTO: TaskDTO): BoardTask {
    const boardTask: BoardTask = {
        id: taskDTO.id,
        name: taskDTO.name,
        description: taskDTO.description,
        priority: taskDTO.priority,
        avatar: '/account-avatar.svg',
        assignee: taskDTO.assigneeEmail,
    }

    if (taskDTO.endDate) {
        boardTask.dueDate = new Date(taskDTO.endDate)
    }

    return boardTask
}

export function taskDTOsToBoardTasks(taskDTOs: TaskDTO[]): BoardTask[] {
    return taskDTOs.map((taskDTO) => {
        return taskDTOToBoardTask(taskDTO)
    })
}