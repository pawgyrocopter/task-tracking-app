import { customFetchWithCredentials } from '@/utils/fetch'
import { ProjectDTO, TaskDTO } from './types'
import { Project } from '@/features/project/types'
import { BoardColumn, BoardTask } from '@/features/project/board/types'

const PROJECTS_ENDPOINT = '/projects'

export async function getProjects(): Promise<Project[]> {
    const projectDTOs =
        await customFetchWithCredentials<ProjectDTO[]>(PROJECTS_ENDPOINT)

    return projectDTOsToProjects(projectDTOs)
}

export async function getBoardData(
    projectId: string
): Promise<BoardColumn[]> {
    const taskDTOs = await customFetchWithCredentials<TaskDTO[]>(
        `${PROJECTS_ENDPOINT}/${projectId}/tasks`
    )

    const columns = [
        {
            id: 0,
            name: 'To Do',
            tasks: taskDTOsToBoardTasks(
                taskDTOs.filter((task) => task.state === 0)
            ),
        },
        {
            id: 1,
            name: 'In Progress',
            tasks: taskDTOsToBoardTasks(
                taskDTOs.filter((task) => task.state === 1)
            ),
        },
        {
            id: 2,
            name: 'Done',
            tasks: taskDTOsToBoardTasks(
                taskDTOs.filter((task) => task.state === 2)
            ),
        },
    ]

    return columns
}

function taskDTOsToBoardTasks(taskDTOs: TaskDTO[]): BoardTask[] {
    return taskDTOs.map((taskDTO) => {
        return {
            id: taskDTO.id,
            name: taskDTO.name,
            description: taskDTO.description,
            priority: taskDTO.priority,
            avatar: '',
            assignee: taskDTO.assigneeEmail,
            dueDate: new Date(taskDTO.endDate),
        }
    })
}

function projectDTOsToProjects(projectDTOs: ProjectDTO[]): Project[] {
    return projectDTOs.map((projectDTO): Project => {
        return {
            id: projectDTO.id,
            name: projectDTO.name,
            description: projectDTO.description,
            tasks: projectDTO.tasks.length,
            completed_tasks: projectDTO.tasks.filter((task) => task.state === 2)
                .length,
            img: projectDTO.img ?? '',
        }
    })
}
