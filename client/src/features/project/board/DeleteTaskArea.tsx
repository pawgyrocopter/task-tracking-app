import { useProjectBoard } from '@/context/ProjectBoardContext'
import { useEffect, useState } from 'react'
import '@/assets/css/delete-area.css'
import { deleteTask } from '@/services/task/TaskService'

const DeleteTaskArea = () => {
    const [active, setActive] = useState<boolean>(false)
    const [isAnimating, setIsAnimating] = useState<boolean>(false)
    const {
        columns,
        setColumns,
        totalTasks,
        setTotalTasks,
        draggingTask,
        setDraggingTask,
    } = useProjectBoard()

    useEffect(() => {
        if (draggingTask) {
            setIsAnimating(true)
        } else if (isAnimating) {
            const timer = setTimeout(() => setIsAnimating(false), 300)
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

    const handleDragEnd = async () => {
        if (!draggingTask) {
            return
        }
        const taskToDeleteId = draggingTask.id
        // delete task on the server
        await deleteTask(taskToDeleteId)
        // delete task locally
        const newColumns = columns.map((column) => {
            let taskFound = false
            const newTasks = column.tasks.filter((task) => {
                if (taskFound) return true
                if (task.id === taskToDeleteId) {
                    taskFound = true
                    return false
                }
                return true
            })
            return { ...column, tasks: newTasks }
        })
        setColumns(newColumns)
        setTotalTasks(totalTasks - 1)
        setActive(false)
        setDraggingTask(null)
    }

    if (!draggingTask && !isAnimating) {
        return null
    }

    return (
        <div
            onDrop={handleDragEnd}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`absolute bottom-0 left-0 z-[10] h-60 w-full place-content-center border-2 text-3xl lg:h-32 ${
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
