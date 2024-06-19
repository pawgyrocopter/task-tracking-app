import { customFetchWithCredentials } from '@/utils/fetch'
import { BoardData, ProjectCreateDTO, ProjectDTO } from './types'
import { Project } from '@/features/project/types'
import { TaskDTO } from '../task/types'
import { taskDTOsToBoardTasks } from '../task/TaskService'
import { getUsersInProject } from '../users/UserService'

const PROJECTS_ENDPOINT = '/projects'

export async function getProjects(): Promise<Project[]> {
    const projectDTOs =
        await customFetchWithCredentials<ProjectDTO[]>(PROJECTS_ENDPOINT)

    return projectDTOsToProjects(projectDTOs)
}

export async function createProject(
    projectToCreate: ProjectCreateDTO
): Promise<ProjectDTO> {
    const projectDTO = await customFetchWithCredentials<ProjectDTO>(
        PROJECTS_ENDPOINT,
        {
            method: 'POST',
            body: JSON.stringify(projectToCreate),
        }
    )

    return projectDTO
}

export async function deleteProject(projectId: string): Promise<ProjectDTO> {
    const projectDTO = await customFetchWithCredentials<ProjectDTO>(
        `${PROJECTS_ENDPOINT}/${projectId}`,
        {
            method: 'DELETE',
        }
    )

    return projectDTO
}

export async function getBoardData(projectId: string): Promise<BoardData> {
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

    const users = await getUsersInProject(projectId)

    return {
        columns: columns,
        users: users.map((user) => user.email),
    }
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
