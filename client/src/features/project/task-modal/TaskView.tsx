import { capitalizeString } from '@/utils/strings'
import { BoardTask } from '../board/types'
import { getPriorityColor } from '../board/shared'

interface TaskViewProps {
    task: BoardTask
    onEdit: () => void
}

const TaskView: React.FC<TaskViewProps> = ({ task, onEdit }) => {
    return (
        <div className="flex h-full w-full flex-col items-center justify-between p-4">
            <div className="flex w-full flex-col items-center justify-center gap-4">
                <h1 className="text-center text-xl font-semibold">
                    {task.name}
                </h1>
                <p className="text-center">{task.description}</p>
            </div>
            <div className="flex flex-col gap-10">
                <div className="grid grid-cols-1 gap-2">
                    <div className="flex items-center gap-2">
                        <p className="w-[5rem]">Priority:</p>
                        <div className="flex items-center gap-2">
                            <p>{capitalizeString(task.priority)}</p>
                            <div
                                className={`h-3 w-3 rounded-full ${getPriorityColor(task.priority)}`}
                            ></div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <p className="w-[5rem]">Assignee:</p>
                        <div className="flex items-center gap-2">
                            <p className="w-[15rem]">{task.assignee}</p>
                            <img
                                src={task.avatar}
                                className="flex h-6 w-6 items-center justify-center rounded-full"
                            />
                        </div>
                    </div>
                </div>
                <div className="mt-4 flex w-full justify-center gap-2">
                    <button
                        className="rounded-md bg-blue-500 px-4 py-1 text-white"
                        onClick={onEdit}
                    >
                        Edit
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TaskView
