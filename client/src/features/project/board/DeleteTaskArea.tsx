import { useProjectBoard } from '@/context/ProjectBoardContext'
import { useEffect, useState } from 'react'
import '@/assets/css/delete-area.css'
import { deleteTask } from '@/services/task/TaskService'
import { IconTrashFill } from '@/components/ui/IconTrashFill'

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

export default DeleteTaskArea
