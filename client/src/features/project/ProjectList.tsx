import Project from './Project'

const ProjectList = ({ projects }: { projects: Project[] }) => {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4">
            {projects.map((project, idx) => (
                <Project key={idx} {...project} />
            ))}
        </div>
    )
}

export default ProjectList
