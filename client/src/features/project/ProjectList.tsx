import useIsMobile from '@/hooks/useIsMobile'
import ProjectCard from './Project'
import { Project } from './types'
import CreateProjectButton from './CreateProjectButton'

const ProjectList = ({ projects }: { projects: Project[] }) => {
    const isMobile = useIsMobile()

    return (
        <div className="w-full bg-gray-300 p-4 rounded-lg h-full flex flex-col gap-4">
            <div className="w-full flex flex-col md:flex-row gap-4 md:gap-0 justify-between items-center">
                {isMobile && <h1 className="text-2xl">/Projects/</h1>}
                <CreateProjectButton />
                {!isMobile && (
                    <>
                        <div className="flex-grow flex justify-center">
                            <h1 className="text-3xl">/Projects/</h1>
                        </div>
                        <div className="w-24"></div>
                    </>
                )}
            </div>
            {projects.map((project, idx) => (
                <ProjectCard key={idx} {...project} />
            ))}
        </div>
    )
}

export default ProjectList
