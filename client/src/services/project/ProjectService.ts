import { customFetchWithCredentials } from '@/utils/fetch'
import { ProjectDTO } from './types'
import { Project } from '@/features/project/types'
import { BoardColumn } from '@/features/project/board/types'
import { TaskDTO } from '../task/types'
import { taskDTOsToBoardTasks } from '../task/TaskService'

const PROJECTS_ENDPOINT = '/projects'

export async function getProjects(): Promise<Project[]> {
    const projectDTOs =
        await customFetchWithCredentials<ProjectDTO[]>(PROJECTS_ENDPOINT)

    return projectDTOsToProjects(projectDTOs)
}

export async function getBoardData(projectId: string): Promise<BoardColumn[]> {
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
