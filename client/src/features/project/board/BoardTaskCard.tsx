import { BoardTask, TaskPriority } from './types'

const BoardTaskCard = ({ task }: { task: BoardTask }) => {
    return (
        <div key={task.id} className="mb-4 rounded-lg bg-white p-4 shadow-md">
            <div className="flex items-center gap-3">
                <h3 className="mb-2 font-semibold">{task.name}</h3>
                <div
                    className={`h-3 w-3 rounded-full ${getPriorityColor(
                        task.priority
                    )} mb-2`}
                ></div>
            </div>
            <p className="mb-4 text-sm text-gray-600">{task.description}</p>
            <div className="flex space-x-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-200">
                    {task.avatar}
                </div>
            </div>
        </div>
    )
}

function getPriorityColor(priority: TaskPriority): string {
    switch (priority) {
        case 'HIGHEST':
            return 'bg-red-500'
        case 'HIGH':
            return 'bg-orange-500'
        case 'MEDIUM':
            return 'bg-yellow-400'
        case 'LOW':
            return 'bg-green-400'
        case 'LOWEST':
            return 'bg-gray-400'
    }
}

export default BoardTaskCard
