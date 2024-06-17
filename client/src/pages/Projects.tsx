import ProjectList from '@/features/project/ProjectList'
import { Project } from '@/features/project/types'
import { useEffect, useState } from 'react'

const ProjectsPage = () => {
    const [projects, setProjects] = useState<Project[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        async function fetchProjects() {
            const response = await fetch('data/projects.json')
            const data = await response.json()
            setProjects(data)
            setIsLoading(false)
        }
        fetchProjects()
    }, [])

    return (
        <div className="flex h-full w-full flex-col items-center gap-4 overflow-auto">
            {isLoading ? 'Loading...' : <ProjectList projects={projects} />}
        </div>
    )
}

export default ProjectsPage
