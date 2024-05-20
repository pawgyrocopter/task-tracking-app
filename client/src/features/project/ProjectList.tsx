import useIsMobile from '@/hooks/useIsMobile'
import ProjectCard from './Project'
import { Project } from './types'

const ProjectList = ({ projects }: { projects: Project[] }) => {
    const isMobile = useIsMobile()

    return (
        <div className="w-full bg-gray-300 p-4 rounded-lg h-full flex flex-col gap-4">
            <div className="w-full flex flex-col md:flex-row gap-4 md:gap-0 justify-between items-center">
                {isMobile && <h1 className="text-2xl">/Projects/</h1>}
                <button className="rounded-xl w-full md:w-auto flex items-center gap-2 font-bold shadow-lg min-w-[14rem] px-2 py-2 bg-white">
                    <img
                        className="w-9 h-9"
                        src="add-circle.svg"
                        alt="Add circle icon"
                    />
                    <h1>Create new project</h1>
                </button>
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
