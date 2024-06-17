import { customFetchWithCredentials } from '@/utils/fetch'
import { ProjectDTO } from './types'
import { Project } from '@/features/project/types'

const PROJECTS_ENDPOINT = '/projects'

export async function getProjects(): Promise<Project[]> {
    const projectDTOs =
        await customFetchWithCredentials<ProjectDTO[]>(PROJECTS_ENDPOINT)

    return projectDTOsToProjects(projectDTOs)
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
