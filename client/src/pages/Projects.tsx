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
        <div className="w-full h-full flex flex-col gap-4 items-center">
            {isLoading ? 'Loading...' : <ProjectList projects={projects} />}
        </div>
    )
}

export default ProjectsPage
