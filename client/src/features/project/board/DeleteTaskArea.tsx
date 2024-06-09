import { useProjectBoard } from '@/context/ProjectBoardContext'
import { useEffect, useState } from 'react'
import '@/assets/css/delete-area.css'

const DeleteTaskArea = () => {
    const [active, setActive] = useState<boolean>(false)
    const [isAnimating, setIsAnimating] = useState<boolean>(false)
    const { draggingTask } = useProjectBoard()

    useEffect(() => {
        if (draggingTask) {
            setIsAnimating(true)
        } else if (isAnimating) {
            const timer = setTimeout(() => setIsAnimating(false), 200)
            return () => clearTimeout(timer)
        }
    }, [draggingTask, isAnimating])

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setActive(true)
    }

    const handleDragLeave = () => {
        setActive(false)
    }

    const handleDragEnd = () => {
        console.log('task to delete', draggingTask)
        // make delete request and update tasks locally
        setActive(false)
    }

    if (!draggingTask && !isAnimating) {
        return null
    }

    return (
        <div
            onDrop={handleDragEnd}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`sticky bottom-5 z-[10] h-60 w-full place-content-center border-2 text-3xl lg:h-32 ${
                active
                    ? 'border-red-800 bg-red-800/20 text-red-500'
                    : 'border-neutral-800 bg-neutral-800/20 text-neutral-500'
            } flex items-center justify-center ${
                draggingTask ? 'area-enter' : 'area-leave'
            }`}
        >
            <IconTrashFill
                className={`h-8 w-8 md:h-10 md:w-10 ${active && 'animate-bounce'}`}
            />
        </div>
    )
}

const IconTrashFill = (props: React.SVGProps<SVGSVGElement>) => {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            height="2.5rem"
            width="2.5rem"
            {...props}
        >
            <path d="M15 2H9c-1.103 0-2 .897-2 2v2H3v2h2v12c0 1.103.897 2 2 2h10c1.103 0 2-.897 2-2V8h2V6h-4V4c0-1.103-.897-2-2-2zM9 4h6v2H9V4zm8 16H7V8h10v12z" />
        </svg>
    )
}

export default DeleteTaskArea
