import ProjectList from '@/features/project/ProjectList'

const mockProjects: Project[] = [
    { id: '1', title: 'top website' },
    { id: '2', title: 'e-commerce' },
    { id: '3', title: 'artist portfolio' },
    { id: '4', title: 'lol' },
]

const ProjectsPage = () => {
    return (
        <div className="w-full h-full flex flex-col gap-4 items-center">
            <h1>Projects</h1>
            <ProjectList projects={mockProjects} />
        </div>
    )
}

export default ProjectsPage
