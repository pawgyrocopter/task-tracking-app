import useIsMobile from '@/hooks/useIsMobile'
import ProjectCard from './Project'
import { Project } from './types'
import CreateProjectButton from './CreateProjectButton'
import useTitleFromPathname from '@/hooks/useTitleFromPathname'

const ProjectList = ({ projects }: { projects: Project[] }) => {
    const isMobile = useIsMobile()
    const title = useTitleFromPathname()

    return (
        <>
            <div className="w-full flex flex-row gap-4 md:gap-0 justify-between items-start">
                <div className="flex-1">
                    <CreateProjectButton />
                </div>
                {!isMobile && (
                    <>
                        <h1 className="text-2xl">{title}</h1>
                        <div className="flex-1"></div>
                    </>
                )}
            </div>
            {projects.map((project, idx) => (
                <ProjectCard key={idx} {...project} />
            ))}
        </>
    )
}

export default ProjectList
